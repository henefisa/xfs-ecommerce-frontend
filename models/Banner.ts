export enum EBannerType {
  Big = "big",
  Small = "small",
}

export interface Banner {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  image: string;
  type: EBannerType;
}
