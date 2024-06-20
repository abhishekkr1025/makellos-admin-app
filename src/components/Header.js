import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar>
        {/* <img src={Logo} alt="Logo" style={{ height: 50, marginRight: 20 }} /> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
          Dashboard
        </Typography>
        {/* Add additional header content here */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;