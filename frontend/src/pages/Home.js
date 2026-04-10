import { useEffect, useState } from "react";
import API from "../services/api";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot";

function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (search.trim() !== "") {
          const res = await API.get(`/ai/search?query=${search}`);
          setEvents(res.data);

          const msg = await API.get(`/ai/chat?query=${search}`);
          setAiMessage(msg.data);
        } else {
          const res = await API.get("/events");
          setEvents(res.data);
          setAiMessage("");
        }
      } catch (err) {
        console.log("❌ FETCH ERROR:", err);
      }
    };
    fetchData();
  }, [search]);

  // ✅ FINAL FILTER FIX: Filter by NAME, not ID. 
  // This stops duplicates even if the DB has multiple IDs for the same event.
  const uniqueEvents = Array.from(
    new Map(events.map((e) => [e.name.toLowerCase().trim(), e])).values()
  );

  const handleBooking = (id) => {
    const token = localStorage.getItem("token");
    if (!token || token === "null" || token === "undefined") {
      localStorage.setItem("selectedEvent", id);
      navigate("/login");
    } else {
      navigate(`/payment/${id}`);
    }
  };

  const getImage = (type, name) => {
    const t = type?.toLowerCase() || "";
    const n = name?.toLowerCase() || "";
    if (t.includes("food") || n.includes("food") || n.includes("festival")) return "https://images.unsplash.com/photo-1555939594-58d7cb561ad1";
    if (t.includes("comedy") || n.includes("comedy") || t.includes("standup"))
 return "https://images.unsplash.com/photo-1516280440614-37939bbacd81";
    if (t.includes("movie") || n.includes("movie")) return "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba";
    if (t.includes("music") || n.includes("concert")) return "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4";
    if (t.includes("sports") || t.includes("cricket")) return "https://images.unsplash.com/photo-1461896836934-ffe607ba8211";
    if (t.includes("tech") || t.includes("workshop")) return "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4";
    return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30";
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="flex justify-between items-center px-10 py-3 bg-blue-800 relative shadow-lg">
        <img src="/logo-final.png" className="h-16 cursor-pointer" alt="logo" onClick={() => navigate("/")} />
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="bg-white px-4 py-2 rounded-full font-bold shadow hover:bg-gray-100 transition">☰</button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-2xl rounded-lg p-4 w-64 z-50 border border-gray-100">
              {user ? (
                <>
                  <p className="font-bold text-blue-800">{user.name}</p>
                  <hr className="my-2" />
                  <button onClick={() => navigate("/my-bookings")} className="block w-full text-left py-2 hover:bg-gray-50 rounded px-2">📊 My Bookings</button>
                  <button onClick={() => { localStorage.clear(); window.location.href = "/login"; }} className="block w-full text-left py-2 text-red-500 hover:bg-red-50 rounded px-2 font-semibold">🚪 Logout</button>
                </>
              ) : (
                <button onClick={() => navigate("/login")} className="w-full bg-blue-600 text-white py-2 rounded font-bold">Login</button>
              )}
            </div>
          )}
        </div>
      </div>

      <Hero search={search} setSearch={setSearch} />

      {aiMessage && (
        <div className="mx-10 mt-6 p-4 bg-purple-100 border-l-4 border-purple-500 rounded-r-xl shadow-sm italic text-purple-900">
          🤖 {aiMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
        {uniqueEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img src={getImage(event.type, event.name)} className="h-52 w-full object-cover" alt={event.name} />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-800 shadow-sm">{event.type}</div>
            </div>
            <div className="p-5">
              <h3 className="font-extrabold text-xl text-gray-800 mb-1">{event.name}</h3>
              <p className="text-gray-500 text-sm flex items-center mb-2">📍 {event.location}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-2xl font-black text-blue-600">₹{event.price}</p>
                <button onClick={() => handleBooking(event.id)} className="bg-green-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-600 transition-colors shadow-md active:scale-95">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default Home;