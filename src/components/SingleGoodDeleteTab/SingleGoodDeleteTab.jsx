import React from 'react';
import DeleteWarningImg from '../../assets/delete-warning.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteGood } from '../../features/dataThunk';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

const SingleGoodDeleteTab = ({ goodId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { deleteGoodLoading } = useAppSelector((state) => state.dataState);

  const onDelete = async () => {
    await dispatch(deleteGood(goodId));
    navigate('/goods');
  };

  return (
    <div className="single-good-delete-tab">
      <div className="single-good-delete-tab-left">
        <img src={DeleteWarningImg} alt="Удаление" />
      </div>
      <div className="single-good-delete-tab-right">
        <h1>Уверены что хотите удалить ТМЦ?</h1>
        <h3>После удаления у вас больше не будет доступа к нему!</h3>
        <LoadingButton
          className="single-good-delete-tab-btn"
          sx={{ mt: '20px' }}
          variant="contained"
          color="error"
          onClick={onDelete}
          loading={deleteGoodLoading}
        >
          Удалить
        </LoadingButton>
      </div>
    </div>
  );
};

export default SingleGoodDeleteTab;
