"use client"
import { GetToDos, addTodo } from "@/server actions/todoaction"
import { useSession } from "next-auth/react"
import { useContext, createContext, useEffect, useState } from "react"

type todo = { id:string, title:string, description:string, status:string,userId:string | undefined }

const ToDosContext = createContext<{todos:todo[], AddToDo:(todo:todo)=>void,update:()=>void}>({todos:[],AddToDo:(todo:todo)=>{},update:()=>{}})

export function useToDos(){
    return useContext(ToDosContext)
}

export const ToDosProvider = ({ children }: { children: React.ReactNode }) => {
    const [todos, setTodos] = useState<todo[]>([])
    const {data:session} = useSession()

    const updateTodos = ()=>{
        if(!session) return
        GetToDos({userId:session.user.id}).then((data)=>{
            if(data){
                setTodos(data)
            }
        })
    }

    useEffect(()=>{
        if(session){
            const fetch = ()=>{
                GetToDos({userId:session.user.id}).then((data)=>{
                    if(data){
                        setTodos(data)
                    }
                })
            }
            fetch()
        }
    },[session])

    const AddToDo = (todo:todo)=>{
        const backUp = [...todos]
        setTodos(prev => [...prev,todo])
        addTodo(todo).then((data)=>{
            if(data){
                console.log("added")
                updateTodos()
            }
            else{
                setTodos(backUp)
            }
        })
    }

    return(
        <ToDosContext.Provider value={{todos,AddToDo,update:updateTodos}}>
            {children}
        </ToDosContext.Provider>
    )
}