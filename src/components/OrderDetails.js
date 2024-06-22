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
    <Paper elevation={3} sx={{ p: 3, maxWidth: '900px', margin: 'auto', borderRadius: '12px' }} style={{marginTop:"100px"}}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" gutterBottom>
          Order Details
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Order ID</Typography>
          <Box sx={{ width: '400px', mb: 2 }}>
            <TextField
              variant="outlined"
              fullWidth
              value={orderData.orderid}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                height: '45px',
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  '& fieldset': {
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    boxShadow: '0 0 3px rgba(0, 0, 0, 0.1)',
                  },
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>BD Order ID</Typography>
          <Box sx={{ width: '400px', mb: 2 }}>
            <TextField
              variant="outlined"
              fullWidth
              value={orderData.bdorderid}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                height: '45px',
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  '& fieldset': {
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    boxShadow: '0 0 3px rgba(0, 0, 0, 0.1)',
                  },
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Created On</Typography>
          <Box sx={{ width: '400px', mb: 2 }}>
            <TextField
              variant="outlined"
              fullWidth
              value={formatDate(orderData.createdon)}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                height: '45px',
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  '& fieldset': {
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    boxShadow: '0 0 3px rgba(0, 0, 0, 0.1)',
                  },
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Order Status</Typography>
          <Box sx={{ width: '400px', mb: 2 }}>
            <TextField
              variant="outlined"
              fullWidth
              value={orderData.status}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                height: '45px',
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  '& fieldset': {
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    boxShadow: '0 0 3px rgba(0, 0, 0, 0.1)',
                  },
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Order Date</Typography>
          <Box sx={{ width: '400px', mb: 2 }}>
            <TextField
              variant="outlined"
              fullWidth
              value={formatDate(orderData.order_date)}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                height: '45px',
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  '& fieldset': {
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    boxShadow: '0 0 3px rgba(0, 0, 0, 0.1)',
                  },
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Total Amount</Typography>
          <Box sx={{ width: '400px', mb: 2 }}>
            <TextField
              variant="outlined"
              fullWidth
              value={orderData.amount}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                height: '45px',
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  '& fieldset': {
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    boxShadow: '0 0 3px rgba(0, 0, 0, 0.1)',
                  },
                },
              }}
            />
          </Box>
        </Grid>
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
