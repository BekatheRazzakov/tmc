import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  Box, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField
} from "@mui/material";
import { categories, goodStatuses } from "../../constants";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createGood, getManufactures, getModels, updateGood
} from "../../features/dataThunk";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetCreateGoodData, setGoodIsCreated, setGoodIsUpdated
} from "../../features/dataSlice";

const FileUpload = lazy(() => import("../../components/FileUpload/FileUpload"));

const CreateEditGoodForm = ({isEdit, editingGood, changeTab}) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    id: params?.id || null,
    nazvanie_id: editingGood?.nazvanie_id,
    barcode: editingGood?.barcode,
    product_type: editingGood?.product_type,
    product_manufacture_id: editingGood?.product?.product_manufacture_id,
    product_model_id: editingGood?.product?.product_model_id,
    good_status_id: editingGood?.good_status?.id,
    cost: editingGood?.product?.cost,
  });
  const {
    good,
    createGoodLoading,
    createGoodErrorMessage,
    createGoodError,
    models,
    manufactures,
    updateGoodLoading,
    updateGoodError,
    updateGoodErrorMessage,
    manufacturesLoading,
    modelsLoading,
    goodIsCreated,
    goodIsUpdated,
  } = useAppSelector(state => state.dataState);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  
  useEffect(() => {
    if (createGoodError || updateGoodError) {
      setSnackBarOpen(true);
    }
  }, [createGoodError, updateGoodError]);
  
  useEffect(() => {
    if (state.product_type) {
      dispatch(getModels(state?.product_type));
      dispatch(getManufactures(state?.product_type));
    }
  }, [dispatch, state.product_type]);
  
  useEffect(() => {
    if (goodIsCreated) {
      navigate(`/goods/${good?.id}`);
      dispatch(resetCreateGoodData());
      dispatch(setGoodIsCreated(false));
    }
  }, [dispatch, good?.id, goodIsCreated, navigate]);
  
  useEffect(() => {
    if (goodIsUpdated) {
      changeTab(null, 0);
      dispatch(setGoodIsUpdated(false));
    }
  }, [changeTab, dispatch, goodIsUpdated]);
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    
    setState((prevState) => ({
      ...prevState, [name]: value,
    }));
  };
  
  const handleFileChange = (e) => {
    setState((prevState) => ({
      ...prevState, photo_path: e.target.files[0],
    }));
  };
  
  const removeImage = () => {
    setState((prevState) => ({
      ...prevState, photo_path: null,
    }));
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!state.product_type || !state.product_manufacture_id || !state.product_model_id || !state.good_status_id || !state.cost || !state.barcode) return;
    if (isEdit) {
      await dispatch(updateGood({
        ...state,
        product_type_has_changed: editingGood?.product_type !== state.product_type || editingGood?.product?.product_manufacture_id !== state.product_manufacture_id || editingGood?.product?.product_model_id !== state.product_model_id || editingGood?.product?.cost !== state.cost,
      }));
    } else dispatch(createGood(state));
  };
  
  const handleSnackBarClose = () => setSnackBarOpen(false);
  
  return (<Box className='new-good-form'
    component='form'
    onSubmit={onSubmit}>
    <FormControl required>
      <InputLabel id='category-select-required-label'>категорий</InputLabel>
      <Select
        labelId='category-select-required-label'
        id='category-select-required'
        value={state.product_type}
        label='категорий'
        name='product_type'
        onChange={handleChange}
      >
        {categories.map(category => (
          <MenuItem value={category.name}>{category.value}</MenuItem>))}
      </Select>
    </FormControl>
    <FormControl required>
      <InputLabel id='manufacture-select-required-label'>производитель</InputLabel>
      <Select
        labelId='manufacture-select-required-label'
        id='manufacture-select-required'
        value={state.product_manufacture_id}
        label='производитель'
        name='product_manufacture_id'
        onChange={handleChange}
      >
        {manufactures.map(manufacture => (
          <MenuItem value={manufacture.id}>{manufacture.name}</MenuItem>))}
      </Select>
    </FormControl>
    <FormControl required>
      <InputLabel id='model-select-required-label'>модель</InputLabel>
      <Select
        labelId='model-select-required-label'
        id='model-select-required'
        value={state.product_model_id}
        label='модель'
        name='product_model_id'
        onChange={handleChange}
      >
        {models.map(model => (
          <MenuItem value={model.id}>{model.name}</MenuItem>))}
      </Select>
    </FormControl>
    <FormControl required>
      <InputLabel id='status-select-required-label'>статус</InputLabel>
      <Select
        labelId='status-select-required-label'
        id='status-select-required'
        value={state.good_status_id}
        label='статус'
        name='good_status_id'
        onChange={handleChange}
      >
        {goodStatuses.filter(status => status.isAvailable).map(status => (
          <MenuItem value={status.name}>{status.value}</MenuItem>))}
      </Select>
    </FormControl>
    <TextField
      id='price'
      label='цена'
      type='number'
      inputProps={{
        min: 0,
      }}
      variant='outlined'
      name='cost'
      value={state.cost}
      onChange={handleChange}
      required
    />
    <TextField id='outlined-basic'
      label='штрих код'
      variant='outlined'
      name='barcode'
      value={state.barcode}
      onChange={handleChange}
      required
    />
    <Suspense fallback={<></>}>
      <FileUpload label='фото товара'
        file={state?.photo_path}
        handleFileChange={handleFileChange}
        removeImage={removeImage}
      />
    </Suspense>
    <LoadingButton
      type='submit' fullWidth variant='contained' sx={{mt: 3, mb: 2}}
      disabled={!state.product_type || !state.product_manufacture_id || !state.product_model_id || !state.good_status_id || !state.cost || !state.barcode}
      loading={createGoodLoading || updateGoodLoading || modelsLoading || manufacturesLoading}
    >
      {isEdit ? 'Сохранить' : 'Создать'}
    </LoadingButton>
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={snackBarOpen}
      onClose={handleSnackBarClose}
      message={isEdit ? updateGoodErrorMessage : createGoodErrorMessage}
    />
  </Box>);
};

export default CreateEditGoodForm;