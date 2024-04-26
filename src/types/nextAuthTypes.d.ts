import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      verified:boolean
      role: null | "Admin" | "User"
      firstName: string | null
      lastName: string | null
    } & DefaultSession["user"]
  }
}