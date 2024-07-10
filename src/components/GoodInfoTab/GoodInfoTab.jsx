import React from 'react';
import { Box, Chip, Paper, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import notFoundImage from "../../assets/not-found-img.png";
import { goodStatuses, tradeStatuses } from "../../constants";

const GoodInfoTab = ({
  good, goodLoading
}) => {
  return (
    <>
      <Paper className='single-good-outer-paper' elevation={3}>
        {goodLoading ? <>
          <Skeleton variant='text'
            className='single-good-info-skeleton'
            sx={{ fontSize: '8rem', }}
          />
          <Skeleton variant='text'
            className='single-good-info-skeleton'
            sx={{ fontSize: '1.2rem', }}
          />
          <Skeleton variant='text'
            className='single-good-info-skeleton'
            sx={{ fontSize: '1rem', }}
          />
        </> : <>
          <img
            className='single-good-img'
            src={good?.photo_path ? 'data:image/png;base64,' + good?.photo_path : notFoundImage}
            alt={'image'}
            loading='lazy'
          />
          <Box sx={{ mt: 1 }}>
            <Typography className='single-good-title'
              component='h5'
              variant='h5'>{good?.product?.manufacture?.name}</Typography>
            <Typography className='single-good-value'
              component='span'
              variant='body2'>{good?.product?.model?.name}</Typography>
          </Box>
        </>}
      </Paper>
      <Paper className='single-good-outer-paper' elevation={3}>
        <div className='single-good-info'>
          {goodLoading ? <>
            <div className='single-good-info-row'>
              <Typography component='span'
                variant='body1'><strong>производитель</strong></Typography>
              <Skeleton variant='text'
                sx={{ fontSize: '1rem', width: '80px' }}/>
            </div>
            <div className='single-good-info-divider'></div>
            <div className='single-good-info-row'>
              <Typography component='span'
                variant='body1'><strong>Модель</strong></Typography>
              <Skeleton variant='text'
                sx={{ fontSize: '1rem', width: '80px' }}/>
            </div>
            <div className='single-good-info-divider'></div>
            <div className='single-good-info-row'>
              <Typography component='span'
                variant='body1'><strong>Цена</strong></Typography>
              <Skeleton variant='text'
                sx={{ fontSize: '1rem', width: '80px' }}/>
            </div>
            <div className='single-good-info-divider'></div>
            <div className='single-good-info-row'>
              <Typography component='span'
                variant='body1'><strong>Штрих код</strong></Typography>
              <Skeleton variant='text'
                sx={{ fontSize: '1rem', width: '80px' }}/>
            </div>
            <div className='single-good-info-divider'></div>
            <div className='single-good-info-row'>
              <Typography component='span'
                variant='body1'><strong>Статус ТМЦ</strong></Typography>
              <Skeleton variant='text'
                sx={{ fontSize: '1rem', width: '80px' }}/>
            </div>
            <div className='single-good-info-divider'></div>
            <div className='single-good-info-row'>
              <Typography component='span'
                variant='body1'><strong>Статус трейда</strong></Typography>
              <Skeleton variant='text'
                sx={{ fontSize: '1rem', width: '80px' }}/>
            </div>
            <div className='single-good-info-divider'></div>
          </> : <>
            <div className='single-good-info-row'>
              <Typography component='span'
                variant='body1'><strong>производитель</strong></Typography>
              <Typography component='span'
                variant='body2'>{good?.product?.manufacture?.name}</Typography>
            </div>
            <div className='single-good-info-divider'></div>
            <div className='single-good-info-row'>
              <Typography component='span'
                variant='body1'><strong>Модель</strong></Typography>
              <Typography component='span'
                variant='body2'>{good?.product?.model?.name}</Typography>
            </div>
            <div className='single-good-info-divider'></div>
            <div className='single-good-info-row'>
              <Typography component='span'
                variant='body1'><strong>Цена</strong></Typography>
              <Typography component='span'
                variant='body2'>{good?.product?.cost}</Typography>
            </div>
            <div className='single-good-info-divider'></div>
            <div className='single-good-info-row'>
              <Typography component='span'
                variant='body1'><strong>Штрих код</strong></Typography>
              <Typography component='span'
                variant='body2'>{good?.barcode}</Typography>
            </div>
            <div className='single-good-info-divider'></div>
            <div className='single-good-info-row'>
              <Typography component='span'
                variant='body1'><strong>Статус ТМЦ</strong></Typography>
              <Typography component='span' variant='body2'>
                {<Chip
                  color={goodStatuses[good?.good_status?.id - 1]?.color || 'default'}
                  label={goodStatuses[good?.good_status?.id - 1]?.value || '-'}
                  size='small'
                />}
              </Typography>
            </div>
            <div className='single-good-info-divider'
              style={{ marginTop: '5px' }}></div>
            <div className='single-good-info-row'>
              <Typography component='span'
                variant='body1'><strong>Статус трейда</strong></Typography>
              <Typography component='span' variant='body2'>
                {<Chip
                  color={good?.trade_status ? tradeStatuses[good?.trade_status?.id - 1]?.color : 'default'}
                  label={good?.trade_status ? tradeStatuses[good?.trade_status?.id - 1]?.value : '-'}
                  size='small'
                />}
              </Typography>
            </div>
            <div className='single-good-info-divider'
              style={{ marginTop: '5px' }}></div>
          </>}
        </div>
      </Paper>
    </>
  );
};

export default GoodInfoTab;