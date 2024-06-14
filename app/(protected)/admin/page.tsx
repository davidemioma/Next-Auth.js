"use client";

import { toast } from "sonner";
import { admin } from "@/actions/admin";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import RoleGate from "@/components/auth/RoleGate";
import { FormSuccess } from "@/components/FormSuccess";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AdminPage() {
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
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
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <p className="text-2xl text-center font-semibold">🔑 Admin</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>

        <div className="flex items-center justify-between p-3 rounded-lg border shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>

          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>

          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}
