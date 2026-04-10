import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 AUTH + FETCH EVENT (COMBINED FIX)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.setItem("selectedEvent", id);
      navigate("/login", { replace: true });
      return;
    }

    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.log("ERROR:", err);
        alert("Failed to load event ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate]);

  // ⏳ LOADING UI
  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  // ❌ EVENT NOT FOUND
  if (!event) {
    return <h2 className="text-center mt-10">Event not found ❌</h2>;
  }

  // 💳 PAYMENT FUNCTION
  const handlePayment = async () => {
    try {
      const res = await API.post(`/payment/create-order?amount=${event.price}`);
      const order = res.data;

      const options = {
        key: "rzp_test_SZuOn9hWxQGJ5n",
        amount: order.amount,
        currency: "INR",
        name: "BookMyEvent",
        description: event.name,
        order_id: order.id,

        handler: async function () {
          alert("Payment Successful ✅");

          await API.post("/booking", {
            eventId: event.id,
            tickets: 1
          });

          navigate("/", { replace: true });
        },

        prefill: {
          email: "test@gmail.com"
        },

        theme: {
          color: "#22c55e"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
      alert("Payment Failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center w-[350px]">

        <h2 className="text-2xl font-bold">{event.name}</h2>
        <p className="text-gray-500 mt-2">{event.location}</p>
        <p className="text-blue-600 font-semibold mt-2">₹ {event.price}</p>

        <button
          onClick={handlePayment}
          className="mt-5 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Pay Now
        </button>

      </div>
    </div>
  );
}

export default Payment;