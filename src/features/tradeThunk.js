import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { isAxiosError } from "axios";

export const getTrades = createAsyncThunk("trades/getTrades", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosApi(`trades/?page=${data?.pageNumber || 1}&page_size=${data?.pageSize || 20}`);
    return response.data;
    //return [
    //  {
    //    source_user_id: 0,
    //    destination_user_id: 0,
    //    good_id: 0,
    //    create_date: "string",
    //    approved_date: "string",
    //    comment: "string",
    //    trade_status_id: 1,
    //    is_deleted: false,
    //    id: 0
    //  }, {
    //    source_user_id: 1,
    //    destination_user_id: 1,
    //    good_id: 1,
    //    create_date: "string",
    //    approved_date: "string",
    //    comment: "string",
    //    trade_status_id: 2,
    //    is_deleted: false,
    //    id: 1
    //  }
    //];
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue('Что то пошло не так, попробуйте позже');
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