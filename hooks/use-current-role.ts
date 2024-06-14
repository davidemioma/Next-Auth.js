import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
  const session = useSession();

  return { role: session.data?.user?.role };
};
