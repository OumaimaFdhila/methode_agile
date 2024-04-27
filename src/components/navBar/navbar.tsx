"use client"
import React, {  useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link,  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, Button, Autocomplete, AutocompleteItem} from "@nextui-org/react";
// import { IoSearchSharp } from "react-icons/io5";
// import { MdAccountCircle } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
// import { IoIosHelpCircleOutline } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { usePathname } from "next/navigation";
import Image from 'next/image'
import Auth_button from "../auth/log_button";
import Sign_up_button from "../auth/sign_up_button";
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react";
import FinalSetUp from "../auth/finalSetUp";
import { Session } from "next-auth";

export default function Nav({session}:{session : Session | null}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname()
  const Router=useRouter()

  console.log(session?.user.language)

  return (
    <Navbar  onMenuOpenChange={setIsMenuOpen}
    maxWidth="full"
    isBordered
    isBlurred={false}
    classNames={{
      item: [
        "flex",
        "relative",
        "py-1",
        "items-center",
        "data-[active=true]:after:content-['']",
        "data-[active=true]:after:absolute",
        "data-[active=true]:after:bottom-0",
        "data-[active=true]:after:left-0",
        "data-[active=true]:after:right-0",
        "data-[active=true]:after:h-[2px]",
        "data-[active=true]:after:rounded-[2px]",
        "data-[active=true]:after:bg-black"
      ],
    }}
    >
      <NavbarContent justify="start">
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <Image
          src="/dark_logo.png"
          width={150}
          height={90}
          alt="Picture of the author"
          className="hover:animate-pulse"
        />
      </NavbarBrand>
    </NavbarContent>
        
        <NavbarContent className="hidden sm:flex sm:ml-20">
        <NavbarItem isActive={pathName==="/"}>
            <Link href="/" aria-current="page" color="foreground" >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathName.startsWith("/uber")}>
            <Link color="foreground" href="/uber">
            Über uns
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathName.startsWith("/kontakt")}>
            <Link href="/kontakt" color="foreground">
            Kontakt
            </Link>
          </NavbarItem>
          {session?
          <NavbarItem isActive={pathName.startsWith("/profile")}>
            <Link color="foreground" href="/profile">
            Profile 
            </Link>
          </NavbarItem>:
          <NavbarItem isActive={pathName.startsWith("/Datenschutzerklarung")}>
          <Link color="foreground" href="/Datenschutzerklarung">
          Datenschutzerklärung
          </Link>
        </NavbarItem>
          }
          {session  && session?.user.role==="admin" ?
          <NavbarItem isActive={pathName.startsWith("/dashboard")}>
            <Link color="foreground" href="/dashboard">
            Dashboard 
            </Link>
          </NavbarItem>:<></>}
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
      <FinalSetUp/>
        {!session?
        <div>
        <Auth_button/>
        <Sign_up_button/>
        </div>:
        <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform "
            color="default"
            // name={user.name as string}
            size="sm"
            src={session.user.image as string}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold text-[#D3570D]">Signed in as</p>
            <p className="font-semibold">{session.user.email}</p>
          </DropdownItem>
          {/* <DropdownItem key="Profile"><MdAccountCircle className="inline-block"/> Profile</DropdownItem> */}
          <DropdownItem href="/Datenschutzerklarung" key="Datenschutzerklärung"><MdOutlineSpaceDashboard className="inline-block"/> Datenschutzerklärung</DropdownItem>
          <DropdownItem key="Settings"><MdOutlineAdminPanelSettings className="inline-block"/> Settings</DropdownItem>
          {/* <DropdownItem key="language">
          </DropdownItem> */}
          <DropdownItem key="logout" color="danger" onClick={()=>{signOut();}}>
            <TbLogout className="inline-block"/> Log Out
          </DropdownItem>
        </DropdownMenu>
        </Dropdown>
        }
      </NavbarContent>

      <NavbarMenu>
          <NavbarMenuItem isActive={pathName==="/"}>
            <Link
              color="foreground"
              className="w-full"
              href="/"
              size="lg"
            >
              Home
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem isActive={pathName.startsWith("/uber")}>
            <Link
              color="foreground"
              className="w-full"
              href="/uber"
              size="lg"
            >
              Über uns
            </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathName.startsWith("/kontakt")}>
            <Link color="foreground"
              className="w-full"
              href="/kontakt"
              size="lg">
            Kontakt
            </Link>
          </NavbarMenuItem>
            <NavbarMenuItem isActive={pathName.startsWith("/Datenschutzerklarung")}>
            <Link
              color="foreground"
              className="w-full"
              href="/Datenschutzerklarung"
              size="lg"
            >
              Datenschutzerklärung
            </Link>
          </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
