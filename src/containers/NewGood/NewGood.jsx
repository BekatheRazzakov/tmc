import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { setCurrentPage } from "../../features/dataSlice";
import { categories } from "../../constants";
import './newGood.css';

const FileUpload = lazy(() => import("../../components/FileUpload/FileUpload"));

const NewGood = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState({});
  
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
      ...prevState, file: e.target.files[0],
    }));
  };
  
  const onSubmit = (e) => {
    e.target.preventDefault();
  };
  
  return (<div className='new-good-form-container'>
    <Paper className='new-good-form-paper' elevation={3}>
      <Box className='new-good-form'
        component='form'
        onSubmit={handleChange}>
        <FormControl required>
          <InputLabel id="demo-simple-select-required-label">Категорий</InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={state.product_type}
            label="Категорий"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Выберите категорий</em>
            </MenuItem>
            {
              categories.map(category => (
                <MenuItem value={category.name}>{category.value}</MenuItem>
              ))
            }
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
            file={state?.file}
            handleFileChange={handleFileChange}/>
        </Suspense>
        <Button type='submit' variant='contained'>Создать</Button>
      </Box>
    </Paper>
  </div>);
};

export default NewGood;