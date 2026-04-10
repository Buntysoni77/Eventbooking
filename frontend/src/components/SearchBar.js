import React, { useState } from "react";
import API from "../services/api";

function SearchBar({ setEvents }) {
  const [query, setQuery] = useState("");

  const searchEvents = async () => {
    const res = await API.get(`/ai/recommend?query=${query}`);
    setEvents(res.data);
  };

  return (
    <div className="bg-white p-6 rounded shadow flex gap-4">
      <input
        placeholder="Search events (music, sports...)"
        className="border p-2 flex-1"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={searchEvents}
        className="bg-blue-600 text-white px-4 rounded"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;