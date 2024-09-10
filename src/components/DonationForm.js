// src/components/DonationForm.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const DonationForm = ({ onAddDonation }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const initialValues = {
    clothingType: '',
    quantity: '',
    description: '',
    area: '',
    image: null,
    video: null,
  };

  const validationSchema = Yup.object({
    clothingType: Yup.string().required('Clothing type is required'),
    quantity: Yup.number().required('Quantity is required').positive().integer(),
    description: Yup.string(),
    area: Yup.string().required('Area is required'),
  });

  const handleFileChange = (event, setPreview) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const { area, image, video } = values;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(area)}&format=json&addressdetails=1`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        const donation = {
          ...values,
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          image: image ? URL.createObjectURL(image) : null,
          video: video ? URL.createObjectURL(video) : null,
        };
        setCoordinates({ lat: parseFloat(lat), lon: parseFloat(lon) });

        // Load existing donations from local storage
        const existingDonations = JSON.parse(localStorage.getItem('donations')) || [];
        existingDonations.push(donation);
        localStorage.setItem('donations', JSON.stringify(existingDonations));

        onAddDonation(donation);
      } else {
        alert('Area not found');
      }
    } catch (error) {
      alert('Error fetching location');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="clothingType">Clothing Type</label>
            <Field type="text" id="clothingType" name="clothingType" />
            <ErrorMessage name="clothingType" component="div" />
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <Field type="number" id="quantity" name="quantity" />
            <ErrorMessage name="quantity" component="div" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field as="textarea" id="description" name="description" />
          </div>
          <div>
            <label htmlFor="area">Area</label>
            <Field type="text" id="area" name="area" />
            <ErrorMessage name="area" component="div" />
          </div>
          <div>
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(event) => {
                handleFileChange(event, setImagePreview);
                setFieldValue('image', event.currentTarget.files[0]);
              }}
            />
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', height: 'auto' }} />}
          </div>
          <div>
            <label htmlFor="video">Upload Video</label>
            <input
              type="file"
              id="video"
              name="video"
              accept="video/*"
              onChange={(event) => {
                handleFileChange(event, setVideoPreview);
                setFieldValue('video', event.currentTarget.files[0]);
              }}
            />
            {videoPreview && <video src={videoPreview} controls style={{ width: '300px', height: 'auto' }} />}
          </div>
          <button type="submit">Submit Donation</button>
        </Form>
      )}
    </Formik>
  );
};

export default DonationForm;
