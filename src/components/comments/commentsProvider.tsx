"use client"
import { comment, reaction } from "@/types/dbModelsTypes"
import { createContext, useState, useContext, useEffect} from "react"
import { collection, getDocs, query, where} from "firebase/firestore"
import { DB } from "@/lib/firebase"

const CommentsContext = createContext<comment[]>([])
const CommentsUpdateContext = createContext<(comment:comment)=>void>(()=>{})
const CommentReactionsContext = createContext<reaction[]>([])
const CommentReactionsAddContext = createContext<(reaction:reaction)=>void>(()=>{})
const CommentReactionsRemoveContext = createContext<(id:string)=>void>(()=>{})

export function useComments(){
    return useContext(CommentsContext)
}

export function useCommentsUpdate(){
    return useContext(CommentsUpdateContext)
}

export function useReactions(){
    return useContext(CommentReactionsContext)
}

export function useAddReaction(){
    return useContext(CommentReactionsAddContext)
}

export function useRemoveReaction(){
    return useContext(CommentReactionsRemoveContext)
}

export function CommentProvider({children}:{children:React.ReactNode}){
    const [comments, setComments] = useState<comment[]>([])
    const [reactions, setReactions] = useState<reaction[]>([])
    
    // [TODO] - sort by date, sort by likes
    useEffect(()=>{
        const colRef = collection(DB, "comments")
        getDocs(colRef).then((querySnapshot)=>{
            const data = querySnapshot.docs.map((doc) => {return {...doc.data(),id:doc.id}}) as comment[]
            setComments(data)
        })

        const reactionColRef = collection(DB, "reactions")
        getDocs(reactionColRef).then((querySnapshot)=>{
            const data = querySnapshot.docs.map((doc) => {return {...doc.data(),id:doc.id}}) as reaction[]
            setReactions(data)
         })
    },[])

    const addComment = (comment:comment)=>{
        setComments(prev => prev.concat(comment))
    }

    const addReaction = (reaction:reaction) => {
        setReactions(prev => prev.concat(reaction))
    }

    const RemoveReaction = (id:string) => {
        setReactions(prev => prev.filter((r)=>r.id !== id))
    }

    return(
        <CommentsContext.Provider value={comments}>
            <CommentsUpdateContext.Provider value={addComment}>
                <CommentReactionsContext.Provider value={reactions}>
                    <CommentReactionsAddContext.Provider value={addReaction}>
                        <CommentReactionsRemoveContext.Provider value={RemoveReaction}>
                            {children}
                        </CommentReactionsRemoveContext.Provider>
                    </CommentReactionsAddContext.Provider>
                </CommentReactionsContext.Provider>
            </CommentsUpdateContext.Provider>
        </CommentsContext.Provider>
    )
}