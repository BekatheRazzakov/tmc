import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/dataSlice";
import { getGoods } from "../../features/dataThunk";
import { useAppSelector } from "../../app/hooks";
import GoodsStatusPapers
  from "../../components/GoodsStatusPapers/GoodsStatusPapers";
import GoodsList from "../../components/GoodsList/GoodsList";
import { Snackbar } from "@mui/material";
import './goods.css';

const Goods = () => {
  const dispatch = useDispatch();
  const {goods, goodsError} = useAppSelector(state => state.dataState);
  const [itemPaperStatus, setItemPaperStatus] = useState(1);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  
  const totalGoodsCost = goods?.reduce((acc, value) => acc + value?.cost, 0) || 0;
  const getGoodsAmountByStatus = useCallback(() => goods?.filter(good => good?.good_status?.id === itemPaperStatus)?.length, [goods, itemPaperStatus]);
  const getGoodsAmount = useCallback(() => goods?.length, [goods]);
  
  useEffect(() => {
    dispatch(setCurrentPage('Товары'));
    dispatch(getGoods());
  }, [dispatch]);
  
  const onPaperStatusChange = (value) => setItemPaperStatus(value);
  
  useEffect(() => {
    if (goodsError) setSnackBarOpen(true);
  }, [goodsError]);
  
  const handleClose = () => setSnackBarOpen(false);
  
  return (<div className='goods'>
    <GoodsStatusPapers
      totalGoodsCost={totalGoodsCost}
      getGoodsAmount={getGoodsAmount}
      getGoodsAmountByStatus={getGoodsAmountByStatus}
      itemPaperStatus={itemPaperStatus}
      onPaperStatusChange={onPaperStatusChange}
    />
    <GoodsList goods={[...goods] || []}/>
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={snackBarOpen}
      onClose={handleClose}
      message={goodsError}
    />
  </div>);
};

export default Goods;