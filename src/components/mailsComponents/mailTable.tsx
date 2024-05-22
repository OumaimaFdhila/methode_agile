"use client"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Pagination, SortDescriptor, Dropdown, DropdownTrigger, DropdownMenu, Selection, DropdownItem, User, useDisclosure, Spinner, Chip} from "@nextui-org/react";
import type { mail } from "@/types/dbModelsTypes"
import { useState, useMemo, useCallback, useEffect } from "react";

import axios from "axios";

import { IoSearchOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import MailDisplayModal from "./mailDisplayModal";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function getDate(timestamp:any){
  try{
    if(!timestamp){
      return "now"
    }
    const dateObj = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    const dayMonthYear = dateObj.toLocaleDateString('fr-TN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const hoursMinutes = dateObj.toLocaleTimeString('fr-TN', {
        hour: '2-digit',
        minute: '2-digit',
    });  
    return dayMonthYear + " " + hoursMinutes
  }catch{
    console.log(timestamp)
  }
}

export default function MailTable(){
    const [mails, setMails] = useState<mail[] | null>(null)
    const pathName = usePathname()
    const {data:session} = useSession()

    useEffect(()=>{
      let url = "/api/mails"
      if(pathName.includes("/dashboard")){
        url = "../api/mails"
      }
      axios.get(url)
      .then((res)=>{
        if(res.data.length){
          setMails(res.data)
        }
        else{
          setMails([])
        }
      }).catch(()=>{
        setMails([])
      })
    },[pathName])

    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({column: '$.3',direction:"descending"});

    const [viewedFilter, setViewedFilter] = useState<Selection>("all");
    const [roleFilter, setRoleFilter] = useState<Selection>("all");
    const [SRFilter, setSRFilter] = useState<Selection>("all");

    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [filterValue, setFilterValue] = useState("");
    const [page, setPage] = useState(1);
    
    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        if(!mails || !mails.length) return mails
        let filteredMails = [...mails];
    
        if (hasSearchFilter) {
          filteredMails = filteredMails.filter((mail) =>
            mail.sender.email.toLowerCase().includes(filterValue.toLowerCase()),
          );
        }
        if (viewedFilter !== "all") {
            filteredMails = filteredMails.filter((mail) =>
            Array.from(viewedFilter).includes((mail.viewed ? "seen" : "unseen")),
          );
        }

        if (roleFilter !== "all") {
          filteredMails = filteredMails.filter((mail) =>
            Array.from(roleFilter).includes((mail.sender.role.toLowerCase())),
          );
        }

        if (SRFilter !== "all") {
          filteredMails = filteredMails.filter((mail) =>
            Array.from(SRFilter).includes((mail.sendTo === session?.user.email ? "resived" : "sent")),
          );
        }
        return filteredMails;
    }, [SRFilter, filterValue, hasSearchFilter, mails, roleFilter, session, viewedFilter]);

    const pages = filteredItems ? Math.ceil(filteredItems.length / rowsPerPage) : 0;

    const sortedItems = useMemo(() => {
        if(!sortDescriptor.direction || !filteredItems?.length) return filteredItems
        return [...filteredItems].sort((a, b) => {
            const first = a.date.seconds * 1000 + a.date.nanoseconds / 1000000
            const second = b.date.seconds * 1000 + b.date.nanoseconds / 1000000
            const cmp = first < second ? -1 : first > second ? 1 : 0;
        
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
      }, [sortDescriptor, filteredItems]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return sortedItems?.slice(start, end);
    }, [page, sortedItems, rowsPerPage]);

    const onSearchChange = useCallback((value:string) => {
        if (value) {
          setFilterValue(value);
          setPage(1);
        } else {
          setFilterValue("");
        }
    }, []);

    const onClear = useCallback(()=>{
        setFilterValue("")
        setPage(1)
    },[])

    const onRowsPerPageChange = useCallback((e:React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const topContent = useMemo(() => {
        return (
        
          <div className=" flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
              <Input
                isClearable
                size="sm"
                className="w-full sm:max-w-[44%]"
                placeholder="Search by name..."
                startContent={<IoSearchOutline />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
              <div className="flex gap-3">
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button endContent={<FaAngleDown className="text-small" />} variant="flat">
                      status
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Sections"
                    closeOnSelect={false}
                    selectedKeys={viewedFilter}
                    selectionMode="multiple"
                    onSelectionChange={setViewedFilter}
                  >
                    <DropdownItem key={"seen"} className="capitalize">
                        seen
                    </DropdownItem>
                    <DropdownItem key={"unseen"} className="capitalize">
                        unseen
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button endContent={<FaAngleDown className="text-small" />} variant="flat">
                        roles
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Matieres"
                    closeOnSelect={false}
                    selectedKeys={roleFilter}
                    selectionMode="multiple"
                    onSelectionChange={setRoleFilter}
                  >
                    <DropdownItem key={"admin"} className="capitalize">
                        admin
                    </DropdownItem>
                    <DropdownItem key={"user"} className="capitalize">
                        user
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button endContent={<FaAngleDown className="text-small" />} variant="flat">
                      sent/resived
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Sections"
                    closeOnSelect={false}
                    selectedKeys={SRFilter}
                    selectionMode="multiple"
                    onSelectionChange={setSRFilter}
                  >
                    <DropdownItem key={"sent"} className="capitalize">
                        sent
                    </DropdownItem>
                    <DropdownItem key={"resived"} className="capitalize">
                        resived
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small">Total {filteredItems ? filteredItems.length : 0} mails</span>
              <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  value={rowsPerPage}
                  onChange={onRowsPerPageChange}
                >
                  <option value="7">7</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </label>
            </div>
          </div>
        );
    }, [filterValue, onSearchChange, viewedFilter, roleFilter, SRFilter, filteredItems, rowsPerPage, onRowsPerPageChange, onClear]);
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [displayedMail, setDisplayedMail] = useState<mail | null>(null)

    return(
        <>
        <MailDisplayModal mail={displayedMail!} onOpenChange={onOpenChange} isOpen={isOpen}/>
        <Table 
            aria-label="Example empty table" 
            className="w-full h-full  flex flex-wrap "
            color="default"
            selectionMode="single"
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            topContent={topContent}
            bottomContent={
                pages > 1 ?
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>:null
              }
        >
            <TableHeader>
                <TableColumn>sender email</TableColumn>
                <TableColumn>role</TableColumn>
                <TableColumn>status</TableColumn>
                <TableColumn>S/R</TableColumn>
                <TableColumn allowsSorting>date</TableColumn>
            </TableHeader>
            <TableBody emptyContent={mails !== null ? "No mails to display." :  <Spinner />}>
                {!items ? []:
                    items.map((mail)=>(
                        <TableRow key={mail.id} onClick={()=>{
                          if(mails){
                            setMails(mails.map((m)=>{
                              if(m.id === mail.id){
                                return {...m, viewed:true}
                              }
                              return m
                            }))
                          }
                          setDisplayedMail(mail)
                          onOpen()
                        }}>
                            <TableCell>
                              <User   
                                  name={mail.sender.email}
                                  description={`subject ${mail.subject}`}
                                  avatarProps={{
                                    src: mail.sender.image ? mail.sender.image : undefined
                                  }}
                                />
                            </TableCell>
                            <TableCell>{mail.sender.role}</TableCell>
                            <TableCell>{mail.viewed ? 
                              <Chip color="success" variant="light">
                                <span className="font-semibold">seen</span>
                              </Chip> : 
                              <Chip color="warning" variant="light">
                                <span className="font-semibold">unseen</span>
                              </Chip>}
                            </TableCell>
                            <TableCell>{(mail.sendTo === session?.user.email ? "resived" : "sent")}</TableCell>
                            <TableCell>{getDate(mail.date)}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        </>
    )
}
