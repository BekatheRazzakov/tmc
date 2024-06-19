import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: '',
};

const UsersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(signIn.pending, (state) => {
    // });
    // builder.addCase(signIn.fulfilled, (state, {payload: res}) => {
    // });
    // builder.addCase(signIn.rejected, (state, {payload: error}) => {
    // });
  },
});

export const dataReducer = UsersSlice.reducer;
export const {setCurrentPage} = UsersSlice.actions;
