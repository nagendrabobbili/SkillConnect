import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function CustomerBookings() {

  const { phone } = useParams();

  const [bookings, setBookings] = useState([]);


  useEffect(() => {

    loadBookings();

  }, []);



  const loadBookings = async () => {

    try {

      const response = await api.get(
        `/api/bookings/customer/${phone}`
      );


      setBookings(
        response.data
      );


    } catch (error) {

      console.log(
        "Error loading bookings:",
        error
      );

    }

  };



  return (

    <div className="container py-5">


      <h2 className="text-center text-primary mb-4">
        📋 Customer Booking History
      </h2>



      {
        bookings.length === 0 ? (

          <div className="alert alert-info text-center">
            No bookings found for this customer.
          </div>

        ) : (


          <div className="row">


            {
              bookings.map(
                booking => (


                <div
                  className="col-md-6 mb-4"
                  key={booking.id}
                >


                  <div className="card shadow p-4">


                    <h4 className="text-primary">
                      🔧 {booking.serviceType}
                    </h4>


                    <p>
                      📝 Issue:
                      {" "}
                      {booking.issueDescription}
                    </p>


                    <p>
                      📅 Date:
                      {" "}
                      {booking.bookingDate}
                    </p>


                    <p>
                      ⏰ Time:
                      {" "}
                      {booking.preferredTime}
                    </p>


                    <p>
                      📍 Address:
                      {" "}
                      {booking.customerAddress}
                    </p>


                    <p>
                      💰 Price:
                      {" "}
                      ₹{booking.estimatedPrice}
                    </p>


                    <p>
                      Status:
                      {" "}
                      <span className="badge bg-primary">
                        {booking.status}
                      </span>
                    </p>


                    <p>
                      👨‍🔧 Mechanic:
                      {" "}

                      {
                        booking.mechanic
                        ? booking.mechanic.name
                        : "Not Assigned"
                      }

                    </p>


                  </div>


                </div>


              ))
            }


          </div>

        )
      }


    </div>

  );

}


export default CustomerBookings;