"use server";

import { signIn, signOut } from "@/auth";
import { getSession } from "next-auth/react";
import { inArray } from 'drizzle-orm';
import { users } from '@/db/schema';
import { database } from '@/db/database';

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

export async function getUserReviewAction(userIds: string[]) {

  const usersData = await database.select({
    id: users.id,
    name: users.name,
    email: users.email,
  })
  .from(users)
  .where(inArray(users.id, userIds.map(String)));

  // Transform the result into a key-value pair object
  const userDataMap = usersData.reduce<{ [key: string]: { name: string, email: string } }>((acc, user) => {
    acc[user.id] = {
      name: user.name,
      email: user.email,
    };
    return acc;
  }, {});

  return userDataMap;
}
