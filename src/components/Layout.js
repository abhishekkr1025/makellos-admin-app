// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Box } from '@mui/material';
// import TemporaryDrawer from './Sidebar';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <Box>
      <Sidebar/>
      <Box style={{marginTop:"50px"}}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;