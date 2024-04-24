'use client'
import React, { useState } from "react";
import {Modal, Button, useDisclosure} from "@nextui-org/react";
import SignUp from './sign-up'
import LogIn from './log-in'

export default function Sign_up_button() {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [Sign,SetSign]=useState(false)
  const [CloseModal,setCloseMoodal]=useState(false)

// 5demt el function hedhi bech ki yenzel 3ala "Already have account ? Log In" yna7i el sign wel3aks wou 3adetha prop lil Sign-up
  const showSignUp=(sign:boolean)=>{
    SetSign(sign)
    console.log(Sign)
  }

  

  return (
    <>
    {/* onpress feha setSign false bech ydhaharlek el log wou setClose.. false bech y5alleha tat7al */}
      <Button onPress={()=>{SetSign(true),onOpen()}} color="primary" className=" bg-[#d4560d] text-white font-semibold">SIGN UP</Button>
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
        {Sign ? <SignUp isSign={showSignUp} /> :<LogIn isSign={showSignUp} />}
      </Modal>
    </>
  );
}