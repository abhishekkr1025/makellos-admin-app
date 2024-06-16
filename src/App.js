import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import UserDetails from './components/UserDetails';
import ActiveSubscriptions from './components/ActiveSubscriptions';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/:userId" element={<UserDetails />} />
        <Route path="/subscriptions" element={<ActiveSubscriptions />} />
      </Routes>
    </Router>
  );
};

export default App;