import { useEffect, useState } from "react";
import api from "../services/api";

function CustomerList() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {

      const response =
        await api.get(
          "/api/users/customers"
        );

      setCustomers(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">

      <h1 className="text-center text-primary mb-5">
        👥 Customers
      </h1>

      <div className="row">

        {
          customers.map(customer => (

            <div
              className="col-md-4 mb-4"
              key={customer.id}
            >

              <div className="card shadow p-4">

                <h4>{customer.name}</h4>

                <p>
                  📧 {customer.email}
                </p>

                <p>
                  Role:
                  {customer.role}
                </p>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default CustomerList;