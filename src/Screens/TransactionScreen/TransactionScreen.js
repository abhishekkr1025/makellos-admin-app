import React from 'react';
import { Box, TextField, Paper, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ScreenHeading from '../../CustomComponents/ScreenHeading';

const TransactionDetails = () => {
  const location = useLocation();
  const { transaction } = location.state;
  console.log(transaction);

  const fields = [
    { label: 'Transaction ID', value: transaction.transactionid },
    { label: 'Order ID', value: transaction.orderid },
    { label: 'Amount', value: transaction.amount },
    { label: 'Transaction Date', value: transaction.transaction_date },
    { label: 'Payment Method', value: transaction.payment_method_type },
    { label: 'Item Code', value: transaction.itemcode },
    { label: 'Merchant ID', value: transaction.mercid },
    { label: 'Bank ID', value: transaction.bankid },
    { label: 'Bank Ref No', value: transaction.bank_ref_no },
    { label: 'Mandate ID', value: transaction.mandate_id },
    { label: 'Auth Status', value: transaction.auth_status },
    { label: 'Auth Code', value: transaction.authcode },
    { label: 'Charge Amount', value: transaction.charge_amount },
    { label: 'Currency', value: transaction.currency },
    { label: 'Discount', value: transaction.discount },
    { label: 'ECI', value: transaction.eci },
    { label: 'Payment Category', value: transaction.payment_category },
    { label: 'Refund Info', value: transaction.refund_info },
    { label: 'RU', value: transaction.ru },
    { label: 'Settlement LOB', value: transaction.settlement_lob },
    { label: 'Split Payment', value: transaction.split_payment },
    { label: 'Surcharge', value: transaction.surcharge },
    { label: 'Transaction Error Code', value: transaction.transaction_error_code },
    { label: 'Transaction Error Desc', value: transaction.transaction_error_desc },
    { label: 'Transaction Error Type', value: transaction.transaction_error_type },
    { label: 'Transaction Process Type', value: transaction.txn_process_type },
    { label: 'User ID', value: transaction.user_id },
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <Paper sx={{ p: 3,width: '100%' }}>
        <ScreenHeading heading="Transaction Details" />
        <Grid container spacing={2}>
          {fields.map((field, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <TextField
                label={field.label}
                value={field.value || 'N/A'}
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default TransactionDetails;
