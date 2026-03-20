"use client";

import { useState, useEffect } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // ensures component renders only on client
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // do backend logic here...

    setSubmitted(true);

    // reset the form
    setFormData({
      name: "",
      email: "",
      message: ""
    });

    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!mounted) return null; // fix hydration mismatch

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-16 px-4 flex flex-col items-center">
      <div className="text-center mb-10">
        <h2 className="text-5xl font-extrabold text-green-800 drop-shadow-md mb-4 animate-fade-in-down">
          Contact Us
        </h2>
        <p className="text-lg text-gray-600 animate-fade-in delay-200">
          Let’s build a hunger-free world, together.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-10 animate-fade-in-up">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-left font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Kanchan Yadav"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          <div>
            <label className="block text-left font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          <div>
            <label className="block text-left font-semibold text-gray-700 mb-1">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
              placeholder="Write your message here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-600 to-lime-500 text-white font-bold rounded-xl shadow-md transform transition-transform hover:scale-105 hover:shadow-lg"
          >
            ✉️ Send Message
          </button>

          {submitted && (
            <p className="text-green-700 text-center font-medium animate-bounce mt-4">
              ✅ Message Sent Successfully!
            </p>
          )}
        </form>
      </div>

      <div className="text-center mt-12 text-gray-600 animate-fade-in delay-300">
        <p>📍 Bhandup West, Mumbai</p>
        <p>📧 contact@sharebite.org</p>
        <p>📞 +91 98765 43210</p>
      </div>
    </section>
  );
}
