import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';

const UserActiveSubsComp = ({ userID }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://dev.makellos.co.in:8080/activeSubscription/getActiveSubscriptionByUserID/${userID}`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user active subscription:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userID]);
  
  let dataToDisplay =JSON.stringify(data);
  console.log(dataToDisplay);
  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4">User Active Subscription</Typography>
      <Paper elevation={3} sx={{ padding: '16px', marginTop: '16px' }}>
        <Typography>{dataToDisplay}</Typography>
      </Paper>
    </Box>
  );
}

export default UserActiveSubsComp;
