import {
  ActionTypeGetProductDetailRequest,
  ActionTypeGetProductDetailSuccess,
  ActionTypeGetProductsFailure,
  ActionTypeGetProductsRequest,
  ActionTypeGetProductsSuccess,
  ActionTypeGetProductDetailFailure,
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

function* productsSaga() {
  yield all([
    takeLatest(productsActions.getProductsRequest.type, productRequest),
    takeLatest(
      productsActions.getProductDetailRequest.type,
      getProductDetailRequest
    ),
  ]);
}

export default productsSaga;
