import React from "react";
import API from "../services/api";

function EventCard({ event }) {

  const bookEvent = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first! 🔒");
      return;
    }

    try {
      await API.post(
        "/bookings/book",
        {
          eventId: event.id,
          tickets: 1
        }
      );
      alert(`Booking Successful for ${event.name} ✅`);
    } catch (error) {
      console.error("Booking error", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      {/* Keeping your exact UI structure */}
      <h2 className="text-xl font-bold">{event.name}</h2>
      <p className="text-gray-600">{event.location}</p>
      <p className="text-blue-600 font-bold">₹ {event.price}</p>

      <button
        onClick={bookEvent}
        className="bg-green-600 text-white px-3 py-1 mt-2 rounded hover:bg-green-700"
      >
        Book Now
      </button>
    </div>
  );
}

export default EventCard;