import {SYMBOLS} from './symbols.ts';

const path = Deno.env.get('DENO_USBHIDAPI') ?? '';

try {
  const stat = await Deno.lstat(path);
  if (!stat.isFile && !stat.isSymlink) {
    throw new Error();
  }
} catch {
  throw new Error(`Could not find library path DENO_USBHIDAPI: "${path}"`);
}

export const hidapi: Deno.DynamicLibrary<typeof SYMBOLS> = Deno.dlopen(
  path,
  SYMBOLS
);
