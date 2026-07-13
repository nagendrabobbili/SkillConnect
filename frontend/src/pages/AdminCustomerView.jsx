import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function AdminCustomerView() {

  const { id } = useParams();

  const [customer, setCustomer] =
    useState(null);

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {

    try {

      const response =
        await api.get(
          `/api/admin/customers/${id}`
        );

      setCustomer(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!customer) {
    return (
      <h3 className="text-center mt-5">
        Loading customer...
      </h3>
    );
  }

  return (

    <div className="container py-5">

      <div className="card shadow p-5">

        <h1 className="text-primary mb-4">
          👤 Customer Details
        </h1>

        <p>
          <b>ID:</b> {customer.id}
        </p>

        <p>
          <b>Name:</b> {customer.name}
        </p>

        <p>
          <b>Phone:</b> {customer.phone}
        </p>

        <p>
          <b>Email:</b> {customer.email}
        </p>

        <p>
          <b>Role:</b> {customer.role}
        </p>

        <p>
          <b>Status:</b>{" "}
          {
            customer.blocked
              ? "🚫 Blocked"
              : "✅ Active"
          }
        </p>

      </div>

    </div>

  );
}

export default AdminCustomerView;