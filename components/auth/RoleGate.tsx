"use client";

import React from "react";
import { FormError } from "../FormError";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";

type Props = {
  children: React.ReactNode;
  allowedRole: UserRole;
};
const RoleGate = ({ children, allowedRole }: Props) => {
  const { role } = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  return <>{children}</>;
};

export default RoleGate;
