import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/dataSlice";
import { getGoods } from "../../features/dataThunk";
import { useAppSelector } from "../../app/hooks";
import GoodsList from "../../components/GoodsList/GoodsList";
import { Snackbar } from "@mui/material";
import './trades.css';

const Trades = () => {
  const dispatch = useDispatch();
  const {goods, goodsError} = useAppSelector(state => state.dataState);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  
  useEffect(() => {
    dispatch(setCurrentPage('Товары'));
    dispatch(getGoods());
  }, [dispatch]);
  
  useEffect(() => {
    if (goodsError) setSnackBarOpen(true);
  }, [goodsError]);
  
  const handleClose = () => setSnackBarOpen(false);
  
  return (<div className='goods'>
    <GoodsList goods={[...goods] || []}/>
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={snackBarOpen}
      onClose={handleClose}
      message={goodsError}
    />
  </div>);
};

export default Trades;