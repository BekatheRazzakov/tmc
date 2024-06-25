import React, { useCallback, useState } from 'react';
import {
  AppBar,
  Box,
  Checkbox,
  Chip,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useDispatch, useSelector } from 'react-redux';
import { setAllGoodsSelected, setGoodSelected } from "../../features/dataSlice";
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from "react-router-dom";

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1), width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit', width: '100%', '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '13ch', '&:focus': {
        width: '25ch',
      },
    },
  },
}));

const columns = [{
  id: 'manufacture', label: 'Производитель', minWidth: 70, align: 'center',
}, {
  id: 'model', label: 'Модель', minWidth: 170, align: 'center',
}, {
  id: 'cost',
  label: 'Цена',
  minWidth: 100,
  align: 'center',
  format: (value) => <span>{value} <span style={{textDecoration: 'underline'}}>c</span></span>,
}, {
  id: 'good_status_id', label: 'Статус', minWidth: 200, align: 'center', format: (value) => <Chip
    label={value === 1 ? 'На складе' : value === 2 ? 'У начальника участка' : 'У СИ'}
    color={value === 1 ? 'warning' : value === 2 ? 'primary' : 'secondary'}
    sx={{height: '22px', fontSize: '12px', lineHeight: '12px',}}
  />,
}, {id: 'barcode', label: 'Штрих код', minWidth: 120, align: 'center',},];

const GoodsList = ({goods}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [searchWord, setSearchWord] = useState('');
  const [sortBy, setSortBy] = useState('manufacture');
  const {goodsLoading} = useSelector(state => state.dataState);
  
  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };
  
  const sortedByManufacture = useCallback(() => {
    return (goods || []).sort((a, b) => a?.manufacture.localeCompare(b?.manufacture));
  }, [goods]);
  
  const sortedByModel = useCallback(() => {
    return (goods || []).sort((a, b) => a?.model.localeCompare(b?.model));
  }, [goods]);
  
  const sortedByCost = useCallback(() => {
    return (goods || []).sort((a, b) => a.cost - b.cost);
  }, [goods]);
  
  const sortedByStatusInStorage = useCallback(() => {
    return (goods || []).filter(good => good.good_status_id === 1);
  }, [goods]);
  
  const sortedByStatusNU = useCallback(() => {
    return (goods || []).filter(good => good.good_status_id === 2);
  }, [goods]);
  
  const sortedByStatusSI = useCallback(() => {
    return (goods || []).filter(good => good.good_status_id === 3);
  }, [goods]);
  
  const filteredGoodsList = useCallback(() => {
    const sortedGoods = (sortBy === 'manufacture' ? sortedByManufacture() : sortBy === 'model' ? sortedByModel() : sortBy === 'cost-increase' ? sortedByCost() : sortBy === 'cost-decrease' ? sortedByCost().reverse() : sortBy === 'status-in-storage' ? sortedByStatusInStorage() : sortBy === 'status-nu' ? sortedByStatusNU() : sortBy === 'status-si' ? sortedByStatusSI() : []);
    return sortedGoods.filter(good => good?.manufacture.toLowerCase().includes(searchWord.toLowerCase()) || good?.model.toLowerCase().includes(searchWord.toLowerCase()) || good?.cost.toString().includes(searchWord));
  }, [searchWord, sortBy, sortedByCost, sortedByManufacture, sortedByModel, sortedByStatusInStorage, sortedByStatusNU, sortedByStatusSI]);
  
  const checkBoxColumn = useCallback(id => {
    const allChecked = filteredGoodsList().filter(good => good.selected === 1).length === filteredGoodsList().length;
    return {
      id: 'selected', label: <Checkbox
        color="primary"
        checked={filteredGoodsList()?.length ? allChecked : false}
        onChange={() => {
          if (!goods && !goodsLoading) return;
          dispatch(setAllGoodsSelected({status: allChecked ? 0 : 1}));
        }}
        inputProps={{
          'aria-label': 'Выбрать все',
        }}
      />, minWidth: 70, align: 'center', format: (value) => <Checkbox
        onClick={(e) => e.stopPropagation()}
        color="primary"
        checked={value === 1}
        onChange={() => {
          dispatch(setGoodSelected({id, status: value === 1 ? 0 : 1}));
        }}
        inputProps={{
          'aria-label': 'Выбрать',
        }}
      />,
    };
  }, [dispatch, filteredGoodsList, goods, goodsLoading]);
  
  return (
    <Paper elevation={4} sx={{m: '30px 10px 0', borderRadius: '10px', overflow: 'hidden'}}>
      <Box sx={{flexGrow: 1}}>
        <AppBar className="goods-list-toolbar" position="static"
                sx={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', p: '10px 0'}}>
          <Toolbar>
            <Search>
              <SearchIconWrapper>
                <SearchIcon/>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Найти товар…"
                inputProps={{'aria-label': 'search'}}
                onChange={e => setSearchWord(e.target.value)}
              />
            </Search>
          </Toolbar>
          <Box sx={{m: '0 20px 0 auto', display: "flex", alignItems: 'center', flexWrap: 'no-wrap'}}>
            <Typography variant="body1" component="span" sx={{mr: '10px'}}>Сортировка по:</Typography>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={sortBy}
              onChange={handleSortByChange}
              sx={{color: '#FFFFFF', minWidth: '175px'}}
            >
              <MenuItem value="manufacture">производитель (А-Я)</MenuItem>
              <MenuItem value="model">модель (А-Я)</MenuItem>
              <MenuItem value="cost-increase">цена (по возрастанию)</MenuItem>
              <MenuItem value="cost-decrease">цена (по убыванию)</MenuItem>
              <MenuItem value="status-in-storage">статус: на складе</MenuItem>
              <MenuItem value="status-nu">статус: у НУ</MenuItem>
              <MenuItem value="status-si">статус: у СИ</MenuItem>
            </Select>
          </Box>
        </AppBar>
      </Box>
      <TableContainer sx={{maxHeight: 530}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {[checkBoxColumn(), ...columns].map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {
            goodsLoading ?
              <>
                {
                  ['', '', ''].map(() => (
                    <TableRow>
                      {
                        ['', '', '', '', '', ''].map(() => (
                          <TableCell>
                            <Skeleton variant="text" sx={{fontSize: '1rem'}}/>
                          </TableCell>
                        ))
                      }
                    </TableRow>
                  ))
                }
              </>
              :
              <TableBody>
                {
                  (filteredGoodsList() || []).map((row) => {
                    return (
                      <TableRow
                        hover role="checkbox"
                        tabIndex={-1} key={row.code}
                        onClick={() => navigate(`/good/${row?.id}`)}
                      >
                        {[checkBoxColumn(row.id), ...columns].map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                }
              </TableBody>
          }
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default GoodsList;
