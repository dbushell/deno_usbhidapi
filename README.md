# 🦕 Deno USB HID API

Deno [FFI](https://deno.land/manual/runtime/ffi_api) bindings for the [HIDAPI](https://github.com/libusb/hidapi/) library to access USB devices.

This _work in progress_ uses **unstable** Deno APIs and requries the `--unstable`, `--allow-ffi`, and `--allow-env` flags.

The module exports `hidapi` library symbols and `HID` wrapper class.

## Usage

Install or build the [HIDAPI](https://github.com/libusb/hidapi/) library (e.g. `brew install hidapi`). Tested with `hidapi-0.12.0`.

Set the `DENO_USBHIDAPI` environment variable to the dynamic library path.

Homebrew on MacOS installs at:

```
/opt/homebrew/opt/hidapi/lib/libhidapi.dylib
```

Building from source on a Raspberry Pi installs at:

```
/usr/local/lib/libhidapi-hidraw.so
```

On Windows see [HIDAPI Releases](https://github.com/libusb/hidapi/releases/) (I've not tested Windows).

## Testing

There is a basic Deno test to check the HIDAPI library defined by the `DENO_USBHIDAPI` environment variable.

```sh
deno test --unstable --allow-all src/test.ts
```

## Resources

* [libusb/hidapi](https://github.com/libusb/hidapi/) — HIDAPI library for Windows, Linux, FreeBSD and macOS.
* [Foreign Function Interface API](https://deno.land/manual/runtime/ffi_api) — Deno documentation (unstable).
* [WebHID API](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API) — MDN documentation for the native browser spec.
* ["Add support for HID API"](https://github.com/denoland/deno/issues/13893) — Deno issue discussion.
* [littledivy/webusb](https://github.com/littledivy/webusb) — WebUSB API implementation in Rust (and Deno).
* [node-hid](https://github.com/node-hid/node-hid/) — Node.js bindings.
* [Deno StreamDeck](https://github.com/dbushell/deno_streamdeck) — built with this library.

## License

MIT License

* * *

[MIT License](/LICENSE) | Copyright © 2022 [David Bushell](https://dbushell.com) | [@dbushell](https://twitter.com/dbushell)
