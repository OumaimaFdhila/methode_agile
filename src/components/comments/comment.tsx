"use client"
import { comment } from "@/types/dbModelsTypes"
import { Avatar, Button } from "@nextui-org/react";
import { Timestamp } from "firebase/firestore";

import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useMemo, useState } from "react";
import AddCommentArea from "./addCommentArea";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useAddReaction, useReactions, useRemoveReaction } from "./commentsProvider";
import { useSession } from "next-auth/react";

function getRandomInt(Max:number){
    return Math.floor(Math.random() * Max) + 1;
}
function CommentComp({image, name, content, date, id, ReplyTo, parentId}:{image?:string|null, name:string, content:string, date:string, id:string, ReplyTo?:string, parentId?:string}){
    const {data:session} = useSession()
    const [showAddComment, setShowAddComment] = useState(false);
    const params = useSearchParams()
    const reactions = useReactions()
    const reactionAdd = useAddReaction()
    const reactionRemove = useRemoveReaction()

    const Likes = reactions.filter((r)=>(r.reactionType==="like" && r.commentId == id))
    const DisLikes = reactions.filter((r)=>(r.reactionType==="dislike" && r.commentId == id))

    const Liked = Likes.map((d)=>d.userId).includes(session?.user.id!)
    const disliked = DisLikes.map((d)=>d.userId).includes(session?.user.id!)

    const disableComponent = () => {
        setShowAddComment(false)
    }

    const removeReaction = (R_id:string)=>{
        console.log(R_id)
        axios.delete(`api/comments/react?id=${R_id}`)
        .then((res)=>{
            reactionRemove(res.data.id)
        })
    }

    const addReaction = (reaction:"like"|"dislike")=>{
        axios.post("api/comments/react", {type:reaction, commentId:id, courseId:params.get("course")})
            .then((res)=>{
                reactionAdd({
                    id:res.data.id,
                    userId:session?.user.id!,
                    commentId:id,
                    reactionType:reaction,
                })
            })
    }
    const Reaction = (reaction:"like"|"dislike")=>{
        if(!Liked && !disliked){
            addReaction(reaction)
        }
        else if(Liked){
            const userReactionId = Likes.filter((r)=>r.userId===session?.user.id)[0].id
            if(reaction === "like"){
                removeReaction(userReactionId)
            }
            else if(reaction === "dislike"){
                removeReaction(userReactionId)
                addReaction(reaction)
            }
        }
        else if(disliked){
            const userReactionId = DisLikes.filter((r)=>r.userId===session?.user.id)[0].id
            if(reaction === "dislike"){
                removeReaction(userReactionId)
            }
            else if(reaction === "like"){
                removeReaction(userReactionId)
                addReaction(reaction)
            }
        }
    }

    return(
        <>
            <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                    {
                        image ? <Avatar size="md" src={image}/>:
                        <Avatar size="md"/>
                    }
                    <div className="flex flex-col max-w-[80%]">
                        <p className="line-clamp-1">
                            <span className="text-sm font-bold text-foreground-900">
                                @{name}
                            </span>
                            <span> </span>
                            <span className="text-sm text-foreground-500 font-semibold">
                                {date}
                            </span>
                        </p>
                        <p>{ReplyTo ? <span className="text-danger font-semibold">@{`${ReplyTo} `}</span>:null}{`${content}`}</p>
                    </div>
                </div>
                <Button
                    radius="full"
                    isIconOnly
                    variant="light"
                    size="sm">
                        <PiDotsThreeOutlineVerticalFill/>
                </Button>
            </div>
            <div className="flex gap-2 items-center pl-8">
                <div className="flex items-center">
                    <Button 
                        color={Liked ? "primary": "default"}
                        radius="full"
                        isIconOnly
                        variant="light"
                        size="md"
                        onPress={()=>Reaction("like")}>
                            <AiFillLike className="text-xl"/>
                    </Button>
                    <p>{Likes.length}</p>
                </div>
                <div className="flex items-center">
                    <Button 
                        color={disliked ? "primary": "default"}
                        radius="full"
                        isIconOnly
                        variant="light"
                        size="md"
                        onPress={()=>Reaction("dislike")}>
                            <AiFillDislike className="text-xl"/>
                    </Button>
                    <p>{DisLikes.length}</p>
                </div>
                <Button
                    className="mx-4 my-1"
                    size="sm"
                    radius="full"
                    variant="light" 
                    onClick={()=>setShowAddComment(!showAddComment)}>
                    Reply
                </Button>
            </div>
            {showAddComment ? <AddCommentArea IsReply={true} parentComment={parentId || id} ReplyTo={name} disableComponent={disableComponent} /> : null}
        </>
    )
}

export default function Comment({ comment }: { comment: {parentComment:comment, childComment:comment[]} }) {

    const [showReplies, setShowReplies] = useState(false)
    
    const calculateDate = (timestamp:Timestamp | undefined) => {
        if(!timestamp) return "now";
        const now = new Date();
        const addedDateObj = timestamp.toDate()
        const diff = now.getTime() - addedDateObj.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days === 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            if (hours === 0){
                const minutes = Math.floor(diff / (1000 * 60));
                if (minutes === 0){
                    return "now"
                }
                return `${minutes} minute${minutes >1 ? 's' : ''} ago`;
            }
            return `${hours} hour${hours >1 ? 's' : ''} ago`;
        } else if (days < 0){
            return "now"
        }
        else if (days < 7) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (days < 30){
            const weeks = Math.floor(days / 7);
            return `${weeks} week${weeks >1 ? 's' : ''} ago`;
        }
        else {
            const months = Math.floor(days / 30);
            return `${months} month${months >1 ? 's' : ''} ago`;
        }
    }
    
    return (
        <div className="p-4 bg-foreground-50 rounded-lg shadow-md">
            <div className="flex flex-col">
                <CommentComp
                    image={comment.parentComment.user.image}
                    name={comment.parentComment.user.name || "Anonymous"}
                    content={comment.parentComment.content || ""}
                    date={calculateDate(comment.parentComment.date)}
                    id={comment.parentComment.id}/>
                {
                    comment.childComment.length > 0 ?
                    <div className="flex flex-col gap-2 mt-4 pl-8 justify-start">
                        <Button
                            className="mx-4 my-1 w-[100px] font-semibold"
                            size="md"
                            radius="full"
                            variant="light"
                            color="primary" 
                            onClick={()=>setShowReplies(!showReplies)}>
                            Replies {!showReplies ? <IoMdArrowDropdown/> : <IoMdArrowDropup/>}
                        </Button>
                        {
                            showReplies ?
                            <div className="flex flex-col">
                                {comment.childComment.map((c)=>(
                                    <CommentComp
                                        key={c.id}
                                        image={c.user.image || null}
                                        name={c.user.name || "Anonymous"}
                                        content={c.content || ""}
                                        date={calculateDate(c.date)}
                                        parentId={comment.parentComment.id}
                                        id={c.id}
                                        ReplyTo={c.ReplyTo}/>
                                ))}
                            </div>:null
                        }
                    </div>:null
                }
            </div>
        </div>
    );
}