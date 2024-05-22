import  Calendar  from "@/components/calendar"
import CommentsComponent from "@/components/comments/commentsComponent"
import SendMailButton from "@/components/mailsComponents/SendMailButton"
import MailTable from "@/components/mailsComponents/mailTable"
import AddTodo from "@/components/to_do_list/AddTodo"
import UserTable from "@/components/usersTable"

export default function Profile(){

    return(
        <div className="w-full h-screen  px-7 pt-7 overflow-hidden flex justify-between">
            
            <div className="w-full h-full   flex flex-col  pr-7 ">
                <div className="h-[32%] w-full bg-white  mb-7 border-1 border-[#dedede]  rounded-xl">
                    <div className="h-[40%] w-full bg-[#d4570f] rounded-t-xl">
                        <CommentsComponent/>
                    </div>

                </div>
                <div className="w-full h-[50%] bg-white border-1 border-[#dedede] rounded-xl ">
                    {/* <SendMailButton/>
                    <MailTable/> */}
                    <UserTable/>
                </div>
            </div>

            <div className="w-[50%] h-full flex justify-end "> 
                <Calendar/>
                <AddTodo/>
                
            </div>
        </div>
    )
}