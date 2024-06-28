import React from 'react';
import { Paper } from "@mui/material";
import CreateEditGoodForm
  from "../../components/CreateEditGoodForm/CreateEditGoodForm";
import './newGood.css';

const NewGood = () => {
  return (<div className='new-good-form-container'>
    <Paper className='new-good-form-paper' elevation={3}>
      <CreateEditGoodForm/>
    </Paper>
  </div>);
};

export default NewGood;