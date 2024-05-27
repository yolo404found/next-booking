"use client";
import { FormModalType } from "@/src/config/general";
import { createLocation, updateLocation } from "@/src/controller/location";
import { Location } from "@/src/models/Location";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Form = ({
  type,
  editFormData,
  onSubmit,
}: {
  type: FormModalType;
  editFormData?: Location;
  onSubmit: () => void;
}) => {
  const [formData, setFormData] = useState<Location>();

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
        await createLocation(formData);
      } else {
        await updateLocation(formData, editFormData?._id);
      }
      onSubmit();
    }
  };

  useEffect(() => {
    setFormData(editFormData);
  }, [editFormData]);

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {type === FormModalType.isAdd ? "Add Location" : "Edit Location"}
        </h2>
        <form onSubmit={handleOnSubmit} method="POST">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Location Name
              </label>
              <input
                onChange={handleChange}
                value={formData?.locationName ?? ""}
                type="text"
                name="locationName"
                id="locationName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Location Name"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Country
              </label>
              <input
                onChange={handleChange}
                value={formData?.country ?? ""}
                type="text"
                name="country"
                id="country"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="country"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                State
              </label>
              <input
                onChange={handleChange}
                value={formData?.state ?? ""}
                type="text"
                name="state"
                id="state"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="State"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                City
              </label>
              <input
                onChange={handleChange}
                value={formData?.city ?? ""}
                type="text"
                name="city"
                id="city"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="city"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <input
                onChange={handleChange}
                value={formData?.address ?? ""}
                type="text"
                name="address"
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Address"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Zip Code
              </label>
              <input
                onChange={handleChange}
                value={formData?.zipCode ?? ""}
                type="text"
                name="zipCode"
                id="zipCode"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="zipCode"
              />
            </div>
          </div>
        
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg border border-[#FFF]"
          >
            {type === FormModalType.isAdd ? "Add Location" : "Edit Location"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Form;
