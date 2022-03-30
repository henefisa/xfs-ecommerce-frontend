import { ProductModel } from "../models/Product";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

// models
import { LoginPayload, RegisterPayload } from "../models/Auth";
import { User } from "../models/User";

const baseURL = process.env.defaultUrlBe || "";
console.log("baseURL", baseURL);

export const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

export const getProducts = () => {
  return axios.get<ProductModel[]>(`${baseURL}/product`);
};

export const getProductDetail = (id: string) => {
  return axios.get<ProductModel>(`${baseURL}/product/${id}`);
};
