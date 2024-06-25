import React, { useEffect, useState } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, Typography, TablePagination, TableSortLabel } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import ScreenHeading from '../../CustomComponents/ScreenHeading';
import { useNavigate } from 'react-router-dom';

const SERVICE_PROVIDER_API = "http://dev.makellos.co.in:8080/serviceProvider/getAllServiceProviders";

const ServiceProviderRecords = () => {
  const [serviceProvider, setServiceProvider] = useState([]);
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
        const response = await axios.get(SERVICE_PROVIDER_API);
        setServiceProvider(response.data);
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

  const filteredServiceProvider = serviceProvider.filter(serviceProvider =>
    Object.values(serviceProvider).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedServiceProvider = filteredServiceProvider.sort((a, b) => {
    if (orderDirection === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const paginatedServiceProvider = sortedServiceProvider.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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

  const handleRowClick = (serviceProvider) => {
    navigate(`/serviceProvider/${serviceProvider.serviceProviderID}`, { state: { serviceProvider } });
  };



  return (
    <Box sx={{ display: 'flex' }} style={{backgroundColor:"#f1f2f5"}}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
        <ScreenHeading heading="ServiceProviders"/>
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
                    active={orderBy === 'serviceProviderID'}
                    direction={orderBy === 'serviceProviderID' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('serviceProviderID')}
                  >
                  Service Provider ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  >
                    Name
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
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'email'}
                    direction={orderBy === 'email' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('email')}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'pocName'}
                    direction={orderBy === 'pocName' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('pocName')}
                  >
                   Poc Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'pocMobileNumber'}
                    direction={orderBy === 'pocMobileNumber' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('pocMobileNumber')}
                  >
                   Poc Mobile Number
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'pocEmail'}
                    direction={orderBy === 'pocEmail' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('pocEmail')}
                  >
                   Poc Email
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'serviceProviderStatus'}
                    direction={orderBy === 'serviceProviderStatus' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('serviceProviderStatus')}
                  >
                   Service Provider Status
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'registeredTimestamp'}
                    direction={orderBy === 'registeredTimestamp' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('registeredTimestamp')}
                  >
                   Registered Timestamp
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedServiceProvider.map((serviceProvider) => (
                <TableRow key={serviceProvider.serviceProviderID}>
                  <TableCell>{serviceProvider.serviceProviderID || 'N/A'}</TableCell>
                  <TableCell>{serviceProvider.name || 'N/A'}</TableCell>
                  <TableCell>{serviceProvider.mobileNumber || 'N/A'}</TableCell>
                  <TableCell>{serviceProvider.email || 'N/A'}</TableCell>
                  <TableCell>{serviceProvider.pocName || 'N/A'}</TableCell>
                  <TableCell>{serviceProvider.pocMobileNumber || 'N/A'}</TableCell>
                  <TableCell>{serviceProvider.pocEmail || 'N/A'}</TableCell>
                  <TableCell>{serviceProvider.serviceProviderStatus || 'N/A'}</TableCell>
                  <TableCell>{serviceProvider.registeredTimestamp || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredServiceProvider.length}
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

export default ServiceProviderRecords;
