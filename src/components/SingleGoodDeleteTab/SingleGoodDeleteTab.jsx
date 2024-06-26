import React from 'react';
import DeleteWarningImg from '../../assets/delete-warning.svg';
import { Button } from "@mui/material";

const SingleGoodDeleteTab = () => {
  return (
    <div className="single-good-delete-tab">
      <div className='single-good-delete-tab-left'>
        <img src={DeleteWarningImg} alt='Удаление'/>
      </div>
      <div className='single-good-delete-tab-right'>
        <h1>Уверены что хотите удалить ТМЦ?</h1>
        <h3>После удаления у вас больше не будет доступа к нему!</h3>
        <Button className="single-good-delete-tab-btn" sx={{mt: '20px'}} variant="contained" color="error">
          Удалить
        </Button>
      </div>
    </div>
  );
};

export default SingleGoodDeleteTab;