// src/components/AdminPage.js
import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [donations, setDonations] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedDonations = JSON.parse(localStorage.getItem('donations')) || [];
    setDonations(storedDonations);

    // For demo purposes, get users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleDeleteDonation = (index) => {
    const updatedDonations = donations.filter((_, i) => i !== index);
    setDonations(updatedDonations);
    localStorage.setItem('donations', JSON.stringify(updatedDonations));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Manage Donations</h3>
      <ul>
        {donations.map((donation, index) => (
          <li key={index}>
            <p><strong>Type:</strong> {donation.clothingType}</p>
            <p><strong>Quantity:</strong> {donation.quantity}</p>
            <p><strong>Description:</strong> {donation.description}</p>
            <p><strong>Location:</strong> {donation.area}</p>
            {donation.image && <img src={donation.image} alt="Donation" style={{ width: '100px', height: 'auto' }} />}
            {donation.video && <video src={donation.video} controls style={{ width: '300px', height: 'auto' }} />}
            <button onClick={() => handleDeleteDonation(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Registered Users</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Add more user details if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
