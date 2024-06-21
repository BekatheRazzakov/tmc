import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/dataSlice";
import { getGoods } from "../../features/dataThunk";
import { useAppSelector } from "../../app/hooks";
import GoodsStatusPapers from "../../components/GoodsStatusPapers/GoodsStatusPapers";
import GoodsList from "../../components/GoodsList/GoodsList";
import './goods.css';

const Goods = () => {
  const dispatch = useDispatch();
  const {goods} = useAppSelector(state => state.dataState);
  const [itemPaperStatus, setItemPaperStatus] = useState(1);
  const totalGoodsCost = goods?.reduce((acc, value) => acc + value?.cost, 0) || 0;
  
  const getGoodsAmountByStatus = useCallback(() => goods?.filter(good => good?.good_status_id === itemPaperStatus)?.length, [goods, itemPaperStatus]);
  const getGoodsAmount = useCallback(() => goods?.length, [goods]);
  
  useEffect(() => {
    dispatch(setCurrentPage('Товары'));
    dispatch(getGoods());
  }, [dispatch]);
  
  const onPaperStatusChange = (value) => setItemPaperStatus(value);
  
  return (
    <div className="goods">
      <GoodsStatusPapers
        totalGoodsCost={totalGoodsCost}
        getGoodsAmount={getGoodsAmount}
        getGoodsAmountByStatus={getGoodsAmountByStatus}
        itemPaperStatus={itemPaperStatus}
        onPaperStatusChange={onPaperStatusChange}
      />
      <GoodsList goods={goods || []}/>
    </div>
  );
};

export default Goods;