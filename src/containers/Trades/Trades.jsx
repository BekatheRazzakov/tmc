import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/dataSlice";
import { useAppSelector } from "../../app/hooks";
import { Snackbar } from "@mui/material";
import TradesList from "../../components/TradesList/TradesList";
import { getTrades } from "../../features/tradeThunk";
import { resetTradesErrorData } from "../../features/tradeSlice";
import './trades.css';

const Trades = () => {
  const dispatch = useDispatch();
  const {
    trades, tradesErrorMessage
  } = useAppSelector(state => state.tradeState);
  const {
    user
  } = useAppSelector(state => state.userState);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  
  useEffect(() => {
    dispatch(setCurrentPage('Трейды'));
    dispatch(getTrades({ id: user?.id }));
    return () => dispatch(resetTradesErrorData());
  }, [dispatch, user?.id]);
  
  useEffect(() => {
    if (tradesErrorMessage) setSnackBarOpen(true);
  }, [tradesErrorMessage]);
  
  const handleClose = () => setSnackBarOpen(false);
  
  return (
    <div className='goods'>
      <TradesList trades={[...trades] || []}/>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackBarOpen}
        onClose={handleClose}
        message={tradesErrorMessage}
      />
    </div>
  );
};

export default Trades;