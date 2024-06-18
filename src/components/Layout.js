// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import TemporaryDrawer from './TemporaryDrawer';

const Layout = () => {
  return (
    <div>
      <Header />
      <TemporaryDrawer />
      <div> {/* Adjust marginLeft as per your drawer width */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;