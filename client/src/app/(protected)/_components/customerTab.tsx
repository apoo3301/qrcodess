"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

interface Customer {
  id: string;
  email: string;
  fullname: string;
}

export default function CustomersTable() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [duree, setDuree] = useState<number>(0);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers");
      const data = await response.json();
      setCustomers(data);
    } catch {
      setError("Error fetching customer data");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddCustomer = async () => {
    await fetch("/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, fullname, duree }),
    });
    setEmail("");
    setFullname("");
    setDuree(0);
    await fetchCustomers();
  };

  const handleCustomerClick = (id: string) => {
    router.push(`/admin/${id}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Full Name"
            className="border p-2 rounded ml-2"
          />
          <input
            type="number"
            value={duree}
            onChange={(e) => setDuree(Number(e.target.value))}
            placeholder="Duree"
            className="border p-2 rounded ml-2"
          />
          <Button onClick={handleAddCustomer} className="ml-2">Add Customer</Button>
        </div>
        {error ? (
          <div className="text-center text-muted-foreground">{error}</div>
        ) : customers.length === 0 ? (
          <div className="text-center text-muted-foreground">No customers found</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Full Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id} onClick={() => handleCustomerClick(customer.id)} className="cursor-pointer">
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.fullname}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
