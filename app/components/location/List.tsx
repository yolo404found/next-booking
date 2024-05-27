'use client'
import { deleteLocation, getLocationList } from "@/src/controller/location";
import { Location } from "@/src/models/Location";
import React, { useEffect, useState } from "react";

const List = ({onEdit}:{onEdit:(id:string)=>void}) => {

    const [list,setList] = useState<Location[]>([])

    const getItemList = async () => {
        const res = await getLocationList()
        setList(res.data)
    }

    const handleOnDelete = async (id:string) => {
      const res = await deleteLocation(id)
      if(res.success){
          getItemList()
      }
    }

    useEffect(()=>{
        getItemList()
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
                    Country
                </th>
                <th scope="col" className="px-6 py-3">
                    State
                </th>
                <th scope="col" className="px-6 py-3">
                    City
                </th>
                <th scope="col" className="px-6 py-3">
                    Address
                </th>
                <th scope="col" className="px-6 py-3">
                    ZipCode
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
              list.length > 0 &&  list.map((item,index)=>{
                    return  <tr key={'user'+index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.locationName}
                    </th>
                    <td className="px-6 py-4">
                    {item.country}
                    </td>
                    <td className="px-6 py-4">
                    {item.state}
                    </td>
                    <td className="px-6 py-4">
                    {item.city}
                    </td>
                    <td className="px-6 py-4">
                    {item.address}
                    </td>
                    <td className="px-6 py-4">
                    {item.zipCode}
                    </td>
                    <td className="px-6 py-4">
                        <a href="#" onClick={()=>onEdit(item._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</a>
                        <a href="#" onClick={()=>handleOnDelete(item._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Detete</a>
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
