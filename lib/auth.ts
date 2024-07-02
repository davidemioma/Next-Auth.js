import { auth } from "@/auth";
import { cache } from "react";

export const currentUser = cache(async () => {
  const session = await auth();

  return { user: session?.user };
});

export const currentRole = cache(async () => {
  const session = await auth();

  return { role: session?.user?.role };
});
