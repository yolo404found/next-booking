"use client";
import { FormModalType } from "@/src/config/general";
import {
  createProvider,
  updateProvider,
} from "@/src/controller/serviceProvider";
import { getUserList } from "@/src/controller/user";
import { ServiceProvider } from "@/src/models/ServiceProvider";
import { User } from "@/src/models/User";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Form = ({
  type,
  editFormData,
  onSubmit,
}: {
  type: FormModalType;
  editFormData?: ServiceProvider;
  onSubmit: () => void;
}) => {
  const [formData, setFormData] = useState<ServiceProvider>();
  const [users, setUsers] = useState<User[]>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      if (prevFormData) {
        return {
          ...prevFormData,
          [name]: value,
        };
      } else {
        return { [name]: value };
      }
    });
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      if (type === FormModalType.isAdd) {
        await createProvider(formData);
      } else {
        await updateProvider(formData, editFormData?._id);
      }
      onSubmit();
    }
  };

  const getUsers = async () => {
    const res = await getUserList({userType:'ServiceProvider'});
    setUsers(res.data);
  };


  useEffect(() => {
    setFormData(editFormData);
    if(!users){
      getUsers()
    }
  }, [editFormData]);

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {type === FormModalType.isAdd ? "Add Provider" : "Edit Provider"}
        </h2>
        <form onSubmit={handleOnSubmit} method="POST">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Provider Name
              </label>
              <input
                onChange={handleChange}
                value={formData?.providerName ?? ""}
                type="text"
                name="providerName"
                id="providerName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Last Name"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                onChange={handleChange}
                value={formData?.email ?? ""}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="email"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 my-3">
          <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone No
              </label>
              <input
                type="text"
                value={formData?.phone ?? ""}
                onChange={handleChange}
                name="phone"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Phone No"
              />
            </div>
            <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Service Provider
            </label>
            <select
              onChange={handleChange}
              value={typeof formData?.user === 'string' ? formData.user : formData?.user?._id ?? ''} 
              id="user"
              name="user"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option>Select Provider</option>
              {users?.map((user, index) => {
                return (
                  <option key={index} value={user._id}>
                    {user.firstName +  " " +user.lastName}
                  </option>
                );
              })}
            </select>
          </div>
          </div>
          
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <textarea
                onChange={handleChange}
                value={formData?.address ?? ''}
                id="address"
                name="address"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your address..."
              ></textarea>
            </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg border border-[#FFF]"
          >
            {type === FormModalType.isAdd ? "Add Provider" : "Edit Provider"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Form;
