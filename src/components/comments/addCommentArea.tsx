"use client"
import { Textarea, Button, } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";

import { comment } from "@/types/dbModelsTypes"
import { useSession } from "next-auth/react";
import { useCommentsUpdate } from "./commentsProvider";
 
export default function AddCommentArea({IsReply = false, ReplyTo="", parentComment=null, disableComponent}:{IsReply?:boolean, ReplyTo?:string, parentComment?:string|null, disableComponent?:()=>void}) {
    const [isFocused, setIsFocused] = useState(false)
    const [content, setContent] = useState("")
    const {data:session} = useSession()

    const updateComment = useCommentsUpdate()

    const addComment = ()=>{
        const data = {
            content,
            parentComment,
            ReplyTo
        }
        
        axios.post("api/comments/add", data).then((res)=>{
            let newComment = {
                id:res.data,
                content:content,
                userId:session?.user.id ? session?.user.id : "user",
                user:{
                    name:session?.user.name ? session?.user.name : "user",
                    image:session?.user.image
                },
                parentComment:parentComment,
                ReplyTo:ReplyTo ? ReplyTo: ""
            } satisfies comment
            updateComment(newComment)
            setIsFocused(false)
            setContent("")
            if(disableComponent){
                disableComponent()
            }
        })
    }

    return (
        <div className="flex flex-col gap-2 w-full p-4 rounded-md">
            <Textarea
                onFocus={()=>{
                    if(!isFocused) setIsFocused(true)
                }}
                placeholder="Write a comment..."
                variant="underlined"
                value={content}
                onValueChange={setContent}
                minRows={1}
                maxRows={3}
            />
            { isFocused ?
                <div className="w-full flex gap-2 justify-end">
                    <Button 
                        color="default" 
                        variant="bordered" 
                        className="flex-grow-0"
                        onPress={()=>{
                            setIsFocused(false)
                            setContent("")
                        }}>
                            cancel
                    </Button>
                    <Button 
                        color="primary" 
                        variant="solid" 
                        className="flex-grow-0"
                        onPress={addComment}>
                            Comment
                    </Button>
                </div>
                : null
            }
        </div>
    )
}