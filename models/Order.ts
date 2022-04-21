import { ProductModel } from "./Product";

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

export interface Order {
  id: string;
  createdAt: string;
  updatedAt: string;
  address: string;
  province: string;
  district: string;
  village: string;
  phoneNumber: string;
  paymentType: string;
  products: ProductModel[];
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
