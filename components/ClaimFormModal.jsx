import React from "react";

const ClaimFormModal = ({ onClose, onSubmit, donationId }) => {
  const [accessedBy, setAccessedBy] = React.useState("");
  const [accessedLocation, setAccessedLocation] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accessedBy || !accessedLocation) return;
    onSubmit({ accessedBy, accessedLocation, donationId });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Claim Donation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={accessedBy}
            onChange={(e) => setAccessedBy(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Your Location"
            value={accessedLocation}
            onChange={(e) => setAccessedLocation(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Submit Claim
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClaimFormModal;
