import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Google from "next-auth/providers/google"
import { database } from '@/db/database'
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(database),
  providers: [Google],
})