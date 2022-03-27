import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, Store } from "redux";
import { persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware, { Task } from "redux-saga";
import authReducer from "./auth/authSlice";
import saga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const reducers = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
