"use client";

import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const VolunteerSignupForm = () => {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "", // ✅ Added this line
    phone: "",
    availability: "",
    rolePreference: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://sharebite-backend-ylpd.onrender.com/api/volunteers/register",
        formData
      ); // Change URL as needed
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Google User:", decoded);

    setFormData((prev) => ({
      ...prev,
      fullName: decoded.name,
      email: decoded.email,
    }));

    sendEmailCode(decoded.email);
  };

  const sendEmailCode = async (email) => {
    try {
      await axios.post("https://sharebite-backend-ylpd.onrender.com/api/send-confirmation-code", {
        email,
      });
      setShowCodeInput(true);
      setConfirmationEmail(email);
      alert("✅ Confirmation code sent to your email");
    } catch (err) {
      alert("❌ Failed to send confirmation code");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
        Volunteer Signup
      </h2>
      {showCodeInput && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Confirmation Code"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="password"
            placeholder="Create Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="tel"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />

          {/* You can also ask for availability and rolePreference here if required */}

          <button
            className="w-full bg-blue-600 text-white py-2 rounded"
            onClick={async () => {
              try {
                const res = await axios.post(
                  "https://sharebite-backend-ylpd.onrender.com/api/verify-code",
                  {
                    email: confirmationEmail,
                    code: enteredCode,
                  }
                );

                if (res.data.success) {
                  await axios.post(
                    "https://sharebite-backend-ylpd.onrender.com/api/volunteers/register",
                    {
                      fullName: formData.fullName,
                      email: confirmationEmail,
                      password: formData.password,
                      phone: formData.phone,
                      availability: formData.availability,
                      rolePreference: formData.rolePreference,
                    }
                  );
                  alert("✅ Registered Successfully");
                  setSubmitted(true);
                  setShowCodeInput(false);
                } else {
                  alert("❌ Invalid confirmation code");
                }
              } catch (err) {
                alert("❌ Verification failed");
                console.error(err);
              }
            }}
          >
            Submit Code & Register
          </button>
        </div>
      )}

      {submitted ? (
        <div className="text-green-700 text-center font-semibold">
          Thank you for signing up! We'll contact you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6 text-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert("Google Sign-In Failed")}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Availability
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select...</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Preferred Role
            </label>
            <select
              name="rolePreference"
              value={formData.rolePreference}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select...</option>
              <option value="Food Rescue Driver">Food Rescue Driver</option>
              <option value="Warehouse Assistant">Warehouse Assistant</option>
              <option value="Community Outreach">Community Outreach</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default VolunteerSignupForm;
