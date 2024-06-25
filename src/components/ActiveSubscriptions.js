import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  TableSortLabel,
  TablePagination,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import ScreenHeading from '../CustomComponents/ScreenHeading';

const SUBSCRIPTIONS_API = "http://dev.makellos.co.in:8080/activeSubscription/getAllActiveSubscriptions";
const USERS_API = "http://dev.makellos.co.in:8080/user/getAllUsers";
const MANDATE_API_BASE = "http://dev.makellos.co.in:8080/billdesk/mandate/getMandateDetailsByActiveSubscriptionId";

const ActiveSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('creationTs');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subscriptionsResponse, usersResponse] = await Promise.all([
          axios.get(SUBSCRIPTIONS_API),
          axios.get(USERS_API)
        ]);

        const usersMap = usersResponse.data.reduce((acc, user) => {
          let firstName = user.firstName;
          let lastName = user.lastName;
          let userName = firstName + " " + lastName;
          acc[user.userID] = userName;
          return acc;
        }, {});

        let subscriptionsData = subscriptionsResponse.data.map(subscription => ({
          ...subscription,
          userName: usersMap[subscription.userID] || 'Unknown',
          mandateID: 'Loading...' // Temporary placeholder for mandateID
        }));

        // Fetch mandateID for each subscription
        subscriptionsData = await Promise.all(subscriptionsData.map(async (subscription) => {
          try {
            const mandateResponse = await axios.get(`${MANDATE_API_BASE}/${subscription.activeSubscriptionID}`);
            const mandateData = mandateResponse.data.mandate;
            subscription.mandateID = mandateResponse.data.status === 200 ? mandateData.mandateid : 'No mandate';
          } catch (error) {
            subscription.mandateID = 'No mandate';
          }
          return subscription;
        }));
        // const sortedData = subscriptionsData.sort((a, b) => {
        //   return new Date(b.creationTs) - new Date(a.creationTs);
        // });

        subscriptionsData = subscriptionsData.map(subscription => {
          return {
            ...subscription,
            creationTs: new Date(subscription.creationTs)
          };
        });
       
        setSubscriptions(subscriptionsData);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (activeSubscriptionID) => {
   
      navigate(`/subscriptions/${activeSubscriptionID}`);
    
    
  };


  const handleRowClick2 = (activeSubscriptionID) => {
   
    navigate(`/mandateDetails/${activeSubscriptionID}`);
  
  
};
  

  const sortedSubscriptions = subscriptions.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredSubscriptions = sortedSubscriptions.filter(subscription => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'active') {
      return subscription.activeStatus;
    } else if (filter === 'inactive') {
      return !subscription.activeStatus;
    }
    return true;
  });

  const searchedSubscriptions = filteredSubscriptions.filter(subscription => {
    return Object.values(subscription).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const paginatedSubscriptions = searchedSubscriptions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) {
    return <CircularProgress />;
  }

  const formatTimestamp = (timestamp) => {
    return format(new Date(timestamp), 'dd MMM, yy - hh:mm a');
  };

  return (
    <Box sx={{ display: 'flex' }} style={{backgroundColor:"#f1f2f5"}}>

      {/* Main Content */}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        
      <Box sx={{ mb: 3 }}>
      <ScreenHeading heading="Active Subscriptions"/>
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
                <TableCell sortDirection={orderBy === 'activeSubscriptionID' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'activeSubscriptionID'}
                    direction={orderBy === 'activeSubscriptionID' ? order : 'asc'}
                    onClick={() => handleRequestSort('activeSubscriptionID')}
                  >
                    Active Subscription ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'userID' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'userID'}
                    direction={orderBy === 'userID' ? order : 'asc'}
                    onClick={() => handleRequestSort('userID')}
                  >
                    User ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'userName' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'userName'}
                    direction={orderBy === 'userName' ? order : 'asc'}
                    onClick={() => handleRequestSort('userName')}
                  >
                    User Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'subscriptionID' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'subscriptionID'}
                    direction={orderBy === 'subscriptionID' ? order : 'asc'}
                    onClick={() => handleRequestSort('subscriptionID')}
                  >
                    Subscription ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'activeStatus' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'activeStatus'}
                    direction={orderBy === 'activeStatus' ? order : 'asc'}
                    onClick={() => handleRequestSort('activeStatus')}
                  >
                    Active Status
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'purchaseTime' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'purchaseTime'}
                    direction={orderBy === 'purchaseTime' ? order : 'asc'}
                    onClick={() => handleRequestSort('purchaseTime')}
                  >
                    Purchase Time
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'expiryTime' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'expiryTime'}
                    direction={orderBy === 'expiryTime' ? order : 'asc'}
                    onClick={() => handleRequestSort('expiryTime')}
                  >
                    Expiry Time
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'creationTs' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'creationTs'}
                    direction={orderBy === 'creationTs' ? order : 'asc'}
                    onClick={() => handleRequestSort('creationTs')}
                  >
                    Creation Timestamp
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'subscriptionPricingID' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'subscriptionPricingID'}
                    direction={orderBy === 'subscriptionPricingID' ? order : 'asc'}
                    onClick={() => handleRequestSort('subscriptionPricingID')}
                  >
                    Subscription Pricing ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'mandateID' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'mandateID'}
                    direction={orderBy === 'mandateID' ? order : 'asc'}
                    onClick={() => handleRequestSort('mandateID')}
                  >
                    Mandate ID
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSubscriptions.map((subscription) => (
                <TableRow key={subscription.activeSubscriptionID}>
                  <TableCell onClick={()=>{handleRowClick(subscription.activeSubscriptionID)}}>{subscription.activeSubscriptionID || '-'}</TableCell>
                  <TableCell>{subscription.userID || '-'}</TableCell>
                  <TableCell>{subscription.userName || '-'}</TableCell>
                  <TableCell>{subscription.subscriptionID || '-'}</TableCell>
                  <TableCell>{subscription.activeStatus ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>{formatTimestamp(subscription.purchaseTime) || '-'}</TableCell>
                  <TableCell>{formatTimestamp(subscription.expiryTime) || '-'}</TableCell>
                  <TableCell>{formatTimestamp(subscription.creationTs) || '-'}</TableCell>
                  <TableCell>{subscription.subscriptionPricingID || '-'}</TableCell>
                  <TableCell onClick={()=>{handleRowClick2(subscription.activeSubscriptionID)}}>{subscription.mandateID || 'No mandate'}</TableCell>
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

export default ActiveSubscriptions;
