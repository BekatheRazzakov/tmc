import React, { useCallback } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import './goodsListFooter.css';
import { useAppSelector } from "../../app/hooks";
import { useLocation } from "react-router-dom";

const GoodsListFooter = ({ paginationData, handlePaginationDataChange }) => {
  const location = useLocation().pathname;
  const { goodsPagesAmount } = useAppSelector(state => state.dataState);
  const { tradesPagesAmount } = useAppSelector(state => state.tradeState);
  const pagesArray = useCallback(() => {
    return Array.from({ length: location.includes('goods') ? goodsPagesAmount : tradesPagesAmount || 0 }, (_, index) => index);
  }, [goodsPagesAmount, location, tradesPagesAmount]);
  
  return (
    <Box className='goods-list-footer'>
      <FormControl className='goods-list-footer-page-size'>
        <InputLabel id='demo-simple-select-label'
          variant='standard'>страница</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          name='pageNumber'
          value={paginationData.pageNumber}
          label='страница'
          onChange={handlePaginationDataChange}
          variant='standard'
        >
          {pagesArray().map(page => (
            <MenuItem value={page + 1}>{page + 1}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className='goods-list-footer-page-size'>
        <InputLabel id='demo-simple-select-label'
          variant='standard'>товаров на страницу</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          name='pageSize'
          value={paginationData.pageSize}
          label='товаров на страницу'
          onChange={handlePaginationDataChange}
          variant='standard'
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