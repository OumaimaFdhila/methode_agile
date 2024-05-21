import { NextResponse } from "next/server"

import { collection, addDoc, serverTimestamp} from "firebase/firestore"
import { DB } from "@/lib/firebase"

import { authOptions } from '@/lib/authOptions'
import { getServerSession } from "next-auth/next"

export async function POST(req:Request) {
    try{
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json("Not logged in", {status:404})
        }

        const {content,parentComment,ReplyTo} = await req.json()
        
        const commentDoc = await addDoc(collection(DB, "comments"), {
            content,
            userId: session.user.id,
            user:{
                name:session.user.name,
                image:session.user.image
            },
            parentComment,
            ReplyTo:ReplyTo? ReplyTo : "",
            date: serverTimestamp(),
        });

        return NextResponse.json(commentDoc.id)
    }catch(error){
        console.log(error)
        return NextResponse.json("Internal error", {status:500})
    }
}