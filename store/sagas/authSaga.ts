import {
  all,
  takeLatest,
  call,
  CallEffect,
  PutEffect,
  put,
} from "redux-saga/effects";
import Router from "next/router";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import {
  Creators,
  GetAuthenticatedUserFailure,
  GetAuthenticatedUserRequest,
  GetAuthenticatedUserSuccess,
  LoginFailureAction,
  LoginRequestAction,
  LoginSuccessAction,
  Types,
} from "../actions/authAction";

import * as apis from "../../apis";
import { User } from "../../models/UserModel";
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(Creators.loginFailure(error?.response?.data?.message));
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
}

function* getAuthenticatedUserRequest(): Generator<
  | CallEffect<AxiosResponse<User>>
  | CallEffect<void>
  | PutEffect<GetAuthenticatedUserSuccess>
  | PutEffect<GetAuthenticatedUserFailure>
  | PutEffect<GetAuthenticatedUserRequest>,
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

function* refreshToken(): Generator<
  CallEffect<AxiosResponse<User>>,
  void,
  unknown
> {
  const context = Context.getContext();
  if (!context) return;
  try {
    const response = (yield call(
      apis.refreshTokenRequest
    )) as AxiosResponse<User>;

    if (response.headers["set-cookie"]) {
      context.res.setHeader("Set-Cookie", response.headers["set-cookie"]);
    }
  } catch (error) {
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
  ]);
}

export default authSaga;
