import { createSlice } from "@reduxjs/toolkit";
import { createTrade } from "./tradeThunk";

const initialState = {
  trades: [],
  createTradeLoading: false,
  createTradeErrorMessage: '',
  tradeIsCreated: false,
};

const TradesSlice = createSlice({
  name: "trade", initialState, reducers: {}, extraReducers: (builder) => {
    builder.addCase(createTrade.pending, (state) => {
      state.createTradeLoading = true;
    });
    builder.addCase(createTrade.fulfilled, (state, { payload: res }) => {
      state.createTradeLoading = false;
      state.tradeIsCreated = true;
    });
    builder.addCase(createTrade.rejected, (state, { payload: error }) => {
      state.createTradeLoading = false;
      state.createTradeErrorMessage = error || 'Что то пошло не так, попробуйте позже';
    });
  },
});

export const tradeReducer = TradesSlice.reducer;
export const { resetCreateTradeData, } = TradesSlice.actions;
