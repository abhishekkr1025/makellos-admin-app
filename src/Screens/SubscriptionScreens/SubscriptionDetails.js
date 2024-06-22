// src/SubscriptionDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Grid, Button } from '@mui/material';
import SubscriptionPricingTable from './SubscriptionPricingTable';

const SubscriptionDetail = () => {
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const API = "http://dev.makellos.co.in:8080/subscription/getAllSubscriptions";

  useEffect(() => {
    console.log('subscriptionid from params:', id); // Debug log
    const fetchUser = async () => {
      try {
        const response = await fetch(API);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Debug log
        const foundSubscription = data.find(user => user.subscriptionID.toString() === id);
        console.log('Found Subscription:', foundSubscription); // Debug log
        setSubscription(foundSubscription);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  if (!subscription) {
    return <Typography>No subscription found</Typography>;
  }

  const keys = Object.keys(subscription);
  const half = Math.ceil(keys.length / 2);

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Subscription Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {keys.slice(0, half).map(key => (
              <Box key={key} sx={{ marginBottom: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Typography>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={subscription[key]}
                  onChange={e => setSubscription({ ...subscription, [key]: e.target.value })}
                  InputProps={{
                    readOnly: !isEditable,
                  }}
                  size="small"
                />
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} sm={6}>
            {keys.slice(half).map(key => (
              <Box key={key} sx={{ marginBottom: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Typography>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={subscription[key]}
                  onChange={e => setSubscription({ ...subscription, [key]: e.target.value })}
                  InputProps={{
                    readOnly: !isEditable,
                  }}
                  size="small"
                />
              </Box>
            ))}
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 2 }}>
          <Button variant="contained" onClick={handleEditToggle}>
            {isEditable ? 'Save' : 'Edit'}
          </Button>
        </Box>
      </Paper>
      <SubscriptionPricingTable subscriptionId={id} /> {/* Include the table component */}
    </Box>
  );
};

export default SubscriptionDetail;
