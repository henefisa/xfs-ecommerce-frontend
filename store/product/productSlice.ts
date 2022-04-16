import { CreateProductRequest, ReviewProduct } from "store/types/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import {
  NewLikeReview,
  NewReviewProduct,
  ProductModel,
} from "../../models/Product";

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
      state.products = newProduct;
    },

    createProductFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

    updateProductRequest(
      state,
      action: PayloadAction<{
        id: string;
        body: CreateProductRequest;
      }>
    ) {
      state.isLoading = true;
    },

    updateProductSuccess(state, action: PayloadAction<ProductModel>) {
      const newProduct = cloneDeep(state.products);
      const findIndex = newProduct.findIndex((e) => e.id === action.payload.id);
      if (findIndex > -1) {
        newProduct[findIndex] = action.payload;
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
      state.products = state.products.filter((e) => e.id !== action.payload);
    },
    deleteProductError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    createReviewProductRequest(
      state,
      action: PayloadAction<{
        id: string;
        body: ReviewProduct;
      }>
    ) {
      state.isLoading = true;
    },
    createReviewProductSuccess(state, action: PayloadAction<NewReviewProduct>) {
      const newProductDetail = cloneDeep(state.productDetail);

      if (newProductDetail) {
        const newReview = cloneDeep(newProductDetail.reviews);
        if (newReview) {
          newReview.push({
            content: action.payload.content,
            createdAt: action.payload.createdAt,
            updatedAt: action.payload.updatedAt,
            id: action.payload.id,
            count: action.payload.count,
            rating: Number(action.payload.rating),
            images: action.payload.images,
            user: action.payload.user,
          });
        }

        newProductDetail.reviews = newReview;
      }
      state.productDetail = newProductDetail;
      state.isLoading = false;
    },

    createReviewProductFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    likeReviewRequest(
      state,
      action: PayloadAction<{
        id: string;
        productId: string;
      }>
    ) {
      state.isLoading = true;
    },

    likeReviewSuccess(state, action: PayloadAction<NewLikeReview>) {
      const newProductDetail = cloneDeep(state.productDetail);

      if (newProductDetail) {
        const newReview = cloneDeep(newProductDetail.reviews);
        if (newReview) {
          const findIndex = newReview.findIndex(
            (e) => e.id === action.payload.idLike
          );
          if (findIndex > -1) {
            newReview[findIndex].count = newReview[findIndex].count + 1;
          }
        }

        newProductDetail.reviews = newReview;
      }
      state.productDetail = newProductDetail;
      state.isLoading = false;
    },

    likeReviewFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const productsActions = productSlice.actions;

const productsReducer = productSlice.reducer;

export default productsReducer;
