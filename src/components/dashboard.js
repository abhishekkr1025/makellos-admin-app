// Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicTable from './BasicTable';

const API = "http://cors-anywhere.herokuapp.com/dev.makellos.co.in:8080/user/getAllUsers";

const Dashboard = () => {
  const [rows, setRows] = useState([]);
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

  return (
    <div>
      <h2>User Details</h2>
      <BasicTable rows={rows} onRowClick={handleRowClick} />
    </div>
  );
};

export default Dashboard;