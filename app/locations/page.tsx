"use client";
import React, { useState } from "react";
import { FormModal, FormModalType } from "@/src/config/general";
import Form from "../components/location/Form";
import List from "../components/location/List";
import { getLocationById } from "@/src/controller/location";
import { Location } from "@/src/models/Location";

export default function () {
  const [formModal, setFormModal] = useState<FormModal>({
    type: FormModalType.isAdd,
    showForm: false,
  });
  const [editFormData,setEditFormData] = useState<Location>()

  const handleOnEdit = async (id:string) => {
    const res = await getLocationById(id)
    setEditFormData(res.data)
    setFormModal({ showForm: true, type: FormModalType.isEdit })
  }

const handleOnCick =() => {
    setEditFormData(undefined)
    if(formModal.showForm){
     setFormModal((prev)=>({...prev,showForm:false}))
    }else{
      setFormModal({ showForm: true, type: FormModalType.isAdd })
    }
  }

  const handleOnSubmit = () => {
    setFormModal({ showForm: false, type: FormModalType.isAdd })
    setEditFormData(undefined)
  }

  return (
    <div className="px-16 pt-6 bg-white dark:bg-gray-900 h-[100vh]">
      <div>
        <button
          onClick={handleOnCick}
          className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-full mb-4"
        >
          {formModal.showForm ? 'Back' : 'Add Location' }
        </button>
      </div>
      {formModal.showForm ? <Form onSubmit={handleOnSubmit} {...formModal} editFormData={editFormData}/> : <List onEdit={handleOnEdit} />}
    </div>
  );
}
