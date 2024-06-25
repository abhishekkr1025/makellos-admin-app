import React, { useEffect, useState } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, Typography, TablePagination, TableSortLabel } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import ScreenHeading from '../../CustomComponents/ScreenHeading';
import { useNavigate } from 'react-router-dom';

const DRIVER_API = "http://dev.makellos.co.in:8080/driver/getAllDrivers";

const DriversRecords = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('registeredTime');
  const [orderDirection, setOrderDirection] = useState('desc');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(DRIVER_API);
        setDrivers(response.data);
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

  const filteredDrivers = drivers.filter(driver =>
    Object.values(driver).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedDrivers = filteredDrivers.sort((a, b) => {
    if (orderDirection === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const paginatedDrivers = sortedDrivers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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

  const handleRowClick = (driver) => {
    navigate(`/driver/${driver.driverID}`, { state: { driver } });
  };



  return (
    <Box sx={{ display: 'flex' }} style={{backgroundColor:"#f1f2f5"}}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
        <ScreenHeading heading="Drivers"/>
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
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'driverID'}
                    direction={orderBy === 'driverID' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('driverID')}
                  >
                   Driver ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'serviceProviderID'}
                    direction={orderBy === 'serviceProviderID' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('serviceProviderID')}
                  >
                    Service Provider ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'activeStatus'}
                    direction={orderBy === 'activeStatus' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('activeStatus')}
                  >
                    Active Status
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'firstName'}
                    direction={orderBy === 'firstName' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('firstName')}
                  >
                    Driver Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'mobileNumber'}
                    direction={orderBy === 'mobileNumber' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('mobileNumber')}
                  >
                   Mobile Number
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedDrivers.map((driver) => (
                <TableRow key={driver.driverID}>
                  <TableCell>{driver.driverID || 'N/A'}</TableCell>
                  <TableCell>{driver.serviceProviderID || 'N/A'}</TableCell>
                  <TableCell>{driver.activeStatus || 'N/A'}</TableCell>
                  <TableCell>{driver.firstName+" "+driver.lastName|| 'N/A'}</TableCell>
                  <TableCell>{driver.mobileNumber || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredDrivers.length}
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

export default DriversRecords;
