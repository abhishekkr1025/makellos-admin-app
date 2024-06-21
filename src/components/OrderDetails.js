import React from 'react';
import { Box, Typography, Button, Grid, TextField } from '@mui/material';
import { format } from 'date-fns';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return format(date, "dd MMM, yy - hh:mm a");
};

const OrderDetails = ({ record, onClose }) => {
  return (
    <Box sx={{ p: 3, maxWidth: '600px', margin: 'auto', border: '1px solid #ddd', borderRadius: '8px' }}>
      <Typography variant="h5" gutterBottom>Order Details</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Order ID</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={record.orderid}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>BD Order ID</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={record.bdorderid}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Created On</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={formatDate(record.createdon)}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Order Status</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={record.status}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Order Date</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={formatDate(record.order_date)}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Total Amount</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={record.amount}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        {/* Add more fields as necessary */}
      </Grid>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={onClose}>Back to Orders</Button>
      </Box>
    </Box>
  );
};

export default OrderDetails;
