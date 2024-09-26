import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { isAxiosError } from 'axios';

// получение списка трейдов
export const getTrades = createAsyncThunk(
  'trades/getTrades',
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const userRole = state.userState.user.role;

      const response = await axiosApi(
        `trades${userRole === 'admin' ? '' : '/user/story'}/?page=${data?.pageNumber || 1}&page_size=${data?.pageSize || 20}`
      );
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue('Что то пошло не так, попробуйте позже');
      }
      throw e;
    }
  }
);

export const getDeletedTrades = createAsyncThunk(
  'trades/getDeletedTrades',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosApi(
        `trades/soft_deleted/?page=${data?.pageNumber || 1}&page_size=${data?.pageSize || 20}`
      );
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue('Что то пошло не так, попробуйте позже');
      }
      throw e;
    }
  }
);

// получение одного трейда
export const getTrade = createAsyncThunk(
  'trades/getTrade',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosApi(`trades/${id}`);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue('Товар не найден');
      }
      throw e;
    }
  }
);

// создание трейда
export const createTrade = createAsyncThunk(
  'trades/createTrade',
  async (tradeData, { rejectWithValue }) => {
    try {
      const req = await axiosApi.post(`trades/`, tradeData);
      return await req.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(
          e.response.data?.detail === 'Trade already exists'
            ? 'Трейд уже существует'
            : e.response.data?.detail
        );
      } else if (isAxiosError(e) && e.response && e.response.status === 401) {
        return rejectWithValue(
          'Неправильные учётные данные, авторизуйтесь снова'
        );
      } else if (isAxiosError(e) && e.response && e.response.status === 403) {
        return rejectWithValue('У вас нет прав на создание трейда');
      }
      throw e;
    }
  }
);

// создание трейдов одним запросом
export const createTrades = createAsyncThunk(
  'trades/createTrades',
  async (tradeData, { rejectWithValue }) => {
    try {
      const req = await axiosApi.post(`trades/multiple`, tradeData);
      return await req.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(
          e.response.data?.detail === 'Trade already exists'
            ? 'Некоторые из выбранных материалов уже в процессе трейда'
            : e.response.data?.detail
        );
      } else if (isAxiosError(e) && e.response && e.response.status === 401) {
        return rejectWithValue(
          'Неправильные учётные данные, авторизуйтесь снова'
        );
      } else if (isAxiosError(e) && e.response && e.response.status === 403) {
        return rejectWithValue('У вас нет прав на создание трейда');
      }
      throw e;
    }
  }
);

// запрос на принятие запроса на трейд
export const acceptTrade = createAsyncThunk(
  'trades/acceptTrade',
  async (tradeId, { rejectWithValue }) => {
    try {
      const res = await axiosApi.post(`trades/${tradeId}/accept/`);
      return res.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 401) {
        return rejectWithValue(
          'Неправильные учётные данные, авторизуйтесь снова'
        );
      }
      throw e;
    }
  }
);

// запрос на отказ запроса на трейд
export const denyTrade = createAsyncThunk(
  'trades/denyTrade',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosApi.post(`trades/${data?.id}/deny/`, {
        comment: data?.comment,
      });
      return res.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 401) {
        return rejectWithValue(
          'Неправильные учётные данные, авторизуйтесь снова'
        );
      }
      throw e;
    }
  }
);

export const deleteTrade = createAsyncThunk(
  'trades/deleteTrade',
  async (id, { rejectWithValue }) => {
    try {
      await axiosApi.delete(`trades/${id}/`);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data?.detail || '');
      }
      throw e;
    }
  }
);
