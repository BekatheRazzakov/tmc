import { createSlice } from "@reduxjs/toolkit";
import {
  acceptTrade,
  createTrade,
  denyTrade, getDeletedTrades,
  getTrade,
  getTrades
} from "./tradeThunk";

const initialState = {
  trades: [],
  trade: null,
  tradesPagesAmount: 1,
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
  tradeIsAccepted: false,
  tradeIsDenied: false,
};

const TradesSlice = createSlice({
  name: "trade", initialState, reducers: {
    resetCreateTradeData: (state) => {
      state.createTradeErrorMessage = '';
      state.tradeIsCreated = false;
      state.acceptTradeErrorMessage = '';
      state.denyTradeErrorMessage = '';
    },
    resetTradesErrorData: (state) => {
      state.tradesErrorMessage = '';
    },
    resetTradeAcceptedDeniedData: (state) => {
      state.tradeIsDenied = false;
      state.tradeIsAccepted = false;
    },
    resetTradeAcceptDenyData: (state) => {
      state.acceptTradeErrorMessage = '';
      state.denyTradeErrorMessage = '';
    },
  }, extraReducers: (builder) => {
    builder.addCase(getTrades.pending, (state) => {
      state.tradesLoading = true;
      state.tradesErrorMessage = '';
    });
    builder.addCase(getTrades.fulfilled, (state, { payload: res }) => {
      state.tradesLoading = false;
      state.trades = res?.data || [];
      state.tradesPagesAmount = res?.total_pages || 1;
    });
    builder.addCase(getTrades.rejected, (state, { payload: error }) => {
      state.tradesLoading = false;
      state.tradesErrorMessage = error || 'Что то пошло не так, попробуйте позже';
    });
    
    builder.addCase(getDeletedTrades.pending, (state) => {
      state.tradesLoading = true;
      state.tradesErrorMessage = '';
    });
    builder.addCase(getDeletedTrades.fulfilled, (state, { payload: res }) => {
      state.tradesLoading = false;
      state.trades = res?.data || [];
      state.pagesAmount = res?.total_count || 1;
    });
    builder.addCase(getDeletedTrades.rejected, (state, { payload: error }) => {
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
      state.tradeIsAccepted = true;
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
export const {
  resetCreateTradeData,
  resetTradesErrorData,
  resetTradeAcceptedDeniedData,
  resetTradeAcceptDenyData,
} = TradesSlice.actions;
