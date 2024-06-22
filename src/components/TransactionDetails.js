import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const TransactionDetails = ({ transactionData }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: '600px', margin: 'auto', borderRadius: '12px' }} style={{marginTop:"20px"}}>
      <Typography variant="h5" gutterBottom>
        Transaction Details
      </Typography>
      <Box>
        
        {/* Display other transaction details as needed */}
        <Typography variant="body1">
          Success: {transactionData?.success?"true":"false"}
        </Typography>

        <Typography variant="body1">
          Error Code: {transactionData?.errorCode || 'N/A'}
        </Typography>

        <Typography variant="body1">
          Error Message: {transactionData?.errorMessage || 'N/A'}
        </Typography>


        <Typography variant="body1" style={{marginTop:"20px"}}>
          Transaction:
        </Typography>
        <Typography variant="body1">
          {JSON.stringify(transactionData?.transaction,null,2)}
        </Typography>
       
       
      </Box>
    </Paper>
  );
};

export default TransactionDetails;