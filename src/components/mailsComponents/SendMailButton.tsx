"use client"
import { Button, useDisclosure } from "@nextui-org/react";
import MailSendModal from "./mailSendModal";
import { IoMailSharp } from "react-icons/io5";
import { BiMailSend } from "react-icons/bi";

export default function SendMailButton(){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <div className="mb-2  flex-shrink-0">
            <Button onPress={onOpen} variant="light" startContent={<BiMailSend/>}  className="text-black text-md text-start  flex justify-start w-[175px] h-[40px] ">Send Mail</Button>
            <MailSendModal onOpenChange={onOpenChange} isOpen={isOpen}/>
        </div>
    )
}