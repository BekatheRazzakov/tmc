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
  //try {
  //const response = await axiosApi(`goods/${id}`);
  //return response.data;
  //} catch (e) {
  //  if (isAxiosError(e) && e.response && e.response.status === 400) {
  //    return rejectWithValue(e.response.data);
  //  }
  //  throw e;
  //}
  const getData = new Promise((resolve) => {
    setTimeout(() => {
      resolve(goodsList.filter(good => good.id.toString() === id)[0]);
    }, 2000);
  });
  return await getData;
});

const goodsList = [{
  id: 89021734,
  nazvanie_id: 46832910,
  barcode: "1232168",
  product_type: "clamp",
  good_status_id: 1,
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
  id: 786917234,
  nazvanie_id: 678291374,
  barcode: "1232168",
  product_type: "clamp",
  good_status_id: 3,
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
  id: 78961234,
  nazvanie_id: 2378014,
  barcode: "782391421",
  product_type: "clamp",
  good_status_id: 2,
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
},];
