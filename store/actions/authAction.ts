import { AnyAction } from "redux";
import { createActions } from "reduxsauce";

export interface AuthTypes {
  REGISTER_REQUEST: "REGISTER_REQUEST";
  REGISTER_SUCCESS: "REGISTER_SUCCESS";
  REGISTER_FAILURE: "REGISTER_FAILURE";
}

export interface RegisterRequestAction extends AnyAction {
  type: AuthTypes["REGISTER_REQUEST"];
  payload: Record<string, unknown>;
}

export interface RegisterSuccessAction extends AnyAction {
  type: AuthTypes["REGISTER_SUCCESS"];
  payload: {
    data: Record<string, unknown>;
  };
}

export interface RegisterFailureAction extends AnyAction {
  type: AuthTypes["REGISTER_FAILURE"];
  payload: Record<string, unknown>;
}

interface AuthActions {
  registerRequest(): RegisterRequestAction;
  registerSuccess(): RegisterSuccessAction;
  registerFailure(): RegisterFailureAction;
}

export const { Creators, Types } = createActions<AuthTypes, AuthActions>({
  registerRequest: [],
  registerSuccess: [],
  registerFailure: [],
});
