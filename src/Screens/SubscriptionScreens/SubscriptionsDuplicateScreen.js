import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem, Button, TextField } from '@mui/material';
import ScreenHeading from '../../CustomComponents/ScreenHeading';

const SubscriptionDuplicateTable = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://dev.makellos.co.in:8080/subscription/getAllSubscriptions')
      .then(response => {
        setSubscriptions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the subscriptions!', error);
      });
  }, []);

  const handleRowClick = (subscriptionID) => {
    navigate(`/subs/${subscriptionID}`);
  };

  const handleEditClick = (subscription) => {
    setEditingRow(subscription.subscriptionID);
    setEditedData({ ...subscription });
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditedData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSaveClick = (subscriptionID) => {
    axios.put(`http://dev.makellos.co.in:8080/subscription/updateSubscription/${subscriptionID}`, editedData)
      .then(response => {
        setSubscriptions(subscriptions.map(sub => sub.subscriptionID === subscriptionID ? response.data : sub));
        setEditingRow(null);
        setEditedData({});
        console.log('Saved data:', response.data); // Print saved data to console
      })
      .catch(error => {
        console.error('There was an error updating the subscription!', error);
      });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#f1f2f5", minHeight: '100vh', padding: '20px' }}>
      <ScreenHeading heading="Subscriptions"/>
      <TableContainer component={Paper} style={{ width: '100%', maxWidth: '2200px', marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'center' }}>Subscription ID</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Active Status</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Subscription Name</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Tag Line</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Description</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Ideal Household Size</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Features</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Ideal Weight Usage/Month (Kg)</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Ideal Pickup Usage/Week</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions.map((subscription) => (
              <TableRow key={subscription.subscriptionID} style={{ cursor: 'pointer' }}>
                <TableCell sx={{ textAlign: 'center' }}>{subscription.subscriptionID}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {editingRow === subscription.subscriptionID ? (
                    <TextField
                      value={editedData.activeStatus ? 'Active' : 'Inactive'}
                      onChange={(e) => handleInputChange(e, 'activeStatus')}
                    />
                  ) : (
                    subscription.activeStatus ? 'Active' : 'Inactive'
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {editingRow === subscription.subscriptionID ? (
                    <TextField
                      value={editedData.subscriptionName}
                      onChange={(e) => handleInputChange(e, 'subscriptionName')}
                    />
                  ) : (
                    subscription.subscriptionName
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {editingRow === subscription.subscriptionID ? (
                    <TextField
                      value={editedData.tagLine}
                      onChange={(e) => handleInputChange(e, 'tagLine')}
                    />
                  ) : (
                    subscription.tagLine
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {editingRow === subscription.subscriptionID ? (
                    <TextField
                      value={editedData.description}
                      onChange={(e) => handleInputChange(e, 'description')}
                    />
                  ) : (
                    subscription.description
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {editingRow === subscription.subscriptionID ? (
                    <TextField
                      value={editedData.idealHouseholdSize}
                      onChange={(e) => handleInputChange(e, 'idealHouseholdSize')}
                    />
                  ) : (
                    subscription.idealHouseholdSize
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {editingRow === subscription.subscriptionID ? (
                    <List>
                      {editedData.features.map((feature, index) => (
                        <ListItem key={index}>
                          <TextField
                            value={feature}
                            onChange={(e) => {
                              const newFeatures = [...editedData.features];
                              newFeatures[index] = e.target.value;
                              setEditedData({ ...editedData, features: newFeatures });
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <List>
                      {subscription.features.map((feature, index) => (
                        <ListItem key={index}>{feature}</ListItem>
                      ))}
                    </List>
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {editingRow === subscription.subscriptionID ? (
                    <TextField
                      value={editedData.idealWeightUsagePerMonthInKg}
                      onChange={(e) => handleInputChange(e, 'idealWeightUsagePerMonthInKg')}
                    />
                  ) : (
                    subscription.idealWeightUsagePerMonthInKg
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {editingRow === subscription.subscriptionID ? (
                    <TextField
                      value={editedData.idealPickupUsageLimitPerWeek}
                      onChange={(e) => handleInputChange(e, 'idealPickupUsageLimitPerWeek')}
                    />
                  ) : (
                    subscription.idealPickupUsageLimitPerWeek
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {editingRow === subscription.subscriptionID ? (
                    <Button onClick={() => handleSaveClick(subscription.subscriptionID)}>Save</Button>
                  ) : (
                    <Button onClick={() => handleEditClick(subscription)}>Edit</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SubscriptionDuplicateTable;
