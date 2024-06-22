import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Details from './Details';
import UserActiveSubsComp from '../Screens/UserScreen/UserActiveSubsComp';

const API = "http://dev.makellos.co.in:8080/user/getAllUsers";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(API);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const foundUser = data.find(user => user.userID.toString() === id);
        setUser(foundUser);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Details user={user} onBack={() => navigate(-1)} />
      <UserActiveSubsComp userID={user.userID} />
    </div>
  );
};

export default UserDetails;
