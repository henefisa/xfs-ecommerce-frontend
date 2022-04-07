import { CreateProductRequest } from 'store/types/products';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
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

     createProductRequest(state, action: PayloadAction<any>) {
      state.isLoading = true;
    },

    createProductSuccess(state, action: PayloadAction<ProductModel>) {
      const newProduct = cloneDeep(state.products);
      newProduct.push(action.payload);
      state.isLoading = false;
      state.products = newProduct
    },

    createProductFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

     updateProductRequest(state, action: PayloadAction<{
       id: string,
       body: CreateProductRequest
     }>) {
      state.isLoading = true;
    },

    updateProductSuccess(state, action: PayloadAction<ProductModel>) {
      const newProduct = cloneDeep(state.products);
      const findIndex = newProduct.findIndex((e) => e.id === action.payload.id);
      if(findIndex > - 1) {
        newProduct[findIndex] = action.payload
      }
      state.isLoading = false;
      state.products = newProduct;
    },

    updateProducFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

    deleteProductRequest(state, action: PayloadAction<string>) {
      state.isLoading = true;
    },
      deleteProductSuccess(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.products = state.products.filter((e) => e.id !== action.payload)
    },
      deleteProductError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    }
  },
});

export const productsActions = productSlice.actions;

const productsReducer = productSlice.reducer;

export default productsReducer;
