export const SYMBOLS = {
  // Initialize the HIDAPI library.
  hid_init: {parameters: [], result: 'void'},

  // Finalize the HIDAPI library.
  hid_exit: {parameters: [], result: 'void'},

  // Enumerate the HID Devices.
  hid_enumerate: {parameters: ['u16', 'u16'], result: 'pointer'},

  hid_free_enumeration: {parameters: ['pointer'], result: 'void'},

  // Open a HID device using a Vendor ID (VID), Product ID (PID) and optionally a serial number.
  hid_open: {parameters: ['u16', 'u16', 'buffer'], result: 'pointer'},

  // Open a HID device by its path name.
  hid_open_path: {parameters: ['buffer'], result: 'pointer'},

  // Write an Output report to a HID device.
  hid_write: {parameters: ['pointer', 'buffer', 'usize'], result: 'i32'},

  // Read an Input report from a HID device with timeout.
  hid_read_timeout: {
    parameters: ['pointer', 'buffer', 'usize', 'i32'],
    result: 'i32'
  },

  // Read an Input report from a HID device.
  hid_read: {
    parameters: ['pointer', 'buffer', 'usize'],
    result: 'i32',
    nonblocking: true
  },

  hid_set_nonblocking: {parameters: ['pointer', 'i32'], result: 'i32'},

  // Send a Feature report to the device.
  hid_send_feature_report: {
    parameters: ['pointer', 'buffer', 'usize'],
    result: 'i32'
  },

  // Get a feature report from a HID device.
  hid_get_feature_report: {
    parameters: ['pointer', 'buffer', 'usize'],
    result: 'i32'
  },

  hid_get_input_report: {
    parameters: ['pointer', 'buffer', 'usize'],
    result: 'i32'
  },

  // Close a HID device.
  hid_close: {parameters: ['pointer'], result: 'void'},

  // Get The Manufacturer String from a HID device.
  hid_get_manufacturer_string: {
    parameters: ['pointer', 'buffer', 'usize'],
    result: 'i32'
  },

  // Get The Product String from a HID device.
  hid_get_product_string: {
    parameters: ['pointer', 'buffer', 'usize'],
    result: 'i32'
  },

  // Get The Serial Number String from a HID device.
  hid_get_serial_number_string: {
    parameters: ['pointer', 'buffer', 'usize'],
    result: 'i32'
  },

  // hid_get_device_info: {parameters: ['pointer'], result: 'pointer'},
  hid_get_indexed_string: {
    parameters: ['pointer', 'i32', 'buffer', 'usize'],
    result: 'i32'
  },

  hid_error: {parameters: ['pointer'], result: 'buffer'},

  // Get a runtime version of the library.
  hid_version: {parameters: [], result: 'pointer'},

  // Get a runtime version string of the library.
  hid_version_str: {parameters: [], result: 'buffer'}
} as const;
