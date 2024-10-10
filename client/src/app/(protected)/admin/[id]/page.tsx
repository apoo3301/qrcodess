"use client"

import { useEffect, useState } from "react";

interface Customer {
  id: string;
  email: string;
  fullname: string;
  duree: number;
}

const CustomerPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`/api/customers/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch customer details");
        }
        const data = await response.json();
        setCustomer(data);
      } catch (err) {
        setError("Error fetching customer details");
      }
    };

    fetchCustomer();
  }, [id]);

  if (error) {
    return <div className="text-center text-muted-foreground">{error}</div>;
  }

  if (!customer) {
    return <div className="text-center text-muted-foreground">Loading customer details...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
      <p><strong>ID:</strong> {customer.id}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Full Name:</strong> {customer.fullname}</p>
      <p><strong>Duration:</strong> {customer.duree} months</p>
      {/* Ajoutez d'autres informations si nécessaire */}
    </div>
  );
};

export default CustomerPage;
