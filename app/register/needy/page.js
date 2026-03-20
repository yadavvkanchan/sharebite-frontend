'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const NeedySignupForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    roomNo: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    reason: '',
  });

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [enteredCode, setEnteredCode] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Google User:', decoded);

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

  const handleRegister = async () => {
    try {
      const res = await axios.post('https://sharebite-backend-ylpd.onrender.com/api/verify-code', {
        email: confirmationEmail,
        code: enteredCode,
      });

      if (res.data.success) {
        // Send address as nested object
        const addressObj = {
          roomNo: formData.roomNo,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        };

        await axios.post('https://sharebite-backend-ylpd.onrender.com/api/needy/register', {
          fullName: formData.fullName,
          email: confirmationEmail,
          password: formData.password,
          phone: formData.phone,
          reason: formData.reason,
          address: addressObj,
        });

        localStorage.setItem('userEmail', confirmationEmail);
        alert('✅ Needy person registered successfully!');
        router.push('/login');
      } else {
        alert('❌ Invalid confirmation code');
      }
    } catch (err) {
      alert('❌ Registration failed');
      console.error(err.response?.data || err.message);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-12">
      <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">
        Needy Registration
      </h3>

      {/* Google Login */}
      <div className="mb-6 text-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert('Google Sign-In Failed')}
        />
      </div>

      {/* Confirmation Code + Password + Phone + Address */}
      {showCodeInput && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Enter Confirmation Code"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="roomNo"
            placeholder="Room No."
            value={formData.roomNo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pin Code"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="reason"
            placeholder="Reason for Need"
            value={formData.reason}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleRegister}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Code & Register
          </button>
        </div>
      )}

      {/* Manual Form if not using Google */}
      {!showCodeInput && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const addressObj = {
              roomNo: formData.roomNo,
              street: formData.street,
              city: formData.city,
              state: formData.state,
              pincode: formData.pincode,
            };

            try {
              const res = await axios.post('https://sharebite-backend-ylpd.onrender.com/api/needy/register', {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                reason: formData.reason,
                address: addressObj,
              });

              if (res.status === 201) {
                alert('Needy person registered successfully!');
                localStorage.setItem('userEmail', formData.email);
                setFormData({
                  fullName: '',
                  email: '',
                  password: '',
                  phone: '',
                  roomNo: '',
                  street: '',
                  city: '',
                  state: '',
                  pincode: '',
                  reason: '',
                });
              } else {
                alert('Registration failed. Please try again.');
              }
            } catch (err) {
              console.error('Submission error:', err.response?.data || err.message);
              alert('❌ Registration failed');
            }
            router.push('/login');
          }}
        >
          {[
            { label: 'Full Name', name: 'fullName' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'Phone', name: 'phone', type: 'tel' },
            { label: 'Room No.', name: 'roomNo' },
            { label: 'Street', name: 'street' },
            { label: 'City', name: 'city' },
            { label: 'State', name: 'state' },
            { label: 'Pin Code', name: 'pincode' },
            { label: 'Reason for Need', name: 'reason' },
          ].map(({ label, name, type = 'text' }) => (
            <div key={name} className="mb-4">
              <label className="block text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
      )}

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

export default NeedySignupForm;
