import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";

import authReducer from "./authReducer";

const combinedReducer = combineReducers({
  auth: authReducer,
});

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    default: {
      return combinedReducer(state, action);
    }
  }
};

export type RootState = ReturnType<typeof combinedReducer>;
export default rootReducer;
