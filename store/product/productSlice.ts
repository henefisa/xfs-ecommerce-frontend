import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "../../models/Product";

export interface ProductState {
  isLoading: boolean;
  isError: boolean;
  products: ProductModel[];
  productDetail: ProductModel | null;
  message: string;
}

const initialState: ProductState = {
  isLoading: false,
  isError: false,
  productDetail: null,
  products: [],
  message: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsRequest(state) {
      state.isLoading = true;
      state.isError = false;
    },
    getProductsSuccess(state, action: PayloadAction<ProductModel[]>) {
      state.products = action.payload;
      state.isLoading = false;
    },
    getProductsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = true;
      state.products = [];
      state.message = action.payload;
    },

    getProductDetailRequest(state, action: PayloadAction<string>) {
      state.isLoading = true;
      state.isError = false;
    },
    getProductDetailSuccess(state, action: PayloadAction<ProductModel>) {
      state.productDetail = action.payload;
      state.isLoading = false;
    },
    getProductDetailFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = true;
      state.productDetail = null;
      state.message = action.payload;
    },
  },
});

export const productsActions = productSlice.actions;

const productsReducer = productSlice.reducer;

export default productsReducer;
