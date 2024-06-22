import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const SubscriptionTable = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://dev.makellos.co.in:8080/subscription/getAllSubscriptions')
      .then(response => {
        setSubscriptions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the subscriptions!', error);
      });
  }, []);

  const handleRowClick = (subscriptionID) => {
    navigate(`/subs/${subscriptionID}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#f1f2f5", minHeight: '100vh', padding: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
        Subscriptions
      </Typography>
      <TableContainer component={Paper} style={{ width: '80%', maxWidth: '1200px', marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subscription ID</TableCell>
              <TableCell>Active Status</TableCell>
              <TableCell>Subscription Name</TableCell>
              <TableCell>Tag Line</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions.map((subscription) => (
              <TableRow key={subscription.subscriptionID} onClick={() => handleRowClick(subscription.subscriptionID)} style={{ cursor: 'pointer' }}>
                <TableCell>{subscription.subscriptionID}</TableCell>
                <TableCell>{subscription.activeStatus}</TableCell>
                <TableCell>{subscription.subscriptionName}</TableCell>
                <TableCell>{subscription.tagLine}</TableCell>
                <TableCell>{subscription.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SubscriptionTable;
