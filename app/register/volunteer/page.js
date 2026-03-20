'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const VolunteerRegisterPage = () => {
  const router = useRouter();
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');
  const [confirmationEmail, setConfirmationEmail] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    availability: '',
    rolePreference: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const email = decoded.email;
    const name = decoded.name;

    setFormData((prev) => ({
      ...prev,
      fullName: name || '',
      email: email || '',
    }));

    setConfirmationEmail(email);
    sendEmailCode(email);
  };

  const sendEmailCode = async (email) => {
    try {
      await axios.post('https://sharebite-backend-ylpd.onrender.com/api/send-confirmation-code', { email });
      setShowCodeInput(true);
      alert('✅ Confirmation code sent to your email');
    } catch (err) {
      alert('❌ Failed to send confirmation code');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (showCodeInput) {
        const res = await axios.post('https://sharebite-backend-ylpd.onrender.com/api/verify-code', {
          email: confirmationEmail,
          code: Number(enteredCode),
        });

        if (!res.data.success) {
          alert('❌ Invalid confirmation code');
          return;
        }
      }

      await axios.post('https://sharebite-backend-ylpd.onrender.com/api/volunteers/register', {
        fullName: formData.fullName,
        email: confirmationEmail || formData.email,
        password: formData.password,
        phone: formData.phone,
        availability: formData.availability,
        rolePreference: formData.rolePreference,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.zipCode,
          country: "" // you can add a country field in the form later if needed
        }
      });


      alert('✅ Registration completed!');
      router.push('/login');
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      alert(`❌ ${message}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        Register as Volunteer
      </h2>

      <div className="mb-6 text-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert('Google Sign-In Failed')}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        {showCodeInput && (
          <input
            type="text"
            placeholder="Enter Confirmation Code"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        )}

        <input
          name="fullName"
          placeholder="Full Name"
          required
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={showCodeInput} // Prevent editing email if from Google
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="phone"
          placeholder="Phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Address Fields */}
        <input
          name="street"
          placeholder="Street Address"
          required
          value={formData.street}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="city"
          placeholder="City"
          required
          value={formData.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="state"
          placeholder="State"
          required
          value={formData.state}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="zipCode"
          placeholder="Zip Code"
          required
          value={formData.zipCode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Availability</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
          <option value="Flexible">Flexible</option>
        </select>
        <select
          name="rolePreference"
          value={formData.rolePreference}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Role</option>
          <option value="Food Rescue Driver">Food Rescue Driver</option>
          <option value="Warehouse Assistant">Warehouse Assistant</option>
          <option value="Community Outreach">Community Outreach</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Submit & Register
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">Already have an account?</p>
        <button
          onClick={() => router.push('/login')}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default VolunteerRegisterPage;
