import {Button} from "@nextui-org/react";
import { FaRecycle } from "react-icons/fa";
import React from "react";
import { BsLightbulb } from "react-icons/bs";
import { BsPersonCheck } from "react-icons/bs";
import { BsMotherboard } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";
import { FaComputer } from "react-icons/fa6";
import { LuPencilRuler } from "react-icons/lu";
import {Image} from "@nextui-org/react";
export default function Home() {
  return (
      <div className="">
      
        <div className="relative top-[-100px] shadow-b-2xl ">
          <img src="centre.jpg" alt="img" className="h-[110svh] w-full brightness-50" />
            <div className="absolute top-[50%] translate-y-[-40%]  lg:left-[600px] lg:w-[900px]">
              <p className="text-[#D3570D] font-bold text-lg mb-4 ml-8 lg:ml-8">In der Welt der digitalen Kundenservice-Lösungen</p>
              <div className="pl-8">
                <p className="text-white font-bold text-5xl  lg:mb-5 lg:ml-0">IHR GLOBALER STRATEGISCHER PARTNER</p>
                <p className="text-white  w-[90%] mb-4 lg:ml-0 text-lg">Willkommen bei MegaTel – Ihrem erstklassigen Partner für professionelle Callcenter-Dienstleistungen ! Wir präsentieren Ihnen heute unsere erstklassigen Callcenter-Dienstleistungen, die speziell auf die Bedürfnisse von Großunternehmen zugeschnitten sind.</p>
                <Button  className="text-white bg-[#D3570D]" variant="shadow">
                  See More
                </Button>
              </div>
            </div>
        </div>
      
      
        <div className=" relative flex flex-row justify-evenly   ">
          
          <div className="h-[100%] w-[40%] pt-16  ">
            <p className="text-[#2D4059] font-bold text-lg mb-4 ml-8 lg:ml-8">Erfahrung und Stabilität</p>
            <div className="pl-8">
              <p className="text-black font-bold text-5xl  lg:mb-6 lg:ml-0">7 Jahre ungeschlagener Erfolg</p>
              <p className="text-[#222831]  w-[90%] mb-4 lg:ml-0 text-lg">MegaTel ist ein führendes Callcenter-Unternehmen, das sich auf herausragende Kommunikationslösungen spezialisiert hat. Mit langjähriger Erfahrung bieten wir Ihnen qualitativ hochwertige Dienstleistungen, die auf Ihre individuellen Bedürfnisse zugeschnitten sind.</p>
            </div>
          <div/>
          </div>
          
          <div className=" flex  justify-center w-[30%] top-[-150px]">
            <div className="  flex flex-col mr-5 ">
            <div className=" bg-[#2D4059] rounded-3xl shadow-xl w-[200px] h-[200px] mb-5 flex flex-col justify-center items-center">
              <p className="text-white text-5xl mb-3">19+</p>
              <p className="text-white text-lg text-center">Projekt erfolgreich abgeschlossen.</p>
            </div>
            <div className="rounded-3xl shadow-2xl border-1 w-[200px] h-[200px] flex flex-col justify-center items-center">
            <p className="text-[#222831] text-5xl mb-3">7+</p>
            <p className="text-[#222831] text-lg text-center">Jahrelange Erfahrung mit stolz.</p>
            </div>
            </div>
            
            <div className=" flex flex-col  mt-20">
            <div className="rounded-3xl shadow-2xl  w-[200px] h-[200px] mb-5 flex flex-col justify-center items-center border-1">
            <p className="text-[#222831] text-5xl mb-3">10+</p>
            <p className="text-[#222831] text-lg text-center">Partnerschaft weltweit.</p>
            </div>
            <div className="bg-[#2D4059] rounded-3xl shadow-xl  w-[200px] h-[200px] flex flex-col justify-center items-center">
            <p className="text-white text-5xl mb-3">150+</p>
            <p className="text-white text-lg text-center">Mitarbeiter weltweit.</p>
            </div>
            </div>
          </div>
        </div>

        <div className=" relative top-28   ">
          
          <p className="text-[#d3570d] font-semibold text-center text-2xl mb-5  ">Stabilität und Qualität</p>
          <p className="font-semibold text-center text-5xl mb-10">Qualitätsservice</p>

        <div className="flex flex-col lg:flex-row justify-center items-center">
          <div className="h-[400px] w-[80%] lg:w-[300px] lg:h-[320px] p-3 lg:p-0 shadow-2xl rounded-3xl mb-10 text-center flex flex-col pt-16 items-center lg:pt-16">
            <BsLightbulb size={50} color="#d3570d" className="mb-2"/>
            <p className="text-2xl text-[#d3570d] mb-2 font-semibold">Flexibilität</p>
            <p className=" mb-4">Flexible Dienstleistungen nach Bedarf Skalierbare Lösungen für Unternehmenswachstum</p>
          </div>
          <div className="h-[400px] w-[80%] lg:w-[300px] lg:h-[320px] p-3 shadow-2xl rounded-3xl mb-10 mx-10 bg-[#d3570d] text-center flex flex-col pt-16 lg:pt-16 items-center " >
          <BsPersonCheck size={50} color="#ffffff" className="mb-2"/>
          <p className="text-2xl text-white mb-2 font-semibold">Expertise</p>
            <p className=" mb-4 text-white">Spezialisierte Teams mit fundiertem Fachwissen Kontinuierliche Schulungen für Mitarbeiter</p>
          </div>
          <div className="h-[400px] w-[80%] lg:w-[300px] lg:h-[320px] p-3 lg:p-0 shadow-2xl rounded-3xl mb-10 text-center flex flex-col pt-16 items-center lg:px-1 lg:pt-16">
          <BsMotherboard size={50} color="#d3570d" className="mb-2"/>
          <p className="text-2xl text-[#d3570d] mb-2 font-semibold">Technologie</p>
            <p className=" mb-4">Modernste Kommunikationstechnologien Sicherheitsprotokolle für den Datenschutz</p>
          </div>
        </div>
        </div>
      
      <div  className="relative top-60 left-40 w-[80%] bg-[#EEEEEE] rounded-3xl  flex flex-col items-center  py-5">

      <div className="w-20 h-2 rounded-xl bg-[#d3570d] shadow-2xl mb-3"></div>

        <p className="text-center text-lg text-[#222831]">Nachhaltigkeit</p>
        <p className="font-bold text-[#2d4059] w-[70%] text-inherit text-center  text-4xl mt-1  "> Engagiert dafür mit jüngeren Meinungen die Welt zu verändern für die nächste Generation!</p>
      
      <div className=" flex flex-col  lg:flex-row lg:justify-between   ">
          
        <div className="flex flex-col justify-center items-center mb-10">
          <div className="w-[150px] shadow-xl mx-8 aspect-square bg-white rounded-full flex justify-center items-center">
          <FaRecycle className="w-[50px] h-[50px]" style={{color:"#d3570d"}}/>
          </div>
          <p className="font-bold text-[#222831] text-center  text-2xl mt-5 mb-2">Nachhaltigkeit</p>
        </div>

        <div className="lg:mt-40 flex flex-col justify-center items-center mb-10">
          <div className="w-[150px] shadow-xl mx-8 aspect-square bg-white rounded-full flex justify-center items-center">
          <FaRegClock className="w-[50px] h-[50px]" style={{color:"#d3570d"}} />
          </div>
          <p className="font-bold text-[#222831] text-center  text-2xl mt-5 mb-1">Pünktlichkeit</p>
        </div>

        <div className="flex flex-col justify-center items-center mb-10">
          <div className="w-[150px] shadow-xl mx-8 aspect-square bg-white rounded-full flex justify-center items-center">
          <FaComputer className="w-[50px] h-[50px]" style={{color:"#d3570d"}} />
          </div>
           <p className="font-bold text-[#222831] text-center  text-2xl mt-5 mb-2">Moderne Technologie</p>
        </div>

        <div className="lg:mt-40 flex flex-col justify-center items-center mb-10">
          <div className="w-[150px] shadow-xl mx-8 aspect-square bg-white rounded-full flex justify-center items-center ">
          <LuPencilRuler className="w-[50px] h-[50px]" style={{color:"#d3570d"}} />
          </div>
          <p className="font-bold text-[#222831] text-center  text-2xl mt-5 mb-2">Qualität</p>
        </div>
      </div>
      </div>
      
    </div>
    
  );
}

