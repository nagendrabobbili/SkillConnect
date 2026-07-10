import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Mechanics from "./pages/Mechanics";
import AddMechanic from "./pages/AddMechanic";
import MechanicDetails from "./pages/MechanicDetails";
import MechanicMap from "./pages/MechanicMap";
import BookMechanic from "./pages/BookMechanic";
import MyBookings from "./pages/MyBookings";
import MechanicDashboard from "./pages/MechanicDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>

      {/* Navbar visible on all pages */}
      <Navbar />

      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Mechanics */}
        <Route path="/mechanics" element={<Mechanics />} />
        <Route path="/mechanics/:id" element={<MechanicDetails />} />
        <Route path="/add-mechanic" element={<AddMechanic />} />
        <Route path="/join-mechanic" element={<AddMechanic />} />
        <Route path="/edit-mechanic/:id" element={<AddMechanic />} />

        {/* Map */}
        <Route path="/map" element={<MechanicMap />} />

        {/* Booking */}
        <Route
          path="/book-mechanic/:id"
          element={<BookMechanic />}
        />

        {/* Customer */}
        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        {/* Mechanic */}
        <Route
          path="/mechanic-dashboard"
          element={<MechanicDashboard />}
        />
        <Route 
 path="/admin"
 element={<AdminDashboard/>}
/>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;