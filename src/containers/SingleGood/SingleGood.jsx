import React, { useEffect, useState } from 'react';
import { setCurrentPage } from "../../features/dataSlice";
import { getGood } from "../../features/dataThunk";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useParams } from "react-router-dom";
import { Box, Chip, Paper, Snackbar, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import notFoundImage from '../../assets/not-found-img.png';
import './singleGood.css';

const SingleGood = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const {good, goodLoading, goodError} = useAppSelector(state => state.dataState);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  
  useEffect(() => {
    dispatch(setCurrentPage('Просмотр товара'));
    dispatch(getGood(params?.id));
  }, [dispatch, params.id]);
  
  useEffect(() => {
    if (goodError) setSnackBarOpen(true);
  }, [goodError]);
  
  const handleClose = () => setSnackBarOpen(false);
  
  return (<div className="single-good-page">
    <Paper className="single-good-outer-paper" elevation={3}>
      {goodLoading ? <>
        <Skeleton variant="text" sx={{fontSize: '8rem', minWidth: '200px', transform: 'unset',}}/>
        <Skeleton variant="text" sx={{fontSize: '1.2rem', minWidth: '200px', transform: 'unset'}}/>
        <Skeleton variant="text" sx={{fontSize: '1rem', minWidth: '200px', transform: 'unset'}}/>
      </> : <>
        <img
          className="single-good-img"
          src={good?.img || notFoundImage}
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
          <div className="single-good-info-row">
            <Typography component="span" variant="body1"><strong>Статус</strong></Typography>
            <Typography component="span" variant="body2">
              {<Chip
                color={
                  good?.good_status_id === 1 ? 'primary' : good?.good_status_id === 2 ? 'secondary' :
                    good?.good_status_id === 3 ? 'warning' : good?.good_status_id === 4 ? 'success' : 'default'}
                label={
                  good?.good_status_id === 1 ? 'на складе' : good?.good_status_id === 2 ? 'у начальника участка' :
                    good?.good_status_id === 3 ? 'у сервис инженера' : good?.good_status_id === 4 ? 'у абонента' : '-'
                }
                size="small"
              />}
            </Typography>
          </div>
          <div className="single-good-info-divider" style={{marginTop: '5px'}}></div>
        </>}
      </div>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={snackBarOpen}
        onClose={handleClose}
        message={goodError}
      />
    </Paper>
  </div>);
};

export default SingleGood;