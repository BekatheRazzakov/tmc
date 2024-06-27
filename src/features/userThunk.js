import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { isAxiosError } from "axios";

export const signIn = createAsyncThunk("user/signIn", async (userData, {rejectWithValue}) => {
  try {
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("password", userData.password);
    const response = await axiosApi.post("/login/", formData);
    return {
      token: response.data.access_token,
      username: response.data.username,
    };
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
  //try {
  //  if (userData.username === 'admin' && userData.password === 'skynet') {
  //    return userData.username;
  //  } else return rejectWithValue('Произошла ошибка. Попробуйте позже');
  //} catch (e) {
  //  console.log(e);
  //}
});