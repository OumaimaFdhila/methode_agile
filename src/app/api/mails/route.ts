import { NextResponse } from "next/server";
import { DB } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs ,or} from "firebase/firestore"
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from "next-auth/next"

export async function POST(request: Request) {
    try{
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json("Not logged in", {status:404})
        }

        let {sendTo, subject, description}:{sendTo:string, subject:string, description:string} = await request.json()
        sendTo = sendTo.split(' ').filter(Boolean).join('').toLowerCase();

        const userColection = collection(DB, "users")
        const q = query(userColection, where("email", "==", sendTo))
        const docs = (await getDocs(q)).docs

        if(docs.length !== 1){
            console.log("55555")
            return NextResponse.json("user not found", {status:505})
        }

        const colRef = collection(DB,"mails");

        const doc = await addDoc(colRef,{
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
        })

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
        const q = query(colRef, or(where("sendTo", "==", session.user.email),where("sender.id", "==", session.user.email)))
        const mails = (await getDocs(q)).docs.map((d)=>{
            return {...d.data(), id:d.id}
        })
        
        return NextResponse.json(mails)
     }catch(error){
        console.log(error)
        return NextResponse.json("Internal error", {status:500})
    }
}