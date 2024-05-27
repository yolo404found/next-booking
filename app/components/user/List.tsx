'use client'
import { deleteUser, getUserList } from "@/src/controller/user";
import { User } from "@/src/models/User";
import React, { useEffect, useState } from "react";

const List = ({onEdit}:{onEdit:(id:string)=>void}) => {

    const [list,setList] = useState<User[]>([])

    const getList = async () => {
        const res = await getUserList()
        setList(res.data)
    }

    const handleOnDelete = async (id:string) => {
      const res = await deleteUser(id)
      if(res.success){
          getList()
      }
    }

    useEffect(()=>{
        getList()
    },[list.length])
  return (
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Username
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                    User Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
              list.length > 0 &&  list.map((user,index)=>{
                    return  <tr key={'user'+index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.firstName + " " + user.lastName}
                    </th>
                    <td className="px-6 py-4">
                    {user.email}
                    </td>
                    <td className="px-6 py-4">
                    {user.phone}
                    </td>
                    <td className="px-6 py-4">
                    {user.userType}
                    </td>
                    <td className="px-6 py-4">
                        <a href="#" onClick={()=>onEdit(user._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</a>
                        <a href="#" onClick={()=>handleOnDelete(user._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Detete</a>
                    </td>
                </tr>
                })
            }
        </tbody>
    </table>
</div>

  );
};

export default List;
