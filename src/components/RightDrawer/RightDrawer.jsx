import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setDrawer } from "../../features/dataSlice";
import { logout } from "../../features/usersSlice";
import CategoryIcon from '@mui/icons-material/Category';
import GroupsIcon from '@mui/icons-material/Groups';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { deepPurple } from '@mui/material/colors';
import './rightDrawer.css';

const RightDrawer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {currentDrawer} = useAppSelector(state => state.dataState);
  const {user} = useAppSelector(state => state.userState);
  
  const onNavItemClick = (tabName) => {
    dispatch(setDrawer(''));
    navigate(tabName);
  };
  
  return (<Drawer
      className="right-drawer"
      anchor='right'
      open={currentDrawer === 'right'}
      onClose={() => dispatch(setDrawer(''))}
    >
      {
        user &&
        <ListItem sx={{p: '0'}}>
          <ListItemButton>
            <Box sx={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <Avatar
                className="right-drawer-avatar"
                alt={user}
                src={PersonIcon}
                sx={{ bgcolor: deepPurple[500], }}
              />
              <Typography variant="h6" component="h6">
                {user}
              </Typography>
            </Box>
          </ListItemButton>
        </ListItem>
      }
      <List className="right-drawer-list">
        <ListItem disablePadding onClick={() => onNavItemClick('/goods')}>
          <ListItemButton>
            <ListItemIcon style={{minWidth: '45px'}}>
              <CategoryIcon/>
            </ListItemIcon>
            <ListItemText primary="ТМЦ"/>
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding onClick={() => onNavItemClick('/users')}>
          <ListItemButton>
            <ListItemIcon style={{minWidth: '45px'}}>
              <GroupsIcon/>
            </ListItemIcon>
            <ListItemText primary="Пользователи"/>
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding onClick={() => onNavItemClick('/trade')}>
          <ListItemButton>
            <ListItemIcon style={{minWidth: '45px'}}>
              <SwapVertIcon/>
            </ListItemIcon>
            <ListItemText primary="Обмен товарами"/>
          </ListItemButton>
        </ListItem>
        
        <ListItem className="right-drawer-logout-btn" disablePadding onClick={() => dispatch(setDrawer(''))}>
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