import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "models/Order";

interface OrderState {
  order: Order | null;
}

const initialState: OrderState = {
  order: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
    clearOrder: (state) => {
      state.order = null;
    },
  },
});

export default orderSlice;
export const { addOrder, clearOrder } = orderSlice.actions;
