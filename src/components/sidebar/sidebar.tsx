import { Button } from "@nextui-org/react";
import { BsFillCaretRightFill } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuMails } from "react-icons/lu";
import { MdAddTask } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { IoCalendarNumberOutline } from "react-icons/io5";
import SendMailButton from "../mailsComponents/SendMailButton";

export default function Sidebar({hundleDash,hundleCalen,hundleMail,hundleUser,hundleTask}:{hundleDash:()=>void,hundleCalen:()=>void,hundleMail:()=>void,hundleUser:()=>void,hundleTask:()=>void}){


    return(
        <div className="h-full flex-shrink-0 w-[215px] bg-[#eeee] flex flex-col">
            <p className="h-16 flex p-[30px] items-center border-b-1 border-b-[#cbcbcb] font-semibold text-xl"><BsFillCaretRightFill className="mr-2 mt-[2px]"/>Workspace</p>
            <div className="w-full h-full flex flex-col p-5 items-center">

                <Button onClick={hundleDash} variant="light"  startContent={<MdOutlineSpaceDashboard/>}  className="text-black text-md flex justify-start w-full mb-2">Dashboard</Button>

                <Button onClick={hundleCalen} variant="light" startContent={<IoCalendarNumberOutline/>}  className="text-black text-md flex justify-start w-full mb-2">Calendar</Button>

                <Button onClick={hundleMail} variant="light" startContent={<LuMails/>}  className="text-black text-md text-start flex justify-start w-full mb-2">Mails</Button>

                <SendMailButton/>

                <Button onClick={hundleTask} variant="light" startContent={<MdAddTask/>}  className="text-black text-md text-start flex justify-start w-full mb-2">Tasks</Button>

                <Button onClick={hundleUser} variant="light" startContent={<FaRegUser/>}  className="text-black text-md text-start flex justify-start w-full mb-2">Users List</Button>
                

            </div>


        </div>
    )
}