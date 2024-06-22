// App.js
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './Screens/UserScreen/UserScreen';
import UserDetails from './components/UserDetails';
import ActiveSubscriptions from './components/ActiveSubscriptions';
import Layout from './components/Layout';
import OrderRecords from './components/Orders';
import TransactionRecords from './components/Transactions';
import ActivitiesRecords from './components/PastActivities';
import OrderDetails from './components/OrderDetails';
import SubscriptionTable from './Screens/SubscriptionScreens/Subscriptions';
import SubscriptionDetail from './Screens/SubscriptionScreens/SubscriptionDetails';


// import UniversityTable from './components/UniversityTable';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/UniversityTable" element={<UniversityTable/>} /> */}
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/subscriptions" element={<ActiveSubscriptions />} />
          <Route path="/orders" element={<OrderRecords />} />
          <Route path="/orders/:orderid" element={<OrderDetails />} />
          <Route path="/transactions" element={<TransactionRecords />} />
          <Route path="/activities" element={<ActivitiesRecords />} />
          <Route path="/subs" element={<SubscriptionTable />} />
          <Route path="/subs/:id" element={<SubscriptionDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;