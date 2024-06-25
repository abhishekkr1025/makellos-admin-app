import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, TextField, Paper, IconButton } from '@mui/material';
import { format } from 'date-fns';
import { ArrowBack } from '@mui/icons-material';
import TransactionDetails from './TransactionDetails'; // Adjust path as per your project structure
import { useParams,useNavigate } from 'react-router-dom';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return format(date, "dd MMM, yy - hh:mm a");
};

const API = "http://dev.makellos.co.in:8080/billdesk/orderRecords/getAllOrderRecords";
const OrderDetails = ({ record, onClose }) => {
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { orderid } = useParams(); // Fetch orderid from route params
  const [orderData, setOrderData] = useState(null); // State to hold order data
  const navigate = useNavigate();

  useEffect(() => {
    console.log('orderid from params:', orderid); // Debug log
    const fetchUser = async () => {
      try {
        const response = await fetch(API);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Debug log
        const foundOrder = data.find(user => user.orderid.toString() === orderid);
        console.log('Found order:', foundOrder); // Debug log
        setOrderData(foundOrder);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [orderid]);

  const handleGetTransactionId = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://dev.makellos.co.in:8080/billdesk/transaction/retrieveTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderid })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Transaction ID:', data);
      setTransactionData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!orderData) return <div>No order found</div>;

  return (
    <Paper elevation={3} sx={{ p: 3, margin: 'auto', borderRadius: '12px' }} style={{marginTop:"100px"}}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" gutterBottom>
          Order Details
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {Object.entries(orderData).map(([key, value]) => (
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

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={handleGetTransactionId}>
          Get Transaction Details
        </Button>
      </Box>

      {transactionData && <TransactionDetails transactionData={transactionData} />}
    </Paper>
  );
};

export default OrderDetails;
