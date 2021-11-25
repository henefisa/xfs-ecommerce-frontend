import { Reducer } from "redux";
import { createReducer } from "reduxsauce";
import { User } from "../../models/UserModel";
import {
  GetAuthenticatedUserFailure,
  GetAuthenticatedUserRequest,
  GetAuthenticatedUserSuccess,
  LoginFailureAction,
  LoginRequestAction,
  LoginSuccessAction,
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
  GetAuthenticatedUserRequest
> = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
  };
};

const getAuthenticatedUserSuccess: Reducer<
  IAuthState,
  GetAuthenticatedUserSuccess
> = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    user: action.payload,
  };
};

const getAuthenticatedUserFailure: Reducer<
  IAuthState,
  GetAuthenticatedUserFailure
> = (state = INITIAL_STATE, action) => {
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
};

const reducer = createReducer(INITIAL_STATE, HANLDERS);

export default reducer;
