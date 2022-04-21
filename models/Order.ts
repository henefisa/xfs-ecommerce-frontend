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

export enum EOrderStatus {
  RECEIVED = "received",
  WAIT_FOR_PAYMENT = "wait for payment",
  PROCESSING = "processing",
  SHIPPING = "shipping",
  DELIVERED = "delivered",
  CANCELED = "canceled",
  COMFIRMED = "comfirmed",
}
