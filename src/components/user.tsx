"use client";

import { useSession } from "next-auth/react";

export function User() {
  const { data: session } = useSession();
  const user = session?.user;

  return <span>{user?.name}</span>;
}
