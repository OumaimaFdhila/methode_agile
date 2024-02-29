"use client"
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, Button} from "@nextui-org/react";
import { IoSearchSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut} from "next-auth/react";
import Image from 'next/image'

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {data:session} = useSession()
  const pathName = usePathname()


  const menuItems = [
    "Home",
    "Über uns",
    "Kontakt",
    "Datenschutzerklärung"
  ];

  return (
    <Navbar  onMenuOpenChange={setIsMenuOpen}
    maxWidth="xl"
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
        "data-[active=true]:after:bg-black",
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
          className=""
        />
      </NavbarBrand>
    </NavbarContent>
        
        <NavbarContent className="hidden sm:flex gap-3">
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
          <NavbarItem isActive={pathName.startsWith("/Datenschutzerklarung")}>
            <Link color="foreground" href="/Datenschutzerklarung">
            Datenschutzerklärung 
            </Link>
          </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<IoSearchSharp size={18} />}
          type="search"
        />
        {session && session.user ?
          <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform "
              color="default"
              name={session.user.name as string}
              size="sm"
              src={session.user.image as string}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold text-[#D3570D]">Signed in as</p>
              <p className="font-semibold">{session.user.email}</p>
            </DropdownItem>
            <DropdownItem key="Profile"><MdAccountCircle className="inline-block"/> Profile</DropdownItem>
            <DropdownItem key="Dashboard"><MdOutlineSpaceDashboard className="inline-block"/> Dashboard</DropdownItem>
            <DropdownItem key="Settings"><MdOutlineAdminPanelSettings className="inline-block"/> Settings</DropdownItem>
            <DropdownItem key="Help & Feedback"><IoIosHelpCircleOutline className="inline-block"/> Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={()=>signOut()}>
              <TbLogout className="inline-block"/> Log Out
            </DropdownItem>
          </DropdownMenu>
          </Dropdown>:
          <Button className="bg-[#D3570D] text-white rounded-lg" onClick={()=>signIn("google")}>SIGN IN</Button>
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
              Über uns
            </Link>
          </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
