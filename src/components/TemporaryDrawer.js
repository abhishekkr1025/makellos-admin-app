import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, IconButton, AppBar, Toolbar, Typography, CssBaseline, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const drawerWidth = 240;

const TemporaryDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: isDrawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%' }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
          <ListItem button component={Link} to="/dashboard">
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Invoice" />
            </ListItem>
            <ListItem button component={Link} to="/subscriptions">
              <ListItemText primary="Subscriptions" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      
    </Box>
  );
};

export default TemporaryDrawer;