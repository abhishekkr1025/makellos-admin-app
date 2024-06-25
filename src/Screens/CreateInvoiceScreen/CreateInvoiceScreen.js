import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ScreenHeading from '../../CustomComponents/ScreenHeading';
import { TextField, Button, Box, Grid } from '@mui/material';

export default function CreateInvoiceScreen() {
  const location = useLocation();
  const { mandateDetails } = location.state || {};
 const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    mandateid: '',
    mercid: '',
    customerRefId: '',
    subscription_refid: '',
    invoice_number: '',
    invoice_display_number: '',
    description: '',
    amount: '',
    net_amount: '',
    invoice_date: '',
    duedate: '',
    debit_date: ''
    // Add other fields as needed
  });

  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    if (mandateDetails) {
      setFormValues({
        mandateid: mandateDetails.mandateid || '',
        mercid: mandateDetails.mercid || '',
        customerRefId: mandateDetails.customer_refid || '',
        subscription_refid: mandateDetails.subscription_refid || '',
        invoice_number: mandateDetails.invoice_number || '',
        invoice_display_number: mandateDetails.invoice_display_number || '',
        description: mandateDetails.description || '',
        amount: mandateDetails.amount || '',
        net_amount: mandateDetails.net_amount || '',
        invoice_date: mandateDetails.invoice_date || '',
        duedate: mandateDetails.duedate || '',
        debit_date: mandateDetails.debit_date || ''
        // Add other fields as needed
      });
    }
  }, [mandateDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const createInvoice = async () => {
    try {
    //   Logging the data that would be sent to the API
    //   console.log('Invoice data to be sent:', {
    //     mandateid: formValues.mandateid,
    //     mercid: formValues.mercid,
    //     customer_refid: formValues.customerRefId,
    //     subscription_refid: formValues.subscription_refid,
    //     invoice_number: formValues.invoice_number,
    //     invoice_display_number: formValues.invoice_display_number,
    //     invoice_date: formValues.invoice_date,
    //     duedate: formValues.duedate,
    //     debit_date: formValues.debit_date,
    //     amount: formValues.amount,
    //     net_amount: formValues.net_amount,
    //     currency: "356",
    //     description: formValues.description
    //   });
  
    //   Placeholder for the actual API call
      const response = await axios.post('http://dev.makellos.co.in:8080/invoice/createInvoice', {
        mandateid: formValues.mandateid,
        mercid: formValues.mercid,
        customer_refid: formValues.customerRefId,
        subscription_refid: formValues.subscription_refid,
        invoice_number: formValues.invoice_number,
        invoice_display_number: formValues.invoice_display_number,
        invoice_date: formValues.invoice_date,
        duedate: formValues.duedate,
        debit_date: formValues.debit_date,
        amount: formValues.amount,
        net_amount: formValues.net_amount,
        currency: "356",
        description: formValues.description
      });
  
    //   Placeholder for handling the response
    console.log(response.status);
    console.log(response.data);
      if (response.status === 200) {
       if(response.data.status==="success"){
        alert('Invoice created successfully');
        setResponseData(response.data.data); // Store the response data
       } else {
        alert('Error: '+response.data.errorMessage+" ("+response.data.errorCode+")");
       }
      } else {
        alert('Failed to create invoice');
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('An error occurred while creating the invoice');
    }
  };

  



  return (
    <div style={{ margin: "20px" }}>
      <ScreenHeading heading="Create Invoice" />
      <form onSubmit={(e) => { e.preventDefault(); createInvoice(); }}>
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mandate ID"
                name="mandateid"
                value={formValues.mandateid}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Merchant ID"
                name="mercid"
                value={formValues.mercid}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Customer Reference ID"
                name="customerRefId"
                value={formValues.customerRefId}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Subscription Reference ID"
                name="subscription_refid"
                value={formValues.subscription_refid}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Invoice Number"
                name="invoice_number"
                value={formValues.invoice_number}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Invoice Display Number"
                name="invoice_display_number"
                value={formValues.invoice_display_number}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Description"
                name="description"
                value={formValues.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Amount"
                name="amount"
                value={formValues.amount}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Net Amount"
                name="net_amount"
                value={formValues.net_amount}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Invoice Date"
                name="invoice_date"
                value={formValues.invoice_date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Due Date"
                name="duedate"
                value={formValues.duedate}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Debit Date"
                name="debit_date"
                value={formValues.debit_date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            {/* Add more fields as needed */}
          </Grid>
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Create Invoice
        </Button>
      </form>

      {responseData && (
        <div style={{ marginTop: "20px" }}>
          <ScreenHeading heading="Invoice Details" />
          <Box mb={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mandate ID"
                  value={responseData.mandateid}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Merchant ID"
                  value={responseData.mercid}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Customer Reference ID"
                  value={responseData.customer_refid}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Subscription Reference ID"
                  value={responseData.subscription_refid}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Invoice Number"
                  value={responseData.invoice_number}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Invoice Display Number"
                  value={responseData.invoice_display_number}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Description"
                  value={responseData.description}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount"
                  value={responseData.amount}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Net Amount"
                  value={responseData.net_amount}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Invoice Date"
                  value={responseData.invoice_date}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Due Date"
                  value={responseData.duedate}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Debit Date"
                  value={responseData.debit_date}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
    </div>
  );
}
