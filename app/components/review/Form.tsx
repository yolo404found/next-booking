"use client";
import { FormModalType } from "@/src/config/general";
import { createReview, updateReview } from "@/src/controller/review";
import { getServiceList } from "@/src/controller/service";
import { getUserList } from "@/src/controller/user";
import { Review } from "@/src/models/Review";
import { Service } from "@/src/models/Service";
import { User } from "@/src/models/User";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Form = ({
  type,
  editFormData,
  onSubmit,
}: {
  type: FormModalType;
  editFormData?: Review;
  onSubmit: () => void;
}) => {
  const [formData, setFormData] = useState<Review>();
  const [services, setServices] = useState<Service[]>();
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
        await createReview(formData);
      } else {
        await updateReview(formData, editFormData?._id);
      }
      onSubmit();
    }
  };

  const getServices = async () => {
    const res = await getServiceList();
    setServices(res.data);
  };
  const getUsers = async () => {
    const res = await getUserList();
    setUsers(res.data);
  };

  useEffect(() => {
    setFormData(editFormData);
    if(!services){
      getServices()
    }
    if(!users){
      getUsers()
    }
  }, [editFormData]);

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {type === FormModalType.isAdd ? "Add Review" : "Edit Review"}
        </h2>
        <form onSubmit={handleOnSubmit} method="POST">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              User
            </label>
            <select
              onChange={handleChange}
              value={typeof formData?.user === 'string' ? formData.user : formData?.user?._id ?? ''} 
              id="user"
              name="user"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option>Select User</option>
              {users?.map((user, index) => {
                return (
                  <option key={index} value={user._id}>
                    {user.firstName + " " + user.lastName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Service
            </label>
            <select
              onChange={handleChange}
              value={typeof formData?.service === 'string' ? formData.service : formData?.service?._id ?? ''} 
              id="service"
              name="service"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option>Select Service</option>
              {services?.map((service, index) => {
                return (
                  <option key={index} value={service._id}>
                    {service.serviceName}
                  </option>
                );
              })}
            </select>
          </div>
          </div>
          <div className="w-full my-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Rating
            </label>
            <input
              type="number"
              min={1}
              max={5}
              name="rating"
              id="rating"
              value={formData?.rating ?? ''}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Rating"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Comment
            </label>
            <textarea
              onChange={handleChange}
              value={formData?.comment ?? ""}
              id="comment"
              name="comment"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="comment"
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg border border-[#FFF]"
          >
            {type === FormModalType.isAdd ? "Add Service" : "Edit Service"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Form;
