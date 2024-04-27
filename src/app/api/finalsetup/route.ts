import { NextResponse } from "next/server";
import { DB } from "@/lib/firebase"
import {updateDoc, serverTimestamp, doc} from "firebase/firestore"

import { authOptions } from '@/lib/authOptions'
import { getServerSession } from "next-auth/next"



type reqData = {
    firstName:string|null, 
    lastName:string|null, 
    country:string|null,
    date1:string|null,
    password:string|null,
    language:string|null,
}
export async function POST(req:Request) {
    try{
        const session = await getServerSession(authOptions)
        //security check
        if(!session || !session.user){
            return NextResponse.json("you are not logged in", {status:400})
        }

        const {firstName,lastName,country,date1,password,language}: reqData = await req.json();
        //data check
        if(!firstName || !lastName || !country||!password || !language){
            return NextResponse.json("Missing Data", {status:400})
        }

        //update user data in db
        const docRef = doc(DB, "users", session.user.id)
        await updateDoc(docRef,{
            firstName:firstName,lastName:lastName,country:country,birthdate:date1,password:password,language:language,role:"user",updatedAt:serverTimestamp(),
        })

        return NextResponse.json("mrigla!")

    }catch{
        return NextResponse.json("Internal error", {status:500})
    }
}