import React, { useEffect, useState } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, Typography } from '@mui/material';
import axios from 'axios';

const TRANSACTIONS_API = "http://dev.makellos.co.in:8080/billdesk/transaction/getAllTransactions";

const TransactionRecords = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(TRANSACTIONS_API, { headers: { 'x-requested-with': 'XMLHttpRequest' } });
        setTransactions(response.data);
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

  const filteredTransactions = transactions.filter(transaction =>
    Object.values(transaction).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: 240, flexShrink: 0, backgroundColor: '#f0f0f0' }} // Adjust background color and other styles as needed
        aria-label="mailbox folders"
      >
        {/* Sidebar content can be added here */}
        <Typography variant="h6" sx={{ p: 2 }}>Sidebar Content</Typography>
      </Box>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="div">Transaction Records</Typography>
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
                <TableCell>Transaction ID</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Transaction Date</TableCell>
                <TableCell>Payment Method</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.transactionid}>
                  <TableCell>{transaction.transactionid || 'N/A'}</TableCell>
                  <TableCell>{transaction.orderid || 'N/A'}</TableCell>
                  <TableCell>{transaction.amount || 'N/A'}</TableCell>
                  <TableCell>{transaction.transaction_date || 'N/A'}</TableCell>
                  <TableCell>{transaction.payment_method_type || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TransactionRecords;