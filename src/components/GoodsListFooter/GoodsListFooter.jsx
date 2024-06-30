import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import './goodsListFooter.css';
import { useAppDispatch } from "../../app/hooks";
import { getGoods } from "../../features/dataThunk";

const GoodsListFooter = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    pageSize: 20,
    pageNumber: 1,
  });
  
  useEffect(() => {
  }, []);
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  useEffect(() => {
    dispatch(getGoods(state));
  }, [dispatch, state]);
  
  return (
    <Box className='goods-list-footer'>
      <FormControl className='goods-list-footer-page-size'>
        <InputLabel id="demo-simple-select-label" variant="standard">страница</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="pageNumber"
          value={state.pageNumber}
          label="страница"
          onChange={handleChange}
          variant="standard"
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
      <FormControl className='goods-list-footer-page-size'>
        <InputLabel id="demo-simple-select-label" variant="standard">товаров на страницу</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="pageSize"
          value={state.pageSize}
          label="товаров на страницу"
          onChange={handleChange}
          variant="standard"
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default GoodsListFooter;