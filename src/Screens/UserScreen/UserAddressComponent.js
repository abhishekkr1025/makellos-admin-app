import React, { useEffect, useState } from 'react';
import { CircularProgress, Paper, TextField, Grid, Typography } from '@mui/material';
import axios from 'axios';
import ScreenHeading from '../../CustomComponents/ScreenHeading';
import { useNavigate } from 'react-router-dom';

const UserAddress = ({ userID }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const USERS_ADDRESS_API = `http://dev.makellos.co.in:8080/address/getAllUserAddress/${userID}`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(USERS_ADDRESS_API);
        if (response.status === 200 && response.data && response.data.length !== 0) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user address:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userID]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error fetching data</Typography>;
  }

  if (!data || data.length === 0) {
    return (
      <Paper style={{ padding: "20px" }} elevation={1}>
        <ScreenHeading heading="User Address" />
        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "30px" }}>No Active Subscription</div>
      </Paper>
    );
  }

  const details = data[0];

  return (
    <Paper style={{ padding: "20px" }} elevation={1}>
      <ScreenHeading heading="User Address" />
      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          {details && Object.entries(details).map(([key, value]) => (
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
      </form>
    </Paper>
  );
};

export default UserAddress;
