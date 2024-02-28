import { FaRecycle } from "react-icons/fa";
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import { BsLightbulb } from "react-icons/bs";
import { BsPersonCheck } from "react-icons/bs";
import { BsMotherboard } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";
import { FaComputer } from "react-icons/fa6";
import { LuPencilRuler } from "react-icons/lu";

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

      <div className="relative top-96 flex flex-col justify-center items-center ">
        <div className=" flex w-[80%] justify-center rounded-3xl  p-5 mb-14">
          <div className=" w-[50%]  ">
            <p className="text-[#d3570d] font-semibold text-start text-2xl mb-3  ">Nachhaltigkeit</p>
            <p className="font-semibold text-[#222831] text-start text-5xl ">Unsere Standorte</p>
          </div>

          <div className="w-[50%] ">
            <p className="text-[#1b2735]">Unsere hauptfilialen sind es in Tunesien und Bulgarien und wir sind stolz darauf, lokale Präsenz in strategisch wichtigen Regionen zu zeigen. Doch gehen wir über physische Grenzen hinaus. Unsere Vernetzung reicht weltweit, da wir digital mit jedem unserer Partner und Mitarbeiter verbunden sind.</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="bg-[#EEEEEE] w-[350px] h-[200px] rounded-3xl p-5 shadow-2xl ">
            <p className="text-[#d3570d] font-semibold text-start text-3xl mb-3  ">Tunesien</p>
            <p className="font-semibold text-[#222831] text-start text-xl ">2050 Tunis Straße, Ben Arous</p>
          </div>

          <div className="bg-[#EEEEEE] w-[350px] h-[200px] rounded-3xl p-5 ml-16 shadow-2xl">
            <p className="text-[#d3570d] font-semibold text-start text-3xl mb-3  ">Bulgarien</p>
            <p className="font-semibold text-[#222831] text-start text-xl ">1000 Sofia Straße, Knyaz Boris</p>
          </div>
          
          <div className="bg-[#EEEEEE] w-[350px] h-[200px] rounded-3xl p-5 ml-16 shadow-2xl">
            <p className="text-[#d3570d] font-semibold text-start text-3xl mb-3  ">Weltweit</p>
            <p className="font-semibold text-[#222831] text-start text-xl ">Homeoffice</p>
          </div>
        </div>
      </div>
      

      <div className="relative top-[500px] flex flex-col justify-center items-center  pt-10">
      <p className="text-center text-lg text-[#222831]">Mit uns haben Sie Ihren Zukunft gesichert</p>
      <p className="font-bold text-[#2D4059] w-[70%] text-inherit text-center  text-4xl mt-1 mb-10 ">Wir sind ein weltweit führendes internationales Unternehmen</p>
      
      
      <div className="flex justify-between ">
          <Card isFooterBlurred className="w-[300px] h-[300px] mr-10">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
          </CardHeader>
          <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full scale-100 -translate-y-7 object-cover"
            src="person.jpg"
          />
          <CardFooter className="absolute bg-[#2d4059]/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
              <p className="text-black text-lg">Mourad Gherab</p>
              <p className="text-black text-tiny">CEO</p>
            </div>
          </CardFooter>
        </Card>

        <Card isFooterBlurred className="h-[300px] w-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
          </CardHeader>
          <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full scale-100 -translate-y-7 object-cover"
            src="person.jpg"
          />
          <CardFooter className="absolute bg-[#2d4059]/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
              <p className="text-black text-lg">Admir Kolasinac</p>
              <p className="text-black text-tiny">COO,CEO</p>
            </div>
          </CardFooter>
        </Card>
      </div>
      </div>

    </div>
    
  );
}

