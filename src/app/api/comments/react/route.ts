import { NextResponse } from "next/server"

import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc} from "firebase/firestore"
import { DB } from "@/lib/firebase"

import { authOptions } from '@/lib/authOptions'
import { getServerSession } from "next-auth/next"

export async function POST(req:Request) {
    try{
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json("Not logged in", {status:404})
        }
        const {type:reactionType, commentId} = await req.json()

        const colRef = collection(DB, "reactions")
        const docRef = await addDoc(colRef,{
            userId:session.user.id,
            userName:session.user.name,
            reactionType:reactionType,
            commentId,
            createdAt:serverTimestamp()
        })

        return NextResponse.json({id:docRef.id})
    }catch(error){
        console.log(error)
        return NextResponse.json("Internal error", {status:500})
    }
}

export async function GET( req:Request){
    try{
        const {searchParams} = new URL(req.url)
        const courseId = searchParams.get("courseId")
        const colRef = collection(DB, "reactions")
        const q = query(colRef, where("courseId","==", courseId))

        const data = (await getDocs(q)).docs.map((d)=>{
            return {...d.data(), id:d.id} as any
        })

        const likes = data.filter((d)=> d.reactionType === "like")
        const dislikes = data.filter((d)=> d.reactionType === "dislike")

        return NextResponse.json({likes, dislikes})
    }catch(error){
        return NextResponse.json("Internal error", {status:500})
    }
}

export async function DELETE(req:Request) {
    try{
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json("Not logged in", {status:404})
        }
        
        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")
        
        if(!id){
            return NextResponse.json("No ID provided", {status:404})
        }
        const colRef = collection(DB, "reactions")
        const docRef = doc(colRef, id)
        await deleteDoc(docRef) 
        
        return NextResponse.json({message:"Deleted", id})
     }catch(error){
        console.log(error)
        return NextResponse.json("Internal error", {status:500})
    }
}