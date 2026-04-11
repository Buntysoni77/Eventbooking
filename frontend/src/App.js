import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Payment from "./pages/payment";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import MyBookings from "./pages/MyBookings";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED PAYMENT */}
        <Route
          path="/payment/:id"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        {/* USER BOOKINGS */}
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
