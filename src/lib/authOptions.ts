import {AuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app"
import { getUserByEmail, getUserByID } from "@/lib/firebase"
import bcrypt from "bcrypt";

export const authOptions:AuthOptions = {
    // @ts-ignore
    adapter: FirestoreAdapter({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g,'\n'),
        })
      }),
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("invalid credentials")
                }

                const user = await getUserByEmail(credentials.email)

                console.log(user)
                
                if(!user || !user.password){
                    throw new Error("invalid credentials")
                }

                // const validPass = await bcrypt.compare(
                //     credentials.password,
                //     user.hashedPassword
                // )

                const validPass = credentials.password==user.password

                if(!validPass){
                    throw new Error("invalid credentials")
                }
                return user
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
    ],
    session:{
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async session({session,token}){
            if(token.sub){
                session.user.name = token.name
                session.user.id = token.sub
            }

            if(token.role === "User" || token.role === "Admin"){
                session.user.role =  token.role
            }
            else{
                session.user.role =  null
            }

            session.user.firstName = token.firstName as string | null
            session.user.lastName = token.lastName as string | null

            session.user.verified = token.verified ? true : false

            return session
        },
        async jwt({token}){
            //check for user id in the token
            if(!token.sub){
                return token
            }

            const user = await getUserByID(token.sub)

            if(user){
                token.role = user.role
                
                token.firstName = user.firstName
                token.lastName = user.lastName

                token.name = user.name


                token.verified = user.verified
            }

            return token
        },
        async signIn({profile,account}) {
            if(account?.provider === "credentials"){
                return true
            }
            return true
        }
    }
}