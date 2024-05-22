"use client"
import  Calendar  from "@/components/calendar"
import CommentsComponent from "@/components/comments/commentsComponent"
import SendMailButton from "@/components/mailsComponents/SendMailButton"
import MailTable from "@/components/mailsComponents/mailTable"
import Sidebar from "@/components/sidebar/sidebar"
import UserTable from "@/components/usersTable"
import AddTodo from "@/components/to_do_list/AddTodoList"
import TodoList from "@/components/to_do_list/TodoList"
import { useState } from "react"
import Dashboard from "@/components/profile_components/dashboard"
export default function Profile(){

    const [dash,setDash]=useState(true)
    const [mail,setMail]=useState("")
    const [user,setUser]=useState("")

    const hundleDash=()=>{setDash(true);setMail("");setUser("")}
    const hundleCalen=()=>{setDash(false);setMail("");setUser("");setDash(false)}
    const hundleMail=()=>{setMail("mail");setUser("");setDash(false)}
    const hundleUser=()=>{setUser("user");setMail("");setDash(false)}

    return(
        
        <div className="w-full h-screen bg-white overflow-hidden flex justify-between">

            <Sidebar  hundleDash={hundleDash} hundleCalen={hundleCalen} hundleMail={hundleMail} hundleUser={hundleUser}/>
            {dash?<Dashboard/>:mail=="mail"?<MailTable/>:user=="user"?<UserTable/>:<Calendar/>}
            

        </div>





        // <div className="w-full h-screen  px-7 pt-7 overflow-hidden flex justify-between">
            
        //     <div className="w-full h-full   flex flex-col  pr-7 ">
        //         <div className="h-[32%] w-full bg-white  mb-7 border-1 border-[#dedede]  rounded-xl">
        //             <div className="h-[40%] w-full bg-[#d4570f] rounded-t-xl">
        //                 <CommentsComponent/>
        //             </div>

        //         </div>
        //         <div className="w-full h-[50%] bg-white border-1 border-[#dedede] rounded-xl ">
        //             {/* <SendMailButton/>
        //             <MailTable/> */}
        //             <UserTable/>
        //         </div>
        //     </div>

        //     <div className="w-[50%] h-full flex justify-end "> 
        //         <Calendar/>
        //         
                
        //     </div>
        // </div>
    )
}