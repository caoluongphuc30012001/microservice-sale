import BrandType from "@/types/brand.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: BrandType[] = [];

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrand: (_, action) => {
      return action.payload;
    },
  },
});

const brandReducer = brandSlice.reducer;

const { setBrand } = brandSlice.actions;

export { brandReducer, setBrand };
