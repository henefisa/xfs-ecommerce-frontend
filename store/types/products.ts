import { ProductModel } from './../../models/ProductModel';
export interface ActionTypeGetProductsSuccess {
  type: string;
  payload: ProductModel[]
}

export interface ActionTypeGetProductsRequest {
  type: string;
}

export interface ActionTypeGetProductsFailure {
  type: string;
  payload: string;
}

export interface ActionTypeGetProductDetailRequest {
     type: string;
     payload: string;
}

export interface ActionTypeGetProductDetailSuccess {
     type: string;
     payload: ProductModel;
}

export interface ActionTypeGetProductDetailFailure {
  type: string;
  payload: string;
}