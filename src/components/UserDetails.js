import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Details from './Details';
import Header from './Header';
import TemporaryDrawer from './TemporaryDrawer';

const API = "https://cors-anywhere.herokuapp.com/dev.makellos.co.in:8080/user/getAllUsers";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch all users and filter out the one with the matching id
    const fetchUser = async () => {
      try {
        const response = await fetch(API);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const foundUser = data.find(user => user.userID === id);
        setUser(foundUser);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <TemporaryDrawer />
      <div style={{ padding: '20px' }}>
        <Details user={user} onBack={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default UserDetails;