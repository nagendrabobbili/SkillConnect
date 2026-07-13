import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CustomerList() {

  const [customers, setCustomers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {

    try {

      const response =
        await api.get(
          "/api/admin/customers"
        );

      setCustomers(response.data);

    } catch (error) {

      console.log(
        "Error loading customers:",
        error
      );

    }

  };

  const deleteCustomer = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this customer?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/api/admin/customers/${id}`
      );

      alert(
        "Customer deleted successfully"
      );

      loadCustomers();

    } catch (error) {

      console.log(error);

    }

  };

  const toggleBlock = async (
    id,
    blocked
  ) => {

    try {

      if (blocked) {

        await api.put(
          `/api/admin/customers/unblock/${id}`
        );

        alert(
          "Customer unblocked"
        );

      } else {

        await api.put(
          `/api/admin/customers/block/${id}`
        );

        alert(
          "Customer blocked"
        );

      }

      loadCustomers();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="container py-5">

      <h1 className="text-center text-primary mb-5">
        👥 Customer Management
      </h1>

      <div className="row">

        {
          customers.map(customer => (

            <div
              className="col-md-4 mb-4"
              key={customer.id}
            >

              <div className="card shadow p-4">

                <h4>
                  {customer.name}
                </h4>

                <p>
                  📧 {customer.email}
                </p>

                <p>
                  📱 {customer.phone}
                </p>

                <p>
                  Role: {customer.role}
                </p>

                <p>
                  Status:{" "}
                  {
                    customer.blocked
                      ? "🚫 Blocked"
                      : "✅ Active"
                  }
                </p>

                <div className="d-flex gap-2 flex-wrap">

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      deleteCustomer(customer.id)
                    }
                  >
                    🗑 Delete
                  </button>

                  <button
                    className={
                      customer.blocked
                        ? "btn btn-success"
                        : "btn btn-warning"
                    }
                    onClick={() =>
                      toggleBlock(
                        customer.id,
                        customer.blocked
                      )
                    }
                  >
                    {
                      customer.blocked
                        ? "🔓 Unblock"
                        : "🚫 Block"
                    }
                  </button>
                  <button
  className="btn btn-info"
  onClick={() =>
    navigate(`/admin/customer/${customer.id}`)
  }
>
  👁 View Details
</button>

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      navigate(
                        `/admin/customers/bookings/${customer.phone}`
                      )
                    }
                  >
                    📋 View Bookings
                  </button>

                </div>

              </div>

            </div>

          ))
        }

      </div>

    </div>

  );
}

export default CustomerList;