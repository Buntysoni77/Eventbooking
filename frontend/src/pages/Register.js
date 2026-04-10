import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await API.post("/users/register", {
        name,
        surname,
        email,
        password,
        phone
      });

      if (res.data === "User Registered Successfully") {
        alert("Account Created ✅");

        //AUTO LOGIN
        localStorage.setItem("token", "user_logged_in");

        //REDIRECT TO PAYMENT
        const eventId = localStorage.getItem("selectedEvent");

        if (eventId) {
          navigate(`/payment/${eventId}`);
          localStorage.removeItem("selectedEvent");
        } else {
          navigate("/");
        }

      } else {
        alert(res.data);
      }

    } catch (err) {
      console.log(err);
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[350px]">

        <h2 className="text-2xl font-bold mb-5 text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-3 border rounded"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="w-full mb-3 p-3 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-3 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          className="w-full mb-4 p-3 border rounded"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Register
        </button>

      </div>
    </div>
  );
}

export default Register;