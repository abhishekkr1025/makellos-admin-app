import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, TextField, Typography, Button } from '@mui/material';
import UserActiveSubsComp from '../Screens/UserScreen/UserActiveSubsComp';
import ScreenHeading from '../CustomComponents/ScreenHeading';
import UserAddress from '../Screens/UserScreen/UserAddressComponent';

const API = "http://dev.makellos.co.in:8080/user/getAllUsers";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(API);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const foundUser = data.find(user => user.userID.toString() === id);
        setUser(foundUser);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
    
      
      <ScreenHeading heading="User Details"/>
      <Grid container spacing={2}>
        {Object.entries(user).map(([key, value]) => (
          <Grid item xs={12} sm={6}  md={4} lg={3} key={key}>
            <TextField
              label={key}
              value={value}
              fullWidth
              variant="outlined"
              size="small"
              margin="dense"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        ))}
      </Grid>
      
     
      <div style={{height:"30px"}}></div>
      <UserActiveSubsComp userID={user.userID} />
      <div style={{height:"30px"}}></div>
      <UserAddress userID={user.userID}/>
    </div>
  );
};

export default UserDetails;
