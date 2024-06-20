import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: '',
  currentDrawer: '',
};

const DataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setDrawer: (state, action) => {
      state.currentDrawer = action.payload;
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

export const dataReducer = DataSlice.reducer;
export const {setCurrentPage, setDrawer} = DataSlice.actions;
