import React, { useState } from 'react';
import axios from 'axios';
import pic from '../../src/assets/react.svg'
const problemList = [
  "Fan Not Working",
  "Light Broken",
  "Water Leakage",
  "Washing Machine Issue",
  "Pantry Issue",
];

function Banner() {
  const [problem, setProblem] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!problem || !date || !image) {
      setMessage("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("problem", problem);
    formData.append("date", date);
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/complaints", formData);
      setMessage("Complaint submitted successfully!");
      setProblem('');
      setDate('');
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 bg-light px-4 pt-10 pb-20  text-center">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-[#800000]">
        Kapili Maintenance
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col gap-6"
        encType="multipart/form-data"
      >

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full justify-between">
          {/* Problem */}
          <div className="flex flex-col w-full md:w-[48%] text-left">
            <label htmlFor="problem" className="text-gray-700 font-semibold mb-1">Problem Type</label>
            <select
              id="problem"
              required
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#800000]"
            >
              <option value="">Select Problem</option>
              {problemList.map((prob) => (
                <option key={prob} value={prob}>{prob}</option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">
              {problem ? `Selected: ${problem}` : 'Please select a problem'}
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-col w-full md:w-[48%] text-left">
            <label htmlFor="date" className="text-gray-700 font-semibold mb-1">Complaint Date</label>
            <input
              type="date"
              id="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#800000] text-gray-700"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col text-left">
          <label className="text-gray-700 font-semibold mb-1">Upload Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="px-2 py-1 border border-gray-300 rounded-lg"
          />
          {image && (
            <p className="text-sm text-gray-500 mt-1">{image.name}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="self-center bg-[#800000] text-white px-6 py-3 rounded-lg hover:bg-[#9a1a1a] transition-all font-semibold"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-center text-sm text-gray-600 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}

export default Banner;
