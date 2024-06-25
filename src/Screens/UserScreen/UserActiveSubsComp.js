import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, TextField, Grid } from '@mui/material';
import axios from 'axios';
import ScreenHeading from '../../CustomComponents/ScreenHeading';

const UserActiveSubsComp = ({ userID }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://dev.makellos.co.in:8080/activeSubscription/getActiveSubscriptionByUserID/${userID}`);
        if(response.status===200 && response.data && response.data.length!=0){
          setData(response.data[0]);
        }
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
    <Paper style={{padding:"20px"}} elevation={1}>
      <ScreenHeading heading="User Active Subscription"/>
      {!data && <div style={{display:"flex", justifyContent:"center",width:"100%",marginBottom:"30px"}}>No Active Subscription</div>}
      <Grid container spacing={2}>
        {data && Object.entries(data).map(([key, value]) => (
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
        ))}
      </Grid>
     
    </Paper>
  );
}

export default UserActiveSubsComp;
