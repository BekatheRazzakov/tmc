import React from 'react';
import { ButtonGroup, Chip, Paper, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { formatDate, goodStatuses } from "../../constants";
import { LoadingButton } from "@mui/lab";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const TradeInfoTab = ({
  trade, tradeLoading
}) => {
  return (
    <Paper className='single-good-outer-paper'
      elevation={3}
      sx={{ maxWidth: 'unset!important' }}>
      <div className='single-good-info'>
        {tradeLoading ? <>
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
        </> : <>
          <div className='single-good-info-row'>
            <Typography component='span'
              variant='body1'><strong>От кого</strong></Typography>
            <Typography component='span'
              variant='body2'>{trade?.source_user_id}</Typography>
          </div>
          <div className='single-good-info-divider'></div>
          <div className='single-good-info-row'>
            <Typography component='span'
              variant='body1'><strong>Кому</strong></Typography>
            <Typography component='span'
              variant='body2'>{trade?.destination_user_id}</Typography>
          </div>
          <div className='single-good-info-divider'></div>
          <div className='single-good-info-row'>
            <Typography component='span'
              variant='body1'><strong>ID товара</strong></Typography>
            <Typography component='span'
              variant='body2'>{trade?.good_id}</Typography>
          </div>
          <div className='single-good-info-divider'></div>
          <div className='single-good-info-row'>
            <Typography component='span'
              variant='body1'><strong>Дата создания</strong></Typography>
            <Typography component='span'
              variant='body2'>{formatDate(trade?.approved_date)}</Typography>
          </div>
          <div className='single-good-info-divider'></div>
          <div className='single-good-info-row'>
            <Typography component='span'
              variant='body1'><strong>Комментарий</strong></Typography>
            <Typography component='span'
              variant='body2'>{trade?.comment}</Typography>
          </div>
          <div className='single-good-info-divider'></div>
          <div className='single-good-info-row'>
            <Typography component='span'
              variant='body1'><strong>Статус</strong></Typography>
            <Typography component='span' variant='body2'>
              {<Chip
                color={goodStatuses[trade?.good_status?.id - 1]?.color || 'default'}
                label={goodStatuses[trade?.good_status?.id - 1]?.value || '-'}
                size='small'
              />}
            </Typography>
          </div>
          <div className='single-good-info-divider'
            style={{ marginTop: '5px' }}></div>
        </>}
      </div>
      {
        trade?.trade_status_id === 1 &&
        <ButtonGroup variant='outlined'
          aria-label='Loading button group'
          fullWidth>
          <LoadingButton loadingPosition='start'
            startIcon={<CloseIcon/>}
            color='error'>
            Отклонить
          </LoadingButton>
          <LoadingButton loadingPosition='start'
            startIcon={<CheckIcon/>}
            color='success'>
            Принять
          </LoadingButton>
        </ButtonGroup>
      }
    </Paper>
  );
};

export default TradeInfoTab;