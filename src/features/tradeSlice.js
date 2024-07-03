import { createSlice } from "@reduxjs/toolkit";
import {
  acceptTrade,
  createTrade,
  denyTrade,
  getTrade,
  getTrades
} from "./tradeThunk";

const initialState = {
  trades: [],
  trade: null,
  tradeLoading: false,
  acceptTradeLoading: false,
  denyTradeLoading: false,
  createTradeLoading: false,
  tradesLoading: false,
  tradeErrorMessage: '',
  tradesErrorMessage: '',
  createTradeErrorMessage: '',
  acceptTradeErrorMessage: '',
  denyTradeErrorMessage: '',
  tradeIsCreated: false,
};

const TradesSlice = createSlice({
  name: "trade", initialState, reducers: {
    resetCreateTradeData: (state) => {
      state.createTradeErrorMessage = '';
      state.tradeIsCreated = false;
      state.acceptTradeErrorMessage = '';
      state.denyTradeErrorMessage = '';
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
    
    builder.addCase(acceptTrade.pending, (state) => {
      state.acceptTradeLoading = true;
    });
    builder.addCase(acceptTrade.fulfilled, (state) => {
      state.acceptTradeLoading = false;
    });
    builder.addCase(acceptTrade.rejected, (state, { payload: error }) => {
      state.acceptTradeLoading = false;
      state.acceptTradeErrorMessage = error || 'Что то пошло не так, попробуйте позже';
    });
    
    builder.addCase(denyTrade.pending, (state) => {
      state.denyTradeLoading = true;
    });
    builder.addCase(denyTrade.fulfilled, (state) => {
      state.denyTradeLoading = false;
    });
    builder.addCase(denyTrade.rejected, (state, { payload: error }) => {
      state.denyTradeLoading = false;
      state.denyTradeErrorMessage = error || 'Что то пошло не так, попробуйте позже';
    });
  },
});

export const tradeReducer = TradesSlice.reducer;
export const { resetCreateTradeData } = TradesSlice.actions;
