'use client'
import TablePermission from "@/components/PermissionForm/TablePermission";
import { PermissionCreate, PermissionLists, UsersList } from "./actions";
import { TableReact } from "@/components/Pagination custom/TableReact";
import ActiveStatus from "@/components/Pagination custom/ActiveStatus";
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination custom/Pagination";

export interface Users {
  "_id": string,
  "name": string,
  "email": string,
  "username": string,
  "password": string,
  "role": string,
  "profilePicture": string,
  "status": string,
  "permissions": [
    {
      "collectionName": string,
      "create": boolean,
      "delete": boolean,
      "read": boolean,
      "_id": string,
    }
  ],
  "__v": unknown,
  "isActive": boolean,
}

function page(props: { searchParams: { page: number, per_page: number } }) {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [startRecordNo, setStartRecordNo] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [endRecordNo, setEndRecordNo] = useState(10);
  const [displayRecord, setDisplayRecord] = useState(10);
  const { searchParams: { page: userPage, per_page: pagelimit } } = props
  const callAPi = async () => {
    // const permissions = await PermissionLists();
    const userslist = await UsersList(userPage , pagelimit||10);
    setUsers(userslist.listUsers)
    setTotalRecord(userslist.totalUsers);
    setTotalPages(userslist.pagesAvailable)

    if (userPage > 0 && userPage) {
      setStartRecordNo((+userPage - 1) * displayRecord + 1)
      if ((+userPage - 1) * displayRecord + displayRecord > userslist.totalUsers) {
        setEndRecordNo(+(userslist.totalUsers))
      }
      else {
        setEndRecordNo(+((+userPage - 1) * displayRecord + displayRecord))
      }
    } else {
      setStartRecordNo(1)
      setEndRecordNo(10)
    }
    console.log(process.env.API_BASE_URL, 'api bas url');
  }

  useEffect(() => {
    if (pagelimit) {
          console.log(pagelimit, 'pagelimit ');
  setDisplayRecord(pagelimit)
  // callAPi()
    }
  }, [pagelimit])

  useEffect(() => {
    if (userPage) {
    setCurPage(userPage)
    }
  }, [userPage])

  useEffect(() => {
    callAPi()
  }, [])
  useEffect(() => {
    callAPi()
  }, [curPage,displayRecord])

  const tableColumns = [
    {
      accessorKey: "name",
      id: "nameuser",
      header: "User Full Name",
      meta: {
        filterVariant: "search",
      },
    },
    {
      accessorKey: "email",
      id: "userEmail",
      header: "User Email",
      meta: {
        filterVariant: "search",
        // },
        // meta: {
        //   filterVariant: "select",
        //   options: ["single", "relationship", "complicated"],
        //   isMulti: false,
      },
    },
    {
      accessorKey: "isActive",
      id: "progress",
      header: "User Applicatino Status",
      meta: {
        filterVariant: "search",
      },
      cell: (items: any) => <ActiveStatus {...items} updateData={updateData} />
    },
    {
      accessorKey: "name",
      id: "nameuser",
      header: "User Full Name",
      meta: {
        filterVariant: "search",
      },
    },
    {
      accessorKey: "_id",
      id: "action_id",
      header: "Actions",
      cell: (items: any) => <div>
        <button className="btn btn-ptimary" type="button" onClick={() => router.push(`users/${items.getValue()}`)}><BsPencilSquare size={28} /></button>
      </div>
    },
  ];

  const submitUser = async (data: any) => {
    try {

      console.log(data, 'usreCreate');

    } catch (error) {
      console.error(error, 'error');
    }
  }

  const updateData = (rowIndex: number, columnId: keyof Users, value: any) => {
    const listUsers = [...users];
    const forDetails = listUsers[rowIndex];
    console.log(listUsers, users, users[rowIndex], rowIndex, columnId, value, 'on these we will gonna update values.', forDetails);
    // setUsers((old) =>
    //     old.map((row, index) => {
    //         if (index === rowIndex) {
    //             return { ...old[rowIndex], [columnId]: value };
    //         }
    //         return row;
    //     })
    // );
  };

  return (
    <div>
      <h3>List of Users</h3>
      <div className="row mt-5">
        {tableColumns.length > 0 && <TableReact columns={tableColumns} data={users} filter={false} sorting={true} />}
        <Pagination meta={{ from: startRecordNo, to: endRecordNo, total: totalRecord, per_page: pagelimit||displayRecord, last_page: totalPages, current_page: userPage||curPage }} />
      </div>
    </div>
  )
}

export default page