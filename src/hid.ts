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
  const enumValue = api.hid_enumerate(vendorId, productId);
  const enumerate = BigInt(Deno.UnsafePointer.value(enumValue));
  if (!enumerate) {
    api.hid_free_enumeration(enumValue);
    return devices;
  }
  let device: null | Deno.UnsafePointerView = new Deno.UnsafePointerView(
    enumValue!
  );
  while (device) {
    const hidInfo: HIDInfo = {
      path: utils.decodeUTF8(
        Deno.UnsafePointerView.getArrayBuffer(
          Deno.UnsafePointer.create(device.getBigUint64(0))!,
          256
        )
      ),
      vendorId: device.getUint16(8),
      productId: device.getUint16(10),
      serial: utils.decodeUTF16(
        Deno.UnsafePointerView.getArrayBuffer(
          Deno.UnsafePointer.create(device.getBigUint64(12 + 4))!,
          256
        )
      ),
      release: device.getUint16(24),
      manufacturer: utils.decodeUTF16(
        Deno.UnsafePointerView.getArrayBuffer(
          Deno.UnsafePointer.create(device.getBigUint64(26 + 6))!,
          256
        )
      ),
      product: utils.decodeUTF16(
        Deno.UnsafePointerView.getArrayBuffer(
          Deno.UnsafePointer.create(device.getBigUint64(34 + 6))!,
          256
        )
      ),
      usagePage: device.getUint16(48),
      usage: device.getUint16(50),
      interface: device.getUint32(52)
    };
    devices.push(hidInfo);
    const next = Deno.UnsafePointer.create(device.getBigUint64(56));
    device = next ? new Deno.UnsafePointerView(next) : null;
  }
  api.hid_free_enumeration(enumValue);
  return devices;
};

export const open = (
  vendorId: number,
  productId: number,
  serialNumber: Uint8Array | null = null
): bigint => {
  const value = api.hid_open(vendorId, productId, serialNumber);
  return BigInt(Deno.UnsafePointer.value(value));
};

export const close = (device: bigint): void => {
  api.hid_close(Deno.UnsafePointer.create(device));
};

export const read = async (
  device: bigint,
  length: number
): Promise<Uint8Array> => {
  const data = new Uint8Array(length);
  const result = await api.hid_read(
    Deno.UnsafePointer.create(device),
    data,
    length
  );
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
  const result = api.hid_read_timeout(
    Deno.UnsafePointer.create(device),
    data,
    length,
    ms
  );
  if (result < 0) {
    throw new Error('Failed to read from device');
  }
  return data;
};

export const write = (device: bigint, data: Uint8Array): number => {
  const result = api.hid_write(
    Deno.UnsafePointer.create(device),
    data,
    data.length
  );
  if (result < 0) {
    throw new Error('Failed to write to device');
  }
  return result;
};

export const sendFeatureReport = (device: bigint, data: Uint8Array): number => {
  const result = api.hid_send_feature_report(
    Deno.UnsafePointer.create(device),
    data,
    data.length
  );
  return result;
};

export const getFeatureReport = (device: bigint, data: Uint8Array): number => {
  const result = api.hid_get_feature_report(
    Deno.UnsafePointer.create(device),
    data,
    data.length
  );
  if (result < 0) {
    throw new Error('Failed to get feature report from device');
  }
  return result;
};

export const getReportDescriptor = (
  device: bigint,
  data: Uint8Array
): number => {
  const result = api.hid_get_report_descriptor(
    Deno.UnsafePointer.create(device),
    data,
    data.length
  );
  if (result < 0) {
    throw new Error('Failed to get report descriptor from device');
  }
  return result;
};
