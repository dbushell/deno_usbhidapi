import {hidapi} from './hidapi.ts';
import {HIDInfo} from './types.ts';
import * as utils from './utils.ts';

const api = hidapi.symbols;

export const init = (): void => {
  api.hid_init();
};

export const exit = (): void => {
  api.hid_exit();
};

export const enumerate = (vendorId = 0, productId = 0): HIDInfo[] => {
  const devices: HIDInfo[] = [];
  const enumerate = BigInt(api.hid_enumerate(vendorId, productId));
  if (!enumerate) {
    api.hid_free_enumeration(enumerate);
    return devices;
  }
  let device: any = new Deno.UnsafePointerView(enumerate);
  while (device) {
    const hidInfo: HIDInfo = {
      // path: Deno.UnsafePointerView.getCString(device.getBigUint64(0)),
      path: utils.decodeUTF8(
        Deno.UnsafePointerView.getArrayBuffer(device.getBigUint64(0), 256)
      ),
      vendorId: device.getUint16(8),
      productId: device.getUint16(10),
      // serial: device.getBigUint64(12 + 4),
      serial: utils.decodeUTF16(
        Deno.UnsafePointerView.getArrayBuffer(device.getBigUint64(12 + 4), 256)
      ),
      release: device.getUint16(24),
      // manufacturer: device.getBigUint64(26 + 6),
      manufacturer: utils.decodeUTF16(
        Deno.UnsafePointerView.getArrayBuffer(device.getBigUint64(26 + 6), 256)
      ),
      // product: device.getBigUint64(34 + 6),
      product: utils.decodeUTF16(
        Deno.UnsafePointerView.getArrayBuffer(device.getBigUint64(34 + 6), 256)
      ),
      usagePage: device.getUint16(48),
      usage: device.getUint16(50),
      interface: device.getUint32(52)
    };
    devices.push(hidInfo);
    const next = device.getBigUint64(56);
    device = next ? new Deno.UnsafePointerView(next) : null;
  }
  api.hid_free_enumeration(enumerate);
  return devices;
};

export const open = (
  vendorId: number,
  productId: number,
  serialNumber: Uint8Array | null = null
): bigint => {
  return BigInt(api.hid_open(vendorId, productId, serialNumber));
};

export const close = (device: bigint): void => {
  api.hid_close(device);
};

export const read = async (
  device: bigint,
  length: number
): Promise<Uint8Array> => {
  const data = new Uint8Array(length);
  const result = await api.hid_read(device, data, length);
  if (result < 0) {
    throw new Error('Failed to read from device');
  }
  return data;
};

export const readTimeout = (
  device: bigint,
  length: number,
  ms: number
): Uint8Array | null => {
  const data = new Uint8Array(length);
  const result = api.hid_read_timeout(device, data, length, ms);
  if (result < 0) {
    throw new Error('Failed to read from device');
  }
  return data;
};

export const write = (device: bigint, data: Uint8Array): void => {
  const result = api.hid_write(device, data, data.length);
  if (result < 0) {
    throw new Error('Failed to write to device');
  }
};

export const sendFeatureReport = (device: bigint, data: Uint8Array): void => {
  api.hid_send_feature_report(device, data, data.length);
};

export const getFeatureReport = (device: bigint, data: Uint8Array): void => {
  const result = api.hid_get_feature_report(device, data, data.length);
  if (result < 0) {
    throw new Error('Failed to get feature report from device');
  }
};
