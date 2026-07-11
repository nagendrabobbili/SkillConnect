import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  FaMapMarkerAlt,
  FaPhone,
  FaTools,
  FaStar,
  FaLocationArrow
} from "react-icons/fa";


function NearbyMechanics() {


  const navigate = useNavigate();


  const [mechanics, setMechanics] = useState([]);

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null
  });

  const [loading, setLoading] = useState(true);





  useEffect(() => {

    getCurrentLocation();

  }, []);






  // Get user GPS location

  const getCurrentLocation = () => {


    if(!navigator.geolocation){

      alert(
        "Geolocation not supported"
      );

      return;

    }



    navigator.geolocation.getCurrentPosition(

      (position)=>{


        const latitude =
          position.coords.latitude;


        const longitude =
          position.coords.longitude;



        setLocation({
          latitude,
          longitude
        });



        loadNearbyMechanics(
          latitude,
          longitude
        );


      },


      (error)=>{

        console.log(error);

        alert(
          "Please allow location access"
        );

        setLoading(false);

      }

    );


  };









  // Call backend nearby API

  const loadNearbyMechanics = async(
    latitude,
    longitude
  )=>{


    try{


      const response = await api.get(

        `/api/mechanics/nearby?latitude=${latitude}&longitude=${longitude}&distance=10`

      );


      setMechanics(
        response.data
      );


      setLoading(false);


    }

    catch(error){


      console.error(error);


      alert(
        "Failed to load nearby mechanics"
      );


      setLoading(false);


    }


  };









  const openMap = (
    mechanic
  )=>{


    window.open(

      `https://www.google.com/maps/search/?api=1&query=${mechanic.latitude},${mechanic.longitude}`,

      "_blank"

    );


  };









  if(loading){


    return (

      <div className="container py-5 text-center">

        <h3>
          <FaLocationArrow />
          &nbsp;
          Finding nearby mechanics...
        </h3>

      </div>

    );

  }








  return (

    <div className="container py-5">


      <h1
        className="text-center text-primary fw-bold mb-5"
      >

        📍 Nearby Mechanics

      </h1>





      {
        mechanics.length === 0 ?

        (

          <h4 className="text-center">

            No mechanics available nearby

          </h4>

        )

        :

        (

        <div className="row">


        {
          mechanics.map(
            mechanic => (


            <div
              className="col-lg-4 col-md-6 mb-4"
              key={mechanic.id}
            >


              <div
                className="card shadow-lg border-0 h-100"
                style={{
                  borderRadius:"20px"
                }}
              >


                <div className="card-body">


                  <h3
                    className="text-primary fw-bold"
                  >

                    🚗 {mechanic.fullName}

                  </h3>





                  <p>

                    <FaTools
                      className="text-warning me-2"
                    />

                    {mechanic.specialization}

                  </p>





                  <p>

                    <FaMapMarkerAlt
                      className="text-danger me-2"
                    />

                    {mechanic.city}

                  </p>






                  <p>

                    <FaPhone
                      className="text-success me-2"
                    />

                    {mechanic.phone}

                  </p>






                  <p>

                    <FaStar
                      className="text-warning me-2"
                    />

                    Rating :

                    {" "}

                    {
                      mechanic.rating || "New"
                    }

                  </p>






                  <span
                    className="badge bg-success mb-3"
                  >

                    {mechanic.availabilityStatus}

                  </span>







                  <button

                    className="btn btn-primary w-100 mb-2"

                    onClick={()=>navigate(
                      `/book-mechanic/${mechanic.id}`
                    )}

                  >

                    Book Now

                  </button>






                  <button

                    className="btn btn-outline-success w-100"

                    onClick={()=>openMap(
                      mechanic
                    )}

                  >

                    <FaMapMarkerAlt />

                    &nbsp;

                    View Location

                  </button>





                </div>


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


export default NearbyMechanics;