import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { isAxiosError } from "axios";

export const signIn = createAsyncThunk(
  "user/signIn",
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("password", userData.password);
      const response = await axiosApi.post("/login/", formData);
      return {
        token: response.data?.access_token,
        username: response.data?.username,
        fullname: response?.data?.fullname,
        id: response.data?.user_id,
        role:
          response?.data.permission_name === null &&
          response?.data?.access_token
            ? "admin"
            : response?.data.permission_name,
      };
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 401) {
        return rejectWithValue("Неправильные учётные данные");
      }
      throw e;
    }
  },
);

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const req = await axiosApi("installers/");
      return (await req.data) || [];
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 403) {
        return rejectWithValue("Нет разрешения на трейд товара");
      }
      throw e;
    }
  },
);
