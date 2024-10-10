"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { RoleGate } from "~/components/auth/roleGate";
import { Button } from "~/components/ui/button";
import { UserRole } from "@prisma/client";
import { admin } from "~/actions/admin";
import { toast } from "sonner";
import CustomersTable from "../_components/customerTab";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="bg-white p-8 h-screen">
      <CustomersTable />
    </div>
  );
}
