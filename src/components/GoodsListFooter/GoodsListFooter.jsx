import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import './goodsListFooter.css';

const GoodsListFooter = ({paginationData, handlePaginationDataChange}) => {
  return (
    <Box className='goods-list-footer'>
      <FormControl className='goods-list-footer-page-size'>
        <InputLabel id="demo-simple-select-label" variant="standard">страница</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="pageNumber"
          value={paginationData.pageNumber}
          label="страница"
          onChange={handlePaginationDataChange}
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
          value={paginationData.pageSize}
          label="товаров на страницу"
          onChange={handlePaginationDataChange}
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