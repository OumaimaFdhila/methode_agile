"use client"
import  Calendar  from "@/components/calendar"
import CommentsComponent from "@/components/comments/commentsComponent"
import MailTable from "@/components/mailsComponents/mailTable"
import { Button, useDisclosure } from "@nextui-org/react"
import { IoMailSharp } from "react-icons/io5"
import MailSendModal from "@/components/mailsComponents/mailSendModal"
export default function Profile(){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return(
        <div className="w-full h-screen  px-7 pt-7 overflow-hidden flex justify-between">
            
            <div className="w-full h-full   flex flex-col  pr-7 ">
                <div className="h-[32%] w-full bg-white  mb-7 border-1 border-[#dedede]  rounded-xl">
                    <div className="h-[40%] w-full bg-[#d4570f] rounded-t-xl">
                    <Button 
                variant="light" 
                color="danger" 
                className="font-bold text-md" 
                onPress={onOpen}><IoMailSharp/>
                Send Mail
              </Button>
              <MailSendModal onOpenChange={onOpenChange} isOpen={isOpen}/>
                    </div>

                </div>
                <div className="w-full h-[50%] bg-white border-1 border-[#dedede] rounded-xl ">
                    {/* <CommentsComponent/> */}
                    <MailTable/>
                </div>
            </div>

            <div className="w-[50%] h-full flex justify-end "> 
                <Calendar/>
                
            </div>
        </div>
    )
}