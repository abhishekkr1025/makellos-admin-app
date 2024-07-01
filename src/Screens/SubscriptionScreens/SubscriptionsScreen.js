import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, Typography, TablePagination, TableSortLabel } from '@mui/material';
import ScreenHeading from '../../CustomComponents/ScreenHeading';
import { format } from 'date-fns';

const SubscriptionScreen = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('registeredTime');
  const [orderDirection, setOrderDirection] = useState('desc');
 

  useEffect(() => {
    axios.get('http://dev.makellos.co.in:8080/subscription/getAllSubscriptions')
      .then(response => {
        setSubscriptions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the subscriptions!', error);
      });
  }, []);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset page when searching
  };

  const handleRowClick = (subscriptionID) => {
    navigate(`/subs/${subscriptionID}`);
  };

  const filteredSubscriptions = subscriptions.filter(subscription =>
    Object.values(subscription).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedSubscriptions = filteredSubscriptions.sort((a, b) => {
    if (orderDirection === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const paginatedSubscriptions = sortedSubscriptions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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

//   if (loading) {
//     return <CircularProgress />;
//   }

  return (
    <Box sx={{ display: 'flex' }} style={{backgroundColor:"#f1f2f5"}}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
        <ScreenHeading heading="Subscriptions"/>
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
                    active={orderBy === 'subscriptionID'}
                    direction={orderBy === 'subscriptionID' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('subscriptionID')}
                  >
                   Subscription ID
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
                    active={orderBy === 'subscriptionName'}
                    direction={orderBy === 'subscriptionName' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('subscriptionName')}
                  >
                    Subscription Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'tagLine'}
                    direction={orderBy === 'tagLine' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('tagLine')}
                  >
                    Tag Line
                  </TableSortLabel>
                </TableCell>

                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'idealHouseholdSize'}
                    direction={orderBy === 'idealHouseholdSize' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('idealHouseholdSize')}
                  >
                   Ideal House Size
                  </TableSortLabel>
                </TableCell>

                 <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'features'}
                    direction={orderBy === 'features' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('features')}
                  >
                  Features
                  </TableSortLabel>
                </TableCell>

                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'idealWeightUsagePerMonthInKg'}
                    direction={orderBy === 'idealWeightUsagePerMonthInKg' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('idealWeightUsagePerMonthInKg')}
                  >
                   Ideal Weight Usage Per MonthIn Kg
                  </TableSortLabel>
                </TableCell>

                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'idealPickupUsageLimitPerWeek'}
                    direction={orderBy === 'idealPickupUsageLimitPerWeek' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('idealPickupUsageLimitPerWeek')}
                  >
                   Ideal Pickup Usage Limit Per Week
                  </TableSortLabel>
                </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSubscriptions.map((subscriptions) => (
                <TableRow key={subscriptions.subscriptionID} onClick={() => handleRowClick(subscriptions.subscriptionID)} style={{ cursor: 'pointer' }}>
                  <TableCell>{subscriptions.activeStatus || 'N/A'}</TableCell>
                  <TableCell>{subscriptions.subscriptionName || 'N/A'}</TableCell>
                  <TableCell>{subscriptions.tagLine || 'N/A'}</TableCell>
                  <TableCell>{subscriptions.description || 'N/A'}</TableCell>
                  <TableCell>{subscriptions.idealHouseholdSize || 'N/A'}</TableCell>
                  <TableCell>{subscriptions.features || 'N/A'}</TableCell>
                  <TableCell>{subscriptions.idealWeightUsagePerMonthInKg || 'N/A'}</TableCell>
                  <TableCell>{subscriptions.idealPickupUsageLimitPerWeek || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredSubscriptions.length}
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

export default SubscriptionScreen;
