export interface OrderRequest {
  address: string;
  province: string;
  district: string;
  village: string;
  phoneNumber: string;
  paymentType: string;
  products: {
    productId: string;
    quantity: number;
  }[];
}
