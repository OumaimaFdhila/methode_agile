import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
import { Link } from "@nextui-org/react";
export default function footer(){
    return(
        <div className="relative bg-black w-full h-[150px] flex flex-col justify-evenly px-3">
        <div className=" flex  justify-evenly items-center">
            <img src="light_logo.png" className="h-10" alt="logo" />
            <p className="text-lg font-bold text-[#d3570d]">Anruf tätigen: +49 15215894603</p>
            <div>
                <div className="flex flex-row justify-evenly items-baseline ">
                    <Link href="#"><FaFacebook className="w-8 h-8  mt-[5px]" style={{color:"white"}} /></Link>
                    <Link href="#"><BsInstagram className="w-8 h-8 mx-5" style={{color:"white"}} /></Link>
                    <Link href="#"><FaLinkedinIn className="w-8 h-8" style={{color:"white"}} /></Link>
                </div>
            </div>
        </div>
        <div className="border-t-2  border-t-white flex justify-start  ">
        <Link href="#"><p className="text-white mr-5 mt-2 ">Terms of use</p></Link>
        <Link href="#"><p className="text-white mr-5 mt-2">Privacy policy</p></Link>
        <Link href="#"><p className="text-white mr-5 mt-2">Accessibility</p></Link>
        <Link href="#"><p className="text-white mr-5 mt-2">Copyright ©2024MegaTel</p></Link>
        </div>
        </div>
    )
}