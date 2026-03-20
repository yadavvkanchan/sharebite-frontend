'use client';
import Link from 'next/link';
import { FaUtensils, FaBell, FaTruck } from 'react-icons/fa';
import { getUnsplashImage } from "@/lib/getPixabayImage";


export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-screen bg-center bg-cover flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://d1dxs113ar9ebd.cloudfront.net/225batonrouge/2017/12/iStock-serving-food-e1513719558505.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-green-900 bg-opacity-60"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-white text-center px-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-xl leading-tight">
            ShareBite: Share More Than Food 🍲
          </h1>
          <p className="mt-6 text-lg md:text-xl font-light drop-shadow">
            Join a movement of kindness. Donate food, support NGOs, and help someone in need — one bite at a time.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/donate"
              className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition duration-200 shadow"
            >
              Donate Food
            </Link>
            <Link
              href="/need"
              className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition duration-200 shadow"
            >
              Need Food
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">How It Works</h2>
        <p className="text-gray-600 mb-12">
          Our simple process connects food donors with local charities in just a few clicks.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {/* Step 1 */}
          <div className="w-full sm:w-[300px] bg-gray-100 rounded-lg p-6 transition-transform hover:-translate-y-2 duration-300">
            <div className="text-5xl text-green-500 mb-4 mx-auto">
              <FaUtensils />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Food is Donated</h3>
            <p className="text-gray-600">
              Restaurants, grocery stores, and farms post their excess food on our platform.
            </p>
          </div>

          {/* Step 2 */}
          <div className="w-full sm:w-[300px] bg-gray-100 rounded-lg p-6 transition-transform hover:-translate-y-2 duration-300">
            <div className="text-5xl text-green-500 mb-4 mx-auto">
              <FaBell />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Charities Get Notified</h3>
            <p className="text-gray-600">
              Local organizations receive instant alerts about available food donations nearby.
            </p>
          </div>

          {/* Step 3 */}
          <div className="w-full sm:w-[300px] bg-gray-100 rounded-lg p-6 transition-transform hover:-translate-y-2 duration-300">
            <div className="text-5xl text-green-500 mb-4 mx-auto">
              <FaTruck />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Food is Delivered</h3>
            <p className="text-gray-600">
              Charities or volunteers pick up the food and distribute it to those in need.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">What Our Partners Say</h2>
        <p className="text-gray-600 mb-12">Hear from the people using our platform</p>

        <div className="flex flex-wrap justify-center gap-8">
          {/* Testimonial 1 */}
          <div className="w-full sm:w-[300px] bg-white rounded-lg shadow p-6">
            <p className="text-gray-700 mb-4">
              &quot;ShareBite has helped us redirect thousands of pounds of quality food to people who need it.&quot;
            </p>
            <div className="font-semibold text-green-700">Kanchan Yadav</div>
            <div className="text-sm text-gray-500">Student, LTCE</div>
          </div>

          {/* Testimonial 2 */}
          <div className="w-full sm:w-[300px] bg-white rounded-lg shadow p-6">
            <p className="text-gray-700 mb-4">
              &quot;Before this platform, we struggled to find consistent food sources. Now we can feed more people.&quot;
            </p>
            <div className="font-semibold text-green-700">Tarannum Shah</div>
            <div className="text-sm text-gray-500">Student, LTCE</div>
          </div>

          {/* Testimonial 3 */}
          <div className="w-full sm:w-[300px] bg-white rounded-lg shadow p-6">
            <p className="text-gray-700 mb-4">
              &quot;As a volunteer, I love being able to see exactly where my help is needed and make an impact.&quot;
            </p>
            <div className="font-semibold text-green-700">Sahil Singh</div>
            <div className="text-sm text-gray-500">Student, LTCE</div>
          </div>
        </div>
      </section>
      {/* Partners */}
      <section className="py-20 bg-white text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">The Contributors</h2>
        <p className="text-gray-600 mb-12">We work with organizations across the food industry</p>
        <div className="flex flex-wrap justify-center gap-10 items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Emblem_of_Bombay_State.svg"
            alt="Partner 1"
            className="h-16 object-contain filter grayscale hover:grayscale-0 hover:scale-110 transition duration-300"
          />
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.LfDIrZp45-8VybMPEpovnAHaHa?pid=Api&P=0&h=180"
            alt="Partner 2"
            className="h-16 object-contain filter grayscale hover:grayscale-0 hover:scale-110 transition duration-300"
          />
          <img
            src="https://www.swaminarayanvadtalgadi.org/wp-content/uploads/2023/07/Rajkot-768x768.jpg"
            alt="Partner 3"
            className="h-16 object-contain filter grayscale hover:grayscale-0 hover:scale-110 transition duration-300"
          />
          <img
            src="https://ltce.in/img_ltce/logo.png"
            alt="Partner 4"
            className="h-16 object-contain filter grayscale hover:grayscale-0 hover:scale-110 transition duration-300"
          />
        </div>
      </section>

    </>
  );
}
