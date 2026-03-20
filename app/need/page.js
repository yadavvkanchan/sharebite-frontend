"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ClaimFormModal from "@/components/ClaimFormModal";
import { toast } from "react-toastify";
import getPixabayImage from "@/lib/getPixabayImage";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import withRoleProtection from "@/utils/withRoleProtection";


const FindFoodPage = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [donations, setDonations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activeDonationId, setActiveDonationId] = useState(null);
    const [filteredDonations, setFilteredDonations] = useState([]);
    const [images, setImages] = useState({});
    const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);



    const fetchDonations = async () => {
        try {
            const res = await fetch("https://sharebite-backend-ylpd.onrender.com/api/donations", {
                cache: "no-store",
            });
            const data = await res.json();
            setDonations(data);
            setFilteredDonations(data);

            const updatedDonations = await Promise.all(
                data.map(async (donation) => {
                    const keyword = donation.foodItems || donation.foodType || "food";
                    const image = await getPixabayImage(keyword);
                    return { ...donation, image };
                })
            );


            setDonations(updatedDonations);
            setFilteredDonations(updatedDonations);

        } catch (error) {
            console.error("Error fetching donations:", error);
        }
    };

    // ✅ useEffect remains untouched
    useEffect(() => {
        fetchDonations();
    }, []);

    const handleClaimSubmit = async ({ accessedBy, accessedLocation, donationId }) => {
        try {
            const response = await fetch(`https://sharebite-backend-ylpd.onrender.com/api/donations/${donationId}/claim`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ accessedBy, accessedLocation }),
            });

            if (!response.ok) {
                throw new Error("Failed to claim donation");
            }

            alert("Donation claimed successfully! 🎉");

            // ✅ Refresh data from backend
            await fetchDonations();

        } catch (error) {
            console.error("Error claiming donation:", error);
            alert("Something went wrong while claiming. Please try again.");
        }
    };


    const handleSearch = (e) => {
        e.preventDefault();

        // 🔽 This is the line you asked about — place it here
        const terms = searchTerm.trim().toLowerCase().split(" ");

        const filtered = donations.filter((item) => {
            const searchableString = `
      ${item.foodItems || ""} 
      ${item.foodType || ""} 
      ${item.pickupLocation || ""} 
      ${item.fullName || ""} 
      ${item.quantity || ""} 
      ${item.date || ""} 
      ${item.time || ""}
    `.toLowerCase();

            return terms.some((term) => searchableString.includes(term));
        });

        setFilteredDonations(filtered);
    };

    const checkNeedyStatusAndOpenModal = async (donationId) => {
        try {
            const storedEmail = localStorage.getItem("userEmail");
            const role = localStorage.getItem("userRole");

            if (!storedEmail || role !== "needy") {
                alert("⚠️ You must register/login as a needy person to claim donations.");
                return;
            }

            // 🔍 Optional: verify from backend again
            const res = await fetch("https://sharebite-backend-ylpd.onrender.com/api/needy/check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: storedEmail }),
            });

            const data = await res.json();

            if (res.ok && data.exists) {
                setActiveDonationId(donationId);
                setShowModal(true);
            } else {
                alert("❌ You're not a registered needy. Please register first.");
            }
        } catch (err) {
            console.error("Error verifying needy user:", err);
            alert("⚠️ Something went wrong. Try again later.");
        }
    };



    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            {/* Header */}
            <div className="bg-green-700 text-white text-sm py-2">
                <div className="max-w-6xl mx-auto flex justify-between px-4">
                    <div>Connecting excess food with those in need since 2015</div>
                    <div className="space-x-3">
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative bg-green-100 py-16 text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: "url('/about.jpg')" }}
                ></div>
                <div className="relative z-10">
                    <motion.h1
                        className="text-4xl font-bold mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Find Food Near You
                    </motion.h1>
                    <motion.p
                        className="text-gray-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Discover available food donations from local businesses and organizations
                    </motion.p>
                </div>
            </section>

            {/* Search Section */}
            <div className="max-w-4xl mx-auto py-12 px-4">
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Search food/location (e.g., rice, mumbai)"
                        value={searchTerm}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchTerm(value);
                            if (value.trim() === "") {
                                setFilteredDonations(donations);
                            }
                        }}
                        className="border p-2 rounded col-span-2"
                    />

                    <button
                        type="submit"
                        className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Section Title */}
            <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-3xl font-bold text-center text-green-800 mb-6 drop-shadow"
            >
                Recent Donations
            </motion.p>
            <div className="mb-4 px-3 py-1 rounded bg-gray-100 text-gray-600 text-sm w-fit shadow">
                Note: 📷 Images are for illustration only
            </div>


            {/* Donations Grid */}
            <div className="max-w-6xl mx-auto px-4 py-8 grid gap-8 md:grid-cols-3">
                {filteredDonations.map((item, idx) => (
                    <motion.div
                        key={item._id}
                        className="bg-white rounded shadow overflow-hidden"
                        whileHover={{ scale: 1.03 }}
                    >
                        <div className="h-48 relative">
                            <Image
                                src={item.image || "/default-food.jpg"}
                                alt={item.foodItems || "Food Image"}
                                fill
                                className="object-cover"
                                sizes="100vw"
                                priority
                            />
                        </div>


                        <div className="p-4">
                            <span className="text-sm text-green-700 font-semibold">{item.foodType}</span>
                            <h3 className="text-xl font-bold">{item.foodItems}</h3>
                            <p className="text-gray-600 text-sm mb-2">Donor: {item.fullName}</p>
                            <div className="text-sm text-gray-500 flex flex-col gap-1">
                                <span><i className="fas fa-map-marker-alt"></i>Location: {item.pickupLocation}</span>
                                <span><i className="fas fa-weight"></i>Quantity: {item.quantity}</span>
                                <span><i className="far fa-clock"></i>Pickup Time: {item.time} on {item.date}</span>
                            </div>

                            {item.claimed ? (
                                <div className="mt-3 text-red-600 font-medium text-sm">
                                    Already claimed by {item.accessedBy} at {item.accessedLocation}
                                </div>
                            ) : (
                                <button
                                    onClick={() => checkNeedyStatusAndOpenModal(item._id)}
                                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Claim Donation
                                </button>
                            )}

                        </div>
                    </motion.div>
                ))}
            </div>
            {showRegisterPrompt && (
                <div className="max-w-xl mx-auto mb-6 p-4 border border-yellow-400 bg-yellow-100 rounded text-center">
                    <p className="text-yellow-800 font-semibold mb-2">
                        You are not registered as a needy person.
                    </p>
                    <p className="text-sm text-yellow-700 mb-4">
                        To claim a donation, please register as a needy.
                    </p>
                    <button
                        onClick={() => router.push("/register/needy")}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                        Register as Needy
                    </button>
                </div>
            )}

            {showModal && activeDonationId && (
                <ClaimFormModal
                    donationId={activeDonationId}
                    onClose={() => {
                        setShowModal(false);
                        setActiveDonationId(null);
                    }}
                    onSubmit={({ accessedBy, accessedLocation, donationId }) =>
                        handleClaimSubmit({ accessedBy, accessedLocation, donationId })
                    }
                />
            )}


        </div>
    );
};

export default withRoleProtection(FindFoodPage, ["needy"]);
