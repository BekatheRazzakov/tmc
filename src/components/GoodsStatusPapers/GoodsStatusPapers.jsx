import React from 'react';
import { Box, FormControl, MenuItem, Paper, Select, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useAppSelector } from "../../app/hooks";
import Skeleton from "@mui/material/Skeleton";

const GoodsStatusPapers = (
  {
    totalGoodsCost,
    getGoodsAmount,
    getGoodsAmountByStatus,
    itemPaperStatus,
    onPaperStatusChange
  }
) => {
  const {goodsLoading} = useAppSelector(state => state.dataState);
  
  return (
    <div className="goods-statuses">
      <Paper
        className="goods-status-paper"
        elevation={3}
        sx={{
          bgcolor: '#eee6ff',
          color: '#6c39d2',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Box className="goods-paper-title">
          <Typography variant="body1" component="span">Общая стоимость</Typography>
          <AttachMoneyIcon/>
        </Box>
        {
          goodsLoading ?
            <Skeleton variant="text" sx={{fontSize: '1rem', maxWidth: '120px', transform: 'unset', mt: '20px'}}/> :
            <Typography
              className="goods-paper-value" variant="h5"
              component="h5"
            >
              {totalGoodsCost}<strong>c</strong>
            </Typography>
        }
      </Paper>
      <Paper
        className="goods-status-paper"
        elevation={3}
        sx={{
          bgcolor: 'rgba(92, 125, 252, 0.15)', color: '#485fb3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Box className="goods-paper-title">
          <Typography variant="body1" component="span">Всего ТМЦ</Typography>
          <CategoryIcon/>
        </Box>
        {
          goodsLoading ?
            <Skeleton variant="text" sx={{fontSize: '1rem', maxWidth: '120px', transform: 'unset', mt: '20px'}}/> :
            <Typography className="goods-paper-value" variant="h5" component="h5">
              {getGoodsAmount()} <span>тмц</span></Typography>
        }
      </Paper>
      <Paper
        className="goods-status-paper"
        elevation={3}
        sx={{
          bgcolor: '#fff4de', color: '#feaf19',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Box className="goods-paper-title">
          <FormControl variant="standard" sx={{minWidth: 200}}>
            <Select
              className="goods-status-paper-select"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={itemPaperStatus}
              onChange={(e) => onPaperStatusChange(e.target.value)}
              label="Статус"
            >
              <MenuItem value={1}>На складе</MenuItem>
              <MenuItem value={2}>У начальника участка</MenuItem>
              <MenuItem value={3}>У СИ</MenuItem>
            </Select>
          </FormControl>
          {
            itemPaperStatus === 1 ? <WarehouseIcon/> :
              itemPaperStatus === 2 ? <ManageAccountsIcon/> : <EngineeringIcon/>
          }
        </Box>
        {
          goodsLoading ?
            <Skeleton variant="text" sx={{fontSize: '1rem', maxWidth: '120px', transform: 'unset', mt: '20px'}}/> :
            <Typography className="goods-paper-value" variant="h5" component="h5">
              {getGoodsAmountByStatus()} <span>тмц</span>
            </Typography>
        }
      </Paper>
    </div>
  );
};

export default GoodsStatusPapers;