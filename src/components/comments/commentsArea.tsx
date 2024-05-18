"use client"
import { comment } from "@/types/dbModelsTypes";
import Comment from "./comment";

import { useMemo } from "react";
import { useComments } from "./commentsProvider";

export default function CommentsArea() {
    const comments = useComments()

    const filteredComments = useMemo(()=>{
        let parentComment:comment[] = []
        let childComment:comment[] = []
        
        for(let i = 0; i < comments.length; i++){
            if(comments[i].parentComment){
                childComment.push(comments[i])
            }
            else{
                parentComment.push(comments[i])
            }
        }
        parentComment.sort((a,b)=>((b.date ? b.date.toDate().getTime() : (new Date()).getTime()) - (a.date ? a.date.toDate().getTime() : (new Date()).getTime())))
        let filterd:{parentComment:comment, childComment:comment[]}[] = []
        for(let i = 0; i < parentComment.length; i++){
            let childs = childComment.filter((c)=>(c.parentComment === parentComment[i].id))
            childs = childs.sort((a,b)=>((b.date ? b.date.toDate().getTime() : (new Date()).getTime())) - (a.date ? a.date.toDate().getTime() : (new Date()).getTime()))
            filterd.push({parentComment:parentComment[i], childComment:childs})
        }

        return filterd
    },[comments])
    return(
        <div className="flex flex-col gap-2 p-4">
            {
                filteredComments.map((c)=>{
                    if(c.parentComment !== null && c.parentComment !== undefined){
                        return (<Comment key={c.parentComment.id} comment={c}/>)
                    }
                })
            }
        </div>
    )
}