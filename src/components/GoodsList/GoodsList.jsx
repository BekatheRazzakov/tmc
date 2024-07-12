import React, {
  lazy, Suspense, useCallback, useState, memo, useEffect
} from 'react';
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TableContainer,
  Toolbar,
  Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useDispatch, useSelector } from 'react-redux';
import { setAllGoodsSelected, setGoodSelected } from "../../features/dataSlice";
import AddIcon from '@mui/icons-material/Add';
import { goodStatuses, tradeStatuses } from "../../constants";
import { useNavigate } from "react-router-dom";
import GoodsListFooter from "../GoodsListFooter/GoodsListFooter";
import { getGoods } from "../../features/dataThunk";
import BulkTrade from "../BulkTrade/BulkTrade";

const GoodsListTable = lazy(() => import('../GoodListTable/GoodsListTable'));

const Search = styled('div')(({ theme }) => (
  {
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
  }
));

const SearchIconWrapper = styled('div')(({ theme }) => (
  {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
));

const StyledInputBase = styled(InputBase)(({ theme }) => (
  {
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
  }
));

const columns = [
  {
    id: 'product',
    label: 'Производитель',
    minWidth: 70,
    align: 'center',
    format: (value) => value?.manufacture?.name,
  }, {
    id: 'product',
    label: 'Модель',
    minWidth: 170,
    align: 'center',
    format: (value) => value?.model?.name,
  }, {
    id: 'product',
    label: 'Цена',
    minWidth: 100,
    align: 'center',
    format: (value) => <span>{value?.cost}
      <span style={{ textDecoration: 'underline' }}>c</span></span>,
  }, {
    id: 'good_status',
    label: 'Статус ТМЦ',
    minWidth: 200,
    align: 'center',
    format: (value) => <Chip
      label={goodStatuses[value?.id - 1].value || ''}
      color={goodStatuses[value?.id - 1].color || 'default'}
      sx={{ height: '22px', fontSize: '12px', lineHeight: '12px', }}
    />,
  }, {
    id: 'trade_status',
    label: 'Статус трейда',
    minWidth: 200,
    align: 'center',
    format: (value) => <Chip
      label={value?.id ? tradeStatuses[value?.id - 1].value : '-'}
      color={value?.id ? tradeStatuses[value?.id - 1].color : 'default'}
      sx={{ height: '22px', fontSize: '12px', lineHeight: '12px', }}
    />,
  }, { id: 'barcode', label: 'Штрих код', minWidth: 120, align: 'center', },
];

const CustomIconButton = styled(IconButton)({
  color: 'white', '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  }
});

const GoodsList = memo(({ goods }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { goodsLoading, categories } = useSelector(state => state.dataState);
  const { user } = useSelector(state => state.userState);
  const [searchWord, setSearchWord] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [paginationData, setPaginationData] = useState({
    pageSize: 20, pageNumber: 1, sortByCategory: 0,
  });
  const [bulkTradeModalOpen, setBulkTradeModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  
  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };
  
  const handleActionChange = (e) => {
    setCurrentAction(e.target.value);
  };
  
  const handlePaginationDataChange = (e) => {
    const { name, value } = e.target;
    setPaginationData(prevState => (
      {
        ...prevState, [name]: value,
      }
    ));
  };
  
  const toggleBulkTradeModal = (value) => {
    if (!value) {
      setCurrentAction('');
    }
    setBulkTradeModalOpen(value || !bulkTradeModalOpen);
  };
  
  useEffect(() => {
    dispatch(getGoods(paginationData));
  }, [dispatch, paginationData]);
  
  useEffect(() => {
    if (currentAction === 'trade') setBulkTradeModalOpen(true);
  }, [currentAction]);
  
  const sortedByManufacture = useCallback(() => {
    return (
      goods || []
    ).sort((a, b) => a?.product?.manufacture?.name?.localeCompare(b?.product?.manufacture?.name));
  }, [goods]);
  
  const sortedByModel = useCallback(() => {
    return (
      goods || []
    ).sort((a, b) => a?.product?.model?.name?.localeCompare(b?.product?.model?.name));
  }, [goods]);
  
  const sortedByCost = useCallback(() => {
    return (
      goods || []
    ).sort((a, b) => a?.product?.cost - b?.product?.cost);
  }, [goods]);
  
  const sortedByStatusInStorage = useCallback(() => {
    return (
      goods || []
    ).filter(good => good?.good_status?.id === 1);
  }, [goods]);
  
  const sortedByStatusNU = useCallback(() => {
    return (
      goods || []
    ).filter(good => good?.good_status?.id === 2);
  }, [goods]);
  
  const sortedByStatusSI = useCallback(() => {
    return (
      goods || []
    ).filter(good => good?.good_status?.id === 3);
  }, [goods]);
  
  const sortedByStatusAtAbon = useCallback(() => {
    return (
      goods || []
    ).filter(good => good?.good_status?.id === 4);
  }, [goods]);
  
  const filteredGoodsList = useCallback(() => {
    const sortedGoods = (
      sortBy === 'manufacture' ? sortedByManufacture() : sortBy === 'model' ? sortedByModel() : sortBy === 'cost-increase' ? sortedByCost() : sortBy === 'cost-decrease' ? sortedByCost().reverse() : sortBy === 'status-in-storage' ? sortedByStatusInStorage() : sortBy === 'status-nu' ? sortedByStatusNU() : sortBy === 'status-si' ? sortedByStatusSI() : sortBy === 'status-at-abon' ? sortedByStatusAtAbon() : sortBy === 'none' ? goods : []
    );
    return sortedGoods.filter(good => good?.product?.manufacture?.name.toLowerCase().includes(searchWord?.toLowerCase()) || good?.product?.model?.name.toLowerCase().includes(searchWord?.toLowerCase()) || good?.product?.cost?.toString().includes(searchWord));
  }, [goods, searchWord, sortBy, sortedByCost, sortedByManufacture, sortedByModel, sortedByStatusAtAbon, sortedByStatusInStorage, sortedByStatusNU, sortedByStatusSI]);
  
  const selectedGoods = useCallback(() => {
    return filteredGoodsList().filter(good => good?.selected);
  }, [filteredGoodsList]);
  
  const checkBoxColumn = useCallback(id => {
    const allChecked = filteredGoodsList().filter(good => good.selected === 1).length === filteredGoodsList().length;
    return {
      id: 'selected', label: <Checkbox
        color='primary'
        checked={filteredGoodsList()?.length ? allChecked : false}
        onChange={() => {
          if (!goods && !goodsLoading) return;
          dispatch(setAllGoodsSelected({ status: allChecked ? 0 : 1 }));
        }}
        inputProps={{
          'aria-label': 'Выбрать все',
        }}
      />, minWidth: 70, align: 'center', format: (value) => <Checkbox
        onClick={(e) => e.stopPropagation()}
        color='primary'
        checked={value === 1}
        onChange={() => {
          dispatch(setGoodSelected({ id, status: value === 1 ? 0 : 1 }));
        }}
        inputProps={{
          'aria-label': 'Выбрать',
        }}
      />,
    };
  }, [dispatch, filteredGoodsList, goods, goodsLoading]);
  
  return (
    <Paper elevation={4}
      sx={{ m: '30px 10px 0', borderRadius: '10px', overflow: 'hidden' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          className='goods-list-toolbar' position='static'
          sx={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexWrap: 'wrap',
            p: '10px 0',
            gap: '10px',
          }}>
          {selectedGoods().length > 0 ? <Box sx={{
            display: "flex", alignItems: 'center', flexWrap: 'no-wrap'
          }}>
            <Typography variant='body1'
              component='span'
              sx={{ mr: '10px' }}>Выбрать действие:</Typography>
            <Select
              labelId='demo-simple-select-filled-label'
              id='demo-simple-select-filled'
              name='sortByCategory'
              value={currentAction}
              onChange={handleActionChange}
              sx={{ color: '#FFFFFF', minWidth: '175px' }}
            >
              <MenuItem value='trade'>Трейд нескольких товаров</MenuItem>
            </Select>
          </Box> : <>
            <Toolbar className='goods-search-toolbar'
              sx={{
                p: '0px!important', minHeight: 'unset!important', mr: 'auto'
              }}>
              <Search sx={{ m: '0!important' }}>
                <SearchIconWrapper>
                  <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder='Найти товар…'
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={e => setSearchWord(e.target.value)}
                />
              </Search>
            </Toolbar>
            <Box sx={{
              display: "flex", alignItems: 'center', flexWrap: 'no-wrap'
            }}>
              <Typography variant='body1'
                component='span'
                sx={{ mr: '10px' }}>категории:</Typography>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                name='sortByCategory'
                value={paginationData.sortByCategory}
                onChange={handlePaginationDataChange}
                sx={{ color: '#FFFFFF', minWidth: '175px' }}
              >
                <MenuItem value={0}>Все</MenuItem>
                {['Заведующий склада'].includes(user?.role) &&
                  <MenuItem value='my-goods'>Мои товары</MenuItem>}
                {categories.map(category => (
                  <MenuItem value={category.name}
                    key={category.name}>статус: {category.value}</MenuItem>
                ))}
                {user?.role === 'admin' &&
                  <MenuItem value='deleted'>Удалённые</MenuItem>}
              </Select>
            </Box>
            <Box sx={{
              display: "flex", alignItems: 'center', flexWrap: 'no-wrap'
            }}>
              <Typography variant='body1'
                component='span'
                sx={{ mr: '10px' }}>Сортировка по:</Typography>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                value={sortBy}
                onChange={handleSortByChange}
                sx={{ color: '#FFFFFF', minWidth: '175px' }}
              >
                <MenuItem value='none'>без сортировки</MenuItem>
                <MenuItem value='manufacture'>производитель (А-Я)</MenuItem>
                <MenuItem value='model'>модель (А-Я)</MenuItem>
                <MenuItem value='cost-increase'>цена (по возрастанию)</MenuItem>
                <MenuItem value='cost-decrease'>цена (по убыванию)</MenuItem>
                {goodStatuses.filter(status => status.isAvailable).map(status => (
                  <MenuItem value={status.className}
                    key={status.value}>статус: {status.value}</MenuItem>
                ))}
              </Select>
            </Box>
            {['admin', 'Заведующий склада'].includes(user?.role) &&
              <Box className='goods-list-tools' sx={{ width: '100%' }}>
                <CustomIconButton size='large'
                  onClick={() => navigate('/create-good')}
                  sx={{ ml: 'auto' }}
                >
                  <AddIcon/>
                </CustomIconButton>
              </Box>}
          </>}
        </AppBar>
      </Box>
      <TableContainer sx={{ maxHeight: 530 }}>
        <Suspense fallback={<></>}>
          <GoodsListTable
            filteredGoodsList={filteredGoodsList}
            checkBoxColumn={checkBoxColumn}
            columns={columns}
            goodsLoading={goodsLoading}
          />
        </Suspense>
      </TableContainer>
      <GoodsListFooter handlePaginationDataChange={handlePaginationDataChange}
        paginationData={paginationData}/>
      <BulkTrade open={bulkTradeModalOpen} toggleModal={toggleBulkTradeModal} selectedGoods={selectedGoods()}/>
    </Paper>
  );
});

export default GoodsList;
