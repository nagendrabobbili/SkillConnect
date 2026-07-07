import { useEffect, useState } from "react";
import api from "../services/api";


function MechanicDashboard() {

  const [bookings, setBookings] = useState([]);


  const mechanicId = 1; // temporary (later from login)


  useEffect(() => {

    loadBookings();

  }, []);



  const loadBookings = () => {

    api.get(`/api/bookings/mechanic/${mechanicId}`)
      .then((response) => {

        setBookings(response.data);

      })
      .catch((error) => {

        console.error(error);

      });

  };



  const updateStatus = (id, status) => {


    api.put(`/api/bookings/${id}/status/${status}`)
      .then(() => {

        alert(`Booking ${status}`);

        loadBookings();

      })
      .catch((error) => {

        console.error(error);

      });

  };



  return (

    <div style={{padding:"20px"}}>


      <h1>
        🚗 Mechanic Dashboard
      </h1>


      <h2>
        Incoming Requests
      </h2>



      {
        bookings.map((booking)=>(


          <div
            key={booking.id}
            style={{
              border:"1px solid #ccc",
              padding:"15px",
              marginBottom:"15px",
              borderRadius:"10px"
            }}
          >


            <h3>
              Customer: {booking.customerName}
            </h3>


            <p>
              📞 {booking.customerPhone}
            </p>


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



            {
              booking.status === "PENDING" &&

              <div>

                <button
                  onClick={() =>
                    updateStatus(
                      booking.id,
                      "ACCEPTED"
                    )
                  }
                >
                  ✅ Accept
                </button>


                <button
                  style={{marginLeft:"10px"}}
                  onClick={() =>
                    updateStatus(
                      booking.id,
                      "REJECTED"
                    )
                  }
                >
                  ❌ Reject
                </button>

              </div>

            }


          </div>


        ))
      }


    </div>

  );

}


export default MechanicDashboard;