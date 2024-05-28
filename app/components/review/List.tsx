'use client'
import { deleteReview, getReviewList } from "@/src/controller/review";
import { Review } from "@/src/models/Review";
import React, { useEffect, useState } from "react";

const List = ({onEdit}:{onEdit:(id:string)=>void}) => {

    const [list,setList] = useState<Review[]>([])

    const getItemList = async () => {
        const res = await getReviewList()
        setList(res.data)
    }

    const handleOnDelete = async (id:string) => {
      const res = await deleteReview(id)
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
                    Reviewer
                </th>
                <th scope="col" className="px-6 py-3">
                    Service
                </th>
                <th scope="col" className="px-6 py-3">
                    Rating
                </th>
                <th scope="col" className="px-6 py-3">
                    Comment
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
              list.length > 0 &&  list.map((review,index)=>{
                    return  <tr key={'user'+index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {typeof review.user != "string" ? review.user?.firstName + review.user.lastName : ''}
                    </th>
                    <td className="px-6 py-4">
                    {typeof review.service != "string" ? review.service?.serviceName : ''}
                    </td>
                    <td className="px-6 py-4">
                    {review.rating}
                    </td>
                    <td className="px-6 py-4">
                    {review.comment}
                    </td>
                    <td className="px-6 py-4">
                    {String(review.reviewDate)}
                    </td>
                    <td className="px-6 py-4">
                        <a href="#" onClick={()=>onEdit(review._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</a>
                        <a href="#" onClick={()=>handleOnDelete(review._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Detete</a>
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
