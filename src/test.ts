import {
  assertEquals,
  assertRejects
} from 'https://deno.land/std@0.178.0/testing/asserts.ts';
import {hidapi} from './hidapi.ts';
import * as hid from './hid.ts';
import * as utils from './utils.ts';

Deno.test('HIDAPI missing', () => {
  assertRejects(
    () =>
      new Promise((resolve, reject) => {
        Deno.env.set('DENO_USBHIDAPI', './missing');
        import('./hidapi.ts?nocache').then(resolve).catch(reject);
      })
  );
});

Deno.test('HIDAPI version number', () => {
  const buffer = Deno.UnsafePointerView.getArrayBuffer(
    hidapi.symbols.hid_version()!,
    24
  );
  const view = new DataView(buffer);
  assertEquals(view.getUint8(4), 14);
});

Deno.test('HIDAPI version string ("0.14.x")', () => {
  const buffer = Deno.UnsafePointerView.getArrayBuffer(
    hidapi.symbols.hid_version_str()!,
    32
  );
  assertEquals(utils.decodeUTF8(buffer).startsWith('0.14.'), true);
});

Deno.test('HID enumerate devices', () => {
  const devices = hid.enumerate();
  console.log(`Found ${devices.length} HID devices`);
  assertEquals(devices.length > 0, true);
});
