import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { People, Receipt, Subscriptions, AccountBalance, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: '#0A3066', // Deep blue color
          color: 'white', // Text color
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon sx={{ color: 'white' }}>
            <People />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: 'white' }}>
            <Receipt />
          </ListItemIcon>
          <ListItemText primary="Invoices" />
        </ListItem>
        <ListItem button component={Link} to="/subscriptions">
          <ListItemIcon sx={{ color: 'white' }}>
            <Subscriptions />
          </ListItemIcon>
          <ListItemText primary="Subscriptions" />
        </ListItem>

        <ListItem button component={Link} to="/orders">
          <ListItemIcon sx={{ color: 'white' }}>
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>

        <ListItem button component={Link} to="/transactions">
          <ListItemIcon sx={{ color: 'white' }}>
            <AccountBalance />
          </ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;