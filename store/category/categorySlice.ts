import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "models/Category";

export interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    clearCategories: (state) => {
      state.categories = [];
    },
  },
});

export const { addCategories, clearCategories } = categorySlice.actions;
