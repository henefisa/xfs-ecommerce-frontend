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
}
