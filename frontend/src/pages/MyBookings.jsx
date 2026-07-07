import { useState } from "react";
import api from "../services/api";

function MyBookings() {

  const [phone, setPhone] = useState("");
  const [bookings, setBookings] = useState([]);


  const searchBookings = () => {

    api.get(`/api/bookings/customer/${phone}`)
      .then((response) => {

        setBookings(response.data);

      })
      .catch((error) => {

        console.error(error);

      });

  };


  return (

    <div style={{padding:"20px"}}>

      <h1>📋 My Bookings</h1>


      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
      />


      <button onClick={searchBookings}>
        Search
      </button>



      {
        bookings.map((booking)=>(

          <div
            key={booking.id}
            style={{
              border:"1px solid #ccc",
              padding:"15px",
              marginTop:"15px",
              borderRadius:"10px"
            }}
          >

            <h3>
              🚗 {booking.mechanic.fullName}
            </h3>


            <p>
              🛠 Service:
              {booking.serviceType}
            </p>


            <p>
              📅 Date:
              {booking.bookingDate}
            </p>


            <p>
              Status:
              {booking.status}
            </p>


          </div>

        ))
      }


    </div>

  );

}


export default MyBookings;