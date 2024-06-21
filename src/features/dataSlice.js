import { createSlice } from "@reduxjs/toolkit";
import { getGoods } from "./dataThunk";

const initialState = {
  currentPage: '',
  currentDrawer: '',
  goods: [],
  goodsLoading: false,
  goodsError: '',
};

const DataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setDrawer: (state, action) => {
      state.currentDrawer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGoods.pending, (state) => {
      state.goodsLoading = true;
    });
    builder.addCase(getGoods.fulfilled, (state, {payload: res}) => {
      state.goodsLoading = false;
      state.goods = res || [];
    });
    builder.addCase(getGoods.rejected, (state, {payload: error}) => {
      state.goodsLoading = false;
      state.authorizationError = error?.error || 'Что-то пошло не так';
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const {setCurrentPage, setDrawer} = DataSlice.actions;
