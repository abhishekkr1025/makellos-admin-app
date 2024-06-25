import React, { useEffect, useState } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, TablePagination, TableSortLabel } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import ScreenHeading from '../../CustomComponents/ScreenHeading';
import { useNavigate } from 'react-router-dom';

const INVOICES_API = "http://dev.makellos.co.in:8080/invoice/getAllInvoices";

const InvoiceRecords = () => {
  const [invoices, setInvoices] = useState([]);
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
        const response = await axios.get(INVOICES_API, { headers: { 'x-requested-with': 'XMLHttpRequest' } });
        setInvoices(response.data);
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

  const filteredInvoices = invoices.filter(invoice =>
    Object.values(invoice).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedInvoices = filteredInvoices.sort((a, b) => {
    if (orderDirection === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const paginatedInvoices = sortedInvoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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

  const handleRowClick = (invoice_id) => {
    navigate(`/invoice/${invoice_id}`);
  };

  const formatTimestamp = (timestamp) => {
    return timestamp ? format(new Date(timestamp), 'dd MMM, yy - hh:mm a') : 'N/A';
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: 'flex' }} style={{backgroundColor:"#f1f2f5"}}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <ScreenHeading heading="Invoices"/>
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
                {['invoice_id', 'invoice_number', 'invoice_display_number', 'invoice_date', 'createdon', 'mercid', 'customerRefId', 'subscription_refid', 'duedate', 'debit_date', 'amount', 'net_amount', 'mandateid', 'description', 'status', 'transactionId'].map((column) => (
                  <TableCell key={column} sortDirection={orderDirection}>
                    <TableSortLabel
                      active={orderBy === column}
                      direction={orderBy === column ? orderDirection : 'asc'}
                      onClick={() => handleRequestSort(column)}
                    >
                      {column.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedInvoices.map((invoice) => (
                <TableRow key={invoice.invoice_id} onClick={() => handleRowClick(invoice.invoice_id)} style={{ cursor: 'pointer' }}>
                  <TableCell>{invoice.invoice_id || 'N/A'}</TableCell>
                  <TableCell>{invoice.invoice_number || 'N/A'}</TableCell>
                  <TableCell>{invoice.invoice_display_number || 'N/A'}</TableCell>
                  <TableCell>{formatTimestamp(invoice.invoice_date)}</TableCell>
                  <TableCell>{formatTimestamp(invoice.createdon)}</TableCell>
                  <TableCell>{invoice.mercid || 'N/A'}</TableCell>
                  <TableCell>{invoice.customerRefId || 'N/A'}</TableCell>
                  <TableCell>{invoice.subscription_refid || 'N/A'}</TableCell>
                  <TableCell>{formatTimestamp(invoice.duedate)}</TableCell>
                  <TableCell>{formatTimestamp(invoice.debit_date)}</TableCell>
                  <TableCell>{invoice.amount || 'N/A'}</TableCell>
                  <TableCell>{invoice.net_amount || 'N/A'}</TableCell>
                  <TableCell>{invoice.mandateid || 'N/A'}</TableCell>
                  <TableCell>{invoice.description || 'N/A'}</TableCell>
                  <TableCell>{invoice.status || 'N/A'}</TableCell>
                  <TableCell>{invoice.transactionId || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredInvoices.length}
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

export default InvoiceRecords;
