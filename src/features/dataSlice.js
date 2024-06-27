import { createSlice } from "@reduxjs/toolkit";
import { createGood, getGood, getGoods } from "./dataThunk";

const initialState = {
  currentPage: '',
  currentDrawer: '',
  goods: [],
  good: null,
  goodsLoading: false,
  goodLoading: false,
  goodsError: '',
  goodError: '',
  goodNotFound: false,
};

const DataSlice = createSlice({
  name: "data",
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
      state.goodsError = error?.error || 'Что-то пошло не так';
    });
    
    builder.addCase(getGood.pending, (state) => {
      state.goodLoading = true;
      state.goodNotFound = false;
      state.goodError = '';
    });
    builder.addCase(getGood.fulfilled, (state, {payload: res}) => {
      state.goodLoading = false;
      state.good = res || null;
      if (!res) {
        state.goodNotFound = true;
        state.goodError = 'Товар не найден'
      }
    });
    builder.addCase(getGood.rejected, (state, {payload: error}) => {
      state.goodLoading = false;
      state.goodError = error?.error || 'Что-то пошло не так';
    });
    
    builder.addCase(createGood.pending, (state) => {
    });
    builder.addCase(createGood.fulfilled, (state, {payload: res}) => {
    });
    builder.addCase(createGood.rejected, (state, {payload: error}) => {
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const {setCurrentPage, setDrawer, setGoodSelected, setAllGoodsSelected} = DataSlice.actions;
