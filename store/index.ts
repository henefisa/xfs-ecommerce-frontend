import { Persistor, persistReducer, persistStore } from "redux-persist";
import {
  AnyAction,
  combineReducers,
  configureStore,
  Store,
} from "@reduxjs/toolkit";
import { Context, createWrapper, HYDRATE } from "next-redux-wrapper";
import createSagaMiddleware, { Task } from "redux-saga";
import authReducer from "./auth/authSlice";
import saga from "./sagas";
import productsReducer from "./product/productSlice";
import cartsReducer from "./cart/cartSlice";

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const combinedReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  carts: cartsReducer,
});

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };

      if (state?.auth.token) nextState.auth.token = state?.auth.token;
      if (state?.auth.user) nextState.auth.user = state.auth.user;

      return nextState;
    default: {
      return combinedReducer(state, action);
    }
  }
};

const makeStore = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
  });
  (store as SagaStore).sagaTask = sagaMiddleware.run(saga);
  return store;
};

export type RootState = ReturnType<typeof combinedReducer>;

export type AppDispatch = Store["dispatch"];

export const wrapper = createWrapper<Store<RootState>>(makeStore, {});
