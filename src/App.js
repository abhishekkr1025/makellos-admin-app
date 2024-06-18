// App.js
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import UserDetails from './components/UserDetails';
import ActiveSubscriptions from './components/ActiveSubscriptions';
import Layout from './components/Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/subscriptions" element={<ActiveSubscriptions />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;