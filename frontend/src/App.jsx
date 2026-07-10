import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

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
import AdminMechanicView from "./pages/AdminMechanicView";
import CustomerList from "./pages/CustomerList";
import ReviewMechanic from "./pages/ReviewMechanic";
import AddReview from "./pages/AddReview";

function App() {

  return (

    <BrowserRouter>

      {/* Navbar visible on all pages */}
      <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/map"
          element={<MechanicMap />}
        />

        {/* Customer Routes */}
        <Route
          path="/mechanics"
          element={
            <ProtectedRoute
              allowedRole="CUSTOMER"
            >
              <Mechanics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mechanics/:id"
          element={
            <ProtectedRoute
              allowedRole="CUSTOMER"
            >
              <MechanicDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book-mechanic/:id"
          element={
            <ProtectedRoute
              allowedRole="CUSTOMER"
            >
              <BookMechanic />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute
              allowedRole="CUSTOMER"
            >
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/review/:id"
          element={
            <ProtectedRoute
              allowedRole="CUSTOMER"
            >
              <AddReview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/review-booking/:bookingId"
          element={
            <ProtectedRoute
              allowedRole="CUSTOMER"
            >
              <ReviewMechanic />
            </ProtectedRoute>
          }
        />

        {/* Mechanic Routes */}
        <Route
          path="/mechanic-dashboard"
          element={
            <ProtectedRoute
              allowedRole="MECHANIC"
            >
              <MechanicDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRole="ADMIN"
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute
              allowedRole="ADMIN"
            >
              <CustomerList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/mechanic/:id"
          element={
            <ProtectedRoute
              allowedRole="ADMIN"
            >
              <AdminMechanicView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-mechanic"
          element={
            <ProtectedRoute
              allowedRole="ADMIN"
            >
              <AddMechanic />
            </ProtectedRoute>
          }
        />

        <Route
          path="/join-mechanic"
          element={
            <ProtectedRoute
              allowedRole="ADMIN"
            >
              <AddMechanic />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-mechanic/:id"
          element={
            <ProtectedRoute
              allowedRole="ADMIN"
            >
              <AddMechanic />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;