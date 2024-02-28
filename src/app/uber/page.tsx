import { AiFillEuroCircle } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { GoGitBranch } from "react-icons/go";
import { FaAward } from "react-icons/fa";
import Image from 'next/image'
export default function uber(){
    return(
        <div className="relative top-[-4rem] w-full overflow-x-hidden flex flex-col">
            <div className="relative shadow-2xl w-full h-[70vh] overflow-hidden flex items-center justify-center mb-20">
                <img src="/centre.jpg" alt="img" className="brightness-50 absolute w-full h-[150%] translate-y-[5%]" />
                <h2 className="z-10 text-7xl font-bold text-end text-white translate-y-[40%] translate-x-[30%] ">ÜBER UNS</h2>
            </div>
            <div className="flex flex-col justify-start items-start p-10 mb-20">
                <p className="text-[#D3570D] text-5xl font-bold mb-5">Wir sind ein weltweit führendes internationales Unternehmen</p>
                <p className="text-[#575250] text-lg">ÜBER 7 JAHRE ERFAHRUNG liefern wir Qualität und Zuverlässigkeit! Mega Tel hat sich seit dem Jahr 2015 auf die Bearbeitung eingehender Anrufe (Inbound) spezialisiert. Wir sind gemeinsam mit unseren Auftraggebern erfolgreich, weil wir sowohl in zeitlich begrenzten wie auch in langfristigen Projekten die bestmögliche Integration unserer Tätigkeit in bestehende Arbeitsabläufe durchführen. Unsere Mitarbeiter telefonieren täglich für viele Firmen und in vielen Aufgabenbereichen. Unsere Arbeitserfahrung umfasst Aufgabenbereiche wie Telefonsekretariat, Telefonzentrale, Bestellannahme, Kundendienst, Informationsdienst, Auskunft, und Customer Care, sowie jegliche Backofficeaufgaben.
                Als professionelles Service Center liefern wir maßgeschneiderte Outsourcing-lösungen für Unternehmen National&International.
                Wir unterstützen Sie im Inbound, Marktforschung, Vertrieb, Verkauf, Leadgenerierung, Werbung, egal ob Marktforschung, Verkauf, Bestellannahme, First Level Support oder Reklamationsmanagement.</p>
            </div>
            
            
            <div className=" flex flex-col  lg:flex-row lg:justify-evenly bg-[#eeee]/30  mb-20 pb-20 ">   
                <div className=" flex flex-col justify-center items-center ">
                    <div className="w-[150px] shadow-xl mx-5 aspect-square bg-white rounded-full flex justify-center items-center">
                    <AiFillEuroCircle className="w-[50px] h-[50px]" style={{color:"#2d4059"}}/>
                    </div>
                    <p className="font-bold text-[#222831] text-center  text-2xl mt-5 mb-2">1.5 euros</p>
                    <p className="text-[#575250] text-lg">Revenue in 2015-2022 (Million)</p>
                </div>

                <div className="lg:mt-40 flex flex-col justify-center items-center ">
                    <div className="w-[150px] shadow-xl mx-5 aspect-square bg-white rounded-full flex justify-center items-center">
                    <FaPeopleGroup className="w-[50px] h-[50px]" style={{color:"#2d4059"}} />
                    </div>
                    <p className="font-bold text-[#222831] text-center  text-2xl mt-5 mb-1">150+</p>
                    <p className="text-[#575250] text-lg">Kollegen & Zählen</p>
                </div>

                <div className="flex flex-col justify-center items-center ">
                    <div className="w-[150px] shadow-xl mx-5 aspect-square bg-white rounded-full flex justify-center items-center">
                    <GoGitBranch className="w-[50px] h-[50px]" style={{color:"#2d4059"}} />
                    </div>
                    <p className="font-bold text-[#222831] text-center  text-2xl mt-5 mb-2">19+</p>
                    <p className="text-[#575250] text-lg">Projekt erfolgreich</p>
                </div>
                <div className="lg:mt-40 flex flex-col justify-center items-center mb-10">
                    <div className="w-[150px] shadow-xl mx-5 aspect-square bg-white rounded-full flex justify-center items-center ">
                    <FaAward className="w-[50px] h-[50px]" style={{color:"#2d4059"}} />
                    </div>
                    <p className="font-bold text-[#222831] text-center  text-2xl mt-5 mb-2">7+</p>
                    <p className="text-[#575250] text-lg">Sieben Jahre Erfahrung</p>
                </div>
            </div>
            
            
            <div className="flex flex-col justify-center items-center overflow-hidden mb-20">
                <p className="text-5xl text-[#2d4059] font-bold mb-10">Partnerschaft</p>
                <div className="flex justify-evenly">
                    <Image
                        src="logo-1.svg"
                        width={200}
                        height={50}
                        alt="Picture of the author"
                    />
                    <Image
                        src="logo-2.svg"
                        width={200}
                        height={50}
                        alt="Picture of the author"
                        className="ml-12"
                    />
                    <Image
                        src="logo-3.svg"
                        width={200}
                        height={50}
                        alt="Picture of the author"
                        className="ml-12"
                    />
                    <Image
                        src="logo-4.svg"
                        width={200}
                        height={50}
                        alt="Picture of the author"
                        className="ml-12"
                    />
                </div>

            </div>

        </div>
    )
}