import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { isAxiosError } from "axios";

export const signIn = createAsyncThunk("user/signIn", async (userData, {rejectWithValue}) => {
  // try {
  //   const response = await axiosApi.post("/login/", userData);
  //   return response.data;
  // } catch (e) {
  //   if (isAxiosError(e) && e.response && e.response.status === 400) {
  //     return rejectWithValue(e.response.data);
  //   }
  //   throw e;
  // }
  
  try {
    if (userData.username === 'admin' && userData.password === 'skynet') {
      return userData.username;
    } else return '';
  } catch (e) {
    console.log(e);
  }
});