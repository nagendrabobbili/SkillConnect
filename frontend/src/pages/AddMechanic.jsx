import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaTools,
  FaCity,
  FaMapMarkerAlt,
  FaGlobe,
  FaStar,
  FaBriefcase,
  FaLocationArrow
} from "react-icons/fa";


function AddMechanic() {

  const navigate = useNavigate();
  const { id } = useParams();


  const [mechanic, setMechanic] = useState({

    fullName: "",
    phone: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    rating: "",
    available: true,

  });



  useEffect(() => {

    if(id){
      loadMechanic();
    }

  }, [id]);




  const loadMechanic = async()=>{

    try{

      const response = await api.get("/api/mechanics");


      const selected = response.data.find(
        m=>m.id === Number(id)
      );


      if(selected){
        setMechanic(selected);
      }


    }
    catch(error){

      console.log(error);

    }

  };





  const handleChange=(e)=>{

    setMechanic({

      ...mechanic,
      [e.target.name]:e.target.value

    });

  };







  // Convert Address into Latitude and Longitude
  const detectLocation = async()=>{


    try{


      if(!mechanic.city || !mechanic.address){

        alert(
          "Please enter City and Address first"
        );

        return;

      }



      const query =
      `${mechanic.address}, ${mechanic.city}, India`;



      const response = await fetch(

        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`

      );



      const data = await response.json();



      if(data.length > 0){


        setMechanic({

          ...mechanic,

          latitude:data[0].lat,

          longitude:data[0].lon

        });



        alert(
          "Location detected successfully"
        );


      }
      else{


        alert(
          "Location not found. Add more address details"
        );


      }



    }
    catch(error){

      console.log(error);

      alert(
        "Location detection failed"
      );

    }


  };









  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{


      if(id){


        await api.put(
          `/api/mechanics/${id}`,
          mechanic
        );


        alert(
          "Mechanic Updated Successfully"
        );


      }
      else{


        await api.post(
          "/api/mechanics",
          mechanic
        );


        alert(
          "Registration Successful"
        );


        navigate("/login");

      }



    }
    catch(error){

      console.log(error);

      alert(
        "Operation Failed"
      );

    }


  };









return (

<div
className="container py-5"
style={{
minHeight:"100vh",
background:"#f5f8ff"
}}
>


<div className="card shadow-lg border-0 rounded-4">


<div
className="card-header text-white text-center py-4 rounded-top-4"
style={{
background:
"linear-gradient(135deg,#198754,#0d6efd)"
}}
>


<h2>
🚗 Join as Mechanic
</h2>


<p className="mb-0">
Grow your service business with SkillConnect
</p>


</div>





<div className="card-body p-5">


<form onSubmit={handleSubmit}>



<h5 className="text-success mb-3">
👤 Personal Information
</h5>


<div className="row">


<div className="col-md-6 mb-3">

<label>
<FaUser/> Full Name
</label>


<input
className="form-control"
name="fullName"
value={mechanic.fullName}
onChange={handleChange}
placeholder="Enter your name"
required
/>

</div>




<div className="col-md-6 mb-3">

<label>
<FaPhone/> Phone
</label>


<input
className="form-control"
name="phone"
value={mechanic.phone}
onChange={handleChange}
placeholder="Mobile number"
required
/>

</div>


</div>






<h5 className="text-success mt-3 mb-3">
🔐 Account Details
</h5>



<div className="row">


<div className="col-md-6 mb-3">


<label>
<FaEnvelope/> Email
</label>


<input
type="email"
className="form-control"
name="email"
value={mechanic.email}
onChange={handleChange}
placeholder="example@gmail.com"
required
/>


</div>




<div className="col-md-6 mb-3">


<label>
<FaLock/> Password
</label>


<input
type="password"
className="form-control"
name="password"
value={mechanic.password}
onChange={handleChange}
placeholder="Create password"
required={!id}
/>


</div>


</div>









<h5 className="text-success mt-3 mb-3">
🔧 Professional Details
</h5>



<div className="row">


<div className="col-md-6 mb-3">


<label>
<FaTools/> Specialization
</label>


<select
className="form-select"
name="specialization"
value={mechanic.specialization}
onChange={handleChange}
>


<option>Select Service</option>

<option>Bike Mechanic</option>

<option>Car Mechanic</option>

<option>Electrical Repair</option>

<option>AC Repair</option>


</select>


</div>




<div className="col-md-6 mb-3">


<label>
<FaBriefcase/> Experience
</label>


<input
type="number"
className="form-control"
name="experience"
value={mechanic.experience}
onChange={handleChange}
placeholder="Years of experience"
/>


</div>


</div>









<h5 className="text-success mt-3 mb-3">
📍 Service Location
</h5>




<div className="row">


<div className="col-md-6 mb-3">


<label>
<FaCity/> City
</label>


<input
className="form-control"
name="city"
value={mechanic.city}
onChange={handleChange}
placeholder="City"
/>


</div>




<div className="col-md-6 mb-3">


<label>
<FaMapMarkerAlt/> Address
</label>


<input
className="form-control"
name="address"
value={mechanic.address}
onChange={handleChange}
placeholder="Workshop address"
/>


</div>


</div>








<div className="text-center mb-3">


<button
type="button"
className="btn btn-primary"
onClick={detectLocation}
>


<FaLocationArrow/>

&nbsp; Detect Location


</button>


</div>






<div className="row">


<div className="col-md-6 mb-3">


<label>
<FaGlobe/> Latitude
</label>


<input
className="form-control"
value={mechanic.latitude}
readOnly
/>


</div>





<div className="col-md-6 mb-3">


<label>
<FaGlobe/> Longitude
</label>


<input
className="form-control"
value={mechanic.longitude}
readOnly
/>


</div>


</div>







<div className="mb-3">


<label>
<FaStar/> Rating
</label>


<input
type="number"
step="0.1"
className="form-control"
name="rating"
value={mechanic.rating}
onChange={handleChange}
placeholder="Initial rating"
/>


</div>







<button
className="btn btn-success w-100 py-3 rounded-3 fw-bold"
type="submit"
>


{
id
?
"Update Mechanic"
:
"Register as Mechanic"
}


</button>



</form>


</div>


</div>


</div>


);


}


export default AddMechanic;