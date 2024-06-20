import React from 'react';
import { Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setDrawer } from "../../features/dataSlice";
import { logout } from "../../features/usersSlice";
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import GroupsIcon from '@mui/icons-material/Groups';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import './rightDrawer.css';

const RightDrawer = () => {
  const rightDrawerOpen = useAppSelector(state => state.dataState.currentDrawer);
  const dispatch = useAppDispatch();
  
  return (
    <Drawer
      anchor='right'
      open={rightDrawerOpen === 'right'}
      onClose={() => dispatch(setDrawer(''))}
    >
      <List className="right-drawer-list">
        <ListItem disablePadding onClick={() => dispatch(setDrawer(''))}>
          <ListItemButton>
            <ListItemIcon style={{minWidth: '45px'}}>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Главная"/>
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding onClick={() => dispatch(setDrawer(''))}>
          <ListItemButton>
            <ListItemIcon style={{minWidth: '45px'}}>
              <CategoryIcon/>
            </ListItemIcon>
            <ListItemText primary="Список ТМЦ"/>
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding onClick={() => dispatch(setDrawer(''))}>
          <ListItemButton>
            <ListItemIcon style={{minWidth: '45px'}}>
              <GroupsIcon/>
            </ListItemIcon>
            <ListItemText primary="Пользователи"/>
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding onClick={() => dispatch(setDrawer(''))}>
          <ListItemButton>
            <ListItemIcon style={{minWidth: '45px'}}>
              <SwapVertIcon/>
            </ListItemIcon>
            <ListItemText primary="Обмен товарами"/>
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding sx={{marginTop: '20px'}} onClick={() => dispatch(setDrawer(''))}>
          <Button
            sx={{width: '100%'}}
            color="error" onClick={() => dispatch(logout())}>
            Выйти из аккаунта
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default RightDrawer;