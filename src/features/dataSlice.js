import { createSlice } from '@reduxjs/toolkit';
import {
  createGood,
  updateGood,
  getGood,
  getGoods,
  getManufactures,
  getModels,
  deleteGood,
  createManufacture,
  createModel,
  getCategories,
  getAllGoods,
} from './dataThunk';

const initialState = {
  currentPage: '',
  currentDrawer: '',
  goods: [],
  allGoods: [],
  good: null,
  pagesAmount: 1,
  categories: [],
  models: [],
  manufactures: [],
  goodsLoading: false,
  allGoodsLoading: false,
  goodLoading: false,
  createGoodLoading: false,
  modelsLoading: false,
  createManufactureLoading: false,
  createModelLoading: false,
  manufacturesLoading: false,
  deleteGoodLoading: false,
  createGoodError: false,
  updateGoodLoading: false,
  updateGoodError: false,
  deleteGoodError: false,
  createManufactureError: false,
  createModelError: false,
  goodsError: '',
  goodError: '',
  createGoodErrorMessage: '',
  updateGoodErrorMessage: '',
  deleteGoodErrorMessage: '',
  createManufactureErrorMessage: '',
  createModelErrorMessage: '',
  goodIsCreated: false,
  goodIsUpdated: false,
  goodIsDeleted: false,
  manufactureIsCreated: false,
  modelIsCreated: false,
  goodNotFound: false,
};

const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setDrawer: (state, action) => {
      state.currentDrawer = action.payload;
    },
    setGoodSelected: (state, action) => {
      const selectedGood = state.goods?.filter(
        (good) => good.id === action.payload.id
      )?.[0];
      if (selectedGood) selectedGood.selected = action.payload.status;
    },
    setAllGoodsSelected: (state, action) => {
      state.goods = state.goods.map((good) => ({
        ...good,
        selected: action.payload.status,
      }));
    },
    resetCreateGoodData: (state) => {
      state.createGoodError = false;
      state.createGoodErrorMessage = '';
      state.goodIsCreated = false;
      state.manufactureIsCreated = false;
      state.modelIsCreated = false;
      state.createManufactureError = false;
      state.createModelError = false;
      state.createManufactureErrorMessage = '';
      state.createModelErrorMessage = '';
      state.updateGoodError = '';
      state.updateGoodErrorMessage = '';
    },
    setGoodIsUpdated: (state, action) => {
      state.goodIsUpdated = action.payload;
    },
    resetGoodsError: (state) => {
      state.goodsError = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, () => {});
    builder.addCase(getCategories.fulfilled, (state, { payload: res }) => {
      state.categories = res || [];
    });
    builder.addCase(getCategories.rejected, () => {});

    builder.addCase(getGoods.pending, (state) => {
      state.goodsLoading = true;
    });
    builder.addCase(getGoods.fulfilled, (state, { payload: res }) => {
      state.goodsLoading = false;
      state.goods =
        res.data?.map((good) => ({
          ...good,
          selected: 0,
        })) || [];
      state.goodsPagesAmount = res?.total_pages || 1;
    });
    builder.addCase(getGoods.rejected, (state, { payload: error }) => {
      state.goodsLoading = false;
      state.goodsError = error?.error || 'Что-то пошло не так';
    });

    builder.addCase(getAllGoods.pending, (state) => {
      state.allGoodsLoading = true;
    });
    builder.addCase(getAllGoods.fulfilled, (state, { payload: res }) => {
      state.allGoodsLoading = false;
      state.allGoods =
        res.data?.map((good) => ({
          ...good,
          selected: 0,
        })) || [];
      state.goodsPagesAmount = res?.total_pages || 1;
    });
    builder.addCase(getAllGoods.rejected, (state, { payload: error }) => {
      state.allGoodsLoading = false;
      state.goodsError = error?.error || 'Что-то пошло не так';
    });

    builder.addCase(getGood.pending, (state) => {
      state.goodLoading = true;
      state.goodNotFound = false;
      state.goodError = '';
    });
    builder.addCase(getGood.fulfilled, (state, { payload: res }) => {
      state.goodLoading = false;
      state.good = res || null;
      if (!res) {
        state.goodNotFound = true;
        state.goodError = 'Товар не найден';
      }
    });
    builder.addCase(getGood.rejected, (state, { payload: error }) => {
      state.goodLoading = false;
      state.goodError = error || 'Что-то пошло не так';
    });

    builder.addCase(createGood.pending, (state) => {
      state.createGoodLoading = true;
      state.createGoodErrorMessage = '';
      state.createGoodError = false;
    });
    builder.addCase(createGood.fulfilled, (state, { payload: res }) => {
      state.createGoodLoading = false;
      state.good = res || null;
      state.goodIsCreated = true;
    });
    builder.addCase(createGood.rejected, (state, { payload: error }) => {
      state.createGoodLoading = false;
      state.createGoodErrorMessage =
        error || 'Что-то пошло не так. Попробуйте позже';
      state.createGoodError = true;
      state.goodIsCreated = false;
    });

    builder.addCase(updateGood.pending, (state) => {
      state.updateGoodLoading = true;
      state.updateGoodErrorMessage = '';
      state.updateGoodError = false;
    });
    builder.addCase(updateGood.fulfilled, (state, { payload: res }) => {
      state.updateGoodLoading = false;
      state.good = res || null;
      state.goodIsUpdated = true;
    });
    builder.addCase(updateGood.rejected, (state, { payload: error }) => {
      state.updateGoodLoading = false;
      state.updateGoodErrorMessage =
        error || 'Что-то пошло не так. Попробуйте позже';
      state.updateGoodError = true;
      state.goodIsUpdated = false;
    });

    builder.addCase(getModels.pending, (state) => {
      state.modelsLoading = true;
    });
    builder.addCase(getModels.fulfilled, (state, { payload: res }) => {
      state.modelsLoading = false;
      state.models = res || [];
    });
    builder.addCase(getModels.rejected, (state) => {
      state.modelsLoading = false;
    });

    builder.addCase(createManufacture.pending, (state) => {
      state.createManufactureLoading = true;
      state.createManufactureErrorMessage = '';
      state.createManufactureError = false;
    });
    builder.addCase(createManufacture.fulfilled, (state, { payload: res }) => {
      state.createManufactureLoading = false;
      if (res) {
        state.manufactures = [...state.manufactures, res] || [];
      }
      state.manufactureIsCreated = true;
    });
    builder.addCase(createManufacture.rejected, (state, { payload: error }) => {
      state.createManufactureLoading = false;
      state.createManufactureError = true;
      state.createManufactureErrorMessage =
        error || 'Что-то пошло не так. Попробуйте позже';
    });

    builder.addCase(createModel.pending, (state) => {
      state.createModelLoading = true;
      state.createModelErrorMessage = '';
      state.createModelError = false;
    });
    builder.addCase(createModel.fulfilled, (state, { payload: res }) => {
      state.createModelLoading = false;
      if (res) {
        state.models = [...state.models, res] || [];
      }
      state.modelIsCreated = true;
    });
    builder.addCase(createModel.rejected, (state, { payload: error }) => {
      state.createModelLoading = false;
      state.createModelError = true;
      state.createModelErrorMessage =
        error || 'Что-то пошло не так. Попробуйте позже';
    });

    builder.addCase(getManufactures.pending, (state) => {
      state.manufacturesLoading = true;
    });
    builder.addCase(getManufactures.fulfilled, (state, { payload: res }) => {
      state.manufacturesLoading = false;
      state.manufactures = res || [];
    });
    builder.addCase(getManufactures.rejected, (state) => {
      state.manufacturesLoading = false;
    });

    builder.addCase(deleteGood.pending, (state) => {
      state.deleteGoodLoading = true;
      state.deleteGoodError = false;
      state.deleteGoodErrorMessage = '';
    });
    builder.addCase(deleteGood.fulfilled, (state) => {
      state.deleteGoodLoading = false;
    });
    builder.addCase(deleteGood.rejected, (state, { payload: error }) => {
      state.deleteGoodLoading = false;
      state.deleteGoodError = true;
      state.deleteGoodErrorMessage =
        error || 'Что-то пошло не так. Попробуйте позже';
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const {
  setCurrentPage,
  setDrawer,
  setGoodSelected,
  setAllGoodsSelected,
  resetCreateGoodData,
  setGoodIsUpdated,
  resetGoodsError,
} = DataSlice.actions;
