"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

//import { useToast } from "@/components/ui/use-toast"
import { usePathname, useSearchParams } from "next/navigation";

import { mail } from "@/types/dbModelsTypes";
import { TbMailUp } from "react-icons/tb";
import { LuMail } from "react-icons/lu";

export default function MailSendModal(
    { isOpen, onOpenChange, reply, email }:
    { isOpen:boolean, onOpenChange:()=>void, reply?:mail, email?:string }) {
    //const { toast } = useToast()
    const sendToEmail = useRef(reply?.sender.email)
    const [isDisabled, setIsDisabled] = useState(false)
    const [isInvalid, setIsInvalid] = useState("")

    const [sendTo, setSendTo] = useState("")
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")

    useEffect(()=>{
        sendToEmail.current = reply?.sender.email
        if(email){
            sendToEmail.current = email
        }
    },[reply, email])

    const pathName = usePathname()
    const params = useSearchParams()
    useEffect(()=>{
        if(sendToEmail.current !== undefined && sendToEmail.current !== "" && sendToEmail.current !== null){
            setSendTo(sendToEmail.current)
        }
    },[params, isOpen])

    const sendMail = (onClose:()=>void)=>{
        if(isInvalid !== "") setIsInvalid("");
        if(!sendTo || !subject || !description){
            setIsInvalid("error")
            return
        }

        setIsDisabled(true)
        let url = "/api/mails"
        if(pathName.includes("dashboard")){
            url = "../api/mails"
        }
        axios.post(url, {sendTo, subject, description, reply:reply? reply.id : null})
        .then((res)=>{
            console.log(res.data)
            // toast({
            //     description: <p className="text-green-500 text-md font-semibold">mail send successfuly</p>,
            // })
            onClose()
        })
        .catch((error)=>{
            // toast({
            //     description: <p className="text-red-500 text-md font-semibold">{error.response.data}</p>,
            // })
            setIsInvalid("mail not found")
        })
        .finally(()=>{
            setIsDisabled(false)
        })
    }

    const mailIconColor = (isInvalid === "mail not found" || isInvalid === "error") ? " text-danger" : " text-default-400"

    return (
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
        >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl text-primary flex items-center "><TbMailUp className="mr-2"/>Send Mail</ModalHeader>
              <ModalBody className="w-full ">
                <Input
                    onFocus={()=>{setIsInvalid("")}}
                    isInvalid={isInvalid === "mail not found" || isInvalid === "error"}
                    value={sendTo}
                    onValueChange={setSendTo}
                    isDisabled={isDisabled}
                    endContent={
                        <LuMail 
                            className={"text-2xl pointer-events-none flex-shrink-0" + mailIconColor} />
                    }
                    placeholder="To"
                    variant="underlined"
                    className="h-[50px]"
                />
                <Input
                    onFocus={()=>{setIsInvalid("")}}
                    isInvalid={isInvalid === "error"}
                    value={subject}
                    onValueChange={setSubject}
                    isDisabled={isDisabled}
                    placeholder="Subject"
                    variant="underlined"
                    className="mb-4 h-[50px]"
                />
                <Textarea
                    onFocus={()=>{setIsInvalid("")}}
                    isInvalid={isInvalid === "error"}
                    value={description}
                    onValueChange={setDescription}
                    label="Description"
                    placeholder="Enter your description"
                    isDisabled={isDisabled} size="lg" />

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" className="text-md font-semibold"  onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" className="text-md font-semibold"  onPress={()=>{sendMail(onClose)}}>
                  send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
}

