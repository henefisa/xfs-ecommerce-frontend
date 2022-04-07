import {
  ActionTypeGetProductDetailRequest,
  ActionTypeGetProductDetailSuccess,
  ActionTypeGetProductsFailure,
  ActionTypeGetProductsSuccess,
  ActionTypeGetProductDetailFailure,
  ActionTypeDeleteProductRequest,
  ActionTypeDeleteProductFailure,
  ActionTypeDeleteProductSuccess,
  ActionTypeCreateProductSuccess,
  ActionTypeCreateProductFailure,
  ActionTypeCreateProductRequest,
  ActionTypeUpdateProductRequest,
  ActionTypeUpdateProductSuccess,
  ActionTypeUpdateProductFailure,
} from "./../types/products";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {
  all,
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import * as apis from "../../apis";
import { productsActions } from "../product/productSlice";
import { ProductModel } from "../../models/Product";

function* productRequest(): Generator<
  | CallEffect<AxiosResponse<ProductModel[]>>
  | PutEffect<ActionTypeGetProductsSuccess>
  | PutEffect<ActionTypeGetProductsFailure>,
  void,
  unknown
> {
  try {
    const response = (yield call(apis.getProducts)) as AxiosResponse<
      ProductModel[]
    >;
    yield put(productsActions.getProductsSuccess(response.data));
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      yield put(
        productsActions.getProductsFailure(error?.response?.data?.message)
      );
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
  }
}

function* getProductDetailRequest(
  action: ActionTypeGetProductDetailRequest
): Generator<
  | CallEffect<AxiosResponse<ProductModel>>
  | PutEffect<ActionTypeGetProductDetailSuccess>
  | PutEffect<ActionTypeGetProductDetailFailure>,
  void,
  unknown
> {
  try {
    const response = (yield call(
      apis.getProductDetail,
      action.payload
    )) as AxiosResponse<ProductModel>;
    yield put(productsActions.getProductDetailSuccess(response.data));
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      yield put(
        productsActions.getProductDetailFailure(error?.response?.data?.message)
      );
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
  }
}

function* deleteProductRequest(
  action: ActionTypeDeleteProductRequest
): Generator<
  | CallEffect<AxiosResponse<ProductModel>>
  | PutEffect<ActionTypeDeleteProductSuccess>
  | PutEffect<ActionTypeDeleteProductFailure>,
  void,
  unknown
> {
  try {
    yield call(
      apis.deleteProduct,
      action.payload
    )
    yield put(productsActions.deleteProductSuccess(action.payload));
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      yield put(
        productsActions.deleteProductSuccess(error?.response?.data?.message)
      );
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
  }
}

function* createProductRequest(
  action: ActionTypeCreateProductRequest
): Generator<
  | CallEffect<AxiosResponse<ProductModel>>
  | PutEffect<ActionTypeCreateProductSuccess>
  | PutEffect<ActionTypeCreateProductFailure>,
  void,
  unknown
> {
  try {
     const response = (yield call(
      apis.addNewProduct,
      action.payload
    )) as AxiosResponse<ProductModel>;
    yield put(productsActions.createProductSuccess(response.data));
          toast.success("Create product Success");
    
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      yield put(
        productsActions.createProductFailure(error?.response?.data?.message)
      );
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
  }
}


function* updateProductRequest(
  action: ActionTypeUpdateProductRequest
): Generator<
  | CallEffect<AxiosResponse<ProductModel>>
  | PutEffect<ActionTypeUpdateProductSuccess>
  | PutEffect<ActionTypeUpdateProductFailure>,
  void,
  unknown
> {
  try {
     const response = (yield call(
      apis.updateProduct,
      action.payload.id,
      action.payload.body
    )) as AxiosResponse<ProductModel>;
    yield put(productsActions.updateProductSuccess(response.data));
    toast.success("Update product Success");
    
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      yield put(
        productsActions.updateProducFailure(error?.response?.data?.message)
      );
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
  }
}

function* productsSaga() {
  yield all([
    takeLatest(productsActions.getProductsRequest.type, productRequest),
    takeLatest(
      productsActions.getProductDetailRequest.type,
      getProductDetailRequest
    ),
    takeLatest(
      productsActions.createProductRequest.type,
      createProductRequest
    ),
    takeLatest(
      productsActions.deleteProductRequest.type,
      deleteProductRequest
    ),
      takeLatest(
      productsActions.updateProductRequest.type,
      updateProductRequest
    ),
  ]);
}

export default productsSaga;
