import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";
import { Cart } from "../../models/Cart";

export interface CartState {
  carts: Cart[];
}

const initialState: CartState = {
  carts: [],
};

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addProductToCart(state, action: PayloadAction<Cart>) {
      const findItem = state.carts.find((e) => e.id === action.payload.id);
      if (findItem) {
        findItem.quantity = findItem.quantity + action.payload.quantity;
        state.carts = uniqBy([...state.carts, findItem], "id");
        return;
      }
      state.carts = [...state.carts, action.payload];
    },
    removeAllProductToCart(state) {
      state.carts = [];
    },
    removeProductToCartById(state, action: PayloadAction<string>) {
      const removedItem = state.carts.filter((e) => e.id !== action.payload);
      state.carts = removedItem;
    },
    updateQuantityItem(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const findItem = state.carts.find((e) => e.id === action.payload.id);
      if (findItem) {
        findItem.quantity = action.payload.quantity;
        state.carts = uniqBy([...state.carts, findItem], "id");
      }
    },
  },
});

export const cartActions = cartSlice.actions;

const cartsReducer = cartSlice.reducer;

export default cartsReducer;
