import React, { useEffect } from 'react';
import { setCurrentPage } from "../../features/dataSlice";
import { getGood } from "../../features/dataThunk";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import './singleGood.css';
import { useParams } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const SingleGood = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const {good, goodLoading} = useAppSelector(state => state.dataState);
  
  useEffect(() => {
    dispatch(setCurrentPage('Просмотр товара'));
    dispatch(getGood(params?.id));
  }, [dispatch, params.id]);
  
  return (<div className="single-good-page">
    <Paper className="single-good-outer-paper" elevation={3}>
      {goodLoading ? <>
        <Skeleton variant="text" sx={{fontSize: '8rem', minWidth: '200px', transform: 'unset', }}/>
        <Skeleton variant="text" sx={{fontSize: '1.2rem', minWidth: '200px', transform: 'unset'}}/>
        <Skeleton variant="text" sx={{fontSize: '1rem', minWidth: '200px', transform: 'unset'}}/>
      </> : <>
        <img
          className="single-good-img"
          src={`https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=121&h=121&fit=crop&auto=format&dpr=2`}
          alt={'image'}
          loading="lazy"
        />
        <Box sx={{mt: 1}}>
          <Typography className="single-good-title" component="h5" variant="h5">{good?.manufacture}</Typography>
          <Typography className="single-good-value" component="body2" variant="body2">{good?.model}</Typography>
        </Box>
      </>}
    </Paper>
    <Paper className="single-good-outer-paper" elevation={3}>
      <div className="single-good-info">
        {goodLoading ? <>
          <div className="single-good-info-row">
            <Typography component="span" variant="body1"><strong>производитель</strong></Typography>
            <Skeleton variant="text" sx={{fontSize: '1rem', width: '80px'}}/>
          </div>
          <div className="single-good-info-divider"></div>
          <div className="single-good-info-row">
            <Typography component="span" variant="body1"><strong>Модель</strong></Typography>
            <Skeleton variant="text" sx={{fontSize: '1rem', width: '80px'}}/>
          </div>
          <div className="single-good-info-divider"></div>
          <div className="single-good-info-row">
            <Typography component="span" variant="body1"><strong>Цена</strong></Typography>
            <Skeleton variant="text" sx={{fontSize: '1rem', width: '80px'}}/>
          </div>
          <div className="single-good-info-divider"></div>
          <div className="single-good-info-row">
            <Typography component="span" variant="body1"><strong>Штрих код</strong></Typography>
            <Skeleton variant="text" sx={{fontSize: '1rem', width: '80px'}}/>
          </div>
          <div className="single-good-info-divider"></div>
        </> : <>
          <div className="single-good-info-row">
            <Typography component="span" variant="body1"><strong>производитель</strong></Typography>
            <Typography component="span" variant="body2">{good?.manufacture}</Typography>
          </div>
          <div className="single-good-info-divider"></div>
          <div className="single-good-info-row">
            <Typography component="span" variant="body1"><strong>Модель</strong></Typography>
            <Typography component="span" variant="body2">{good?.model}</Typography>
          </div>
          <div className="single-good-info-divider"></div>
          <div className="single-good-info-row">
            <Typography component="span" variant="body1"><strong>Цена</strong></Typography>
            <Typography component="span" variant="body2">{good?.cost}</Typography>
          </div>
          <div className="single-good-info-divider"></div>
          <div className="single-good-info-row">
            <Typography component="span" variant="body1"><strong>Штрих код</strong></Typography>
            <Typography component="span" variant="body2">{good?.barcode}</Typography>
          </div>
          <div className="single-good-info-divider"></div>
        </>}
      </div>
    </Paper>
  </div>);
};

export default SingleGood;