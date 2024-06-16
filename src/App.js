import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import UserDetails from './components/UserDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/:userId" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default App;