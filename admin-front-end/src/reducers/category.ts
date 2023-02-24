import { createSlice } from "@reduxjs/toolkit";

const initialState: CategoryType[] = [];

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    setCategory: (_, action) => {
      return action.payload;
    },
  },
});
const { setCategory } = categorySlice.actions;

const categoryReducer = categorySlice.reducer;

export { setCategory, categoryReducer };
