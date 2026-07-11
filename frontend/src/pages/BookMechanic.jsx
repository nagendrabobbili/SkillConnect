import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTools,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClipboardList
} from "react-icons/fa";

function BookMechanic() {

  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [booking, setBooking] = useState({

    customerName: user?.name || "",

    customerEmail: user?.email || "",

    customerPhone: user?.phone || "",

    customerAddress: "",

    serviceType: "",

    problemDescription: "",

    bookingDate: "",

    status: "PENDING",

    mechanic: {
      id: id
    }

  });

  const handleChange = (e) => {

    setBooking({
      ...booking,
      [e.target.name]: e.target.value
    });

  };

  const submitBooking = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/api/bookings",
        booking
      );

      alert(
        "Booking request sent successfully!"
      );

      navigate("/my-bookings");

    }
    catch(error){

      console.error(error);

      alert(
        "Booking failed"
      );

    }
  };

  return (

    <div className="container py-5">

      <div
        className="card shadow-lg border-0 mx-auto"
        style={{
          maxWidth: "750px",
          borderRadius: "25px"
        }}
      >

        <div className="card-body p-5">

          <h1 className="text-center text-primary fw-bold mb-4">
            📅 Book Mechanic
          </h1>

          <form onSubmit={submitBooking}>

            <div className="mb-3">
              <label className="form-label">
                <FaUser className="me-2"/>
                Customer Name
              </label>

              <input
                className="form-control"
                value={booking.customerName}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaEnvelope className="me-2"/>
                Email
              </label>

              <input
                className="form-control"
                value={booking.customerEmail}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaPhone className="me-2"/>
                Phone Number
              </label>

              <input
                type="text"
                className="form-control"
                name="customerPhone"
                value={booking.customerPhone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaMapMarkerAlt className="me-2"/>
                Service Location
              </label>

              <textarea
                className="form-control"
                rows="3"
                name="customerAddress"
                placeholder="Enter complete address where mechanic should come"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaTools className="me-2"/>
                Service Required
              </label>

              <select
                className="form-select"
                name="serviceType"
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Service
                </option>

                <option value="Engine Repair">
                  Engine Repair
                </option>

                <option value="Battery Issue">
                  Battery Issue
                </option>

                <option value="Tyre Puncture">
                  Tyre Puncture
                </option>

                <option value="Oil Change">
                  Oil Change
                </option>

                <option value="Brake Service">
                  Brake Service
                </option>

                <option value="General Service">
                  General Service
                </option>

              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaClipboardList className="me-2"/>
                Problem Description
              </label>

              <textarea
                className="form-control"
                rows="4"
                name="problemDescription"
                placeholder="Describe the issue in detail..."
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">
                <FaCalendarAlt className="me-2"/>
                Preferred Visit Date
              </label>

              <input
                type="date"
                className="form-control"
                name="bookingDate"
                onChange={handleChange}
                required
              />
            </div>

            <div className="alert alert-info">

              <strong>Note:</strong>

              <br/>

              Mechanic will review your request and
              provide estimated charges before starting
              the service.

            </div>

            <button
              type="submit"
              className="btn btn-success btn-lg w-100"
            >
              🚗 Confirm Booking Request
            </button>

          </form>

        </div>

      </div>

    </div>

  );
}

export default BookMechanic;