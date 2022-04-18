import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Banner } from "models/Banner";

interface BannerState {
  banners: Banner[];
}

const initialState: BannerState = {
  banners: [],
};

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    addBanners: (state, action: PayloadAction<Banner[]>) => {
      state.banners = action.payload;
    },
    clearBanners: (state) => {
      state.banners = [];
    },
  },
});

export const { addBanners, clearBanners } = bannerSlice.actions;
