"use client";

import { logout } from "@/actions/logout";

type Props = {
  children?: React.ReactNode;
};

const LogoutBtn = ({ children }: Props) => {
  return (
    <span onClick={() => logout()} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutBtn;
