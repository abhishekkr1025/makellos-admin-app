import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from '../../firebase'; // Ensure that `app` is correctly initialized in your `firebase.js`
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Box, TableSortLabel, TextField } from '@mui/material';
import ScreenHeading from '../../CustomComponents/ScreenHeading';

const ActiveActivities = () => {
  const [activities, setActivities] = useState([]);
  const [sortBy, setSortBy] = useState('activityID');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const db = getFirestore(app);

    const getActivities = async (db) => {
      const activeActivities = collection(db, 'active_activity');
      const activitySnapshot = await getDocs(activeActivities);
      const activityList = activitySnapshot.docs.map(doc => doc.data());
      setActivities(activityList);
    };

    getActivities(db);
  }, []);

  const handleRequestSort = (property) => {
    const isAscending = sortBy === property && sortOrder === 'asc';
    setSortBy(property);
    setSortOrder(isAscending ? 'desc' : 'asc');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedActivities = activities.sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;

    // Customize this comparison logic based on your data types
    if (a[sortBy] < b[sortBy]) {
      return -1 * order;
    }
    if (a[sortBy] > b[sortBy]) {
      return 1 * order;
    }
    return 0;
  });

  

  return (
    <Box style={{ margin: "20px" }}>
      <ScreenHeading heading="Active Activities" />
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
      <TableContainer component={Paper} style={{ margin: "50px 0px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'activityID'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('activityID')}
                >
                  activityID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'activityConfiguration'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('activityConfiguration')}
                >
                  activityConfiguration
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'activityPlaceTime'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('activityPlaceTime')}
                >
                  activityPlaceTime
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'activityStatus'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('activityStatus')}
                >
                  activityStatus
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'addressID'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('addressID')}
                >
                  addressID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'deliveryType'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('deliveryType')}
                >
                  deliveryType
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'dropDriverID'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('dropDriverID')}
                >
                  dropDriverID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'dropSlot'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('dropSlot')}
                >
                  dropSlot
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'dropTime'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('dropTime')}
                >
                  dropTime
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'packetID'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('packetID')}
                >
                  packetID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'pickupDriverID'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('pickupDriverID')}
                >
                  pickupDriverID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'pickupSlot'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('pickupSlot')}
                >
                  pickupSlot
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'pickupTime'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('pickupTime')}
                >
                  pickupTime
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'serviceProviderID'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('serviceProviderID')}
                >
                  serviceProviderID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'userID'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('userID')}
                >
                  userID
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedActivities.map(activity => (
              <TableRow key={activity.activityID}>
                <TableCell>{activity.activityID || 'N/A'}</TableCell>
                <TableCell>{activity.activityConfiguration || 'N/A'}</TableCell>
                <TableCell>{activity.activityPlaceTime || 'N/A'}</TableCell>
                <TableCell>{activity.activityStatus || 'N/A'}</TableCell>
                <TableCell>{activity.addressID || 'N/A'}</TableCell>
                <TableCell>{activity.deliveryType || 'N/A'}</TableCell>
                <TableCell>{activity.dropDriverID || 'N/A'}</TableCell>
                <TableCell>{activity.dropSlot || 'N/A'}</TableCell>
                <TableCell>{activity.dropTime || 'N/A'}</TableCell>
                <TableCell>{activity.packetID || 'N/A'}</TableCell>
                <TableCell>{activity.pickupDriverID || 'N/A'}</TableCell>
                <TableCell>{activity.pickupSlot || 'N/A'}</TableCell>
                <TableCell>{activity.pickupTime || 'N/A'}</TableCell>
                <TableCell>{activity.serviceProviderID || 'N/A'}</TableCell>
                <TableCell>{activity.userID || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ActiveActivities;
