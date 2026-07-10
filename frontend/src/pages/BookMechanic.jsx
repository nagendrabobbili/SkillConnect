import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function BookMechanic() {

  const { id } = useParams();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [booking, setBooking] = useState({
    customerName: user.name,
    customerEmail: user.email,
    serviceType: "",
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
        "Booking Created Successfully!"
      );

    } catch(error) {

      console.error(error);

      alert("Booking Failed");
    }
  };

  return (
    <div style={{padding:"20px"}}>

      <h1>📅 Book Mechanic</h1>

      <form onSubmit={submitBooking}>

        <p>
          Customer:
          <strong> {user.name}</strong>
        </p>

        <p>
          Email:
          <strong> {user.email}</strong>
        </p>

        <input
          name="serviceType"
          placeholder="Service Required"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          type="date"
          name="bookingDate"
          onChange={handleChange}
        />

        <br/><br/>

        <button type="submit">
          Confirm Booking
        </button>

      </form>

    </div>
  );
}

export default BookMechanic;