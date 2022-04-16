import { User } from "./User";

export interface ImageProduct {
  url: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductModel {
  name: string;
  stock: number;
  price: number;
  description: string;
  details: string;
  categories: [];
  images: ImageProduct[];
  deleteDate: string;
  id: string;
  createdAt: string;
  updatedAt: string | null;
  reviews?: ReviewProduct[];
}

export interface ReviewProduct {
  id: string;
  createdAt: string;
  updatedAt: string;
  rating: number;
  content: string;
  count: number;
  images: ImageProduct[];
  user: User;
}

export interface NewReviewProduct {
  content: string;
  rating: number;
  images: ImageProduct[];
  product: ProductModel;
  id: string;
  createdAt: string;
  updatedAt: string;
  count: number;
  user: User;
}

export interface NewLikeReview {
  idLike: string;
  generatedMaps: string[];
  raw: string[];
  affected: number;
}
