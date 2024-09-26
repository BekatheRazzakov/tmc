import React, { useEffect } from 'react';
import { Paper } from '@mui/material';
import CreateEditGoodForm from '../../components/CreateEditGoodForm/CreateEditGoodForm';
import { useAppDispatch } from '../../app/hooks';
import { setCurrentPage } from '../../features/dataSlice';
import './newGood.css';

const NewGood = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage('Создать товар'));
  }, [dispatch]);

  return (
    <div className="new-good-form-container">
      <Paper className="new-good-form-paper" elevation={3}>
        <CreateEditGoodForm />
      </Paper>
    </div>
  );
};

export default NewGood;
