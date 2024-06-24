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
    setGoodSelected: (state, action) => {
      const selectedGood = state.goods?.filter(good => good.id === action.payload.id)?.[0];
      if (selectedGood) selectedGood.selected = action.payload.status;
    },
    setAllGoodsSelected: (state, action) => {
      state.goods = state.goods.map(good => ({
        ...good,
        selected: action.payload.status,
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGoods.pending, (state) => {
      state.goodsLoading = true;
    });
    builder.addCase(getGoods.fulfilled, (state, {payload: res}) => {
      state.goodsLoading = false;
      state.goods = res.map(good => ({
        ...good,
        selected: 0,
      })) || [];
    });
    builder.addCase(getGoods.rejected, (state, {payload: error}) => {
      state.goodsLoading = false;
      state.authorizationError = error?.error || 'Что-то пошло не так';
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const {setCurrentPage, setDrawer, setGoodSelected, setAllGoodsSelected} = DataSlice.actions;
