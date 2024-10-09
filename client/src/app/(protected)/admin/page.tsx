"use client";

import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { FormSuccess } from "~/components/formSuccess";
import { RoleGate } from "~/components/auth/roleGate";
import { Button } from "~/components/ui/button";
import { UserRole } from "@prisma/client";
import { admin } from "~/actions/admin";
import { toast } from "sonner";

export default function AdminPage() {
  const onApiRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        console.log("OKAY");
        toast.success("Allowed API Route!");
      } else {
        toast.error("Forbidden API Route!");
      }
    });
  };

  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      } 
      if (data.success) {
        toast.success(data.success);
      }
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to view this content!" />
        </RoleGate>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p>Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p>Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}
