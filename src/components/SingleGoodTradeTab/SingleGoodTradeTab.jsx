import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Box, FormControl, Snackbar, TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { getUsers } from "../../features/userThunk";
import {
  resetCreateGoodData,
} from "../../features/dataSlice";
import { resetCreateTradeData } from "../../features/tradeSlice";
import { createTrade } from "../../features/tradeThunk";

const SingleGoodTrageTab = ({ goodId }) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const {
    users, usersLoading, usersErrorMessage, user
  } = useAppSelector(state => state.userState);
  const {
    createTradeLoading, tradeIsCreated, createTradeErrorMessage
  } = useAppSelector(state => state.tradeState);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [state, setState] = useState(null);
  
  useEffect(() => {
    dispatch(getUsers());
    return () => dispatch(resetCreateGoodData());
  }, [dispatch]);
  
  useEffect(() => {
    if (usersErrorMessage || createTradeErrorMessage || tradeIsCreated) setSnackBarOpen(true);
  }, [createTradeErrorMessage, tradeIsCreated, usersErrorMessage]);
  
  const handleChange = (e) => {
    const { innerText } = e.target;
    const selectedUser = users.filter(user => user?.username === innerText)[0];
    
    setState(() => (
      {
        id: selectedUser?.id, username: selectedUser?.username,
      }
    ));
  };
  
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
    dispatch(resetCreateTradeData());
  }
  
  const onTradeSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createTrade({
      good_id: Number(params?.id),
      source_user_id: user?.id,
      destination_user_id: 25,
      trade_status_id: 1,
    }));
  };
  
  return (
    <div className='single-good-delete-tab' style={{ flexDirection: 'column' }}>
      <div className='single-good-delete-tab-right'>
        <h1>Выберите пользователя для передачи товара</h1>
        <h3>После передачи ТЦМ другому у вас больше не будет доступа к нему!</h3>
      </div>
      <Box className='single-good-trade-form'
        component='form'
        onSubmit={onTradeSubmit}>
        <FormControl required fullWidth>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={users.map(user => user?.username || '') || []}
            value={state?.username}
            onChange={handleChange}
            renderInput={(params) =>
              <TextField {...params} label='Выберите пользователя'/>}
          />
          <LoadingButton
            type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}
            disabled={usersLoading}
            loading={createTradeLoading}
          >
            Передать
          </LoadingButton>
        </FormControl>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackBarOpen}
        onClose={handleSnackBarClose}
        message={usersErrorMessage || createTradeErrorMessage || 'Что то пошло не так, попробуйте позже'}
      />
    </div>
  );
};

export default SingleGoodTrageTab;