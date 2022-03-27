import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

// models
import { LoginPayload, RegisterPayload } from "../models/AuthModel";
import { User } from "../models/UserModel";

const baseURL = "http://192.168.100.199:7998";

export const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const initialInterceptor = (instance: any) => {
  instance.interceptors.request.use((config: any) => {
    const parseLocalstorage = JSON.parse(
      localStorage.getItem("persist:root") || ""
    );
    const token = JSON.parse(parseLocalstorage.auth);

    if (token) {
      config.headers.Authorization = `Bearer ${token.user.accessToken}`;
    }
    return config;
  });
  instance.interceptors.response.use(
    (res: any) => res,
    (err: AxiosError) => {
      if (err?.response?.status === 401 && err?.config?.method !== "get") {
        toast.error("You do not have permission to access this resource!");
      }
      return Promise.reject(err);
    }
  );
};

export const loginRequest = (body: LoginPayload) => {
  return axios.post<User>(`${baseURL}/authentication/login`, body);
};

export const getAuthenticatedUserRequest = () => {
  return instance.get<User>("/users/me");
};

export const refreshTokenRequest = () => {
  return instance.get("/authentication/refresh-token");
};

export const registerRequest = (body: RegisterPayload) => {
  return axios.post<User>(`${baseURL}/authentication/register`, body);
};

export const logoutRequest = () => {
  return instance.post("/authentication/log-out");
};

export const getUserInfo = () => {
  return instance.get("/authentication/user/profile");
};
