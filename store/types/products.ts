import { NewLikeReview, NewReviewProduct, ProductModel } from "../../models/Product";
export interface ActionTypeGetProductsSuccess {
  type: string;
  payload: ProductModel[];
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

export interface ActionTypeDeleteProductRequest {
  type: string;
  payload: string;
}

export interface ActionTypeDeleteProductFailure {
  type: string;
  payload: string;
}

export interface ActionTypeDeleteProductSuccess {
  type: string;
  payload: string;
}

export interface ActionTypeCreateProductRequest {
  type: string;
  payload: any;
}

export interface ActionTypeCreateProductFailure {
  type: string;
  payload: string;
}

export interface ActionTypeCreateProductSuccess {
  type: string;
  payload: ProductModel;
}

export interface ActionTypeUpdateProductRequest {
  type: string;
  payload: {
    id: string;
    body: CreateProductRequest
  };
}

export interface ActionTypeUpdateProductFailure {
  type: string;
  payload: string;
}

export interface ActionTypeUpdateProductSuccess {
  type: string;
  payload: ProductModel;
}

export interface ActionTypeReviewProductRequest {
  type: string;
  payload: {
    id: string;
    body: ReviewProduct
  };
}

export interface ActionTypeReviewProductFailure {
  type: string;
  payload: string;
}

export interface ActionTypeReviewProductSuccess {
  type: string;
  payload: NewReviewProduct;
}


export interface ActionTypeLikeReviewProductRequest {
  type: string;
  payload: {
    id: string;
    productId: string;
  };
}

export interface ActionTypeLikeReviewProductFailure {
  type: string;
  payload: string;
}

export interface ActionTypeLikeReviewProductSuccess {
  type: string;
  payload: NewLikeReview;
}



export interface CreateProductRequest {
  name: string;
  stock: number;
  price: number;
  description: string;
  details: object;
  images: File[];
  categories?: any[];
}

export interface ReviewProduct {
  content: string;
  rating: number;
  images: File[];
}
