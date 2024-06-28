import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  Box, FormControl, InputLabel, MenuItem, Select, TextField
} from "@mui/material";
import {
  categories, goodStatuses, manufactures, models
} from "../../constants";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentPage } from "../../features/dataSlice";
import { createGood } from "../../features/dataThunk";
import { useParams } from "react-router-dom";

const FileUpload = lazy(() => import("../../components/FileUpload/FileUpload"));

const CreateEditGoodForm = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [state, setState] = useState({});
  const {createGoodLoading} = useAppSelector(state => state.dataState);
  
  useEffect(() => {
    dispatch(setCurrentPage('Создать товар'));
  }, [dispatch]);
  
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
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (!state.product_type || !state.product_manufacture_id || !state.product_model_id || !state.good_status_id || !state.cost || !state.barcode) return;
    dispatch(createGood(state));
  };
  
  console.log(params?.id);
  
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
        handleFileChange={handleFileChange}/>
    </Suspense>
    <LoadingButton
      type='submit' fullWidth variant='contained' sx={{mt: 3, mb: 2}}
      disabled={!state.product_type || !state.product_manufacture_id || !state.product_model_id || !state.good_status_id || !state.cost || !state.barcode}
      loading={createGoodLoading}
    >
      Создать
    </LoadingButton>
  </Box>);
};

export default CreateEditGoodForm;