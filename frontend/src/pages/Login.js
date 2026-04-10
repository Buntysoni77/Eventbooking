import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ CLEAR INPUTS ON LOAD
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async () => {
    try {
      // ✅ CALL BACKEND
      const res = await API.post("/api/auth/login", {
        email,
        password
      });

      const user = res.data;

      // ✅ SAVE DATA
      localStorage.setItem("token", "valid_token");
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login Successful ✅");

      const eventId = localStorage.getItem("selectedEvent");

      if (eventId) {
        localStorage.removeItem("selectedEvent");
        navigate(`/payment/${eventId}`, { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } catch (err) {
      console.log(err);
      alert("Login Failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[350px]">

        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mb-3 p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full mb-3 p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>

        <button
          onClick={() => navigate(-1)}
          className="mt-3 w-full text-blue-600 underline"
        >
          ← Go Back
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer underline"
          >
            Create Account
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;