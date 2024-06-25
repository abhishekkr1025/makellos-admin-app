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
  TableSortLabel
} from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import ScreenHeading from '../CustomComponents/ScreenHeading';

const ACTIVITIES_API = "http://dev.makellos.co.in:8080/activity/getAllActivities";

const ActivitiesRecords = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('activityID');
  const [orderDirection, setOrderDirection] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ACTIVITIES_API, { headers: { 'x-requested-with': 'XMLHttpRequest' } });
        setActivities(response.data);
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

  const filteredActivities = activities.filter(activity =>
    Object.values(activity).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedActivities = filteredActivities.sort((a, b) => {
    if (orderDirection === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const paginatedActivities = sortedActivities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f1f2f5', minHeight: '100vh' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
        <ScreenHeading heading="Activities"/>
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
                    active={orderBy === 'activityID'}
                    direction={orderBy === 'activityID' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('activityID')}
                  >
                    Activity ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'userID'}
                    direction={orderBy === 'userID' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('userID')}
                  >
                    User ID
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
                    active={orderBy === 'activityStatus'}
                    direction={orderBy === 'activityStatus' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('activityStatus')}
                  >
                    Activity Status
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'activityConfiguration'}
                    direction={orderBy === 'activityConfiguration' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('activityConfiguration')}
                  >
                    Activity Configuration
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'addressID'}
                    direction={orderBy === 'addressID' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('addressID')}
                  >
                    Address ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'deliveryType'}
                    direction={orderBy === 'deliveryType' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('deliveryType')}
                  >
                    Delivery Type
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'activityPlaceTime'}
                    direction={orderBy === 'activityPlaceTime' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('activityPlaceTime')}
                  >
                    Activity Place Time
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'activityCompleteTime'}
                    direction={orderBy === 'activityCompleteTime' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('activityCompleteTime')}
                  >
                    Activity Complete Time
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedActivities.map((activity) => (
                <TableRow key={activity.activityID}>
                  <TableCell>{activity.activityID || 'N/A'}</TableCell>
                  <TableCell>{activity.userID || 'N/A'}</TableCell>
                  <TableCell>{activity.serviceProviderID || 'N/A'}</TableCell>
                  <TableCell>{activity.activityStatus || 'N/A'}</TableCell>
                  <TableCell>{activity.activityConfiguration || 'N/A'}</TableCell>
                  <TableCell>{activity.addressID || 'N/A'}</TableCell>
                  <TableCell>{activity.deliveryType || 'N/A'}</TableCell>
                  <TableCell>{format(new Date(activity.activityPlaceTime), 'dd MMM, yy - hh:mm a') || 'N/A'}</TableCell>
                  <TableCell>{format(new Date(activity.activityCompleteTime), 'dd MMM, yy - hh:mm a') || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredActivities.length}
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

export default ActivitiesRecords;
