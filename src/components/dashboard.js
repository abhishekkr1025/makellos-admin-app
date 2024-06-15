import React, { useEffect, useState } from 'react';
import Header from './Header';
import TemporaryDrawer from './TemporaryDrawer';
import BasicTable from './BasicTable';
import Details from './Details';

const API = "https://cors-anywhere.herokuapp.com/dev.makellos.co.in:8080/user/getAllUsers";
const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(()=>{
     fetch(API)
     .then(resp=> {
      if(!resp.ok) {
        throw new Error('Network response was not ok');
      }

      return resp.json(); // Call the json method as a function
     })
     .then(data=>{
      console.log(data);
      setRows(data);
     })
     .catch(error => {
       console.error('There was a problem with the fetch operation:', error);
     });
  },[])

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };


  return (
    <div>
      <Header />
      <TemporaryDrawer />
      <div style={{ padding: '20px' }}>
        <h2>Welcome to the dashboard!</h2>
        {selectedUser ? (
          <Details user={selectedUser} onBack={() => setSelectedUser(null)} />
        ) : (
          <BasicTable rows={rows} onRowClick={handleRowClick} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;