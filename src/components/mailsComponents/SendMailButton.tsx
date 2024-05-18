"use client"
import { Button, useDisclosure } from "@nextui-org/react";
import MailSendModal from "./mailSendModal";
import { IoMailSharp } from "react-icons/io5";

export default function SendMailButton(){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <div>
            <Button 
                variant="light" 
                color="danger" 
                className="font-bold text-md" 
                onPress={onOpen}><IoMailSharp/>
                Send Mail
            </Button>
            <MailSendModal onOpenChange={onOpenChange} isOpen={isOpen}/>
        </div>
    )
}