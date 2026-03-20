'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const DonorRegisterPage = () => {
  const router = useRouter();
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');
  const [confirmationEmail, setConfirmationEmail] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    roomNo: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let emailToUse = formData.email;

      if (showCodeInput) {
        const res = await axios.post('https://sharebite-backend-ylpd.onrender.com/api/verify-code', {
          email: confirmationEmail,
          code: enteredCode,
        });

        if (!res.data.success) {
          alert('❌ Invalid confirmation code');
          return;
        }

        emailToUse = confirmationEmail;
      }

      await axios.post('https://sharebite-backend-ylpd.onrender.com/api/donors/register', {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        address: {
          roomNo: formData.roomNo,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country || "India"
        }
      });



      alert('✅ Registration completed');
      router.push('/login');
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      alert(`❌ ${message}`);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    setFormData((prev) => ({
      ...prev,
      fullName: decoded.name,
      email: decoded.email,
    }));

    sendEmailCode(decoded.email);
  };

  const sendEmailCode = async (email) => {
    try {
      await axios.post('https://sharebite-backend-ylpd.onrender.com/api/send-confirmation-code', { email });
      setShowCodeInput(true);
      setConfirmationEmail(email);
      alert('✅ Confirmation code sent to your email');
    } catch (err) {
      alert('❌ Failed to send confirmation code');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Register as Donor</h2>

      <div className="mb-6 text-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("Google Sign-In Failed")}
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
          disabled={showCodeInput}
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
          name="roomNo"
          placeholder="Room / Apartment No."
          required
          value={formData.roomNo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
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
          onClick={handleLoginRedirect}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default DonorRegisterPage;
