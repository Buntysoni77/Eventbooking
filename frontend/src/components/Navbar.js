import React from "react";

function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-2xl font-bold text-red-500">BookMyEvent</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
}

export default Navbar;