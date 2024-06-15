import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Logo from './public/Makellos-+Final.jpg'; // Replace with your logo file and path

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <img src={Logo} alt="Logo" style={{ height: 50, marginRight: 20 }} /> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        {/* Add additional header content here */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
