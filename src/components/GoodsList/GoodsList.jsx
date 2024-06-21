import React, { Fragment, useCallback, useState } from 'react';
import { Box, Divider, List, ListItem, ListItemButton, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

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
    marginLeft: theme.spacing(1),
    width: 'auto',
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
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '13ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));

const GoodsList = ({goods}) => {
  const [searchWord, setSearchWord] = useState('');
  
  const filteredGoodsList = useCallback(() => {
    return (goods || [])?.filter(good => good?.manufacture.toLowerCase().includes(searchWord.toLowerCase()) ||
      good?.model.toLowerCase().includes(searchWord.toLowerCase()));
  }, [goods, searchWord]);
  
  return (
    <Paper elevation={4} sx={{m: '30px 10px 0', borderRadius: '10px', overflow: 'hidden'}}>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
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
        </AppBar>
      </Box>
      <List className="goods-list">
        {
          filteredGoodsList()?.map((good, i) => (
            <Fragment key={good?.id}>
              {i !== 0 && <Divider/>}
              <ListItem
                disablePadding
                className='goods-list-item'
              >
                <ListItemButton sx={{padding: '15px'}}>
                  {good?.model}
                </ListItemButton>
              </ListItem>
            </Fragment>
          ))
        }
      </List>
    </Paper>
  );
};

export default GoodsList;