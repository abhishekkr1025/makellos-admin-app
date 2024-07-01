import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
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

      if (response.status === 200) {
        if(response.data.status === "success") {
          alert('Invoice created successfully');
          console.log(response.data);
          setResponseData(response.data); // Store the response data
        } else {
          console.log(response.data);
          alert('Error: ' + response.data.errorMessage + " (" + response.data.errorCode + ")");
        }
      } else {
        alert('Failed to create invoice');
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('An error occurred while creating the invoice');
    }
  };

  const downloadPDF = () => {
    const input = document.getElementById('invoice-template');
    html2canvas(input)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save('invoice.pdf');
      });
  };

  useEffect(() => {
    if (responseData) {
      // Populate the invoice template with response data
      document.getElementById('client-name').textContent = responseData.client_name || 'Client Name';
      document.getElementById('client-address').textContent = responseData.client_address || '123 Client Address';
      document.getElementById('client-city').textContent = responseData.client_city || 'City, State, Zip Code';
      document.getElementById('client-country').textContent = responseData.client_country || 'Country';
      document.getElementById('invoice-date').textContent = `Date: ${responseData.invoice_date}`;
      document.getElementById('payment-method').textContent = `Payment Method: ${responseData.payment_method}`;
      document.getElementById('receipt-number').textContent = `Receipt: #${responseData.receipt_number}`;
      document.getElementById('invoice-number').textContent = `Invoice: ${responseData.invoice_number}`;
      document.getElementById('total-amount').textContent = `$${responseData.total_amount}`;

      // Populate the invoice items
      const invoiceItems = responseData.items || [];
      const invoiceItemsTable = document.getElementById('invoice-items');
      invoiceItemsTable.innerHTML = ''; // Clear existing items
      invoiceItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.description}</td>
          <td>${item.quantity}</td>
          <td>${item.unit_price}</td>
          <td>${item.amount}</td>
        `;
        invoiceItemsTable.appendChild(row);
      });
    }
  }, [responseData]);

  return (
    <div>
      <ScreenHeading title="Create Invoice" />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              name="mandateid"
              label="Mandate ID"
              fullWidth
              value={formValues.mandateid}
              onChange={handleChange}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="mercid"
              label="Merchant ID"
              fullWidth
              value={formValues.mercid}
              onChange={handleChange}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="customerRefId"
              label="Customer Ref ID"
              fullWidth
              value={formValues.customerRefId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="subscription_refid"
              label="Subscription Ref ID"
              fullWidth
              value={formValues.subscription_refid}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="invoice_number"
              label="Invoice Number"
              fullWidth
              value={formValues.invoice_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="invoice_display_number"
              label="Invoice Display Number"
              fullWidth
              value={formValues.invoice_display_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              // rows={4}
              value={formValues.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="amount"
              label="Amount"
              fullWidth
              value={formValues.amount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="net_amount"
              label="Net Amount"
              fullWidth
              value={formValues.net_amount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="invoice_date"
              label="Invoice Date"
              fullWidth
              value={formValues.invoice_date}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="duedate"
              label="Due Date"
              fullWidth
              value={formValues.duedate}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="debit_date"
              label="Debit Date"
              fullWidth
              value={formValues.debit_date}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={createInvoice}>
              Create Invoice
            </Button>
            {responseData && (
              <Button variant="contained" color="secondary" onClick={downloadPDF} style={{ marginLeft: 16 }}>
                Download PDF
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
