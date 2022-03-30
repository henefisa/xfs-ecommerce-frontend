import { RegisterPayload } from "../../models/Auth";
import { User } from "../../models/User";
import { LoginPayload } from "../../models/Auth";

export interface ActionTypeLoginRequest {
  type: string;
  payload: LoginPayload;
}

export interface LoginSuccessType {
  type: string;
  payload: User;
}

export interface LoginFailureType {
  type: string;
  payload: string;
}

export interface LogoutSuccessType {
  type: string;
}

export interface LogoutFailureType {
  type: string;
}

export interface ActionTypeRegisterRequest {
  type: string;
  payload: RegisterPayload;
}

export interface RegisterSuccessType {
  type: string;
}

export interface RegisterFailureType {
  type: string;
  payload: string;
}

export interface GetUserProfileSuccessType {
  type: string;
  payload: User;
}
