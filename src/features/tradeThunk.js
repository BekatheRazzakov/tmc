import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { isAxiosError } from "axios";

export const getTrades = createAsyncThunk("trades/getTrades", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosApi(`trades/?page=${data?.pageNumber || 1}&page_size=${data?.pageSize || 20}`);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue('Что то пошло не так, попробуйте позже');
    }
    throw e;
  }
});

export const getTrade = createAsyncThunk("trades/getTrade", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosApi(`trades/${id}`);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 404) {
      return rejectWithValue('Товар не найден');
    }
    throw e;
  }
});

export const createTrade = createAsyncThunk('trades/createTrade', async (tradeData, { rejectWithValue }) => {
  try {
    const req = await axiosApi.post(`trades/`, tradeData);
    return await req.data;
  } catch (e) {
    throw e;
  }
});