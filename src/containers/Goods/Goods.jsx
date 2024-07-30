import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { resetGoodsError, setCurrentPage } from "../../features/dataSlice";
import { getAllGoods, getCategories, getGoods } from "../../features/dataThunk";
import { useAppSelector } from "../../app/hooks";
import GoodsStatusPapers
  from "../../components/GoodsStatusPapers/GoodsStatusPapers";
import GoodsList from "../../components/GoodsList/GoodsList";
import { Snackbar } from "@mui/material";
import './goods.css';

const Goods = () => {
  const dispatch = useDispatch();
  const { goods, allGoods, goodsError } = useAppSelector(state => state.dataState);
  const [itemPaperStatus, setItemPaperStatus] = useState(1);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  
  const totalGoodsCost = allGoods?.reduce((acc, value) => acc + (
    value?.product?.cost || 0
  ), 0) || 0;
  const getGoodsAmountByStatus = useCallback(() => allGoods?.filter(good => good?.good_status?.id === itemPaperStatus)?.length, [allGoods, itemPaperStatus]);
  const getGoodsAmount = useCallback(() => allGoods?.length, [allGoods]);
  
  useEffect(() => {
    dispatch(setCurrentPage('Товары'));
    dispatch(getGoods());
    dispatch(getAllGoods());
    dispatch(getCategories());
    return () => dispatch(resetGoodsError());
  }, [dispatch]);
  
  const onPaperStatusChange = (value) => setItemPaperStatus(value);
  
  useEffect(() => {
    if (goodsError) setSnackBarOpen(true);
  }, [goodsError]);
  
  const handleClose = () => setSnackBarOpen(false);
  
  return (
    <div className='goods'>
      <GoodsStatusPapers
        totalGoodsCost={totalGoodsCost}
        getGoodsAmount={getGoodsAmount}
        getGoodsAmountByStatus={getGoodsAmountByStatus}
        itemPaperStatus={itemPaperStatus}
        onPaperStatusChange={onPaperStatusChange}
      />
      <GoodsList goods={[...goods] || []}/>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackBarOpen}
        onClose={handleClose}
        message={goodsError}
      />
    </div>
  );
};

export default Goods;