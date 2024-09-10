// src/components/DonationList.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure you import Leaflet CSS

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const defaultCenter = [51.505, -0.09];
  const mapCenter = donations.length > 0
    ? [donations[0].latitude, donations[0].longitude]
    : defaultCenter;
  const zoom = donations.length > 0 ? 13 : 2;

  useEffect(() => {
    const storedDonations = JSON.parse(localStorage.getItem('donations')) || [];
    setDonations(storedDonations);
  }, []);

  return (
    <div>
      <h2>All Donations</h2>
      <ul>
        {donations.map((donation, index) => (
          <li key={index}>
            <p><strong>Type:</strong> {donation.clothingType}</p>
            <p><strong>Quantity:</strong> {donation.quantity}</p>
            <p><strong>Description:</strong> {donation.description}</p>
            <p><strong>Location:</strong> {donation.area}</p>
            {donation.image && <img src={donation.image} alt="Donation" style={{ width: '100px', height: 'auto' }} />}
            {donation.video && <video src={donation.video} controls style={{ width: '300px', height: 'auto' }} />}
          </li>
        ))}
      </ul>
      <h3>Pickup Locations on Map</h3>
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {donations.map((donation, index) => (
          <Marker
            key={index}
            position={[donation.latitude, donation.longitude]}
          >
            <Popup>
              <strong>Type:</strong> {donation.clothingType}<br />
              <strong>Quantity:</strong> {donation.quantity}<br />
              <strong>Description:</strong> {donation.description}<br />
              {donation.image && <img src={donation.image} alt="Donation" style={{ width: '100px', height: 'auto' }} />}
              {donation.video && <video src={donation.video} controls style={{ width: '300px', height: 'auto' }} />}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DonationList;
