'use client';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import withRoleProtection from "@/utils/withRoleProtection";
import Lottie from "lottie-react";

const DonatePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    foodType: '',
    quantity: '',
    pickupLocation: '',
    date: '',
    time: '',
    foodItems: '',
  });
  const [isVerified, setIsVerified] = useState(false);
  const [showTree, setShowTree] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    if (!token || !userData) {
      alert("Please login first.");
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);

    if (parsedUser.role !== "donor") {
      alert("Only donors can access this page.");
      router.push("/register/donor");
      return;
    }

    setIsVerified(true); // everything is fine, allow page to render
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://sharebite-backend-ylpd.onrender.com/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        const donationCount = data.donorDonationCount; // 👈 get the count from backend

        setShowTree(donationCount); // 👈 set tree size with count (can also be passed via query param to /garden)

        setFormData({
          fullName: '',
          email: '',
          phone: '',
          foodType: '',
          quantity: '',
          pickupLocation: '',
          date: '',
          time: '',
          foodItems: '',
        });

        setTimeout(() => {
          alert(`🌳 Thank you for your donation! You've donated ${donationCount} time(s).`);
          router.push(`/garden?count=${donationCount}`);
        }, 4000);

      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Submission failed", error);
      alert("Error submitting donation.");
    }
  };




  return (
    <div
      className="relative min-h-screen bg-cover bg-center pt-28 pb-10 px-4 md:px-10"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1683141173692-aba4763bce41?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMGRvbmF0aW9ufGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-green-900 bg-opacity-70 z-0" />

      {/* Form Container */}
      <div className="relative z-10 max-w-3xl mx-auto bg-white bg-opacity-90 p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Donate Food</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email + Phone */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Food Type + Quantity */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">Food Type</label>
              <select
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Type</option>
                <option value="Cooked">Cooked</option>
                <option value="Packaged">Packaged</option>
                <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                <option value="Bakery">Bakery</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">Quantity (in servings)</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* ✅ Food Items Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Food Items (comma separated)</label>
            <input
              type="text"
              name="foodItems"
              value={formData.foodItems}
              onChange={handleChange}
              placeholder="e.g. rice, banana, chapati"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Pickup Location</label>
            <textarea
              name="pickupLocation"
              rows="3"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          {/* Date + Time */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">Pickup Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">Pickup Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition duration-200"
          >
            Submit Donation
          </button>
        </form>
      </div>

      {/* Moral Values Section */}
      <div className="relative z-10 max-w-4xl mx-auto mt-12 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Why Sharing Matters 💚</h3>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>🌱 Waste Less, Feed More</li>
          <li>🤝 Build a Stronger Community</li>
          <li>🙏 A Small Act Can Save a Life</li>
          <li>💖 Kindness is Contagious</li>
        </ul>
      </div>
    </div>
  );
};

export default withRoleProtection(DonatePage, ["donor"]);
