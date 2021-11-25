import axios, { AxiosResponse } from "axios";

// models
import { LoginPayload, RegisterPayload } from "../models/AuthModel";
import { User } from "../models/UserModel";

export const instance = axios.create({
  baseURL: "http://localhost:7998",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginRequest = (body: LoginPayload) => {
  return instance.post<User>("/authentication/login", body);
};

export const getAuthenticatedUserRequest = () => {
  return instance.get<User>("/users/me");
};

export const refreshTokenRequest = () => {
  return instance.get("/authentication/refresh-token");
};

export const registerRequest = (body: RegisterPayload) => {
  return instance.post<User>("/authentication/register", body);
};

export const logoutRequest = () => {
  return instance.post("/authentication/log-out");
};
