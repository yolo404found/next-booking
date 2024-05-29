'use client'
import { deletePayment, getPaymentList } from "@/src/controller/payment";
import { Payment } from "@/src/models/Payment";
import React, { useEffect, useState } from "react";

const List = ({onEdit}:{onEdit:(id:string)=>void}) => {

    const [list,setList] = useState<Payment[]>([])

    const getItemList = async () => {
        const res = await getPaymentList()
        setList(res.data)
    }

    const handleOnDelete = async (id:string) => {
      const res = await deletePayment(id)
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
                    Booking
                </th>
                <th scope="col" className="px-6 py-3">
                Payment Date
                </th>
                <th scope="col" className="px-6 py-3">
                Amount
                </th>
                <th scope="col" className="px-6 py-3">
                Payment Method
                </th>
                <th scope="col" className="px-6 py-3">
                Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
              list.length > 0 &&  list.map((payment,index)=>{
                    return  <tr key={'user'+index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {typeof payment.booking != "string" ? payment.booking?.bookingNo : ''}
                    </th>
                    <td className="px-6 py-4">
                    {String(payment.paymentDate)}
                    </td>
                    <td className="px-6 py-4">
                    {payment.amount}
                    </td>
                    <td className="px-6 py-4">
                    {payment.paymentMethod}
                    </td>
                    <td className="px-6 py-4">
                    {String(payment.status)}
                    </td>
                    <td className="px-6 py-4">
                        <a href="#" onClick={()=>onEdit(payment._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</a>
                        <a href="#" onClick={()=>handleOnDelete(payment._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Detete</a>
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
