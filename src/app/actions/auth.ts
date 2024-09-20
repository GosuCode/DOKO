"use server";

import { signIn, signOut } from "@/auth";
import { getSession } from "next-auth/react";

export async function signInWithGoogle() {
  await signIn("google");
}

export async function accountSignOut() {
  await signOut({
    redirectTo: "/",
  });
}

export async function getUser() {
  const session = await getSession();
  return session?.user;
}