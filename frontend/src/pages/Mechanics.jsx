import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch
} from "react-icons/fa";

import api from "../services/api";


function Mechanics() {


  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const [mechanics, setMechanics] = useState([]);

  const [keyword, setKeyword] = useState("");



  useEffect(() => {

    loadMechanics();

  }, []);





  const loadMechanics = () => {


    api.get("/api/mechanics")

      .then((response)=>{

        setMechanics(response.data);

      })

      .catch((error)=>{

        console.error(
          "Mechanic loading error:",
          error
        );

      });


  };






  const searchMechanics = () => {


    if(keyword.trim()===""){

      loadMechanics();

      return;

    }



    api.get(
      `/api/mechanics/search?keyword=${keyword}`
    )

    .then((response)=>{

      setMechanics(response.data);

    })

    .catch((error)=>{

      console.error(error);

    });


  };







  const deleteMechanic = async(id)=>{


    if(!window.confirm(
      "Delete this mechanic?"
    )) return;



    try{


      await api.delete(
        `/api/mechanics/${id}`
      );


      loadMechanics();


    }
    catch(error){

      console.error(error);

    }


  };







  return (

    <div className="container py-5">


      <div className="d-flex justify-content-between align-items-center mb-4">


        <h1 className="fw-bold text-primary">

          {
            user?.role === "ADMIN"
              ? "⚙ Manage Mechanics"
              : "🚗 SkillConnect Mechanics"
          }

        </h1>





        {
          user?.role === "ADMIN" && (

            <Link to="/join-mechanic">

              <button className="btn btn-primary">

                <FaPlus />
                {" "}Add Mechanic

              </button>

            </Link>

          )
        }



      </div>







      <div className="card shadow p-3 mb-5">


        <div className="row">


          <div className="col-md-10">


            <input

              type="text"

              className="form-control"

              placeholder="Search by name, city or specialization"

              value={keyword}

              onChange={(e)=>
                setKeyword(e.target.value)
              }

            />


          </div>




          <div className="col-md-2">


            <button

              className="btn btn-success w-100"

              onClick={searchMechanics}

            >

              <FaSearch />
              {" "}Search

            </button>


          </div>


        </div>


      </div>







      <div className="row">


        {
          mechanics.length === 0 && (

            <h4 className="text-center text-muted">

              No Mechanics Found

            </h4>

          )
        }





        {
          mechanics.map((mechanic)=>(


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



                  <h4 className="fw-bold text-primary">

                    {mechanic.fullName}

                  </h4>





                  <p>

                    <FaPhone className="me-2 text-success"/>

                    {mechanic.phone}

                  </p>





                  <p>

                    🔧 {mechanic.specialization}

                  </p>





                  <p>

                    <FaMapMarkerAlt className="me-2 text-danger"/>

                    {mechanic.city}

                  </p>





                  <p>

                    <FaStar className="text-warning me-2"/>

                    {mechanic.rating}

                  </p>







                  <div className="mt-4">





                    {
                      user?.role === "CUSTOMER" && (

                        <Link
                          to={`/mechanics/${mechanic.id}`}
                        >

                          <button className="btn btn-primary">

                            View Details

                          </button>

                        </Link>

                      )
                    }







                    {
                      user?.role === "ADMIN" && (

                        <>


                          <Link

                            to={`/edit-mechanic/${mechanic.id}`}

                          >

                            <button

                              className="btn btn-warning me-2"

                            >

                              <FaEdit/>
                              {" "}Edit

                            </button>


                          </Link>





                          <button

                            className="btn btn-danger"

                            onClick={()=>
                              deleteMechanic(
                                mechanic.id
                              )
                            }

                          >

                            <FaTrash/>
                            {" "}Delete

                          </button>



                        </>

                      )
                    }



                  </div>



                </div>


              </div>


            </div>


          ))
        }



      </div>


    </div>

  );

}


export default Mechanics;