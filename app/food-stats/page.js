"use client";

export default function FoodStatsPage() {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-amber-800 mb-4">
        🍛 ShareBite Food Analytics Dashboard
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-2xl">
        Visualize food donation patterns, hunger needs, and discover which cities or
        states need urgent help — powered by AI insights.
      </p>
      <div className="w-full max-w-6xl rounded-2xl shadow-lg overflow-hidden border border-amber-200">
        <iframe
          src="http://localhost:8501"
          style={{
            width: "100%",
            height: "90vh",
            border: "none",
            borderRadius: "12px",
          }}
        ></iframe>
      </div>
    </div>
  );
}
