// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
// import TemporaryDrawer from './Sidebar';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div>
      <Header />
      <Sidebar/>
      <div> {/* Adjust marginLeft as per your drawer width */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;