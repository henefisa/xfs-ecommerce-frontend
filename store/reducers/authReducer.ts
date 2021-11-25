import { Reducer } from "redux";
import { createReducer } from "reduxsauce";
import { User } from "../../models/UserModel";
import {
  GetAuthenticatedUserFailureAction,
  GetAuthenticatedUserRequestAction,
  GetAuthenticatedUserSuccessAction,
  LoginFailureAction,
  LoginRequestAction,
  LoginSuccessAction,
  LogoutFailureAction,
  LogoutRequestAction,
  LogoutSuccessAction,
  RegisterFailureAction,
  RegisterRequestAction,
  RegisterSuccessAction,
  Types,
} from "../actions/authAction";

export interface IAuthState {
  isLoading: boolean;
  isError: boolean;
  errors: Record<string, string>;
  user: User | null;
  message: string;
}

const INITIAL_STATE: IAuthState = {
  isLoading: false,
  isError: false,
  errors: {},
  user: null,
  message: "",
};

const registerRequest: Reducer<IAuthState, RegisterRequestAction> = (
  state = INITIAL_STATE,
  action
) => {
  return {
    ...state,
    isLoading: true,
    isError: false,
    errors: {},
  };
};

const registerSuccess: Reducer<IAuthState, RegisterSuccessAction> = (
  state = INITIAL_STATE,
  action
) => {
  return {
    ...state,
    isLoading: false,
  };
};

const registerFailure: Reducer<IAuthState, RegisterFailureAction> = (
  state = INITIAL_STATE,
  action
) => {
  return {
    ...state,
    message: action.payload.message,
    isLoading: false,
    isError: true,
    errors: action.payload.errors,
  };
};

const loginRequest: Reducer<IAuthState, LoginRequestAction> = (
  state = INITIAL_STATE,
  action
) => {
  return {
    ...state,
    isLoading: true,
    isError: false,
  };
};

const loginSuccess: Reducer<IAuthState, LoginSuccessAction> = (
  state = INITIAL_STATE,
  action
) => {
  return {
    ...state,
    isLoading: false,
    user: action.payload,
  };
};

const loginFailure: Reducer<IAuthState, LoginFailureAction> = (
  state = INITIAL_STATE,
  action
) => {
  return {
    ...state,
    isLoading: false,
    isError: true,
    user: null,
    message: action.payload,
  };
};

const getAuthenticatedUserRequest: Reducer<
  IAuthState,
  GetAuthenticatedUserRequestAction
> = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
  };
};

const getAuthenticatedUserSuccess: Reducer<
  IAuthState,
  GetAuthenticatedUserSuccessAction
> = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    user: action.payload,
  };
};

const getAuthenticatedUserFailure: Reducer<
  IAuthState,
  GetAuthenticatedUserFailureAction
> = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
  };
};

const logoutRequest: Reducer<IAuthState, LogoutRequestAction> = (
  state = INITIAL_STATE,
  action
) => {
  return {
    ...state,
    isLoading: false,
  };
};

const logoutSuccess: Reducer<IAuthState, LogoutSuccessAction> = (
  state = INITIAL_STATE,
  action
) => {
  return {
    ...state,
    isLoading: false,
    user: null,
  };
};

const logoutFailure: Reducer<IAuthState, LogoutFailureAction> = (
  state = INITIAL_STATE,
  action
) => {
  return {
    ...state,
    isLoading: false,
  };
};

const HANLDERS = {
  [Types.REGISTER_REQUEST]: registerRequest,
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.REGISTER_FAILURE]: registerFailure,
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.GET_AUTHENTICATED_USER_REQUEST]: getAuthenticatedUserRequest,
  [Types.GET_AUTHENTICATED_USER_SUCCESS]: getAuthenticatedUserSuccess,
  [Types.GET_AUTHENTICATED_USER_FAILURE]: getAuthenticatedUserFailure,
  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.LOGOUT_FAILURE]: logoutFailure,
};

const reducer = createReducer(INITIAL_STATE, HANLDERS);

export default reducer;
