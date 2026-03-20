'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex flex-col items-center justify-center px-4 py-10">
      {/* Animated heading */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-green-700 mb-8 text-center"
      >
        Register As
      </motion.h1>

      {/* Card container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full"
      >
        {/* Role buttons */}
        <div className="flex flex-col gap-5">
          <Link
            href="/register/donor"
            className="w-full text-center bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all shadow-md hover:scale-105"
          >
            Donor
          </Link>
          <Link
            href="/register/charity"
            className="w-full text-center bg-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-all shadow-md hover:scale-105"
          >
            Charity
          </Link>
          <Link
            href="/register/needy"
            className="w-full text-center bg-green-400 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-500 transition-all shadow-md hover:scale-105"
          >
            Needy
          </Link>
          <Link
            href="/register/volunteer"
            className="w-full text-center bg-green-300 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-400 transition-all shadow-md hover:scale-105"
          >
            Volunteer
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
