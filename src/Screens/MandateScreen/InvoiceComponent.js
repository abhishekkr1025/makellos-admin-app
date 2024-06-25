import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import ScreenHeading from '../../CustomComponents/ScreenHeading';

const InvoiceComponent = ({ mandateDetails }) => {
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoiceByMandateDetails = async () => {
      try {
        const response = await axios.get(
          `http://dev.makellos.co.in:8080/invoice/getInvoiceRecordsByMandateId/${mandateDetails.mandateid}`
        );

        if (response.status === 200 && response.data) {
          setInvoiceDetails(response.data);
        } else {
          setError('No invoice details found.');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceByMandateDetails();
  }, [mandateDetails]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
 
  const handleCreateInvoice = () => {
    // console.log(mandateDetails);
    navigate('/createInvoice', { state:  {mandateDetails} });
  };

  const handleRowClick = (invoice_id) => {
   
    navigate(`/invoice/${invoice_id}`);
  
  
};

  return (
    <div>
      <ScreenHeading heading="Invoice Details" />
      
      <Button variant="contained" color="primary" onClick={handleCreateInvoice} style={{ marginBottom: '20px' }}>
        Create New Invoice
      </Button>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Invoice Display Number</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell>customerRefId</TableCell>
              <TableCell>Subscription ID</TableCell>
              <TableCell>Debit Request No</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Description</TableCell>
              
              {/* Add more TableCell components here as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceDetails.map((invoice) => (
              <TableRow key={invoice.invoice_id} onClick={() => handleRowClick(invoice.invoice_id)}>
                <TableCell>{invoice.invoice_id}</TableCell>
                <TableCell>{invoice.invoice_number}</TableCell>
                <TableCell>{invoice.invoice_display_number}</TableCell>
                <TableCell>{invoice.createdon}</TableCell>
                <TableCell>{invoice.customerRefId}</TableCell>
                <TableCell>{invoice.subscription_refid}</TableCell>
                <TableCell>{invoice.debit_request_no}</TableCell>
                <TableCell>{invoice.invoice_date}</TableCell>
                <TableCell>{invoice.duedate}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.description}</TableCell>
                {/* Add more TableCell components here as needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InvoiceComponent;
