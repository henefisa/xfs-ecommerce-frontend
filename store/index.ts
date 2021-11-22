import { Context, createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore, Store } from "redux";
import logger from "redux-logger";
import reducer, { RootState } from "./reducers";

const makeStore = (context: Context) =>
  createStore(reducer, applyMiddleware(logger));

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});
