'use client';

import { useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useRouter } from "next/navigation";

interface Customer {
  id: string;
  email: string;
  fullname: string;
}

export default function CustomersTable() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]); // Ensure it's an array
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [duree, setDuree] = useState<number>(0);
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  const fetchCustomers = async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/customers?page=${page}&limit=${itemsPerPage}`);
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data.customers || []); // Ensure it sets an array
      setCurrentPage(data.currentPage);
    } catch (err) {
      setError("Error fetching customer data");
      setCustomers([]); // Fallback to empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [currentPage]);

  const handleAddCustomer = async () => {
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullname, duree }),
      });
      if (!response.ok) {
        throw new Error('Failed to add customer');
      }
      setEmail("");
      setFullname("");
      setDuree(0);
      await fetchCustomers(currentPage);
    } catch (err) {
      setError("Error adding customer");
    }
  };

  const handleCustomerClick = (id: string) => {
    router.push(`/admin/${id}`);
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (customer) =>
        customer.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
        customer.fullname.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [customers, searchEmail, searchName]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCustomers, currentPage, itemsPerPage]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Full Name"
          />
          <Input
            type="number"
            value={duree}
            onChange={(e) => setDuree(Number(e.target.value))}
            placeholder="Duree"
          />
          <Button onClick={handleAddCustomer}>Add Customer</Button>
        </div>

        <div className="mb-4 space-y-2">
          <Input
            type="email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Search by Email"
          />
          <Input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by Full Name"
          />
        </div>

        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : customers.length === 0 ? (
          <div className="text-center text-muted-foreground">No customers found</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Full Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCustomers.map((customer) => (
                  <TableRow key={customer.id} onClick={() => handleCustomerClick(customer.id)} className="cursor-pointer">
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.fullname}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-between items-center">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
