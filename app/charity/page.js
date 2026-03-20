'use client';

import React from 'react';
import Link from 'next/link';
import withRoleProtection from "@/utils/withRoleProtection";

function CharityPage() {
    return (
        <main className="bg-gray-50">
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
            <section
                className="py-20 text-center bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGRvbmF0aW9ufGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000')",
                }}
            >
                <div className="bg-white bg-opacity-80 px-4 py-12 rounded-lg inline-block">
                    <h1 className="text-4xl font-bold text-green-800 mb-4">For Charities & Nonprofits</h1>
                    <p className="text-lg text-green-700">
                        Get access to quality food donations to support your community programs
                    </p>
                </div>
            </section>


            {/* Benefits Section */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-green-800 mb-6">How We Help Charities</h2>
                <p className="text-center text-gray-700 max-w-3xl mx-auto mb-10">
                    Food Rescue Network connects your organization with local businesses that have excess food to donate. Our platform makes it easy to find and receive food donations that can help you serve more people in your community.
                </p>
                <ul className="space-y-4 text-lg text-gray-800 list-disc list-inside max-w-3xl mx-auto">
                    <li>Access to fresh, high-quality food donations from local businesses</li>
                    <li>Reduce your food costs and redirect funds to other programs</li>
                    <li>Easy-to-use platform to find and claim available donations</li>
                    <li>Support from our network of volunteer drivers for transportation</li>
                    <li>Detailed reporting for your records and grant applications</li>
                    <li>Help reduce food waste in your community</li>
                </ul>

            </section>

            {/* CTA Box */}
            <section className="bg-green-50 py-12 px-4 text-center">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">Ready to Get Started?</h3>
                <p className="text-gray-700 max-w-2xl mx-auto mb-6">
                    Join hundreds of nonprofits already receiving food donations through our network. Sign up today and start accessing free food for your programs.
                </p>
                <Link href="#signup" className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition">
                    Register Your Charity
                </Link>
            </section>

            {/* How It Works */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-green-800 mb-4">How It Works</h2>
                <p className="text-center text-gray-700 mb-12">Our simple process makes it easy to receive food donations for your organization</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            step: '1',
                            title: 'Register Your Organization',
                            desc: 'Complete our simple application process to verify your nonprofit status and food handling capabilities.',
                        },
                        {
                            step: '2',
                            title: 'Browse Available Donations',
                            desc: 'View real-time listings of available food donations from local businesses in your area.',
                        },
                        {
                            step: '3',
                            title: 'Claim Donations',
                            desc: 'Reserve the food you need with just a few clicks. Our system will notify the donor.',
                        },
                        {
                            step: '4',
                            title: 'Receive & Distribute',
                            desc: 'Pick up the food or arrange for one of our volunteer drivers to deliver it to your location.',
                        },
                    ].map(({ step, title, desc }) => (
                        <div
                            key={step}
                            className="bg-white p-6 rounded-lg shadow-md text-center transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-xl"

                        >
                            <div className="text-green-600 text-4xl font-bold mb-2">{step}</div>
                            <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
                            <p className="text-gray-600 text-sm">{desc}</p>
                        </div>
                    ))}
                </div>

            </section>

            {/* Testimonials */}
            <section className="bg-gray-100 py-16 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-green-800 mb-4">What Charities Say</h2>
                    <p className="text-gray-700 mb-10">Hear from organizations using our platform to feed their communities</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: 'Food Rescue Network has transformed our ability to serve meals to those in need. We\'ve increased our meal program by 40% without increasing our food budget.',
                                author: 'Maria Gonzalez',
                                org: 'Director, Community Kitchen',
                            },
                            {
                                quote: 'The quality of food we receive through this network is exceptional. It\'s allowed us to provide healthier options to the families we serve.',
                                author: 'James Wilson',
                                org: 'Food Pantry Coordinator',
                            },
                            {
                                quote: 'As a small nonprofit, the savings from using rescued food has allowed us to expand our other services. The platform is incredibly easy to use.',
                                author: 'Sarah Johnson',
                                org: 'Executive Director, Hope Center',
                            },
                        ].map(({ quote, author, org }, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow">
                                <p className="text-gray-700 mb-4 italic">“{quote}”</p>
                                <div className="font-bold text-green-700">{author}</div>
                                <div className="text-sm text-gray-600">{org}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
export default withRoleProtection(CharityPage, ["charity"]);
