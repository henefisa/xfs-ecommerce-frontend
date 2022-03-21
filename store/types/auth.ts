import { User } from "../../models/UserModel";
import { LoginPayload } from "../../models/AuthModel";

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
