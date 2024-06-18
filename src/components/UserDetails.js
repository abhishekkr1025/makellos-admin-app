import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Details from './Details';


const API = "http://cors-anywhere.herokuapp.com/dev.makellos.co.in:8080/user/getAllUsers";

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
        console.log('Fetched data:', data);  // Log fetched data
        console.log('URL Parameter id:', id); // Log id from URL parameter
        const foundUser = data.find(user => {
          console.log(`Checking userID: ${user.userID} with id: ${id}`);
          return user.userID.toString() === id;  // Ensure both are strings for comparison
        });
        console.log('Found user:', foundUser);  // Log found user
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

      <div style={{ padding: '20px' }}>
        <Details user={user} onBack={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default UserDetails;