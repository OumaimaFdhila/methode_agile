import { NextResponse } from "next/server"
import {DB} from '@/lib/firebase'
import { collection,addDoc, serverTimestamp, doc } from "firebase/firestore"

export async function POST(req : Request){
    try{
        const {email,password,firstName,lastName,birthdate,country,language,username} = await req.json()//jebna data
        console.log({email,password,firstName,lastName,birthdate,country,language,username})
        const colref=collection(DB,"users")//definena tab mta3na
        const Doc = await addDoc(colref,{email:email,name:firstName,password:password,firstName:firstName,lastName:lastName,birthdate:birthdate,country:country,role:"user",language:language,createdAt:serverTimestamp(),updaterdAt:serverTimestamp(),verified:false})
        return NextResponse.json(Doc.id)
    }
    catch{
        return NextResponse.json("error",{status:500})
    }

}