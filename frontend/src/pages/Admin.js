import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.email !== "admin@gmail.com") {
    return <h2 className="text-center mt-10">Access Denied ❌</h2>;
  }

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings/all") // ✅ FIXED
      .then(res => setBookings(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-5">Admin Dashboard</h2>

      {bookings.map((b) => (
        <div key={b.id} className="bg-white p-4 mb-3 shadow rounded">
          <p>User ID: {b.userId}</p>
          <p>Event ID: {b.eventId}</p>
          <p>Amount: ₹{b.amount}</p>
        </div>
      ))}
    </div>
  );
}

export default Admin;