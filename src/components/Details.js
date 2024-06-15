import React from 'react';

const Details = ({ user, onBack }) => {
  return (
    <div>
      <button onClick={onBack}>Back to Users</button>
      <h2>User Details</h2>
      <p><strong>User ID:</strong> {user.userID}</p>
      <p><strong>User Active:</strong> {user.userActive}</p>
      <p><strong>New User:</strong> {user.newUser}</p>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Mobile Number:</strong> {user.mobileNumber}</p>
      <p><strong>Registered Time:</strong> {user.registeredTime}</p>
      <p><strong>staturePlusID:</strong> {user.staturePlusID}</p>
      <p><strong>customerLTRewards:</strong> {user.customerLTRewards}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default Details;