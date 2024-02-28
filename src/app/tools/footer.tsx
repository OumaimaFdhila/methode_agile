import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
export default function footer(){
    return(
        <div className="relative  mb-5 bottom-[-550px] mt-20 bg-black w-full h-[150px] flex flex-col justify-evenly px-3">
        <div className=" flex  justify-evenly items-center">
            <img src="light_logo.png" className="h-10" alt="logo" />
            <div>
                <div className="flex flex-row justify-evenly items-baseline ">
                    <FaFacebook className="w-8 h-8 mr-2 mt-[5px]" style={{color:"white"}} />
                    <BsInstagram className="w-8 h-8 mr-2" style={{color:"white"}} />
                    <FaLinkedinIn className="w-8 h-8" style={{color:"white"}} />
                </div>
            </div>
        </div>
        <div className="border-t-2  border-t-white flex justify-start  ">
            <p className="text-white mr-5 mt-2 ">Terms of use</p>
            <p className="text-white mr-5 mt-2">Privacy policy</p>
            <p className="text-white mr-5 mt-2">Accessibility</p>
            <p className="text-white mr-5 mt-2">Copyright ©2024MegaTel</p>
        </div>
        </div>
    )
}