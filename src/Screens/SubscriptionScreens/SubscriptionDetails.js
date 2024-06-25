import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, Paper, Typography, TextField, Grid, Button, Dialog, DialogActions, 
  DialogContent, DialogContentText, DialogTitle, Alert 
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SubscriptionPricingTable from './SubscriptionPricingTable';
import ScreenHeading from '../../CustomComponents/ScreenHeading';

const SubscriptionDetail = () => {
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const API_GET = "http://dev.makellos.co.in:8080/subscription/getAllSubscriptions";
  const API_UPDATE = `http://dev.makellos.co.in:8080/subscription/updateSubscription/${id}`;

  useEffect(() => {
    console.log('Subscription ID from params:', id);

    const fetchSubscription = async () => {
      try {
        const response = await fetch(API_GET);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        const foundSubscription = data.find(sub => sub.subscriptionID.toString() === id);
        console.log('Found Subscription:', foundSubscription);
        setSubscription(foundSubscription);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [id]);

  const handleEditToggle = () => {
    if (isEditable) {
      setOpenDialog(true);
    } else {
      setIsEditable(true);
    }
  };

  const handleSave = async () => {
    setOpenDialog(false);
    try {
      const response = await fetch(API_UPDATE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });
      if (!response.ok) {
        throw new Error('Failed to update subscription');
      }
      const updatedSubscription = await response.json();
      setSubscription(updatedSubscription);
      setIsEditable(false);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Hide the alert after 3 seconds
    } catch (error) {
      setError(error);
    }
  };

  const handleChange = (key, value) => {
    setSubscription(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const renderSubscriptionDetail = (keys) => {
    return keys.map(key => (
      <Box key={key} sx={{ marginBottom: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
        </Typography>
        <TextField
          fullWidth
          margin="dense"
          variant="outlined"
          value={subscription[key]}
          onChange={e => handleChange(key, e.target.value)}
          InputProps={{
            readOnly: !isEditable,
          }}
          size="small"
        />
      </Box>
    ));
  };

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

  return (
    <Box sx={{ padding: 2 }}>
      <Paper sx={{ padding: 2 }}>
      <ScreenHeading heading="Subscription"/>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {renderSubscriptionDetail(keys.slice(0, half))}
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderSubscriptionDetail(keys.slice(half))}
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 2 }}>
          <Button variant="contained" onClick={handleEditToggle}>
            {isEditable ? 'Save' : 'Edit'}
          </Button>
        </Box>
      </Paper>
      <SubscriptionPricingTable subscriptionId={id} />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Save</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to save the changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {showAlert && (
        <Alert 
          icon={<CheckIcon fontSize="inherit" />} 
          severity="success" 
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
        Changes saved successfully!
        </Alert>
      )}
    </Box>
  );
};

export default SubscriptionDetail;
