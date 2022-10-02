export interface HIDInfo {
  path: string;
  vendorId: number;
  productId: number;
  serial: string;
  release: number;
  manufacturer: string;
  product: string;
  usagePage: number;
  usage: number;
  interface: number;
}
