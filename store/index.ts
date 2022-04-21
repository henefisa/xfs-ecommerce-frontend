import { Persistor, persistReducer, persistStore } from "redux-persist";
import {
  AnyAction,
  combineReducers,
  configureStore,
  Store,
} from "@reduxjs/toolkit";
import { Context, createWrapper, HYDRATE } from "next-redux-wrapper";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware, { Task } from "redux-saga";
import authReducer from "./auth/authSlice";
import saga from "./sagas";
import productsReducer from "./product/productSlice";
import cartsReducer from "./cart/cartSlice";
import { categorySlice } from "./category/categorySlice";
import { bannerSlice } from "./banner/bannerSlice";

export interface SagaStore extends Store {
  sagaTask?: Task;
}

export interface PeristStore extends Store {
  __persistor: Persistor;
}

const combinedReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  carts: cartsReducer,
  category: categorySlice.reducer,
  banner: bannerSlice.reducer,
});

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      const nextState = {
        ...state,
        ...action.payload,
      };

      if (state?.auth.token) nextState.auth.token = state.auth.token;
      if (state?.auth.user) nextState.auth.user = state.auth.user;
      if (state?.carts.carts) nextState.carts.carts.concat(state.carts.carts);

      return {
        ...state,
        ...action.payload,
      };
    default: {
      return combinedReducer(state, action);
    }
  }
};

const persistConfig = {
  key: "root",
  storage,
};

const makeStore = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
  });
  (store as SagaStore).sagaTask = sagaMiddleware.run(saga);
  (store as PeristStore).__persistor = persistStore(store);

  return store;
};

export type RootState = ReturnType<typeof combinedReducer>;

export type AppDispatch = Store["dispatch"];

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});
