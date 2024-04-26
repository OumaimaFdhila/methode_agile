'use client'
import React, { useEffect, useState } from "react";
import {Modal, Button, useDisclosure, ModalContent, ModalFooter, Link, ModalBody, SelectItem, ModalHeader, Input, button, DatePicker, Select} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import {parseDate} from "@internationalized/date";
import { HiOutlineMail } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function FinalSetUp() {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {data:session}=useSession()


    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [country,setCountry]=useState('')
    const [birthdate,setBirthDate]=useState(parseDate("2024-04-04"))
    const [username,setUsername]=useState("")
    const [language,setLanguage]=useState("")

    const date = new Date(birthdate.year, birthdate.month-1 , birthdate.day);//-1
    const date1 = date.toLocaleDateString()
    
    useEffect(()=>{
        if (session && !session?.user.firstName){
            console.log("bech n5admou popup")
            onOpen()
        }
    },[session])

    const router = useRouter()
    const { update } = useSession()

    const submit = async ()=>{
        // e.preventDefault()
        // setIsDisabled(true)
        axios.post('/api/finalsetup',{firstName,lastName,country,date1,username,language})
        .then(async ()=>{
            await update().then(()=>{
                router.push("/profile")
            })
        })
        .catch((error:Error)=>{
            // toast({
            //     description:<p className="text-red-500 text-md font-semibold">internal error</p>,
            //     variant:"destructive"
            // })
            // setIsDisabled(false)
            console.log(error)
        })
    }
  



  return (
    <>
      <Modal 
      // is open hia li t7el wetsaker 3tetha not close... bech matet7al kan ki tabda isopen wou closemodal false li hia twalli true ki tenzel 3ala log wela sign
        isOpen={isOpen } 
        onOpenChange={onOpenChange}
        placement="top-center"
        className="dark bg-[#21242e] "
        backdrop='blur'
        size="xl"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            }}}}
      >
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="text-[#d3570d] flex flex-col gap-1 ">Final SetUp</ModalHeader>
              <ModalBody className="w-full flex flex-row ">

                <div className="w-[48%]">
                

                <Input
                  autoFocus
                  className="text-white mb-3"
                  endContent={
                    < FaRegUserCircle  className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="First Name"
                  placeholder="Enter your first name"
                  variant="bordered"
                  value={firstName}
                  onChange={(e)=>{setFirstName(e.target.value)}}
                />

<Input
                  autoFocus
                  className="text-white mb-3"
                  endContent={
                    < FaRegUserCircle  className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Last Name"
                  onChange={(e)=>{setLastName(e.target.value)}}
                  placeholder="Enter your last name"
                  variant="bordered"
                  value={lastName}
                />
                <Input
                  autoFocus
                  className="text-white mb-3"
                  endContent={
                    < HiOutlineMail  className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Username"
                  placeholder="Enter your Username"
                  variant="bordered"
                  value={username}
                  onChange={(e)=>{setUsername(e.target.value)}}
                />
                </div>
                <div className="w-[48%]">
                <DatePicker label={"Birth date"} className="mb-3" variant="bordered" value={birthdate} onChange={setBirthDate}/>
                
                <Input
                  autoFocus
                  className="text-white mb-3"
                  endContent={
                    < MdPlace  className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Country"
                  onChange={(e)=>{setCountry(e.target.value)}}
                  placeholder="Enter your Country"
                  variant="bordered"
                  value={country}
                />

                <Select 
                    label="Select Language" 
                    className="dark  text-white w-[100%] flex-shrink-0 mb-3" 
                    variant="bordered"
                    value={language}
                    onChange={(e)=>{setLanguage(e.target.value)}}
                    selectionMode="multiple"
                  >
                      <SelectItem className="w-full" key="Deutsche" value="french">
                      Deutsche
                      </SelectItem>
                      <SelectItem key="English" value="french">
                        English
                      </SelectItem>
                      <SelectItem key="Frensh" value="french">
                        French
                      </SelectItem>
                  </Select>

                  

                  </div>


                
              </ModalBody>
              <ModalFooter >
                {/*onClick={() =>{ isSign(false)}} bech ki tenzel 3leha thezek lel log  */}
              
                <Button onClick={()=>{submit();onClose()}} className="bg-[#d3570d] text-white font-semibold flex justify-center" > 
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}


