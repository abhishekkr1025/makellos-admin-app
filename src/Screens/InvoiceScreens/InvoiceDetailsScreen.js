import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, TextField, Typography, CircularProgress, Button, Grid } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import ScreenHeading from '../../CustomComponents/ScreenHeading';

const INVOICE_DETAIL_API = "http://dev.makellos.co.in:8080/invoice/getAllInvoices";

const InvoiceDetail = () => {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const INITIATE_TRANSACTION_API = `http://dev.makellos.co.in:8080/billdesk/transaction/createInvoiceTransaction/${invoiceId}`;

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(INVOICE_DETAIL_API, { headers: { 'x-requested-with': 'XMLHttpRequest' } });
        const data = response.data;
        const foundInvoice = data.find(inv => inv.invoice_id.toString() === invoiceId);
        console.log('Found Invoice:', foundInvoice);

        setInvoice(foundInvoice);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  const initiateTransaction = async () => {
    setTransactionLoading(true);
    try {
      const response = await axios.get(INITIATE_TRANSACTION_API);
      console.log('Transaction initiated:', response.data);
      alert('Transaction initiated successfully!');
    } catch (error) {
      console.error('There was a problem initiating the transaction:', error);
      alert('Failed to initiate transaction');
    } finally {
      setTransactionLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!invoice) {
    return <Typography>No invoice found</Typography>;
  }

  const formatTimestamp = (timestamp) => {
    return format(new Date(timestamp), 'dd MMM, yy - hh:mm a');
  };

  return (
    <Box sx={{ display: 'flex' }} style={{ backgroundColor: "#f1f2f5" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <ScreenHeading heading="Invoice Detail" />
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Invoice ID: {invoice.invoice_id}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Invoice Number"
                  value={invoice.invoice_number || 'N/A'}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Invoice Display Number"
                  value={invoice.invoice_display_number || 'N/A'}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Object ID"
                  value={invoice.objectid || 'N/A'}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Invoice Date"
                  value={invoice.invoice_date || 'N/A'}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Created On"
                  value={invoice.createdon || 'N/A'}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Mandate Id"
                  value={invoice.mandateid || 'N/A'}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Merchant Id"
                  value={invoice.mercid || 'N/A'}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Net Amount"
                  value={invoice.net_amount || 'N/A'}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Status"
                  value={invoice.status || 'N/A'}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Subscription Ref Id"
                  value={invoice.subscription_refid || 'N/A'}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Verification Error Code"
                  value={invoice.verification_error_code || 'N/A'}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Verification Error Type"
                  value={invoice.verification_error_type || 'N/A'}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              {/* Display additional_info fields */}
              {invoice.additional_info && Object.keys(invoice.additional_info).map((key) => (
                <Grid item xs={12} md={4} key={key}>
                  <TextField
                    label={key}
                    value={invoice.additional_info[key] || 'N/A'}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              ))}

              {/* Initiate transaction button */}
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={initiateTransaction}
                    disabled={transactionLoading}
                    sx={{ mt: 2, width: 'auto' }}
                  >
                    {transactionLoading ? 'Processing...' : 'Initiate Transaction'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default InvoiceDetail;
