"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext"; // ✅ import useAuth

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useAuth(); // ✅ get login function from context
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://sharebite-backend-ylpd.onrender.com/api/login", formData);

      const userData = {
        id: res.data.user.id,
        name: res.data.user.fullName,
        email: res.data.user.email,
        role: res.data.role,
        token: res.data.token,
      };

      // ✅ Save role-specific email to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", res.data.user.email);
      localStorage.setItem("userRole", res.data.role);
      localStorage.setItem("userData", JSON.stringify(userData));

      if (res.data.role === "needy") {
        localStorage.setItem("needyEmail", res.data.user.email); // 👈 this is what checkNeedyStatus needs
      }
      if (res.data.role === "donor") {
        localStorage.setItem("donorEmail", res.data.user.email);
      }
      if (res.data.role === "charity") {
        localStorage.setItem("charityEmail", res.data.user.email);
      }
      if (res.data.role === "volunteer") {
        localStorage.setItem("volunteerEmail", res.data.user.email); // ✅ added
      }

      login(userData); // still calling context if you're using it

      setMessage(`${res.data.message} as ${res.data.role}`);
      router.push("/");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-green-100 to-white">
      <motion.h1
        className="text-4xl font-bold mb-6 text-green-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to ShareBite
      </motion.h1>

      <motion.form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-green-200"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 font-semibold"
        >
          Login
        </button>

        {message && (
          <motion.p
            className="mt-4 text-center text-sm text-red-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.p>
        )}

        <div className="mt-6 text-center">
          <span className="text-gray-600">New here?</span>{" "}
          <a
            href="/register"
            className="text-green-700 font-medium hover:underline"
          >
            Register now
          </a>
        </div>
      </motion.form>
    </div>
  );
};

export default LoginPage;
