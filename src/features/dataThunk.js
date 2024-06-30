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
  //const getData = new Promise((resolve) => {
  //  setTimeout(() => {
  //    resolve(goodsList);
  //  }, 2000);
  //});
  //return await getData;
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
  //const getData = new Promise((resolve) => {
  //  setTimeout(() => {
  //    resolve(goodsList.filter(good => good.id.toString() === id)[0]);
  //  }, 2000);
  //});
  //return await getData;
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

const goodsList = [
  {
    id: 786917234,
    nazvanie_id: 678291374,
    barcode: "1232168",
    product_type: "clamp",
    good_status: {
      name: 'status name', id: 3,
    },
    product: {
      id: 4218306491234,
      clamp_manufacture_id: 4213961720340,
      clamp_model_id: 15246912834,
      cost: 2500,
      manufacture: {
        name: "Tp-Link", "id": 901923489
      },
      model: {
        name: "Skynet WRT3200ACM", "id": 8732914123
      }
    }
  }, {
    id: 89021734,
    nazvanie_id: 46832910,
    barcode: "1232168",
    product_type: "clamp",
    good_status: {
      name: 'status name', id: 1,
    },
    product: {
      id: 7986127834,
      clamp_manufacture_id: 32789412,
      clamp_model_id: 89071234,
      cost: 1200,
      manufacture: {
        name: "Linksys", "id": 1926843
      },
      model: {
        name: "Linksys WRT3200ACM", "id": 17628341
      }
    }
  }, {
    id: 78961234,
    nazvanie_id: 2378014,
    barcode: "782391421",
    product_type: "clamp",
    good_status: {
      name: 'status name', id: 2,
    },
    product: {
      id: 78621304,
      clamp_manufacture_id: 786971234,
      clamp_model_id: 32148796,
      cost: 1800,
      manufacture: {
        name: "Tp-Link", "id": 7896127834
      },
      model: {
        name: "Skynet WRT3200ACM", "id": 25768918
      }
    }
  },
];
