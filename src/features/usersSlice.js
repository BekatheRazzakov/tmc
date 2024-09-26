import { createSlice } from '@reduxjs/toolkit';
import { getUsers, signIn } from './userThunk';

const initialState = {
  user: '',
  users: [],
  signInLoading: false,
  usersLoading: false,
  usersErrorMessage: '',
  authorizationError: '',
  authorizationMessage: '',
};

const UsersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = '';
    },
    resetGetUserData: (state) => {
      state.usersErrorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.user = null;
      state.authorizationError = '';
      state.authorizationMessage = '';
      state.signInLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload: res }) => {
      state.signInLoading = false;
      state.user = res || null;
      state.authorizationMessage = res?.message || 'Вы вошли в аккаунт';
    });
    builder.addCase(signIn.rejected, (state, { payload: error }) => {
      state.signInLoading = false;
      state.authorizationError = error || 'Произошла ошибка. Попробуйте позже';
    });

    builder.addCase(getUsers.pending, (state) => {
      state.usersLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload: res }) => {
      state.usersLoading = false;
      state.users = res || [];
    });
    builder.addCase(getUsers.rejected, (state, { payload: error }) => {
      state.usersLoading = false;
      state.authorizationError = error || 'Произошла ошибка. Попробуйте позже';
    });
  },
});

export const userReducer = UsersSlice.reducer;
export const { logout, resetGetUserData } = UsersSlice.actions;
