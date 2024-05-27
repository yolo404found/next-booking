'use client'
import { deleteProvider, getProviderList } from "@/src/controller/serviceProvider";
import { ServiceProvider } from "@/src/models/ServiceProvider";
import React, { useEffect, useState } from "react";

const List = ({onEdit}:{onEdit:(id:string)=>void}) => {

    const [list,setList] = useState<ServiceProvider[]>([])

    const getList = async () => {
        const res = await getProviderList()
        setList(res.data)
    }

    const handleOnDelete = async (id:string) => {
      const res = await deleteProvider(id)
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
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    User
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                    Address
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
              list.length > 0 &&  list.map((provider,index)=>{
                    return  <tr key={'user'+index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {provider.providerName}
                    </th>
                    <td className="px-6 py-4">
                    {provider.email}
                    </td>
                    <td className="px-6 py-4">
                    {typeof provider.user != "string" ? provider.user?.firstName + provider.user.lastName : ''}
                    </td>
                    <td className="px-6 py-4">
                    {provider.phone}
                    </td>
                    <td className="px-6 py-4">
                    {provider.address}
                    </td>
                    <td className="px-6 py-4">
                        <a href="#" onClick={()=>onEdit(provider._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</a>
                        <a href="#" onClick={()=>handleOnDelete(provider._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Detete</a>
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
