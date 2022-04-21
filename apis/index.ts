import { ReviewProduct } from "./../store/types/products";
import { CreateProductRequest } from "store/types/products";
import { AccountDetailsInput } from "./../models/User";
import { ProductModel } from "../models/Product";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

// models
import { LoginPayload, RegisterPayload } from "../models/Auth";
import { User } from "../models/User";
import { RESPONSE } from "store/types/response";
import { IS_SERVER } from "constants/index";
import { EOrderStatus, OrderRequest } from "models/Order";

const baseURL = process.env.API_END_POINT || "";

export const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const configAuthorization = (clientToken?: string) => {
  instance.interceptors.request.use((config: any) => {
    if (!IS_SERVER && !clientToken) {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    if (clientToken) {
      config.headers.Authorization = `Bearer ${clientToken}`;
    }

    return config;
  });
};
configAuthorization();

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
  return instance.get("/user/profile");
};

export const getProducts = () => {
  return axios.get<ProductModel[]>(`${baseURL}/product`);
};

export const getProductDetail = (id: string) => {
  return axios.get<ProductModel>(`${baseURL}/product/${id}`);
};

export const updateInfomationUser = (
  userId: string,
  data: AccountDetailsInput,
  callback?: (type: RESPONSE, message?: string) => void
) => {
  instance
    .patch(`/user/${userId}`, data)
    .then((res: AxiosResponse) => {
      callback && callback(RESPONSE.SUCCESS);
    })
    .catch((err: AxiosError) => {
      callback && callback(RESPONSE.ERROR, err.response?.data?.message);
    });
};

export const addNewProduct = (data: CreateProductRequest) => {
  return instance.post("/product/create", data);
};

export const updateProduct = (
  idProduct: string,
  data: CreateProductRequest
) => {
  return instance.patch(`/product/${idProduct}`, data);
};

export const deleteProduct = (id: string) => {
  return instance.delete(`/product/${id}`);
};

export const reviewProduct = (id: string, data: ReviewProduct) => {
  return instance.post(`/product/${id}/review/create`, data);
};

export const likeReviewProduct = (id: string, productId: string) => {
  return instance.post(`/product/${productId}/review/${id}/like`);
};

export const createOrder = (body: OrderRequest) => {
  return instance.post("/order/create", body);
};

export const updateOrder = (id: string, status: EOrderStatus) => {
  return instance.patch(`/order/${id}`, { status });
};
