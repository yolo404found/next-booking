"use client";
import { FormModalType } from "@/src/config/general";
import { createBooking, getBookingList, updateBooking } from "@/src/controller/booking";
import { getServiceList } from "@/src/controller/service";
import { getUserList } from "@/src/controller/user";
import { Booking } from "@/src/models/Booking";
import { Service } from "@/src/models/Service";
import { User } from "@/src/models/User";
import { formatDate } from "@/src/utils/general";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Form = ({
  type,
  editFormData,
  onSubmit,
}: {
  type: FormModalType;
  editFormData?: Booking;
  onSubmit: () => void;
}) => {
  const [formData, setFormData] = useState<Booking>();
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
        const res = await getBookingList()
        const bookingNo ="Booking" + res.data.length + 1
        await createBooking(formData,bookingNo);
      } else {
        await updateBooking(formData, editFormData?._id);
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
    if (!services) {
      getServices();
    }
    if (!users) {
      getUsers();
    }
  }, [editFormData]);

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {type === FormModalType.isAdd ? "Add Booking" : "Edit Booking"}
        </h2>
        <form onSubmit={handleOnSubmit} method="POST">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                User
              </label>
              <select
                onChange={handleChange}
                value={
                  typeof formData?.user === "string"
                    ? formData.user
                    : formData?.user?._id ?? ""
                }
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
                value={
                  typeof formData?.service === "string"
                    ? formData.service
                    : formData?.service?._id ?? ""
                }
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
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-6 my-3">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Booking Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="bookingDate"
                  value={formData?.bookingDate ? formatDate(formData.bookingDate.toString()) : formatDate(new Date().toISOString())}
                  name="bookingDate"
                  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Start Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  value={formData?.startTime}
                  defaultValue={"00:00"}
                  required
                />
              </div>
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                End Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData?.endTime}
                  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  defaultValue={"00:00"}
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
             Status
            </label>
            <select
             onChange={handleChange}
             value={formData?.status ?? ''}
              id="status"
              name="status"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option>Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="w-full mt-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Total Price
            </label>
            <input
              type="number"
              name="totalPrice"
              id="totalPrice"
              value={formData?.totalPrice ?? ''}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Total Price"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg border border-[#FFF]"
          >
            {type === FormModalType.isAdd ? "Add Booking" : "Edit Booking"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Form;
