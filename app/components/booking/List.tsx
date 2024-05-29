'use client'
import { deleteBooking, getBookingList } from "@/src/controller/booking";
import { Booking } from "@/src/models/Booking";
import { formatDate } from "@/src/utils/general";
import React, { useEffect, useState } from "react";

const List = ({onEdit}:{onEdit:(id:string)=>void}) => {

    const [list,setList] = useState<Booking[]>([])

    const getItemList = async () => {
        const res = await getBookingList()
        setList(res.data)
    }

    const handleOnDelete = async (id:string) => {
      const res = await deleteBooking(id)
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
                    Booked User
                </th>
                <th scope="col" className="px-6 py-3">
                    Service
                </th>
                <th scope="col" className="px-6 py-3">
                    Booking Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Start Time
                </th>
                <th scope="col" className="px-6 py-3">
                    End Time
                </th>
                <th scope="col" className="px-6 py-3">
                   Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
              list.length > 0 &&  list.map((booking,index)=>{
                    return  <tr key={'user'+index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {typeof booking.user != "string" ? booking.user?.firstName + booking.user.lastName : ''}
                    </th>
                    <td className="px-6 py-4">
                    {typeof booking.service != "string" ? booking.service?.serviceName : ''}
                    </td>
                    <td className="px-6 py-4">
                    {formatDate(booking.bookingDate.toString())}
                    </td>
                    <td className="px-6 py-4">
                    {String(booking.startTime)}
                    </td>
                    <td className="px-6 py-4">
                    {String(booking.endTime)}
                    </td>
                    <td className="px-6 py-4">
                    {booking.status}
                    </td>
                    <td className="px-6 py-4">
                    {booking.totalPrice}
                    </td>
                    <td className="px-6 py-4">
                        <a href="#" onClick={()=>onEdit(booking._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</a>
                        <a href="#" onClick={()=>handleOnDelete(booking._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Detete</a>
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
