import {
  all,
  takeLatest,
  call,
  CallEffect,
  PutEffect,
  put,
} from "redux-saga/effects";
import Router from "next/router";
import axios, { Axios, AxiosResponse } from "axios";
import { toast } from "react-toastify";

import {
  Creators,
  GetAuthenticatedUserFailureAction,
  GetAuthenticatedUserRequestAction,
  GetAuthenticatedUserSuccessAction,
  LoginFailureAction,
  LoginRequestAction,
  LoginSuccessAction,
  LogoutFailureAction,
  LogoutSuccessAction,
  RegisterFailureAction,
  RegisterRequestAction,
  RegisterSuccessAction,
  Types,
} from "../actions/authAction";

import * as apis from "../../apis";

// models
import { User } from "../../models/UserModel";

// libs
import { Context } from "../../libs/Context";

function* loginRequest(
  action: LoginRequestAction
): Generator<
  | CallEffect<AxiosResponse<User>>
  | PutEffect<LoginSuccessAction>
  | PutEffect<LoginFailureAction>,
  void,
  unknown
> {
  try {
    const response = (yield call(
      apis.loginRequest,
      action.payload
    )) as AxiosResponse<User>;

    yield put(Creators.loginSuccess(response.data));
    toast.success("Login success!");
    Router.push("/");
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      yield put(Creators.loginFailure(error?.response?.data?.message));
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    yield put(Creators.loginFailure(error.message));
  }
}

function* getAuthenticatedUserRequest(): Generator<
  | CallEffect<AxiosResponse<User>>
  | CallEffect<void>
  | PutEffect<GetAuthenticatedUserSuccessAction>
  | PutEffect<GetAuthenticatedUserFailureAction>
  | PutEffect<GetAuthenticatedUserRequestAction>,
  void,
  unknown
> {
  try {
    const response = (yield call(
      apis.getAuthenticatedUserRequest
    )) as AxiosResponse<User>;
    yield put(Creators.getAuthenticatedUserSuccess(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        try {
          yield call(refreshToken);
          yield put(Creators.getAuthenticatedUserRequest());
        } catch (error) {
          yield put(Creators.getAuthenticatedUserFailure());
          return;
        }
      }
    }

    yield put(Creators.getAuthenticatedUserFailure());
  }
}

function* registerRequest(
  action: RegisterRequestAction
): Generator<
  | CallEffect<AxiosResponse<User>>
  | PutEffect<RegisterSuccessAction>
  | PutEffect<RegisterFailureAction>,
  void,
  unknown
> {
  try {
    yield call(apis.registerRequest, action.payload);
    yield put(Creators.registerSuccess());
    toast.success("Register success", {
      position: "top-right",
      autoClose: 5000,
    });
    Router.push("/login");
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      yield put(
        Creators.registerFailure({
          message: error?.response?.data?.message,
          errors: error?.response?.data?.errors,
        })
      );
      return;
    }

    yield put(Creators.registerFailure({ message: error.message, errors: {} }));
  }
}

function* logoutRequest(): Generator<
  | CallEffect<AxiosResponse<void>>
  | PutEffect<LogoutSuccessAction>
  | PutEffect<LogoutFailureAction>,
  void,
  unknown
> {
  const context = Context.getContext();
  try {
    const response = (yield call(apis.logoutRequest)) as AxiosResponse<void>;
    toast.success("Logged out!");
    yield put(Creators.logoutSuccess());
    if (!context) return;
    if (response.headers["set-cookie"]) {
      context.res.setHeader("Set-Cookie", response.headers["set-cookie"]);
    }
  } catch (error) {
    toast.error("Failed to logout!");
    yield put(Creators.logoutFailure());
  }
}

function* refreshToken(): Generator<
  CallEffect<AxiosResponse<User>>,
  void,
  unknown
> {
  const context = Context.getContext();
  try {
    const response = (yield call(
      apis.refreshTokenRequest
    )) as AxiosResponse<User>;
    if (!context) return;
    if (response.headers["set-cookie"]) {
      context.res.setHeader("Set-Cookie", response.headers["set-cookie"]);
    }
  } catch (error) {
    if (!context) return;
    context.res.writeHead(301, { Location: "/login" });
    context.res.end();
    throw error;
  }
}

function* authSaga() {
  yield all([
    takeLatest(Types.LOGIN_REQUEST, loginRequest),
    takeLatest(
      Types.GET_AUTHENTICATED_USER_REQUEST,
      getAuthenticatedUserRequest
    ),
    takeLatest(Types.REGISTER_REQUEST, registerRequest),
    takeLatest(Types.LOGOUT_REQUEST, logoutRequest),
  ]);
}

export default authSaga;
