import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, CircularProgress, Box, Typography, Paper, IconButton, Grid } from '@mui/material';
import axios from 'axios';
import { ArrowBack } from '@mui/icons-material';
import ScreenHeading from '../../CustomComponents/ScreenHeading';

const ActiveSubscriptionScreen = () => {
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const SUBSCRIPTION_DETAIL_API = "http://dev.makellos.co.in:8080/activeSubscription/getAllActiveSubscriptions";
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('Subscription ID from params:', id);

    const fetchSubscription = async () => {
      try {
        const response = await axios.get(SUBSCRIPTION_DETAIL_API);
        console.log('API Response:', response.data); // Log the entire API response
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        const data = response.data;
        const foundSubscription = data.find(sub => sub.activeSubscriptionID.toString() === id);
        console.log('Found Subscription:', foundSubscription); // Log found subscription
        setSubscription(foundSubscription);
      } catch (error) {
        console.error('Error fetching subscription:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
        <ArrowBack />
      </IconButton>
      <ScreenHeading heading="Active Subscription"/>
      
      <Paper sx={{ p: 3 }}>
      <Grid container spacing={2}>
        {subscription && Object.entries(subscription).map(([key, value]) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
            <TextField
              label={key.replace(/_/g, ' ')}
              value={value || 'N/A'}
              InputProps={{ readOnly: true }}
              fullWidth
              variant="outlined"
              size="small"
              margin="dense"
            />
          </Grid>
        )) 
          
        }
      </Grid>
       
      </Paper>
    </Box>
  );
};

export default ActiveSubscriptionScreen;
