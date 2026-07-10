import { useEffect, useState } from "react";
import api from "../services/api";

import {
  FaPhone,
  FaCalendarAlt,
  FaTools,
  FaCheckCircle,
  FaTimesCircle,
  FaClock
} from "react-icons/fa";


function MechanicDashboard() {


  const [bookings, setBookings] = useState([]);

  const [mechanicId, setMechanicId] = useState(null);



  useEffect(() => {

    loadMechanic();

  }, []);




  // Find logged in mechanic id
  const loadMechanic = async () => {


    try {


      const user = JSON.parse(
        localStorage.getItem("user")
      );


      if(!user){
        console.log("User not logged in");
        return;
      }



      const response = await api.get(
        "/api/mechanics"
      );



      const mechanic = response.data.find(
        m => m.email === user.email
      );



      if(mechanic){


        setMechanicId(mechanic.id);


        loadBookings(mechanic.id);


      }
      else{


        console.log(
          "Mechanic profile not found"
        );


      }



    }
    catch(error){

      console.error(error);

    }


  };






  const loadBookings = (id)=>{


    api.get(
      `/api/bookings/mechanic/${id}`
    )

    .then(response=>{


      setBookings(response.data);


    })

    .catch(error=>{


      console.error(error);


    });


  };







  const updateStatus = async(id,status)=>{


    try{


      await api.put(
        `/api/bookings/${id}/status/${status}`
      );



      alert(
        `Booking ${status}`
      );



      loadBookings(mechanicId);



    }
    catch(error){


      console.error(error);


      alert(
        "Failed to update status"
      );


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








  const BookingCard=({booking})=>(


<div className="col-lg-4 col-md-6 mb-4">


<div className="card shadow border-0 h-100"
style={{
borderRadius:"20px"
}}
>


<div className="card-body">



<h4 className="text-primary fw-bold">

👤 {booking.customerName || "Unknown"}

</h4>




<p>
<FaPhone className="text-success me-2"/>
{booking.customerPhone || "Not Provided"}
</p>




<p>
<FaTools className="text-warning me-2"/>
{booking.serviceType}
</p>




<p>
<FaCalendarAlt className="text-info me-2"/>
{booking.bookingDate}
</p>




<span
className={
booking.status==="ACCEPTED"
?
"badge bg-success fs-6"
:
booking.status==="REJECTED"
?
"badge bg-danger fs-6"
:
"badge bg-warning fs-6"
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





</div>

</div>


</div>


);







return (


<div className="container py-5">



<h1 className="text-center text-primary fw-bold mb-5">

🚗 Mechanic Dashboard

</h1>






<div className="row mb-5">



<div className="col-md-4">

<div className="card shadow p-4 text-center">


<FaClock
size={40}
className="mx-auto text-warning"
/>


<h2>
{pendingBookings.length}
</h2>


<h5>
Incoming Requests
</h5>


</div>

</div>






<div className="col-md-4">

<div className="card shadow p-4 text-center">


<FaCheckCircle
size={40}
className="mx-auto text-success"
/>


<h2>
{acceptedBookings.length}
</h2>


<h5>
Accepted Requests
</h5>


</div>

</div>







<div className="col-md-4">

<div className="card shadow p-4 text-center">


<FaTimesCircle
size={40}
className="mx-auto text-danger"
/>


<h2>
{rejectedBookings.length}
</h2>


<h5>
Rejected Requests
</h5>


</div>

</div>




</div>









<h3>
🕒 Incoming Requests
</h3>


<div className="row">

{

pendingBookings.length===0

?

<p>No incoming requests</p>

:

pendingBookings.map(
booking=>

<BookingCard
key={booking.id}
booking={booking}
/>

)

}


</div>







<h3 className="mt-5">
✅ Accepted Requests
</h3>


<div className="row">


{

acceptedBookings.map(
booking=>

<BookingCard
key={booking.id}
booking={booking}
/>

)

}


</div>







<h3 className="mt-5">
❌ Rejected Requests
</h3>


<div className="row">


{

rejectedBookings.map(
booking=>

<BookingCard
key={booking.id}
booking={booking}
/>

)

}


</div>






</div>


);



}


export default MechanicDashboard;