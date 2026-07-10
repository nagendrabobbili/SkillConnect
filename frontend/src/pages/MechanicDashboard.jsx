import { useEffect, useState } from "react";
import api from "../services/api";

import {
  FaPhone,
  FaCalendarAlt,
  FaTools,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaClipboardCheck,
  FaEnvelope,
  FaPowerOff
} from "react-icons/fa";


function MechanicDashboard() {


  const [bookings, setBookings] = useState([]);

  const [mechanicId, setMechanicId] = useState(null);

  const [available, setAvailable] = useState(false);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    loadMechanic();

  }, []);





  const loadMechanic = async () => {


    try {


      const user = JSON.parse(
        localStorage.getItem("user")
      );


      if(!user){

        setLoading(false);
        return;

      }



      const response = await api.get(
        "/api/mechanics"
      );



      const mechanic =
        response.data.find(
          m => m.email === user.email
        );



      if(mechanic){


        setMechanicId(
          mechanic.id
        );


        setAvailable(
          mechanic.available
        );



        loadBookings(
          mechanic.id
        );


      }



      setLoading(false);


    }
    catch(error){

      console.log(error);

      setLoading(false);

    }


  };







  const loadBookings = async(id)=>{


    try{


      const response = await api.get(

        `/api/bookings/mechanic/${id}`

      );


      setBookings(
        response.data
      );


    }
    catch(error){

      console.log(error);

    }


  };









  // Availability Toggle

  const changeAvailability = async(status)=>{


    try{


      await api.put(

        `/api/mechanics/${mechanicId}/availability?available=${status}`

      );


      setAvailable(status);



      alert(
        status
        ?
        "You are Online now"
        :
        "You are Offline now"
      );


    }
    catch(error){


      console.log(error);


      alert(
        "Availability update failed"
      );


    }


  };









  const updateStatus = async(
    bookingId,
    status
  )=>{


    try{


      await api.put(

        `/api/bookings/${bookingId}/status/${status}`

      );



      alert(
        `Booking ${status}`
      );



      loadBookings(
        mechanicId
      );


    }
    catch(error){

      console.log(error);

    }


  };








  const pendingBookings =
    bookings.filter(
      b=>b.status==="PENDING"
    );


  const acceptedBookings =
    bookings.filter(
      b=>b.status==="ACCEPTED"
    );


  const rejectedBookings =
    bookings.filter(
      b=>b.status==="REJECTED"
    );


  const completedBookings =
    bookings.filter(
      b=>b.status==="COMPLETED"
    );









  const getBadgeClass=(status)=>{


    switch(status){


      case "ACCEPTED":
        return "bg-success";


      case "REJECTED":
        return "bg-danger";


      case "COMPLETED":
        return "bg-primary";


      default:
        return "bg-warning text-dark";


    }


  };









  const BookingCard=({booking})=>(


    <div className="col-lg-4 col-md-6 mb-4">


      <div
        className="card shadow-lg border-0 h-100"
        style={{
          borderRadius:"20px"
        }}
      >


        <div className="card-body">


          <h4 className="fw-bold text-primary">
            👤 {booking.customerName}
          </h4>



          <p>
            <FaPhone className="me-2 text-success"/>
            {booking.customerPhone}
          </p>



          <p>
            <FaEnvelope className="me-2 text-primary"/>
            {booking.customerEmail}
          </p>



          <p>
            <FaTools className="me-2 text-warning"/>
            {booking.serviceType}
          </p>



          <p>
            <FaCalendarAlt className="me-2 text-info"/>
            {booking.bookingDate}
          </p>




          <span
            className={
              `badge ${getBadgeClass(
                booking.status
              )} fs-6`
            }
          >

            {booking.status}

          </span>





          {
            booking.status==="PENDING" &&

            <div className="mt-3">

              <button
                className="btn btn-success me-2"
                onClick={()=>
                  updateStatus(
                    booking.id,
                    "ACCEPTED"
                  )
                }
              >
                Accept
              </button>


              <button
                className="btn btn-danger"
                onClick={()=>
                  updateStatus(
                    booking.id,
                    "REJECTED"
                  )
                }
              >
                Reject
              </button>


            </div>

          }






          {
            booking.status==="ACCEPTED" &&


            <button
              className="btn btn-primary mt-3"
              onClick={()=>
                updateStatus(
                  booking.id,
                  "COMPLETED"
                )
              }
            >

              Mark Completed

            </button>

          }



        </div>


      </div>


    </div>


  );









  if(loading){


    return (

      <div className="container py-5 text-center">

        <h3>
          Loading dashboard...
        </h3>

      </div>

    );

  }









  return (


    <div className="container py-5">



      <h1 className="text-center text-primary fw-bold mb-4">

        🚗 Mechanic Dashboard

      </h1>






      {/* Availability */}

      <div className="text-center mb-5">


        {
          available

          ?

          <button
            className="btn btn-success btn-lg"
            onClick={()=>
              changeAvailability(false)
            }
          >

            <FaPowerOff/>
            &nbsp;
            Online - Go Offline

          </button>


          :


          <button
            className="btn btn-danger btn-lg"
            onClick={()=>
              changeAvailability(true)
            }
          >

            <FaPowerOff/>
            &nbsp;
            Offline - Go Online

          </button>


        }


      </div>







      <div className="row mb-5">


        <div className="col-md-3 mb-3">

          <div className="card shadow p-4 text-center">

            <FaClock size={40}/>

            <h2>
              {pendingBookings.length}
            </h2>

            <h5>
              Incoming
            </h5>

          </div>

        </div>





        <div className="col-md-3 mb-3">

          <div className="card shadow p-4 text-center">

            <FaCheckCircle size={40}/>

            <h2>
              {acceptedBookings.length}
            </h2>

            <h5>
              Accepted
            </h5>

          </div>

        </div>





        <div className="col-md-3 mb-3">

          <div className="card shadow p-4 text-center">

            <FaTimesCircle size={40}/>

            <h2>
              {rejectedBookings.length}
            </h2>

            <h5>
              Rejected
            </h5>

          </div>

        </div>





        <div className="col-md-3 mb-3">

          <div className="card shadow p-4 text-center">

            <FaClipboardCheck size={40}/>

            <h2>
              {completedBookings.length}
            </h2>

            <h5>
              Completed
            </h5>

          </div>

        </div>



      </div>







      <h3>
        🕒 Incoming Requests
      </h3>


      <div className="row">

        {
          pendingBookings.map(
            b=>
            <BookingCard
              key={b.id}
              booking={b}
            />
          )
        }

      </div>






      <h3 className="mt-5">
        ✅ Accepted Jobs
      </h3>


      <div className="row">

        {
          acceptedBookings.map(
            b=>
            <BookingCard
              key={b.id}
              booking={b}
            />
          )
        }

      </div>







      <h3 className="mt-5">
        🏁 Completed Jobs
      </h3>


      <div className="row">

        {
          completedBookings.map(
            b=>
            <BookingCard
              key={b.id}
              booking={b}
            />
          )
        }

      </div>



    </div>


  );


}


export default MechanicDashboard;