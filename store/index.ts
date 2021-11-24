import { Context, createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore, Store } from "redux";
import logger from "redux-logger";
import createSagaMiddleware, { Task } from "redux-saga";
import reducer, { RootState } from "./reducers";
import saga from "./sagas";

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const makeStore = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, applyMiddleware(logger, sagaMiddleware));
  (store as SagaStore).sagaTask = sagaMiddleware.run(saga);
  return store;
};

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});
