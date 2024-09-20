import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  TableSortLabel
} from '@mui/material';

const UsersWithActivityCounts = () => {
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('activityCount');

  useEffect(() => {
    const fetchUsersWithActivityCounts = async () => {
      try {
        // Fetch the list of users
        const userResponse = await axios.get('http://34.131.81.53:8080/user/getAllUsers');
        const users = userResponse.data;

        // Fetch all activities
        const activityResponse = await axios.get('http://dev.makellos.co.in:8080/activity/getAllActivities');
        const activities = activityResponse.data;

        // Calculate activity counts for each user
        const usersWithActivities = users.map(user => {
          const activityCount = activities.filter(activity => activity.userID === user.userID).length;
          return {
            ...user,
            activityCount
          };
        });

        setUsers(usersWithActivities);
      } catch (error) {
        console.error('Error fetching users or activities:', error);
      }
    };

    fetchUsersWithActivityCounts();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (orderBy === 'activityCount') {
      return (order === 'asc' ? a.activityCount - b.activityCount : b.activityCount - a.activityCount);
    }
    return 0;
  });

  return (
    <Box sx={{ maxWidth: '90%', margin: 'auto', overflow: 'auto' }}>
      <Typography variant="h6" component="div" sx={{ padding: 2 }}>
        Users and Activity Counts
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 400, overflowY: 'auto' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'activityCount'}
                  direction={orderBy === 'activityCount' ? order : 'asc'}
                  onClick={() => handleRequestSort('activityCount')}
                >
                  Activity Count
                </TableSortLabel>
              </TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map(user => (
              <TableRow key={user.userID}>
                <TableCell>{user.userID}</TableCell>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.activityCount}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/user/${user.userID}`}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersWithActivityCounts;
