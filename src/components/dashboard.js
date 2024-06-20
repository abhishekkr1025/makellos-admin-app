import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicTable from './BasicTable';
import { Box, TextField } from '@mui/material';

const API = "http://dev.makellos.co.in:8080/user/getAllUsers";

const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API, {
      headers: {
        'x-requested-with': 'XMLHttpRequest'
      }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json();
      })
      .then(data => {
        console.log(data);
        setRows(data);
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
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: 240, flexShrink: 0 }}
        aria-label="mailbox folders"
      >
        {/* Your sidebar content here */}
      </Box>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 1 }}>
        <h2>User Details</h2>
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
        <Box>
          <BasicTable rows={filteredRows} onRowClick={handleRowClick} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;