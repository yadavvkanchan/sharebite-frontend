'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const CharitySignupForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    orgName: '',
    email: '',
    contactPerson: '',
    phone: '',
    flat: '',
    street: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    password: '',
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
      email: decoded.email,
      contactPerson: decoded.name,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalEmail = formData.email;

      // If Google sign-in was used, verify code
      if (showCodeInput) {
        const res = await axios.post('https://sharebite-backend-ylpd.onrender.com/api/verify-code', {
          email: confirmationEmail,
          code: enteredCode,
        });

        if (!res.data.success) {
          alert('❌ Invalid confirmation code');
          return;
        }

        finalEmail = confirmationEmail;
      }

      const { flat, street, area, city, state, pincode, ...rest } = formData;

      const registerRes = await axios.post('https://sharebite-backend-ylpd.onrender.com/api/charity/register', {
        ...rest,
        email: finalEmail,
        address: { flat, street, area, city, state, pincode }
      });


      const registeredCharity = registerRes.data?.user || {};
      localStorage.setItem("user", JSON.stringify({
        id: registeredCharity._id,
        name: registeredCharity.orgName || registeredCharity.contactPerson,
        email: registeredCharity.email,
        role: "charity"
      }));

      alert('✅ Charity registered successfully!');
      router.push('/charity');
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
        Charity Registration
      </h3>

      {/* 🔵 Google Login */}
      <div className="mb-6 text-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert('Google Sign-In Failed')}
        />
      </div>

      {/* 🔐 Manual + Google Code Registration */}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="flat"
          placeholder="Flat / House No."
          value={formData.flat || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street / Road Name"
          value={formData.street || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="area"
          placeholder="Locality / Area"
          value={formData.area || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="orgName"
          placeholder="Organization Name"
          value={formData.orgName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {!showCodeInput && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="contactPerson"
              placeholder="Contact Person"
              value={formData.contactPerson}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </>
        )}
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition w-full"
        >
          Submit
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

export default CharitySignupForm;
