import React, { useEffect, useState } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';

const ORDER_RECORDS_API = "http://dev.makellos.co.in:8080/billdesk/orderRecords/getAllOrderRecords";

const OrderRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ORDER_RECORDS_API, { headers: { 'x-requested-with': 'XMLHttpRequest' } });
        setRecords(response.data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecords = records.filter(record =>
    Object.values(record).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return format(date, "dd MMM, yy - hh:mm a");
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: 240, flexShrink: 0 }} // Adjust background color and other styles as needed
        aria-label="mailbox folders"
      >
        {/* Sidebar content can be added here */}
  
      </Box>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="div">Order Records</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ minWidth: 200 }}
            />
          </Box>
        </Box>
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>BD Order ID</TableCell>
                <TableCell>Created On</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.orderid}>
                  <TableCell>{record.orderid || 'N/A'}</TableCell>
                  <TableCell>{record.bdorderid || 'N/A'}</TableCell>
                  <TableCell>{formatDate(record.createdon)}</TableCell>
                  <TableCell>{record.status || 'N/A'}</TableCell>
                  <TableCell>{formatDate(record.order_date)}</TableCell>
                  <TableCell>{record.amount || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default OrderRecords;