import { useState, useEffect } from "react";
import API from "../services/api";

function Hero({ search, setSearch }) {

  const [suggestions, setSuggestions] = useState([]);
  const [index, setIndex] = useState(0);

  // 🔥 BACKGROUND IMAGES
  const images = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1515169067868-5387ec356754",
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e", // stadium
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", // crowd concert
   "https://images.unsplash.com/photo-1503428593586-e225b39bddfe", // festival
   "https://images.unsplash.com/photo-1515169067868-5387ec356754"  // event stage
];


  // 🔁 AUTO CHANGE BACKGROUND
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔍 SEARCH INPUT
  const handleChange = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 1) {
      try {
        const res = await API.get(`/ai/suggest?query=${value}`);

        const list = res.data
          .split("\n")
          .filter(item => item.trim() !== "");

        setSuggestions(list);

      } catch (err) {
        console.log("Suggestion error:", err);
      }
    } else {
      setSuggestions([]);
    }
  };

  // 👉 CLICK SUGGESTION
  const handleSelect = (text) => {
    setSearch(text);
    setSuggestions([]);
  };

  return (
    <div
      className="text-center py-20 bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `url(${images[index]})`
      }}
    >

      <h1 className="text-4xl font-bold text-white mb-4">
        Explore Amazing Events 
      </h1>

      {/* 🔍 INPUT */}
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search events..."
        className="p-3 w-80 rounded-lg text-black"
      />

      {/* 📌 DROPDOWN */}
      {suggestions.length > 0 && (
        <div className="bg-white mt-2 w-80 mx-auto rounded shadow text-left">
          {suggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Hero;