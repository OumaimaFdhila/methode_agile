import { NextResponse } from "next/server";
import {DB} from "@/lib/firebase"
import { collection, getDocs} from "firebase/firestore"

import { authOptions } from '@/lib/authOptions'
import { getServerSession } from "next-auth/next"

export async function GET(request: Request) {
    try{
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json("Not logged in", {status:414})
        }
        
        const colRef = collection(DB, "users")
        const users = (await getDocs(colRef)).docs.map((d)=>{
            return {...d.data(), id:d.id}
        })
        
        return NextResponse.json(users)
     }catch(error){
        console.log(error)
        return NextResponse.json("Internal error", {status:500})
    }
}