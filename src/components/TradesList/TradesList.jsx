import React, {
  lazy,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  AppBar,
  Box,
  Chip,
  IconButton,
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
import AddIcon from '@mui/icons-material/Add';
import { formatDate, tradeStatuses } from "../../constants";
import { useNavigate } from "react-router-dom";
import GoodsListFooter from "../GoodsListFooter/GoodsListFooter";
import { getTrades } from "../../features/tradeThunk";

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
    id: 'source_user_id',
    label: 'От кого',
    minWidth: 200,
    align: 'center',
    format: (value) => value?.username || value,
  }, {
    id: 'destination_user_id',
    label: 'Кому',
    minWidth: 200,
    align: 'center',
    format: (value) => value?.username || value,
  }, {
    id: 'good_id', label: 'Товар', minWidth: 100, align: 'center',
  }, {
    id: 'create_date',
    label: 'Дата создания',
    minWidth: 120,
    align: 'center',
    format: (value) => formatDate(value),
  }, {
    id: 'trade_status_id',
    label: 'Статус',
    minWidth: 95,
    align: 'center',
    format: (value) => <Chip
      label={tradeStatuses[value - 1]?.value || ''}
      color={tradeStatuses[value - 1]?.color || 'default'}
      sx={{ height: '22px', fontSize: '12px', lineHeight: '12px', }}
    />,
  },
];

const CustomIconButton = styled(IconButton)({
  color: 'white', '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  }
});

const TradesList = memo(({ trades }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tradesLoading } = useSelector(state => state.tradeState);
  const [sortBy, setSortBy] = useState('none');
  const [paginationData, setPaginationData] = useState({
    pageSize: 20, pageNumber: 1, sortByCategory: 0,
  });
  const [searchWord, setSearchWord] = useState('');
  
  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };
  
  const handlePaginationDataChange = (e) => {
    const { name, value } = e.target;
    setPaginationData(prevState => (
      {
        ...prevState, [name]: value,
      }
    ));
  };
  
  useEffect(() => {
    dispatch(getTrades(paginationData));
  }, [dispatch, paginationData]);
  
  const sortedByManufacture = useCallback(() => {
    return (
      trades || []
    ).sort((a, b) => a?.product?.manufacture?.name?.localeCompare(b?.product?.manufacture?.name));
  }, [trades]);
  
  const filteredGoodsList = useCallback(() => {
    const sortedTrades = (
      sortedByManufacture() || []
    );
    return sortedTrades.filter(trade => trade?.product?.manufacture?.name.toLowerCase().includes(searchWord?.toLowerCase()));
  }, [trades, searchWord, sortBy, sortedByManufacture]);
  
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
              {tradeStatuses.map(status => (
                <MenuItem value={status.name}
                  key={status.value}>статус: {status.value}</MenuItem>
              ))}
            </Select>
          </Box>
          <Box className='goods-list-tools' sx={{ width: '100%' }}>
            <CustomIconButton size='large'
              onClick={() => navigate('/create-good')}
              sx={{ ml: 'auto' }}
            >
              <AddIcon/>
            </CustomIconButton>
          </Box>
        </AppBar>
      </Box>
      <TableContainer sx={{ maxHeight: 530 }}>
        <Suspense fallback={<></>}>
          <GoodsListTable
            filteredGoodsList={() => trades}
            columns={columns}
            goodsLoading={tradesLoading}
          />
        </Suspense>
      </TableContainer>
      <GoodsListFooter handlePaginationDataChange={handlePaginationDataChange}
        paginationData={paginationData}/>
    </Paper>
  );
});

export default TradesList;
