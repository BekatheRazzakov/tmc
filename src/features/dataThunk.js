import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { isAxiosError } from "axios";

export const getGoods = createAsyncThunk("data/getGoods", async (data, {rejectWithValue}) => {
  try {
    const response = await axiosApi("goods/", data);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const getGood = createAsyncThunk("data/getGood", async (id, {rejectWithValue}) => {
  try {
    const response = await axiosApi(`goods/${id}`);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 404) {
      return rejectWithValue('Товар не найден');
    }
    throw e;
  }
});

export const createGood = createAsyncThunk('data/createGood', async (data, {rejectWithValue}) => {
  try {
    const createItemForm = {
      product_manufacture_id: data?.product_manufacture_id,
      product_model_id: data?.product_model_id,
      cost: Number(data?.cost),
    };
    const createGoodForm = new FormData();
    
    const reqToModel = await axiosApi.post(`${data.product_type}/`, createItemForm);
    const resFromModel = await reqToModel.data;
    
    createGoodForm.append('nazvanie_id', resFromModel?.id);
    createGoodForm.append('barcode', data?.barcode);
    createGoodForm.append('good_status_id', data?.good_status_id);
    createGoodForm.append('product_type', data?.product_type);
    if (data?.photo_path) {
      createGoodForm.append('photo_path', data.photo_path);
    }
    
    const reqToGoods = await axiosApi.post(`goods/`, createGoodForm);
    return await reqToGoods.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue('Ошибка при создании товара');
    }
    throw e;
  }
});

export const updateGood = createAsyncThunk('data/updateGood', async (data, {rejectWithValue}) => {
  try {
    const editGoodForm = new FormData();
    
    if (data.product_type_has_changed) {
      const createItemForm = {
        product_manufacture_id: data?.product_manufacture_id,
        product_model_id: data?.product_model_id,
        cost: Number(data?.cost),
      };
      const reqToModel = await axiosApi.post(`${data.product_type}/`, createItemForm);
      const resFromModel = await reqToModel.data;
      
      editGoodForm.append('nazvanie_id', resFromModel?.id);
    } else {
      editGoodForm.append('nazvanie_id', data?.nazvanie_id);
    }
    editGoodForm.append('barcode', data?.barcode);
    editGoodForm.append('cost', data?.cost);
    editGoodForm.append('good_status_id', data?.good_status_id);
    editGoodForm.append('product_type', data?.product_type);
    if (data?.photo_path) {
      editGoodForm.append('photo_path', data.photo_path);
    }
    
    const reqToGoods = await axiosApi.put(`goods/${data?.id}`, editGoodForm);
    return await reqToGoods.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue('Ошибка при редактировании товара');
    }
    throw e;
  }
});

export const getModels = createAsyncThunk('data/getModels', async (product_type, {rejectValue}) => {
  try {
    const req = await axiosApi(`${product_type}_models/`);
    return await req.data;
  } catch (e) {
    throw e;
  }
});

export const getManufactures = createAsyncThunk('data/getManufactures', async (product_type, {rejectValue}) => {
  try {
    const req = await axiosApi(`${product_type}_manufactures/`);
    return await req.data;
  } catch (e) {
    throw e;
  }
});

export const deleteGood = createAsyncThunk('data/deleteGood', async (id, {rejectWithValue}) => {
  try {
    const reqToGoods = await axiosApi.delete(`goods/${id}`);
    return await reqToGoods.data;
  } catch (e) {
    throw e;
  }
});
