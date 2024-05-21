import { Timestamp } from "firebase/firestore"

export type userCred = {
    id: string,
    email: string,
    createdAt: Timestamp,
    updatedAt: Timestamp,
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
export type comment = {
    id: string;
    content: string;
    userId:string;
    user:{
        name:string,
        image?:string | null
    }
    parentComment: string | null;
    ReplyTo?:string;
    date?:Timestamp;
};

export type reaction = {
    id: string;
    reactionType: "like" | "dislike";
    userId: string;
    commentId:string;
    date?:Timestamp;
}
export type mail = {
    id:string,
    sender:{
        id:string,
        email:string,
        image?:string | null,
        role:"Admin" | "User"
    },
    sendTo:string, 
    subject:string, 
    description:string,
    viewed:boolean,
    date:Timestamp,
}
