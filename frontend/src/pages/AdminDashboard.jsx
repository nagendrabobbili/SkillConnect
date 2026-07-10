import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {

    const [mechanics, setMechanics] = useState([]);


    useEffect(() => {

        loadMechanics();

    }, []);



    const loadMechanics = () => {

        api.get("/api/mechanics")
        .then(response => {

            setMechanics(response.data);

        })
        .catch(error => {

            console.log(error);

        });

    };



    return (

        <div className="container py-5">


            <h1 className="text-center text-primary fw-bold mb-5">
                👨‍💼 Admin Dashboard
            </h1>



            <h3 className="mb-4">
                👨‍🔧 Registered Mechanics
            </h3>



            <div className="row">


                {
                    mechanics.length === 0 ?

                    <h5>
                        No mechanics registered
                    </h5>

                    :

                    mechanics.map((mechanic)=>(


                        <div 
                        className="col-md-4 mb-4"
                        key={mechanic.id}
                        >

                            <div className="card shadow p-4">


                                <h4>
                                    {mechanic.fullName}
                                </h4>


                                <p>
                                    📞 {mechanic.phone}
                                </p>


                                <p>
                                    🔧 {mechanic.specialization}
                                </p>


                                <p>
                                    ⭐ Experience:
                                    {mechanic.experience} years
                                </p>


                                <p>
                                    📍 {mechanic.city}
                                </p>


                                <p>
                                    Status:

                                    {
                                        mechanic.available
                                        ?
                                        " Available"
                                        :
                                        " Not Available"
                                    }

                                </p>


                            </div>


                        </div>


                    ))

                }


            </div>


        </div>

    );

}


export default AdminDashboard;