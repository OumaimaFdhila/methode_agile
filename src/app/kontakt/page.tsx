"use client"
import GoogleMapComponent from "@/components/map"

export default function KontaktPage(){

    return(
        <div className="relative top-[-4rem] w-full overflow-x-hidden flex flex-col">
            <div className="relative shadow-2xl w-full h-[70vh] overflow-hidden flex items-center justify-center">
                <img src="/centre.jpg" alt="img" className="brightness-50 absolute w-full h-[150%] translate-y-[-15%]" />
                <h2 className="z-10 text-9xl font-bold text-center text-white translate-y-[40%]">KONTAKTIEREN SIE UNS</h2>
            </div>
            <div className="z-10 relative w-full overflow-hidden flex items-center justify-evenly mt-24 flex-wrap">
                <div className="flex flex-col w-[500px]">
                    <h2 className="text-3xl font-bold text-[#D3570D] mb-1">Unsere Hauptfiliale</h2>
                    <h3 className="text-5xl font-bold text-black mb-4">Kontaktieren Sie uns</h3>
                </div>
                <p className="w-[40%] font-semibold text-md md:min-w-[500px]">{"Möchten Sie mehr darüber erfahren, wie MegaTel Ihr Unternehmen voranbringen kann? Kontaktieren Sie uns für eine maßgeschneiderte Beratung. Wir freuen uns darauf, mit Ihnen zusammenzuarbeiten und Ihre Kommunikationsziele zu erreichen.Entdecken Sie die Welt der erstklassigen Callcenter-Dienstleistungen mit MegaTel – Ihrem zuverlässigen Partner für exzellente Kommunikation!"}</p>
            </div>
            <div className=" relative w-full flex items-center justify-evenly mt-24">
                <div className="w-[500px]">
                    <h3 className="text-4xl font-bold mb-4">Hauptsitz in Sofia</h3>
                    <div className="text-2xl font font-semibold">Address:</div>
                    <div className="mb-4 text-lg">1000 Sofia Straße, Knyaz Boris</div>
                    <div className="text-2xl font font-semibold">Telefon:</div>
                    <div className="mb-4 text-lg">+4915215894603</div>
                    <div className="text-2xl font font-semibold">Email:</div>
                    <div className="text-lg">marketing@mega-tel.de</div>
                    <div className="mb-2 text-lg">info@mega-tel.de</div>
                </div>
                <GoogleMapComponent/>
            </div>
        </div>
    )
}