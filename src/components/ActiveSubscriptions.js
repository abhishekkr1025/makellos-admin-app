import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

const API = "https://cors-anywhere.herokuapp.com/dev.makellos.co.in:8080/activeSubscription/getAllActiveSubscriptions";

const ActiveSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API, {
      headers: {
        'x-requested-with': 'XMLHttpRequest'
      }
    })
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      return resp.json();
    })
    .then(data => {
      setSubscriptions(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Active Subscription ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Subscription ID</TableCell>
            <TableCell>Active Status</TableCell>
            <TableCell>Purchase Time</TableCell>
            <TableCell>Expiry Time</TableCell>
            <TableCell>Creation Timestamp</TableCell>
            <TableCell>Subscription Pricing ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptions.map((subscription) => (
            <TableRow key={subscription.activeSubscriptionID}>
              <TableCell>{subscription.activeSubscriptionID}</TableCell>
              <TableCell>{subscription.userID}</TableCell>
              <TableCell>{subscription.subscriptionID}</TableCell>
              <TableCell>{subscription.activeStatus}</TableCell>
              <TableCell>{subscription.purchaseTime}</TableCell>
              <TableCell>{subscription.expiryTime}</TableCell>
              <TableCell>{subscription.creationTs}</TableCell>
              <TableCell>{subscription.subscriptionPricingID}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActiveSubscriptions;