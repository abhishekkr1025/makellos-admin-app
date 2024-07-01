import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Grid, TextField, Box, CircularProgress, Button, TableCell, TableContainer, TableHead, TableBody, Table, TableRow } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ScreenHeading from '../../CustomComponents/ScreenHeading';
import logo from './android-chrome-192x192.png';

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

  const downloadInvoice = async () => {
    const invoiceElement = document.getElementById('invoice-content');

    // Adjust font size before capturing with html2canvas
    const elements = invoiceElement.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.fontSize = '25px'; // Adjust as per your requirement
    }

    // Use html2canvas to capture the invoice content
    const canvas = await html2canvas(invoiceElement, {
      scale: 2, // Increase scale to improve quality
      useCORS: true // Use CORS if there are images from external sources
    });

    // Calculate dimensions for PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape', // Landscape orientation
      unit: 'mm', // Millimeters
      format: 'a4' // A4 page size
    });

    // Calculate image dimensions to fit PDF page
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Save PDF
    pdf.save('invoice.pdf');
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
    <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: "#f1f2f5", minHeight: '100vh' }}>
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
            </Grid>
          </Paper>
          {/* Initiate transaction button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={initiateTransaction}
              disabled={transactionLoading}
              sx={{ mt: 2, mr: 2, width: 'auto' }}
            >
              {transactionLoading ? 'Processing...' : 'Initiate Transaction'}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={downloadInvoice}
              sx={{ mt: 2, width: 'auto' }}
            >
              Open Invoice in New Tab
            </Button>
          </Box>

          <Paper sx={{ p: 2, mt: 3 }} id="invoice-content" className="invoice-container">
            <Box className="invoice-header" display="flex" justifyContent="space-between" alignItems="center" sx={{ borderBottom: '1px dotted rgba(0, 0, 0, 0.7)' }}>
              <Box className="invoice-logo">
                <img src={logo} alt="Company Logo" style={{ maxWidth: '100px' }} />
              </Box>
              <Box className="invoice-address">
                <Typography>Tide Spring pvt. ltd</Typography>
                <Typography>G-40, B Block, Ireo Grand Arch</Typography>
                <Typography>Gurgaon 10081</Typography>
                <Typography>Haryana, India</Typography>
              </Box>
            </Box>

            <Grid container spacing={2} className="invoice-row" sx={{ borderBottom: '1px dotted rgba(0, 0, 0, 0.7)', textAlign: "justify", padding:"10px"}}>
              <Grid item xs={12} md={6} className="invoice-billing">
                <Typography variant="h6">Billed To</Typography>
                <Typography id="customerRefId">{invoice.customerRefId || 'customerRefId'}</Typography>
              </Grid>
              <Grid item xs={12} md={6} className="invoice-info" style={{ textAlign: 'right' }}>
  <table style={{ width: '100%' }}>
    <tbody>
      <tr>
        <td style={{ width: '50%', paddingRight: '10px', textAlign: 'left' }}><strong>Invoice Id:</strong></td>
        <td>{invoice.invoice_id || 'N/A'}</td>
      </tr>
      <tr>
        <td style={{ width: '50%', paddingRight: '10px', textAlign: 'left' }}><strong>Invoice number:</strong></td>
        <td>{invoice.invoice_number || 'N/A'}</td>
      </tr>
      <tr>
        <td style={{ width: '50%', paddingRight: '10px', textAlign: 'left' }}><strong>Invoice display number:</strong></td>
        <td>{invoice.invoice_display_number || 'N/A'}</td>
      </tr>
      <tr>
        <td style={{ width: '50%', paddingRight: '10px', textAlign: 'left' }}><strong>Invoice date:</strong></td>
        <td>{invoice.invoice_date || 'N/A'}</td>
      </tr>
    </tbody>
  </table>
</Grid>

            </Grid>

            <Box className="invoice-items" mt={2} sx={{ borderBottom: '1px dotted rgba(0, 0, 0, 0.7)' }}>
              <ScreenHeading heading="Invoice Details" />
              <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><strong>Mandate Id</strong></TableCell>
              <TableCell style={{textAlign:"right"}}>{invoice.mandateid || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Merchant Id</strong></TableCell>
              <TableCell  style={{textAlign:"right"}}>{invoice.mercid || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Invoice Display Number</strong></TableCell>
              <TableCell  style={{textAlign:"right"}}>{invoice.invoice_display_number || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell  style={{textAlign:"right"}}>{invoice.status || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Due Date</strong></TableCell>
              <TableCell  style={{textAlign:"right"}}>{invoice.duedate || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Subscription Ref Id</strong></TableCell>
              <TableCell  style={{textAlign:"right"}}>{invoice.subscription_refid || 'N/A'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
            </Box>

            <Grid container spacing={2} className="invoice-row" mt={2}>
              <Grid item xs={12} md={6} className="terms-conditions">
                <Typography>Terms & Conditions:</Typography>
                <ul>
                  <li>Payment due within 30 days.</li>
                  <li>Late payments are subject to a 10% fee.</li>
                  <li>All disputes are subject to jurisdiction of New York courts.</li>
                </ul>
              </Grid>
              <Grid item xs={12} md={6} className="invoice-total" style={{ textAlign: "right" }}>
                <Typography variant="h6">Total Amount Due</Typography>
                <Typography id="total-amount">{invoice.amount || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default InvoiceDetail;
