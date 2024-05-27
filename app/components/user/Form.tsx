'use client'
import { FormModalType } from '@/src/config/general'
import { createUser, updateUser } from '@/src/controller/user'
import { User } from '@/src/models/User'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

const Form = ({type,editFormData,onSubmit}:{type:FormModalType,editFormData?:User,onSubmit:()=>void}) => {

    const [formData,setFormData] = useState<User>()

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
         if(prevFormData){
           return {
              ...prevFormData,
              [name]: value,
            }
          }else{
           return {[name]:value}
          }
        });
      };

    const handleOnSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
            if(formData){
              if(type === FormModalType.isAdd){
                await createUser(formData)
              }else{
                await updateUser(formData,editFormData?._id)
              }
              onSubmit()
            }
    }

    useEffect(()=>{
      setFormData(editFormData)
    },[editFormData])

  return (
    <section>
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        {type === FormModalType.isAdd ? 'Add a User' : 'Edit User'}
      </h2>
      <form onSubmit={handleOnSubmit} method="POST">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstname"
              value={formData?.firstName ?? ''}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="First name"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Last Name
            </label>
            <input
              onChange={handleChange}
              value={formData?.lastName ?? ''}
              type="text"
              name="lastName"
              id="lastname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Last Name"
            />
          </div>
           <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
             onChange={handleChange}
             value={formData?.email ?? ''}
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="email"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              User Type
            </label>
            <select
             onChange={handleChange}
             value={formData?.userType ?? ''}
              id="userType"
              name="userType"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option>Select UserType</option>
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
              <option value="ServiceProvider">ServiceProvider</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Phone No
            </label>
            <input
              type="text"
              value={formData?.phone ?? ''}
              onChange={handleChange}
              name="phone"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Phone No"
            />
          </div>
          {
            type !== FormModalType.isEdit &&
            <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
            onChange={handleChange}
              type="password"
              name="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Password"
            />
          </div>
          }
          
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg border border-[#FFF]"
        >
          {type === FormModalType.isAdd ? 'Add User' : 'Edit User'}
        </button>
      </form>
    </div>
  </section>
  )
}

export default Form