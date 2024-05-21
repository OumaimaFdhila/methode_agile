import { NextResponse } from "next/server";
import { DB } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, doc, or } from "firebase/firestore"

import { authOptions } from '@/lib/authOptions'
import { getServerSession } from "next-auth/next"

export async function POST(request: Request) {
    try{
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json("Not logged in", {status:404})
        }

        let {sendTo, subject, description, reply}:{sendTo:string, subject:string, description:string, reply:string|null} = await request.json()
        sendTo = sendTo.split(' ').filter(Boolean).join('').toLowerCase();

        const userColection = collection(DB, "users")
        const q = query(userColection, where("email", "==", sendTo))
        const docs = (await getDocs(q)).docs

        if(docs.length !== 1){
            return NextResponse.json("user not found", {status:505})
        }

        const colRef = collection(DB,"mails");

        let mail:any = {
            sender:{
                id:session.user.id,
                email:session.user.email,
                role:session.user.role!,
                image:session.user.image,
            },
            sendTo, 
            subject, 
            description,
            date:serverTimestamp(),
        }

        if(reply){
            mail.reply = reply
        }

        const doc = await addDoc(colRef,mail)

        return NextResponse.json({id:doc.id, type:"mail", ok:true}, {status:200})
    }
    catch (error){
        console.error(error)
        return NextResponse.json("Internal error", {status:500})
    }
}

export async function GET(request: Request) {
    try{
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json("Not logged in", {status:414})
        }
        
        const colRef = collection(DB, "mails")
        const q = query(colRef, or(where("sendTo", "==", session.user.email), where("sender.email", "==", session.user.email)))
        const mails = (await getDocs(q)).docs.map((d)=>{
            return {...d.data(), id:d.id}
        })
        
        return NextResponse.json(mails)
     }catch(error){
        console.log(error)
        return NextResponse.json("Internal error", {status:500})
    }
}

export async function PUT(request: Request) {
    try{
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json("Not logged in", {status:414})
        }

        const {id} = await request.json()
        const colRef = collection(DB, "mails")
        await updateDoc(doc(colRef,id),{
            viewed:true
        })
        
        return NextResponse.json("suii")
     }catch(error){
        console.log(error)
        return NextResponse.json("Internal error", {status:500})
    }
}