import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { RegisterPayload } from "../../models/AuthModel";
import { User } from "../../models/UserModel";

export interface IAuthState {
  isLoading: boolean;
  isError: boolean;
  errors: Record<string, string>;
  user: User | null;
  message: string;
}

const initialState: IAuthState = {
  isLoading: false,
  isError: false,
  errors: {},
  user: null,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerRequest(state, action: PayloadAction<RegisterPayload>) {
      state.isLoading = true;
      state.isError = false;
      state.errors = {};
    },
    registerSuccess(state) {
      state.isLoading = false;
    },
    registerFailure(state, action: PayloadAction<{
      message: string;
      errors: WritableDraft<Record<string, string>>;
    }>) {
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = true;
      state.errors = action.payload.errors;
    },
    loginRequest(
      state,
      action: PayloadAction<{
        username: string;
        password: string;
      }>
    ) {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoading = false;
      state.user = action.payload;
    },

    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      state.message = action.payload;
    },
    getAuthenticatedUserRequest(state, action: PayloadAction<any>) {
      state.isLoading = true;
    },
    getAuthenticatedUserSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.user = action.payload;
    },
    getAuthenticatedUserFailure(state, action: PayloadAction<any>) {
      state.isLoading = false;
    },
    logoutRequest(state, action: PayloadAction<any>) {
      state.isLoading = true;
    },
    logoutSuccess(state) {
      state.isLoading = false;
      state.user = null;
    },
    logoutFailure(state) {
      state.isLoading = false;
    },
    getUserInfoRequest(state) {
      state.isLoading = true;
    },
    getUserInfoSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    getUserInfoError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      state.message = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
