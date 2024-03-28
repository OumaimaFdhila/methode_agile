"use client"
import { Accordion, AccordionItem } from '@nextui-org/react'
import Image from 'next/image'
import Aos from 'aos'
import "aos/dist/aos.css"
import { useEffect } from 'react'

export default function KontaktPage(){

    useEffect(()=>{
        Aos.init()
      },[])

    return(

    <div className="flex flex-col w-full h-screen overflow-hidden  ">
            
        <div className="h-full w-full flex flex-col justify-center items-center overflow-hidden lg:flex-row lg:items-start  lg:p-5">

            <Image
            src="/bg.jpeg"
            alt="Picture of the author"
            width={500}
            height={500}
            className="hidden lg:block rounded-tr-[50px] lg:brightness-50 lg:shadow-lg lg:shadow-[#2e4059] lg:h-[90%] lg:w-[50%] mr-5" 
            data-aos="slide-right"
            data-aos-duration="1500"
            data-aos-anchor-placement="top-bottom"
            
            />


            <div className="bg-[url('/bg.jpeg')] w-full h-full lg:bg-none lg:w-[50%] p-2 flex flex-col justify-center  lg:justify-start lg:mt-5">

                <p className="text-[#2e4059] text-center text-xl sm:text-4xl  md:text-3xl font-bold lg:text-start " data-aos="fade-down"
                data-aos-duration="1500"
                data-aos-anchor-placement="top-bottom">Unsere Hauptfiliale</p>

                <p className="text-[#D3570D] text-center text-2xl sm:text-4xl sm:mb-5  md:text-5xl font-bold mb-2 lg:text-start " data-aos="fade-down"
                data-aos-duration="1500"
                data-aos-anchor-placement="top-bottom">Kontaktieren Sie uns</p>

                <p className="text-white text-pretty text-center text-[15px] sm:mb-lg lg:text-start   font-semibold lg:text-md lg:text-black mb-5" data-aos="fade-down"
                data-aos-duration="1500"
                data-aos-anchor-placement="top-bottom">Möchten Sie mehr darüber erfahren, wie MegaTel Ihr Unternehmen voranbringen kann? Kontaktieren Sie uns für eine maßgeschneiderte Beratung. Wir freuen uns darauf, mit Ihnen zusammenzuarbeiten und Ihre Kommunikationsziele zu erreichen.Entdecken Sie die Welt der erstklassigen Callcenter-Dienstleistungen mit MegaTel – Ihrem zuverlässigen Partner für exzellente Kommunikation!</p>

                <p className=" text-[#2e4059] text-center text-xl sm:text-4xl  md:text-3xl font-bold lg:text-start mb-5" data-aos="fade-down"
                data-aos-duration="1500"
                data-aos-anchor-placement="top-bottom">Hauptsitz in Sofia</p>

                <Accordion variant="light" isCompact itemClasses={{title:"text-[#D3570D]  font-bold text-lg"}} data-aos="fade-down"
                data-aos-duration="1500"
                data-aos-anchor-placement="top-bottom">
                    <AccordionItem key="1" aria-label="Address" title="Address:"  >
                        <p className='text-white lg:text-black'>1000 Sofia Straße, Knyaz Boris</p>
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Telefon" title="Telefon:" className='text-white lg:text-black'>
                        <p className='text-white lg:text-black'>+4915215894603</p>
                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Email" title="Email:" >
                        <p className='text-white lg:text-black'>marketing@mega-tel.de</p>
                        <p className='text-white lg:text-black'>info@mega-tel.de</p>
                    </AccordionItem>
                </Accordion>


            </div>

        </div>
    </div>
    )
}