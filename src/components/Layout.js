// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Box } from '@mui/material';
// import TemporaryDrawer from './Sidebar';
import Sidebar from './Sidebar';
import { Typography } from '@material-ui/core';

const Layout = () => {
  return (
   
      <Sidebar/>
      
    
  );
};

export default Layout;