export const decodeUTF8 = (buffer: ArrayBuffer): string => {
  const view = new DataView(buffer);
  let i = 0;
  while (i < view.byteLength && view.getUint8(i) !== 0) i++;
  return new TextDecoder('utf-8').decode(buffer.slice(0, i));
};

export const decodeUTF16 = (buffer: ArrayBuffer): string => {
  const view = new DataView(buffer);
  const decoder = new TextDecoder('utf-16');
  let str = '';
  for (let i = 0; i < buffer.byteLength; i += 4) {
    if (view.getUint16(i) === 0) break;
    str += decoder.decode(buffer.slice(i, i + 2));
  }
  return str;
};
