import { createSlice } from "@reduxjs/toolkit";
import { createTrade, getTrade, getTrades } from "./tradeThunk";

const initialState = {
  trades: [],
  trade: null,
  tradeLoading: false,
  tradeErrorMessage: '',
  tradesLoading: false,
  tradesErrorMessage: '',
  createTradeLoading: false,
  createTradeErrorMessage: '',
  tradeIsCreated: false,
};

const TradesSlice = createSlice({
  name: "trade", initialState, reducers: {
    resetTradeData: (state) => {
      state.tradesErrorMessage = '';
    },
    resetCreateTradeData: (state) => {
      state.createTradeErrorMessage = '';
      state.tradeIsCreated = false;
    },
  }, extraReducers: (builder) => {
    builder.addCase(getTrades.pending, (state) => {
      state.tradesLoading = true;
    });
    builder.addCase(getTrades.fulfilled, (state, { payload: res }) => {
      state.tradesLoading = false;
      state.trades = res || [];
    });
    builder.addCase(getTrades.rejected, (state, { payload: error }) => {
      state.tradesLoading = false;
      state.tradesErrorMessage = error || 'Что то пошло не так, попробуйте позже';
    });
    
    builder.addCase(getTrade.pending, (state) => {
      state.tradeLoading = true;
    });
    builder.addCase(getTrade.fulfilled, (state, { payload: res }) => {
      state.tradeLoading = false;
      state.trade = res || null;
    });
    builder.addCase(getTrade.rejected, (state, { payload: error }) => {
      state.tradeLoading = false;
      state.tradeErrorMessage = error || 'Что то пошло не так, попробуйте позже';
    });
    
    builder.addCase(createTrade.pending, (state) => {
      state.createTradeLoading = true;
    });
    builder.addCase(createTrade.fulfilled, (state, { payload: res }) => {
      state.createTradeLoading = false;
      state.trade = res || null;
      state.tradeIsCreated = true;
    });
    builder.addCase(createTrade.rejected, (state, { payload: error }) => {
      state.createTradeLoading = false;
      state.createTradeErrorMessage = error || 'Что то пошло не так, попробуйте позже';
    });
  },
});

export const tradeReducer = TradesSlice.reducer;
export const { resetTradeData, resetCreateTradeData, } = TradesSlice.actions;
