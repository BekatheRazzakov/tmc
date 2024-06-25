import React, { useEffect, useState, lazy, Suspense } from 'react';
import { setCurrentPage } from "../../features/dataSlice";
import { getGood } from "../../features/dataThunk";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useParams } from "react-router-dom";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import './singleGood.css';

const GoodInfoTab = lazy(() => import('../../components/GoodInfoTab/GoodInfoTab'));

const SingleGood = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const {good, goodLoading, goodError} = useAppSelector(state => state.dataState);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [value, setValue] = React.useState(0);
  
  useEffect(() => {
    dispatch(setCurrentPage('Просмотр товара'));
    dispatch(getGood(params?.id));
  }, [dispatch, params.id]);
  
  useEffect(() => {
    if (goodError) setSnackBarOpen(true);
  }, [goodError]);
  
  const handleSnackBarClose = () => setSnackBarOpen(false);
  
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (<div className="single-good-page">
    <Box>
      <Tabs
        value={value} onChange={handleTabChange}
        aria-label="basic tabs example"
        variant="scrollable"
      >
        <Tab className="single-good-tab-btn" label="Информация"/>
        <Tab className="single-good-tab-btn" label="Редактировать"/>
        <Tab className="single-good-tab-btn" label="Удалить"/>
      </Tabs>
    </Box>
    <div className="single-good-page-papers" style={{display: value === 0 ? 'flex' : 'none'}}>
      <Suspense fallback={<></>}>
        <GoodInfoTab
          good={good}
          goodLoading={goodLoading}
          goodError={goodError}
          snackBarOpen={snackBarOpen}
          handleClose={handleSnackBarClose}
        />
      </Suspense>
    </div>
    <Paper sx={{p: '40px', display: value === 1 ? 'block' : 'none'}} elevation={3}>hello1</Paper>
    <Paper sx={{p: '40px', display: value === 2 ? 'block' : 'none'}} elevation={3}>Hello2</Paper>
  </div>);
};

export default SingleGood;