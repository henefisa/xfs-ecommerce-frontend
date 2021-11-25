import { AnyAction } from "redux";
import { createActions } from "reduxsauce";

// models
import { LoginPayload, RegisterPayload } from "../../models/AuthModel";

import { User } from "../../models/UserModel";

export interface AuthTypes {
  REGISTER_REQUEST: "REGISTER_REQUEST";
  REGISTER_SUCCESS: "REGISTER_SUCCESS";
  REGISTER_FAILURE: "REGISTER_FAILURE";
  LOGIN_REQUEST: "LOGIN_REQUEST";
  LOGIN_SUCCESS: "LOGIN_SUCCESS";
  LOGIN_FAILURE: "LOGIN_FAILURE";
  GET_AUTHENTICATED_USER_REQUEST: "GET_AUTHENTICATED_USER_REQUEST";
  GET_AUTHENTICATED_USER_SUCCESS: "GET_AUTHENTICATED_USER_SUCCESS";
  GET_AUTHENTICATED_USER_FAILURE: "GET_AUTHENTICATED_USER_FAILURE";
  REFRESH_TOKEN_REQUEST: "REFRESH_TOKEN_REQUEST";
  REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS";
  REFRESH_TOKEN_FAILURE: "REFRESH_TOKEN_FAILURE";
}

export interface RegisterRequestAction extends AnyAction {
  type: AuthTypes["REGISTER_REQUEST"];
  payload: RegisterPayload;
}

export interface RegisterSuccessAction extends AnyAction {
  type: AuthTypes["REGISTER_SUCCESS"];
}

export interface RegisterFailureAction extends AnyAction {
  type: AuthTypes["REGISTER_FAILURE"];
  payload: {
    message: string;
    errors: Record<string, string>;
  };
}

export interface LoginRequestAction extends AnyAction {
  type: AuthTypes["LOGIN_REQUEST"];
  payload: LoginPayload;
}

export interface LoginSuccessAction extends AnyAction {
  type: AuthTypes["LOGIN_SUCCESS"];
  payload: User;
}

export interface LoginFailureAction extends AnyAction {
  type: AuthTypes["LOGIN_FAILURE"];
  payload: string;
}

export interface GetAuthenticatedUserRequest extends AnyAction {
  type: AuthTypes["GET_AUTHENTICATED_USER_REQUEST"];
}

export interface GetAuthenticatedUserSuccess extends AnyAction {
  type: AuthTypes["GET_AUTHENTICATED_USER_SUCCESS"];
  payload: User;
}

export interface GetAuthenticatedUserFailure extends AnyAction {
  type: AuthTypes["GET_AUTHENTICATED_USER_FAILURE"];
}

interface AuthActions {
  registerRequest(payload: RegisterPayload): RegisterRequestAction;
  registerSuccess(): RegisterSuccessAction;
  registerFailure(payload: {
    message: string;
    errors: Record<string, string>;
  }): RegisterFailureAction;
  loginRequest(payload: LoginPayload): LoginRequestAction;
  loginSuccess(payload: User): LoginSuccessAction;
  loginFailure(payload: string): LoginFailureAction;
  getAuthenticatedUserRequest(): GetAuthenticatedUserRequest;
  getAuthenticatedUserSuccess(payload: User): GetAuthenticatedUserSuccess;
  getAuthenticatedUserFailure(): GetAuthenticatedUserFailure;
}

export const { Creators, Types } = createActions<AuthTypes, AuthActions>({
  registerRequest: ["payload"],
  registerSuccess: [],
  registerFailure: ["payload"],
  loginRequest: ["payload"],
  loginSuccess: ["payload"],
  loginFailure: ["payload"],
  getAuthenticatedUserRequest: [],
  getAuthenticatedUserSuccess: ["payload"],
  getAuthenticatedUserFailure: [],
});
