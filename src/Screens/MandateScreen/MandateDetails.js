import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, CircularProgress, Typography, Box, Grid } from '@mui/material';
import './MandateDetails.css'; // Import the CSS file for styling
import InvoiceByMandate from './InvoiceComponent';
import ScreenHeading from '../../CustomComponents/ScreenHeading';
import InvoiceComponent from './InvoiceComponent';

const MandateDetails = () => {
  const [mandateDetails, setMandateDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMandateDetails = async () => {
      try {
        const response = await axios.get(
          `http://dev.makellos.co.in:8080/billdesk/mandate/getMandateDetailsByActiveSubscriptionId/${id}`
        );

        if (response.status === 200 && response.data.mandate) {
          setMandateDetails(response.data.mandate);
        } else {
          setError('No mandate details found.');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMandateDetails();
  }, [id]);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  if (error) return <Typography color="error" variant="h6">{error}</Typography>;

  const mandateID = mandateDetails?.mandateid;

  return (
    <div style={{width:"100%",backgroundColor:"#f9f9f9"}}>

    
    <Box className="mandate-details" padding={3}>
    <ScreenHeading heading="Mandate Details"/>
      <Grid container spacing={2}>
        {mandateDetails && Object.entries(mandateDetails).map(([key, value]) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
            <TextField
              label={key.replace(/_/g, ' ')}
              value={value || 'N/A'}
              InputProps={{ readOnly: true }}
              fullWidth
              variant="outlined"
              size="small"
              margin="dense"
            />
          </Grid>
        ))}
      </Grid>
      <div style={{height:"30px"}}></div>
      {mandateDetails && <InvoiceComponent mandateDetails={mandateDetails} />}
    </Box>
    </div>
  );
};

export default MandateDetails;
