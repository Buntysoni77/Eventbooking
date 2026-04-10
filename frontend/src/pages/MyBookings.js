import { useEffect, useState } from "react";
import API from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/bookings/my") // Ensure this matches your @Mapping in BookingController
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log("❌ Error fetching bookings:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-blue-800 mb-8">My Bookings 📊</h2>

      {loading ? (
        <p>Loading your tickets...</p>
      ) : bookings.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <p className="text-gray-500">No bookings found. Go book some events!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white p-6 shadow-md rounded-2xl border-l-8 border-blue-600 flex justify-between items-center">
              <div>
                {/* Check if your backend sends the 'event' object or just 'eventId' */}
                <h3 className="text-xl font-bold text-gray-800">
                  {b.event ? b.event.name : `Event ID: ${b.eventId}`}
                </h3>
                <p className="text-gray-500 text-sm">📍 {b.event ? b.event.location : "Location N/A"}</p>
                <p className="text-blue-600 font-semibold mt-1">Tickets: {b.tickets}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-gray-900">₹{b.amount}</p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                  CONFIRMED
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;