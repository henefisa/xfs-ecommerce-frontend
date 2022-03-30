import { authActions } from "./../auth/authSlice";

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

import * as apis from "../../apis";

// models
import { User } from "../../models/UserModel";

// libs
import { Context } from "../../libs/Context";
import {
  ActionTypeLoginRequest,
  LoginFailureType,
  LoginSuccessType,
  LogoutFailureType,
  LogoutSuccessType,
  ActionTypeRegisterRequest,
  GetUserProfileSuccessType,
  RegisterFailureType,
  RegisterSuccessType,
} from "../types/auth";

function* loginRequest(
  action: ActionTypeLoginRequest
): Generator<
  | CallEffect<AxiosResponse<User>>
  | PutEffect<LoginSuccessType>
  | PutEffect<LoginFailureType>,
  void,
  unknown
> {
  try {
    const response = (yield call(
      apis.loginRequest,
      action.payload
    )) as AxiosResponse<User>;

    yield put(authActions.loginSuccess(response.data));
    Router.push("/");
    setTimeout(() => {
      toast.success("Login success!");
    },1000)
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      yield put(authActions.loginFailure(error?.response?.data?.message));
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    yield put(authActions.loginFailure(error.message));
  }
}

// function* getAuthenticatedUserRequest(): Generator<
//   | CallEffect<AxiosResponse<User>>
//   | CallEffect<void>
//   | PutEffect<GetAuthenticatedUserSuccessAction>
//   | PutEffect<GetAuthenticatedUserFailureAction>
//   | PutEffect<GetAuthenticatedUserRequestAction>,
//   void,
//   unknown
// > {
//   try {
//     const response = (yield call(
//       apis.getAuthenticatedUserRequest
//     )) as AxiosResponse<User>;
//     yield put(Creators.getAuthenticatedUserSuccess(response.data));
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       if (error.response?.status === 401) {
//         try {
//           yield call(refreshToken);
//           yield put(Creators.getAuthenticatedUserRequest());
//         } catch (error) {
//           yield put(Creators.getAuthenticatedUserFailure());
//           return;
//         }
//       }
//     }

//     yield put(Creators.getAuthenticatedUserFailure());
//   }
// }

function* registerRequest(
  action: ActionTypeRegisterRequest
): Generator<
  | CallEffect<AxiosResponse<User>>
  | PutEffect<RegisterSuccessType>
  | PutEffect<RegisterFailureType>,
  void,
  unknown
> {
  try {
    yield call(apis.registerRequest, action.payload);
    yield put(authActions.registerSuccess());
    toast.success("Register success", {
      position: "top-right",
      autoClose: 5000,
    });
    Router.push("/login");
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      yield put(
        authActions.registerFailure({
          message: error?.response?.data?.message,
          errors: error?.response?.data?.errors,
        })
      );
      return;
    }

    yield put(
      authActions.registerFailure({ message: error.message, errors: {} })
    );
  }
}

function* logoutRequest(): Generator<
  | CallEffect<AxiosResponse<void>>
  | PutEffect<LogoutSuccessType>
  | PutEffect<LogoutFailureType>,
  void,
  unknown
> {
  const context = Context.getContext();
  try {
    const response = (yield call(apis.logoutRequest)) as AxiosResponse<void>;
    yield put(authActions.logoutSuccess());
    toast.success("Logged out!");
    Router.push("/login");
    console.log('runnn')
    if (!context) return;
    if (response.headers["set-cookie"]) {
      context.res.setHeader("Set-Cookie", response.headers["set-cookie"]);
    }
  } catch (error) {
    toast.error("Failed to logout!");
    yield put(authActions.logoutFailure());
  }
}

function* getUserInfoRequest(): Generator<
  | CallEffect<AxiosResponse<void>>
  | PutEffect<GetUserProfileSuccessType>
  | PutEffect<LogoutFailureType>,
  void,
  unknown
> {
  try {
    const response = (yield call(apis.getUserInfo)) as AxiosResponse<User>;
    yield put(authActions.getUserInfoSuccess(response.data));
  } catch (error) {
    yield put(authActions.getAuthenticatedUserFailure());
    toast.error("Unauthorized");
  }
}

// function* refreshToken(): Generator<
//   CallEffect<AxiosResponse<User>>,
//   void,
//   unknown
// > {
//   const context = Context.getContext();
//   try {
//     const response = (yield call(
//       apis.refreshTokenRequest
//     )) as AxiosResponse<User>;
//     if (!context) return;
//     if (response.headers["set-cookie"]) {
//       context.res.setHeader("Set-Cookie", response.headers["set-cookie"]);
//     }
//   } catch (error) {
//     if (!context) return;
//     context.res.writeHead(301, { Location: "/login" });
//     context.res.end();
//     throw error;
//   }
// }

function* authSaga() {
  yield all([
    takeLatest(authActions.loginRequest.type, loginRequest),
    // takeLatest(
    //   Types.GET_AUTHENTICATED_USER_REQUEST,
    //   getAuthenticatedUserRequest
    // ),
    // takeLatest(Types.REGISTER_REQUEST, registerRequest),
    takeLatest(authActions.logoutRequest.type, logoutRequest),
    takeLatest(authActions.getUserInfoRequest.type, getUserInfoRequest),
    takeLatest(authActions.registerRequest.type, registerRequest),
  ]);
}

export default authSaga;
