'use client'
import { Button, Input,  ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, } from "@nextui-org/react"
import Link from "next/link"
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon"
import { EyeFilledIcon } from "./EyeFilledIcon"
import { FcGoogle } from "react-icons/fc";
import { useState } from "react"
import { HiOutlineMail } from "react-icons/hi";
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/lib/firebase'
import { useRouter } from "next/navigation"
import { GoogleAuthProvider } from "firebase/auth"
import { signInWithPopup } from "firebase/auth"

export default function App(props:{isSign:(sign:boolean)=>void }) {

    const{isSign}=props
    const Router=useRouter()
    const [email,setEmail] =useState('')
    const [password,setPassword]=useState('')
    const [isVisible, setIsVisible] = useState(false);
    const [SignIn]=useSignInWithEmailAndPassword(auth)
  
    const toggleVisibility = () => setIsVisible(!isVisible);
  
    const hundleLogIn= async ()=>{
      try{
          const res =await SignIn(email,password)
          console.log({res})
          sessionStorage.setItem('user','true')
          setEmail('')
          setPassword('')
          Router.push('/profile')
      }
      catch(e){
          console.error(e)
      }
  
    }

    const HandleGoogle = async () => {
      try {
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);
          sessionStorage.setItem('user','true')
          const user = result.user;
          console.log(user);
          Router.push('/profile');//hez lzl profile
      } catch (error) {
          console.error(error)
      }
  };



    return (
        <div >
            
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-[#d3570d]   flex flex-col gap-1">Log In</ModalHeader>
              <ModalBody className="flex flex-col items-center">
              <Button onClick={HandleGoogle} variant="bordered" color="default"  className="w-[80%] text-white flex justify-center items-center" startContent={<FcGoogle size={20} className="flex-shrink-0"/>} > 
                  Log In with Google
                </Button>
                <div className="w-[80%] flex justify-center items-center">
                  <div className="h-0 w-[40%] border-1 border-white"></div>
                  <p className="text-sm text-white mx-3">or</p>
                  <div className="h-0 w-[40%] border-1 border-white"></div>
                </div>
                <Input
                  autoFocus
                  className="text-white w-[80%]"
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
                className="text-2xl text-white flex-shrink-0 w-[80%]"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                />

                <div className="flex py-2 px-1 justify-end">
                
                  <Link className="text-[#d3570d] text-sm " href="#" >
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-between items-center">
                {/*  onClick={() =>{ isSign(true)}} bech ki tenzel 3leha thezek lel sign*/}
              <Link className="text-sm text-white" onClick={() =>{ isSign(true)}} href={""} >
                    No account ? Sign Up
                </Link>
                <Button onClick={()=>{hundleLogIn();}}  className="bg-[#d3570d] text-white font-semibold flex justify-center" > 
                  Log In
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      
        </div>
    )
}