import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function BookMechanic() {

  const { id } = useParams();

  const [booking, setBooking] = useState({
    customerName: "",
    customerPhone: "",
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

      await api.post("/api/bookings", booking);

      alert("Booking Created Successfully!");

    }
    catch(error) {

      console.error(error);
      alert("Booking Failed");

    }

  };


  return (

    <div style={{padding:"20px"}}>

      <h1>📅 Book Mechanic</h1>


      <form onSubmit={submitBooking}>


        <input
          name="customerName"
          placeholder="Your Name"
          onChange={handleChange}
        />

        <br/><br/>


        <input
          name="customerPhone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <br/><br/>


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