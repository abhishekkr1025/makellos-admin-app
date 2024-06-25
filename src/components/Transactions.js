import React, { useEffect, useState } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, Typography, TablePagination, TableSortLabel } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import ScreenHeading from '../CustomComponents/ScreenHeading';
import { useNavigate } from 'react-router-dom';

const TRANSACTIONS_API = "http://dev.makellos.co.in:8080/billdesk/transaction/getAllTransactions";

const TransactionRecords = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('transactionid');
  const [orderDirection, setOrderDirection] = useState('asc');
  const navigate = useNavigate();

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
    setPage(0); // Reset page when searching
  };

  const filteredTransactions = transactions.filter(transaction =>
    Object.values(transaction).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    if (orderDirection === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const paginatedTransactions = sortedTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  // Reset page to 0 when changing rows per page
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const formatTimestamp = (timestamp) => {
    return format(new Date(timestamp), 'dd MMM, yy - hh:mm a');
  };

  if (loading) {
    return <CircularProgress />;
  }

  const handleRowClick = (transaction) => {
    navigate(`/transaction/${transaction.transactionid}`, { state: { transaction } });
  };

  return (
    <Box sx={{ display: 'flex' }} style={{ backgroundColor: "#f1f2f5" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <ScreenHeading heading="Transactions" />
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
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 1500 }}>
            <TableHead>
              <TableRow>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'transactionid'}
                    direction={orderBy === 'transactionid' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('transactionid')}
                  >
                    Transaction ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'orderid'}
                    direction={orderBy === 'orderid' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('orderid')}
                  >
                    Order ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'amount'}
                    direction={orderBy === 'amount' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('amount')}
                  >
                    Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'transaction_date'}
                    direction={orderBy === 'transaction_date' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('transaction_date')}
                  >
                    Transaction Date
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'payment_method_type'}
                    direction={orderBy === 'payment_method_type' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('payment_method_type')}
                  >
                    Payment Method
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'itemcode'}
                    direction={orderBy === 'itemcode' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('itemcode')}
                  >
                    Item Code
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'mandate_id'}
                    direction={orderBy === 'mandate_id' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('mandate_id')}
                  >
                    Mandate ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'objectid'}
                    direction={orderBy === 'objectid' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('objectid')}
                  >
                    Object ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'orderid'}
                    direction={orderBy === 'orderid' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('orderid')}
                  >
                    Order ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'auth_status'}
                    direction={orderBy === 'auth_status' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('auth_status')}
                  >
                    Auth Status
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'transaction_error_code'}
                    direction={orderBy === 'transaction_error_code' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('auth_status')}
                  >
                    Transaction Error Code
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'transaction_error_desc'}
                    direction={orderBy === 'transaction_error_desc' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('transaction_error_desc')}
                  >
                    transaction_error_desc
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'transaction_error_desc'}
                    direction={orderBy === 'transaction_error_desc' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('transaction_error_desc')}
                  >
                    transaction_error_desc
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'transaction_error_type'}
                    direction={orderBy === 'transaction_error_type' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('transaction_error_type')}
                  >
                    transaction_error_type
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.transactionid} onClick={() => handleRowClick(transaction)} style={{ cursor: 'pointer' }}>
                  <TableCell>{transaction.transactionid || 'N/A'}</TableCell>
                  <TableCell>{transaction.orderid || 'N/A'}</TableCell>
                  <TableCell>{transaction.amount || 'N/A'}</TableCell>
                  <TableCell>{formatTimestamp(transaction.transaction_date) || 'N/A'}</TableCell>
                  <TableCell>{transaction.payment_method_type || 'N/A'}</TableCell>
                  <TableCell>{transaction.itemcode || 'N/A'}</TableCell>
                  <TableCell>{transaction.mandate_id || 'N/A'}</TableCell>
                  <TableCell>{transaction.objectid || 'N/A'}</TableCell>
                  <TableCell>{transaction.orderid || 'N/A'}</TableCell>
                  <TableCell>{transaction.auth_status || 'N/A'}</TableCell>
                  <TableCell>{transaction.transaction_error_code || 'N/A'}</TableCell>
                  <TableCell>{transaction.transaction_error_desc || 'N/A'}</TableCell>
                  <TableCell>{transaction.transaction_error_type || 'N/A'}</TableCell>
                  <TableCell>{transaction.txn_process_type || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredTransactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TransactionRecords;
