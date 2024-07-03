import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";

export const createTrade = createAsyncThunk('data/createTrade', async (tradeData, { rejectWithValue }) => {
  try {
    const req = await axiosApi.post(`trades/`, tradeData);
    return await req.data;
  } catch (e) {
    throw e;
  }
});