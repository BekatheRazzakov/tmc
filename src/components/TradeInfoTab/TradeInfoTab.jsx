import React, { useEffect, useState } from 'react';
import {
  Box,
  ButtonGroup,
  Chip,
  Modal,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { formatDate, tradeStatuses } from '../../constants';
import { LoadingButton } from '@mui/lab';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { acceptTrade, deleteTrade, denyTrade } from '../../features/tradeThunk';
import { useNavigate } from 'react-router-dom';
import {
  resetTradeAcceptDenyData,
  resetTradeAcceptedDeniedData,
} from '../../features/tradeSlice';

const denyModalStyle = {
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

const TradeInfoTab = ({ trade, tradeLoading }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    acceptTradeLoading,
    denyTradeLoading,
    acceptTradeErrorMessage,
    denyTradeErrorMessage,
    tradeIsAccepted,
    tradeIsDenied,
  } = useAppSelector((state) => state.tradeState);
  const { user } = useAppSelector((state) => state.userState);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [denyModalOpen, setDenyModalOpen] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (acceptTradeErrorMessage || denyTradeErrorMessage) {
      setSnackBarOpen(true);
    }
  }, [acceptTradeErrorMessage, denyTradeErrorMessage, dispatch]);

  useEffect(() => {
    if (tradeIsAccepted || tradeIsDenied) navigate('/trades');
    return () => dispatch(resetTradeAcceptDenyData());
  }, [dispatch, navigate, tradeIsAccepted, tradeIsDenied]);

  const onAccept = async () => {
    dispatch(acceptTrade(trade?.id));
  };

  const onDeny = async (e) => {
    e.preventDefault();
    dispatch(
      denyTrade({
        id: trade?.id,
        comment,
      })
    );
  };

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
    dispatch(resetTradeAcceptedDeniedData());
  };

  const toggleDenyModal = () => setDenyModalOpen(!denyModalOpen);

  const onDeleteTrade = async () => {
    await dispatch(deleteTrade(trade?.id));
    navigate('/trades');
  };

  return (
    <Paper
      className="single-good-outer-paper"
      elevation={3}
      sx={{ maxWidth: 'unset!important' }}
    >
      <div className="single-good-info">
        {tradeLoading ? (
          <>
            <div className="single-good-info-row">
              <Typography component="span" variant="body1">
                <strong>От кого</strong>
              </Typography>
              <Skeleton
                variant="text"
                sx={{ fontSize: '1rem', width: '80px' }}
              />
            </div>
            <div className="single-good-info-divider"></div>
            <div className="single-good-info-row">
              <Typography component="span" variant="body1">
                <strong>Кому</strong>
              </Typography>
              <Skeleton
                variant="text"
                sx={{ fontSize: '1rem', width: '80px' }}
              />
            </div>
            <div className="single-good-info-divider"></div>
            <div className="single-good-info-row">
              <Typography component="span" variant="body1">
                <strong>ID товара</strong>
              </Typography>
              <Skeleton
                variant="text"
                sx={{ fontSize: '1rem', width: '80px' }}
              />
            </div>
            <div className="single-good-info-divider"></div>
            <div className="single-good-info-row">
              <Typography component="span" variant="body1">
                <strong>Дата создания</strong>
              </Typography>
              <Skeleton
                variant="text"
                sx={{ fontSize: '1rem', width: '80px' }}
              />
            </div>
            <div className="single-good-info-divider"></div>
            <div className="single-good-info-row">
              <Typography component="span" variant="body1">
                <strong>Статус</strong>
              </Typography>
              <Skeleton
                variant="text"
                sx={{ fontSize: '1rem', width: '80px' }}
              />
            </div>
            <div className="single-good-info-divider"></div>
          </>
        ) : (
          <>
            <div className="single-good-info-row">
              <Typography component="span" variant="body1">
                <strong>От кого</strong>
              </Typography>
              <Typography component="span" variant="body2">
                {trade?.source_user_name?.full_name}
              </Typography>
            </div>
            <div className="single-good-info-divider"></div>
            <div className="single-good-info-row">
              <Typography component="span" variant="body1">
                <strong>Кому</strong>
              </Typography>
              <Typography component="span" variant="body2">
                {trade?.destination_user_name?.full_name}
              </Typography>
            </div>
            <div className="single-good-info-divider"></div>
            <div className="single-good-info-row">
              <Typography component="span" variant="body1">
                <strong>ID товара</strong>
              </Typography>
              <Typography component="span" variant="body2">
                {trade?.good_id}
              </Typography>
            </div>
            <div className="single-good-info-divider"></div>
            <div className="single-good-info-row">
              <Typography component="span" variant="body1">
                <strong>Дата создания</strong>
              </Typography>
              <Typography component="span" variant="body2">
                {formatDate(trade?.create_date)}
              </Typography>
            </div>
            <div className="single-good-info-divider"></div>
            {trade?.trade_status_id === 2 && (
              <>
                <div className="single-good-info-row">
                  <Typography component="span" variant="body1">
                    <strong>Дата принятия</strong>
                  </Typography>
                  <Typography component="span" variant="body2">
                    {formatDate(trade?.approved_date)}
                  </Typography>
                </div>
                <div className="single-good-info-divider"></div>
              </>
            )}
            {trade?.trade_status_id === 3 && (
              <>
                <div className="single-good-info-row">
                  <Typography component="span" variant="body1">
                    <strong>Комментарий</strong>
                  </Typography>
                  <Typography component="span" variant="body2">
                    {trade?.comment}
                  </Typography>
                </div>
                <div className="single-good-info-divider"></div>
              </>
            )}
            <div className="single-good-info-row">
              <Typography component="span" variant="body1">
                <strong>Статус</strong>
              </Typography>
              <Typography component="span" variant="body2">
                {
                  <Chip
                    color={
                      tradeStatuses[trade?.trade_status_id - 1]?.color ||
                      'default'
                    }
                    label={
                      tradeStatuses[trade?.trade_status_id - 1]?.value || '-'
                    }
                    size="small"
                  />
                }
              </Typography>
            </div>
            <div
              className="single-good-info-divider"
              style={{ marginTop: '5px' }}
            ></div>
          </>
        )}
      </div>
      {trade?.trade_status?.id === 1 &&
        trade?.destination_user_name?.id === user?.id && (
          <ButtonGroup
            variant="outlined"
            aria-label="Loading button group"
            fullWidth
          >
            <LoadingButton
              loadingPosition="start"
              startIcon={<CloseIcon />}
              color="error"
              onClick={toggleDenyModal}
            >
              Отклонить
            </LoadingButton>
            <LoadingButton
              loadingPosition="start"
              startIcon={<CheckIcon />}
              color="success"
              loading={acceptTradeLoading}
              onClick={onAccept}
            >
              Принять
            </LoadingButton>
          </ButtonGroup>
        )}
      {user?.role === 'admin' && (
        <ButtonGroup
          variant="outlined"
          aria-label="Loading button group"
          fullWidth
        >
          <LoadingButton
            loadingPosition="start"
            startIcon={<CloseIcon />}
            color="error"
            onClick={onDeleteTrade}
          >
            Удалить
          </LoadingButton>
        </ButtonGroup>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackBarOpen}
        onClose={handleSnackBarClose}
        message={acceptTradeErrorMessage || denyTradeErrorMessage}
      />
      <Modal
        open={denyModalOpen}
        onClose={toggleDenyModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={denyModalStyle} component="form" onSubmit={onDeny}>
          <TextField
            id="filled-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
            variant="filled"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <LoadingButton
            loadingPosition="start"
            variant="contained"
            startIcon={<CheckIcon />}
            color="error"
            loading={denyTradeLoading}
            type="submit"
          >
            Отколнить
          </LoadingButton>
        </Box>
      </Modal>
    </Paper>
  );
};

export default TradeInfoTab;
