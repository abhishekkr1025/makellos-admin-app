import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
  Typography,
  TablePagination,
  TableSortLabel,
} from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import ScreenHeading from '../CustomComponents/ScreenHeading';

const ORDER_RECORDS_API = "http://dev.makellos.co.in:8080/billdesk/orderRecords/getAllOrderRecords";

const OrderRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ORDER_RECORDS_API, { headers: { 'x-requested-with': 'XMLHttpRequest' } });
        const sortedData = response.data.sort((a, b) => {
          return new Date(b.createdon) - new Date(a.createdon);
        });
        setRecords(sortedData);
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

  const handleRowClick = (record) => {
    if (record && record.orderid) {
      navigate(`/orders/${record.orderid}`);
    } else {
      console.error('Order ID is not defined:', record);
    }
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const filteredRecords = records.filter(record =>
    Object.values(record).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedRecords = filteredRecords.sort((a, b) => {
    if (!sortColumn) return 0;
    const valueA = String(a[sortColumn]).toLowerCase();
    const valueB = String(b[sortColumn]).toLowerCase();
    if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedRecords = sortedRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when changing rows per page
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return format(date, "dd MMM, yy - hh:mm a");
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: 'flex' }} style={{ backgroundColor: "#f1f2f5" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <>
          <Box sx={{ mb: 3 }}>
          <ScreenHeading heading="Order"/>
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
                  {['orderid', 'bdorderid', 'createdon', 'status', 'order_date', 'amount'].map(column => (
                    <TableCell key={column}>
                      <TableSortLabel
                        active={sortColumn === column}
                        direction={sortOrder}
                        onClick={() => handleSort(column)}
                      >
                        {column.replace('_', ' ').toUpperCase()}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRecords.map((record) => (
                  <TableRow
                    key={record.orderid}
                    onClick={() => handleRowClick(record)}
                    style={{ cursor: 'pointer' }}
                  >
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredRecords.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </>
      </Box>
    </Box>
  );
};

export default OrderRecords;
