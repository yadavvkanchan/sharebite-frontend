"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import withRoleProtection from "@/utils/withRoleProtection";

const VolunteerPage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [charityId, setCharityId] = useState(null);
  const [charityName, setCharityName] = useState(null);


  useEffect(() => {
    axios.get("https://sharebite-backend-ylpd.onrender.com/api/volunteers")
      .then(res => setVolunteers(res.data))
      .catch(console.error);
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "charity") {
      setCharityId(user.id);
      setCharityName(user.name);
    }
  }, []);



  const hire = async (volunteerId) => {
    const charityName = "Helping Hands NGO"; // Optional for now
    const schedule = prompt("Enter schedule for the volunteer:");

    if (!schedule) return alert("Hiring cancelled. Schedule required.");

    try {
      await axios.put(`https://sharebite-backend-ylpd.onrender.com/api/volunteers/hire/${volunteerId}`, {
        charityName,
        schedule,
        charityId,
      });


      alert("Volunteer hired and notified via email!");

      // Update UI
      setVolunteers(prev =>
        prev.map(v =>
          v._id === volunteerId ? { ...v, status: "Hired" } : v
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to hire volunteer.");
    }
  };

  const applyToRole = async (role) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "volunteer") {
      alert("Please login as a volunteer to apply.");
      return;
    }

    try {
      await axios.put(`https://sharebite-backend-ylpd.onrender.com/api/volunteers/apply/${user.id}`, {
        rolePreference: role,
      });
      alert(`✅ Successfully applied as ${role}`);
      // Optionally refresh the volunteer list or redirect
      setVolunteers(prev =>
        prev.map(v =>
          v._id === user.id ? { ...v, rolePreference: role } : v
        )
      );

    } catch (err) {
      console.error(err);
      alert("❌ Failed to apply for role");
    }
  };


  return (
    <main className="bg-white">
      {/* Header Top */}
      <div className="bg-green-700 text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div>Connecting excess food with those in need since 2015</div>
          <div className="space-x-3">
            <a href="#" className="hover:text-gray-200">Twitter</a>
            <a href="#" className="hover:text-gray-200">Facebook</a>
            <a href="#" className="hover:text-gray-200">Instagram</a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-green-100 py-20 text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Join Our Volunteer Team</h1>
        <p className="text-lg text-green-700 max-w-2xl mx-auto">Help us rescue food and fight hunger in your community. Every hour you give makes a difference.</p>
        <Link href="/signup" className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-full shadow hover:bg-green-700 transition duration-200">
          Sign Up Now
        </Link>
      </section>
      {/* Live Volunteer List with Hire Buttons */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-extrabold text-green-800 mb-4 tracking-tight">Meet Our Volunteers</h2>
          <p className="text-gray-600 text-lg">These amazing individuals have offered their time to help us serve the community. Click 'Hire' to engage them for your cause.</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {volunteers.map((v, i) => (
            <div
              key={v._id}
              className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 transform transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-green-400"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-semibold text-green-800">{v.fullName}</h3>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${v.status === "Hired" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"
                    }`}
                >
                  {v.status}
                </span>
              </div>
              <p className="text-gray-700 mb-1"><strong>Email:</strong> {v.email}</p>
              <p className="text-gray-700 mb-1"><strong>Phone:</strong> {v.phone}</p>
              <p className="text-gray-700 mb-1"><strong>Role:</strong> {v.rolePreference}</p>
              <p className="text-gray-700 mb-4"><strong>Available on:</strong> {v.availability}</p>

              {v.address && (
                <div className="text-gray-700 mb-4">
                  <strong>Address:</strong>
                  <div>{v.address.street}</div>
                  <div>{v.address.city}, {v.address.state} {v.address.postalCode}</div>
                  <div>{v.address.country}</div>
                </div>
              )}



              {v.status === "Available" && charityId && (
                <button
                  onClick={() => hire(v._id)}
                  className="w-full py-2 mt-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition duration-300"
                >
                  Hire Volunteer
                </button>
              )}

            </div>
          ))}
        </div>
      </section>



      {/* Volunteer Opportunities */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-2">Volunteer Opportunities</h2>
          <p className="text-gray-600">We have several ways you can get involved based on your availability and interests</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:-translate-y-2">
            <div className="h-56 bg-cover bg-center" style={{ backgroundImage: "url('https://images.squarespace-cdn.com/content/v1/5e88e291ea4f6c4cc5e5d7f5/dcab1679-e7f6-4a6e-96eb-7471e68fbd30/Food+Rescue+Route+Driver+1.jpg')" }}></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Food Rescue Driver</h3>
              <p className="text-gray-600 mb-4">Pick up donated food from local businesses and deliver it to partner organizations serving those in need.</p>
              <div className="text-sm text-gray-500 mb-4">
                <span className="block mb-1"><i className="fas fa-clock mr-1"></i> 2-3 hours per shift</span>
                <span><i className="fas fa-car mr-1"></i> Vehicle required</span>
              </div>
              <button
                onClick={() => applyToRole("Food Rescue Driver")}
                className="relative inline-block px-6 py-2 font-semibold text-green-800 rounded-full overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 via-lime-500 to-green-600 transition-transform duration-500 ease-out transform -translate-x-full group-hover:translate-x-0 rounded-full z-0"></span>
                <span className="relative z-10 group-hover:text-white transition duration-300">Apply Now</span>
              </button>

            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:-translate-y-2">
            <div className="h-56 bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/black-female-warehouse-worker-going-through-shipment-list-while-checking-stock-industrial-storage-compartment_637285-4044.jpg')" }}></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Warehouse Assistant</h3>
              <p className="text-gray-600 mb-4">Help sort, package, and organize rescued food at our distribution center before it goes out to partners.</p>
              <div className="text-sm text-gray-500 mb-4">
                <span className="block mb-1"><i className="fas fa-clock mr-1"></i> Flexible shifts</span>
                <span><i className="fas fa-utensils mr-1"></i> No experience needed</span>
              </div>
              <button
                onClick={() => applyToRole("Warehouse Assistant")}
                className="relative inline-block px-6 py-2 font-semibold text-green-800 rounded-full overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 via-lime-500 to-green-600 transition-transform duration-500 ease-out transform -translate-x-full group-hover:translate-x-0 rounded-full z-0"></span>
                <span className="relative z-10 group-hover:text-white transition duration-300">Apply Now</span>
              </button>

            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:-translate-y-2">
            <div className="h-56 bg-cover bg-center" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1199705901/photo/mid-adult-volunteer-shakes-hands-with-girl-at-registration-table.jpg?s=612x612&w=0&k=20&c=9dRm8UGu7XeI3qi9V07q0c140eIv__WMm3_JOYb8VpE=')" }}></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Community Outreach</h3>
              <p className="text-gray-600 mb-4">Help spread awareness about food rescue at community events and recruit new donors and volunteers.</p>
              <div className="text-sm text-gray-500 mb-4">
                <span className="block mb-1"><i className="fas fa-clock mr-1"></i> Weekends/events</span>
                <span><i className="fas fa-users mr-1"></i> Great for groups</span>
              </div>
              <button
                onClick={() => applyToRole("Community Outreach")}
                className="relative inline-block px-6 py-2 font-semibold text-green-800 rounded-full overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 via-lime-500 to-green-600 transition-transform duration-500 ease-out transform -translate-x-full group-hover:translate-x-0 rounded-full z-0"></span>
                <span className="relative z-10 group-hover:text-white transition duration-300">Apply Now</span>
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-2">What Our Volunteers Say</h2>
          <p className="text-gray-600">Hear from people who are making a difference in their communities</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              text: "I love knowing that the few hours I spend each week driving food around town directly helps families in my community. It's so rewarding!",
              author: 'Maria Gonzalez',
              role: 'Food Rescue Driver, 2 years'
            },
            {
              text: "The warehouse team has become like family. We have fun while doing important work, and I've learned so much about food systems.",
              author: 'James Wilson',
              role: 'Warehouse Volunteer, 1 year'
            },
            {
              text: "As a college student, this has been a perfect way to give back. The flexible scheduling lets me volunteer between classes.",
              author: 'Taylor Smith',
              role: 'Student Volunteer, 6 months'
            }
          ].map(({ text, author, role }, i) => (
            <div key={i} className="bg-green-50 p-6 rounded-lg shadow">
              <p className="text-gray-700 italic mb-4">"{text}"</p>
              <div className="text-green-800 font-semibold">{author}</div>
              <div className="text-sm text-gray-500">{role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 text-white text-center py-16 px-4" id="signup">
        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="max-w-2xl mx-auto mb-6">Join our network of volunteers helping to rescue food and fight hunger in your community. No experience necessary - we'll provide all the training you need.</p>
        <Link href="/signup" className="inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
          Become a Volunteer
        </Link>
      </section>
    </main>
  );
};

export default withRoleProtection(VolunteerPage, ["volunteer", "charity"]);
