'use client'
import { MdPlace } from "react-icons/md";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react"
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link"
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon"
import { EyeFilledIcon } from "./EyeFilledIcon"
import { useState } from "react"
import { HiOutlineMail } from "react-icons/hi";
import {useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/lib/firebase'
import { useRouter } from "next/navigation"
import {DatePicker} from "@nextui-org/date-picker";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { AddUser } from "@/lib/firebase";
import {parseDate} from "@internationalized/date";

export default function App(props:{isSign:(sign:boolean)=>void}) {
    const {isSign}=props
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isVisible, setIsVisible] = useState(false);
    const [open,setOpen]=useState(true)

    const [email,setEmail] =useState('')
    const [password,setPassword]=useState('')
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [country,setCountry]=useState('')
    const [birthdate,setBirthDate]=useState(parseDate("2024-04-04"))
    const [role,setRole]=useState("")
    const [language,setLanguage]=useState("")


    const [createUser]=useCreateUserWithEmailAndPassword(auth)
    const [SignIn]=useSignInWithEmailAndPassword(auth)

    const Router=useRouter()

    const date = new Date(birthdate.year, birthdate.month-1 , birthdate.day);//-1

    const AddUserToBD=()=>{AddUser(email,password,firstName,lastName,date.toLocaleDateString(),country,language,role)
    }
  
    const toggleVisibility = () => setIsVisible(!isVisible);
  
    const hundleSignUp= async ()=>{
      try{
          const res = await createUser(email,password)
          console.log({res})
          sessionStorage.setItem('user','true')
          try{
            const res =await SignIn(email,password)
            console.log({res})
            sessionStorage.setItem('user','true')
            setEmail('')
            setPassword('')
            Router.push('/profile')//hez lzl profile
        }
        catch(e){
            console.error(e)
        }
      }
      catch(e){
          console.error(e)
      }
  
    }
    return (
        <div>
            
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="text-[#d3570d] flex flex-col gap-1 ">Sign Up</ModalHeader>
              <ModalBody className="w-full flex flex-row ">
              {/* <Input
                  autoFocus
                  className="text-white"
                  endContent={
                    < FaRegUserCircle  className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="UserName"
                  placeholder="Enter your name"
                  variant="bordered"
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                /> */}

                <div className="w-[48%]">
                <Input
                  autoFocus
                  className="text-white mb-3"
                  endContent={
                    < HiOutlineMail  className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                />
                <Input
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                className="text-2xl  text-white flex-shrink-0 mb-3"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        < EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                />

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
                  className="text-white"
                  endContent={
                    < FaRegUserCircle  className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Last Name"
                  onChange={(e)=>{setLastName(e.target.value)}}
                  placeholder="Enter your last name"
                  variant="bordered"
                  value={lastName}
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

                  <Select 
                    label="Select Role" 
                    className="dark  text-white w-[100%] flex-shrink-0 mb-3" 
                    variant="bordered"
                    value={role}
                    onChange={(e)=>{setRole(e.target.value)}}
                  >
                      <SelectItem className="w-full" key="Admin" value="Admin">
                        Admin
                      </SelectItem>
                      <SelectItem key="User" value="User">
                        User
                      </SelectItem>
                  </Select>

                  </div>


                
              </ModalBody>
              <ModalFooter className="flex justify-between items-center">
                {/*onClick={() =>{ isSign(false)}} bech ki tenzel 3leha thezek lel log  */}
              <Link className="text-sm text-white" onClick={() =>{ isSign(false)}} href={""} >
                    Already have account ? Log In
                </Link>
                <Button onClick={()=>{AddUserToBD();hundleSignUp();}} className="bg-[#d3570d] text-white font-semibold flex justify-center" > 
                  Sign Up
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      
        </div>
    )
}