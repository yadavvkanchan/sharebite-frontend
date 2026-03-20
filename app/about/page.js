"use client"
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="bg-green-50 text-gray-900 font-inter">
            {/* Header Top */}
            <div className="bg-green-600 text-white px-8 py-2 flex justify-between items-center text-sm animate-fade-in-down">
                <span>Join us in ending hunger</span>
                <div className="space-x-4">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
            </div>

            {/* Hero Section */}
            <section
                className="relative min-h-[90vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-white"
                style={{ backgroundImage: "url('/about2.jpg')" }}
            >
                <div className="bg-black/60 absolute inset-0" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl font-bold mb-4">ShareBite Mission</h1>
                    <p className="text-xl">Fighting hunger with love, one plate at a time.</p>
                </div>
            </section>



            {/* Mission Section */}
            <section className="py-20 px-6 md:px-20 bg-white">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2">
                        <Image
                            src="/about.jpg"
                            alt="Helping hands"
                            width={600}
                            height={400}
                            className="rounded-xl shadow-lg"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-3xl font-bold text-green-800 mb-4">Why ShareBite?</h3>
                        <p className="text-lg text-gray-700">We believe food should never go to waste while someone goes hungry. ShareBite is on a mission to bridge the gap between surplus and need. We empower donors and NGOs through a tech-first approach to make food donation easy, reliable, and impactful.</p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-6 md:px-20 bg-green-50">
                <h3 className="text-3xl font-bold text-center text-green-800 mb-12">Our Impact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
                    <div>
                        <p className="text-4xl font-extrabold text-green-600">10K+</p>
                        <p className="text-gray-700 mt-2">Meals Donated</p>
                    </div>
                    <div>
                        <p className="text-4xl font-extrabold text-green-600">500+</p>
                        <p className="text-gray-700 mt-2">Donors</p>
                    </div>
                    <div>
                        <p className="text-4xl font-extrabold text-green-600">200+</p>
                        <p className="text-gray-700 mt-2">NGO Partners</p>
                    </div>
                    <div>
                        <p className="text-4xl font-extrabold text-green-600">50+</p>
                        <p className="text-gray-700 mt-2">Cities Served</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 md:px-20 bg-green-600 text-white text-center rounded-t-3xl">
                <h3 className="text-4xl font-bold mb-6">Be Part of the Solution</h3>
                <p className="text-lg mb-8 max-w-2xl mx-auto">Whether you're a restaurant, an individual, or an NGO, you can make a difference. Join ShareBite in our mission to eliminate hunger and food waste.</p>
                <div className="flex justify-center gap-4">
                    <a href="/donate" className="bg-white text-green-600 font-bold px-6 py-3 rounded-full hover:bg-green-100">Donate Now</a>
                    <a href="/join" className="border border-white text-white font-bold px-6 py-3 rounded-full hover:bg-white hover:text-green-600">Join Us</a>
                </div>
            </section>
        </div>
    );
}
