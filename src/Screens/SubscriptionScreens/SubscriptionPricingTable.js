// src/SubscriptionPricingTable.js

import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ScreenHeading from '../../CustomComponents/ScreenHeading';

const SubscriptionPricingTable = ({ subscriptionId }) => {
  const [pricingData, setPricingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = `http://dev.makellos.co.in:8080/subscriptionPricing/getSubscriptionPricingBySubscriptionId/${subscriptionId}`;

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await fetch(API);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched Pricing Data:', data); // Debug log
        setPricingData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPricingData();
  }, [subscriptionId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <ScreenHeading heading="Subscription Pricing"/>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subscription ID</TableCell>
              <TableCell>Subscription Pricing ID</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Price Type</TableCell>
              <TableCell>Discount Price</TableCell>
              <TableCell>Discount Percentage</TableCell>
              <TableCell>Duration Type</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Fmonth Discount Percentage</TableCell>
              {/* Add more columns as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {pricingData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">No data available</TableCell>
              </TableRow>
            ) : (
              pricingData.map((pricing) => (
                <TableRow key={pricing.subscriptionId}>
                  <TableCell>{pricing.subscriptionId}</TableCell>
                  <TableCell>{pricing.subsPricingId}</TableCell>
                  <TableCell>{pricing.price}</TableCell>
                  <TableCell>{pricing.priceType}</TableCell>
                  <TableCell>{pricing.discountPrice}</TableCell>
                  <TableCell>{pricing.discountPercentage}</TableCell>
                  <TableCell>{pricing.durationType}</TableCell>
                  <TableCell>{pricing.duration}</TableCell>
                  <TableCell>{pricing.fmonthDiscountPercentage}</TableCell>
                  {/* Add more cells as needed */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SubscriptionPricingTable;
