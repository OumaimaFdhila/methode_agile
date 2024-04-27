import { Timestamp } from "firebase/firestore"

export type userCred = {
    id: string,
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
    language:string|null,
    birthdate:string|null,
    country:string|null,
}

