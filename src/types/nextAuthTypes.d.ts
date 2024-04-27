import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      verified:boolean
      role: null | "admin" | "user"
      firstName: string | null
      lastName: string | null
      createdAt: Timestamp,
      updatedAt: Timestamp,
      language:string|null,
      birthdate:string|null,
      country:string|null,
    } & DefaultSession["user"]
  }
}