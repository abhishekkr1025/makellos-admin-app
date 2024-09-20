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
import ActiveSubscriptionScreen from './Screens/ActiveSubscriptionScreen/ActiveSubscriptionScreen';
import InvoiceRecords from './Screens/InvoiceScreens/InvoiceScreen';
import MandateDetails from './Screens/MandateScreen/MandateDetails';
import CreateInvoiceScreen from './Screens/CreateInvoiceScreen/CreateInvoiceScreen';
import InvoiceDetail from './Screens/InvoiceScreens/InvoiceDetailsScreen';
import ActiveActivities from './Screens/ActivityScreen/ActivityScreen';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import TransactionDetailsScreen from './Screens/TransactionScreen/TransactionScreen';
import DriversRecords from './Screens/Driver Screen/DriverScreen';
import ServiceProviderRecords from './Screens/ServiceProviderScreen/ServiceProviderScreen';
import ServiceAreas from './Screens/ServiceAreaScreen/ServiceAreaScreen';
import SubscriptionDuplicateTable from './Screens/SubscriptionScreens/SubscriptionsDuplicateScreen';
import UserAddress from './Screens/UserScreen/UserAddressComponent';
import SubscriptionScreen from './Screens/SubscriptionScreens/SubscriptionsScreen';

import ActivityDashboardTest from './Screens/DashboardScreen/MasterDashboardScreen';
import MapComponent from './Screens/DashboardScreen/MapComponent';
import CustomerDashboard from './Screens/DashboardScreen/CustomerDashboard';



// import UniversityTable from './components/UniversityTable';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
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
          <Route path="/transaction/:transactionId" element={<TransactionDetailsScreen />} />
          <Route path="/activities" element={<ActivitiesRecords />} />
          <Route path="/subs" element={<SubscriptionTable />} />
          <Route path="/subscopy" element={<SubscriptionDuplicateTable />} />
          <Route path="/subs/:id" element={<SubscriptionDetail />} />
          <Route path="/subscriptions/:id" element={<ActiveSubscriptionScreen/>}/>
          <Route path="/invoices" element={<InvoiceRecords />} />
          <Route path="/mandateDetails/:id" element={<MandateDetails />} />
          <Route path="/createInvoice" element={<CreateInvoiceScreen />} />
          <Route path="/invoice/:invoiceId" element={<InvoiceDetail />} />
          <Route path="/activeActivities" element={<ActiveActivities />} />
          <Route path="/drivers" element={<DriversRecords />} />
          <Route path="/serviceProvider" element={<ServiceProviderRecords />} />
          <Route path="/serviceArea" element={<ServiceAreas />} />
          
          <Route path="/activityDashboard" element={<ActivityDashboardTest />} />
          <Route path="/customerMap" element={<MapComponent/>}/>
          <Route path="/customerDashboard" element={<CustomerDashboard/>}/>

          
          
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;