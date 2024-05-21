"use client"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Pagination, SortDescriptor, Dropdown, DropdownTrigger, DropdownMenu, Selection, DropdownItem, User, useDisclosure, Spinner} from "@nextui-org/react";
import type { mail, userCred } from "@/types/dbModelsTypes"
import { useState, useMemo, useCallback, useEffect } from "react";

import axios from "axios";

import { IoMailSharp, IoSearchOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { usePathname } from "next/navigation";
import MailSendModal from "@/components/mailsComponents/mailSendModal";

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

export default function UserTable(){
    const [users, setUsers] = useState<userCred[] | null>(null)
    const pathName = usePathname()

    useEffect(()=>{
      let url = "/api/user"
      axios.get(url)
      .then((res)=>{
        if(res.data.length){
          setUsers(res.data)
        }
        else{
          setUsers([])
        }
      }).catch(()=>{
        setUsers([])
      })
    },[pathName])

    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({column: '$.3',direction:"descending"});

    //const [viewedFilter, setViewedFilter] = useState<Selection>("all");
    const [roleFilter, setRoleFilter] = useState<Selection>("all");

    const [rowsPerPage, setRowsPerPage] = useState(30);
    const [filterValue, setFilterValue] = useState("");
    const [page, setPage] = useState(1);
    
    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        if(!users || !users.length) return users
        let filteredUsers = [...users];
    
        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.email.toLowerCase().includes(filterValue.toLowerCase()),
          );
        }
        // if (viewedFilter !== "all") {
        //     filteredUsers = filteredUsers.filter((mail) =>
        //     Array.from(viewedFilter).includes((mail.viewed ? "seen" : "unseen")),
        //   );
        // }

        if (roleFilter !== "all") {
            filteredUsers = filteredUsers.filter((user) =>
            Array.from(roleFilter).includes((user.role!)),
          );
        }
        return filteredUsers;
    }, [filterValue, hasSearchFilter, roleFilter, users]);

    const pages = filteredItems ? Math.ceil(filteredItems.length / rowsPerPage) : 0;

    const sortedItems = useMemo(() => {
        if(!sortDescriptor.direction || !filteredItems?.length ) return filteredItems
        return [...filteredItems].sort((a, b) => {
            if(!a.createdAt || !b.createdAt) return 0
            const first = a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000
            const second = b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000
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
        
          <div className="flex flex-col gap-4">
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
                {/* <Dropdown>
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
                </Dropdown> */}
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
                    <DropdownItem key={"teacher"} className="capitalize">
                        teacher
                    </DropdownItem>
                    <DropdownItem key={"student"} className="capitalize">
                        student
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small">Total {filteredItems ? filteredItems.length : 0} users</span>
              <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  value={rowsPerPage}
                  onChange={onRowsPerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </label>
            </div>
          </div>
        );
    }, [filterValue, filteredItems, onClear, onRowsPerPageChange, onSearchChange, roleFilter, rowsPerPage]);
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [selectedUser, setSelectedUser] = useState<userCred | null>(null)

    return(
        <>
        {selectedUser ? <MailSendModal onOpenChange={onOpenChange} isOpen={isOpen} email={selectedUser.email} /> : null}
        <Table 
            aria-label="Example empty table" 
            className="w-full h-[90%]  flex flex-wrap "
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
                <TableColumn>user</TableColumn>
                <TableColumn>role</TableColumn>
                <TableColumn allowsSorting>createdAt</TableColumn>
                <TableColumn>actions</TableColumn>
            </TableHeader>
            <TableBody emptyContent={users !== null ? "No user to display." :  <Spinner />}>
                {!items ? []:
                    items.map((user)=>(
                        <TableRow key={user.id}>
                            <TableCell>
                              <User   
                                  name={user.firstName + " " + user.lastName}
                                  description={user.email}
                                  avatarProps={{
                                    src: user.image ? user.image : undefined
                                  }}
                                />
                            </TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{getDate(user.updatedAt)}</TableCell>
                            <TableCell>
                                <div className="translate-x-[-10%]">
                                <Button
                                    variant="light"
                                    color="warning"
                                    size="md"
                                    className="text-md font-bold"
                                    onPress={()=>{
                                        setSelectedUser(user)
                                        onOpen()
                                    }}>
                                    <IoMailSharp/>
                                    Send Mail
                                </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        </>
    )
}
