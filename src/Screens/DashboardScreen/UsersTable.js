import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicTable from '../../components/BasicTable';
import { Box, TextField, Typography } from '@mui/material';
import axios from 'axios';
import ScreenHeading from '../../CustomComponents/ScreenHeading';

// import UserAddress from './UserAddressComponent';

const API = "http://34.131.81.53:8080/user/getAllUsers";

const UsersTable = () => {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(API)
      .then(response => {
        if (!response.data) {
          throw new Error('Empty response data');
        }
        // console.log(response.data);
        const sortedData = response.data.sort((a, b) => {
          return new Date(b.registeredTime) - new Date(a.registeredTime);
        });
        setRows(sortedData);
        // console.log("Fetched Data: "+rows[0]);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const handleRowClick = (user) => {
    if (user && user.userID) {
      navigate(`/user/${user.userID}`);
    } else {
      console.error('User ID is not defined:', user);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  
  

  return (
    <div>

    
    
      

      {/* Main content */}
    
        
        <Box>
          <BasicTable rows={filteredRows} onRowClick={handleRowClick} />
        </Box>
    

      
  

   
    {/* <UserAddress userID={rows.userID}/> */}
   
    </div>
  );
};

export default UsersTable;