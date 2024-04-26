import { Timestamp } from "firebase/firestore"

export type userCred = {
    id: string,
    name:string,
    email: string,
    createdAt: Timestamp,
    updaterdAt: Timestamp,
    verified:boolean
    firstName?: string | null,
    lastName?: string | null,
    emailVerified?: Timestamp | null,
    image?: string | null,
    password:string|null;
    role?:"Admin" | "User" | null,
}

