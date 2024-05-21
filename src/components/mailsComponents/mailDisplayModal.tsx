"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { mail } from "@/types/dbModelsTypes";
import MailSendModal from "./mailSendModal";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { LuMailSearch } from "react-icons/lu";

export default function MailDisplayModal(
    { isOpen, onOpenChange, mail }:
    { isOpen:boolean, onOpenChange:()=>void, mail:mail }) {
    const {isOpen:RisOpen, onOpen:RonOpen, onOpenChange:RonOpenChange} = useDisclosure();
    const pathName = usePathname()

    useEffect(()=>{
      if(mail && !mail.viewed){
        let url = "api/mails"
        console.log(url)
        axios.put(url,{id:mail.id})
        .then((res)=>{
        
        })
      }
    }, [mail, pathName])

    return (
        <>
        {   mail?.sender.email ? 
            <MailSendModal onOpenChange={RonOpenChange} isOpen={RisOpen} reply={mail} />:
            null
        }
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
            size="lg"
        >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader  className="text-2xl text-primary flex items-center"><LuMailSearch className="mr-2"/>Mail</ModalHeader>
              <ModalBody className="w-full">
                <div className="flex flex-col w-full h-full">
                  <p className="text-lg border-b-1 border-[#dddddd] pb-2"><span className="text-danger text-xl">Sender :</span> {mail.sender.email}</p>
                  <p className="text-lg border-b-1 border-[#dddddd] py-2"><span className="text-danger text-xl">Subject :</span> {mail.subject}</p>
                  <p className="text-lg bg-foreground-100 rounded-lg my-4  px-2 py-1  min-h-40">{mail.description}</p>
                    {/* <h2>sender: {mail.sender.email}</h2>
                    <h3>subject: {mail.subject}</h3>
                    <p>content</p>
                    <p>{mail.description}</p> */}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" className="text-md font-semibold" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" className="text-md font-semibold" onPress={()=>{
                    RonOpen()
                    onClose()
                }}>
                  Reply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </>
    );
}

