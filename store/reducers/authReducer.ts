import { Reducer } from "redux";
import { createReducer } from "reduxsauce";
import { boolean } from "yup/lib/locale";
import { User } from "../../models/UserModel";
import {
  GetAuthenticatedUserFailure,
  GetAuthenticatedUserRequest,
  GetAuthenticatedUserSuccess,
  LoginFailureAction,
  LoginRequestAction,
  LoginSuccessAction,
  RegisterRequestAction,
  Types,
} from "../actions/authAction";

export interface IAuthState {
  isLoading: boolean;
  user: User | null;
  message: string;
}

const INITIAL_STATE: IAuthState = {
  isLoading: false,
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
  };
};

const loginRequest: Reducer<IAuthState, LoginRequestAction> = (
  state = INITIAL_STATE,
  action
) => {
  return {
    ...state,
    isLoading: true,
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
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.GET_AUTHENTICATED_USER_REQUEST]: getAuthenticatedUserRequest,
  [Types.GET_AUTHENTICATED_USER_SUCCESS]: getAuthenticatedUserSuccess,
  [Types.GET_AUTHENTICATED_USER_FAILURE]: getAuthenticatedUserFailure,
};

const reducer = createReducer(INITIAL_STATE, HANLDERS);

export default reducer;
