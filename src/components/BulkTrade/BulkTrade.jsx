import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  FormControl,
  Modal,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUsers } from '../../features/userThunk';
import { resetCreateGoodData } from '../../features/dataSlice';
import { createTrades } from '../../features/tradeThunk';

const bulkTradeModalStyle = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const BulkTrade = ({ open, toggleModal, selectedGoods }) => {
  const dispatch = useAppDispatch();
  const { users, usersLoading, user } = useAppSelector(
    (state) => state.userState
  );
  const { createTradesLoading } = useAppSelector((state) => state.tradeState);
  const [state, setState] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
    return () => dispatch(resetCreateGoodData());
  }, [dispatch]);

  const handleChange = (e) => {
    const { innerText } = e.target;
    const selectedUser = users.filter(
      (user) => user?.full_name === innerText
    )[0];

    setState(() => ({
      id: selectedUser?.id,
      username: selectedUser?.username,
    }));
  };

  const onTradeSubmit = async (e) => {
    e.preventDefault();
    const readyForTrades = selectedGoods.map((good) => ({
      source_user_id: user?.id,
      destination_user_id: state?.id,
      good_id: good?.id,
      trade_status_id: 1,
    }));
    dispatch(
      createTrades({
        trades: readyForTrades,
      })
    );
  };

  return (
    <Modal
      open={open}
      onClose={() => toggleModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="single-good-trade-form"
        component="form"
        onSubmit={onTradeSubmit}
      >
        <FormControl required fullWidth sx={bulkTradeModalStyle}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={users.map((user) => user?.full_name || '') || []}
            value={state?.username}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField {...params} label="Выберите пользователя" />
            )}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={usersLoading || !state?.username}
            loading={createTradesLoading}
          >
            Передать
          </LoadingButton>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default BulkTrade;
