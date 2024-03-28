import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
import { Link } from "@nextui-org/react";
import Image from 'next/image'
export default function footer(){
    
    return(
        <div className="relative bg-black w-full flex flex-col justify-evenly px-3 overflow-hidden mt-10">
        <div className=" flex flex-col sm:flex-row justify-evenly items-center ">
            <Image
            src="/light_logo.png"
            width={150}
            height={50}
            alt="Picture of the author"
            className="mr-1"
            />
            <p className="text-lg  font-bold text-[#d3570d] text-center mr-1 mb-10 sm:mb-0">Anruf tätigen: +49 15215894603</p>
            <div>
                <div className="flex flex-row justify-evenly items-baseline mb-10 sm:mb-0">
                    <Link href="#"><FaFacebook className="w-8 h-8  mt-[5px]" style={{color:"white"}} /></Link>
                    <Link href="#"><BsInstagram className="w-8 h-8 mx-5" style={{color:"white"}} /></Link>
                    <Link href="#"><FaLinkedinIn className="w-8 h-8" style={{color:"white"}} /></Link>
                </div>
            </div>
        </div>
        <div className="border-t-2  border-t-white flex flex-col sm:flex-row justify-start mb-3  ">
        <Link href="#"><p className="text-white mr-5 mt-2 ">Terms of use</p></Link>
        <Link href="#"><p className="text-white mr-5 mt-2">Privacy policy</p></Link>
        <Link href="#"><p className="text-white mr-5 mt-2">Accessibility</p></Link>
        <Link href="#"><p className="text-white mr-5 mt-2">Copyright ©2024MegaTel</p></Link>
        </div>
        </div>
    )
}