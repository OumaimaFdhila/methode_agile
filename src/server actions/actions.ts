"use server"
import { DB } from "@/lib/firebase"
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from "firebase/firestore"
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from "next-auth/next"
import { Timestamp } from "firebase/firestore";

export async function SaveTimer({time, date}:{time:number, date:number}) {
    try{
        const session = await getServerSession(authOptions)
        if(!session){
            return false
        }

        console.log(date)
        const timestamp = new Timestamp(Math.floor(date/1000), 0);
        const timestampCompare = new Timestamp(Math.floor(date/1000) - (24*60*60), 0);
        console.log(timestamp)
        
        const colRef = collection(DB, "time")
        const q = query(colRef, where("userId", "==", session.user.id), where("date", ">", timestampCompare))
        console.log("q")
        const docs = (await getDocs(q)).docs
        console.log(docs.map(d=>d.data()))
        console.log(timestampCompare)
        if(docs.length > 1){
            return false
        }
        
        if(docs.length === 1){
            console.log("update")
            const DocTime = docs[0].data().time
            await updateDoc(doc(colRef,docs[0].id),{
                time: DocTime + time,
            })
            return true
        }
        
        await addDoc(colRef, {
            time,
            userId:session.user.id,
            date: timestamp
        })

        return true
    }
    catch(error){
        console.log(error)
        return false
    }
}