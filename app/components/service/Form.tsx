"use client";
import { FormModalType } from "@/src/config/general";
import { createService, updateService } from "@/src/controller/service";
import { getProviderList } from "@/src/controller/serviceProvider";
import { Service } from "@/src/models/Service";
import { IServiceProvider } from "@/src/models/ServiceProvider";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Form = ({
  type,
  editFormData,
  onSubmit,
}: {
  type: FormModalType;
  editFormData?: Service;
  onSubmit: () => void;
}) => {
  const [formData, setFormData] = useState<Service>();
  const [providers, setProviders] = useState<IServiceProvider[]>();

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
        await createService(formData);
      } else {
        await updateService(formData, editFormData?._id);
      }
      onSubmit();
    }
  };

  const getProviders = async () => {
    const res = await getProviderList();
    setProviders(res.data);
  };

  useEffect(() => {
    setFormData(editFormData);
    if(!providers){
      getProviders();
    }
  }, [editFormData]);

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {type === FormModalType.isAdd ? "Add Service" : "Edit Service"}
        </h2>
        <form onSubmit={handleOnSubmit} method="POST">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Service Name
              </label>
              <input
                onChange={handleChange}
                value={formData?.serviceName ?? ""}
                type="text"
                name="serviceName"
                id="serviceName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Service Name"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Price
              </label>
              <input
                onChange={handleChange}
                value={formData?.price ?? ""}
                type="text"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Price"
              />
            </div>
          </div>
          <div className="w-full my-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Service Provider
            </label>
            <select
              onChange={handleChange}
              value={typeof formData?.serviceProvider === 'string' ? formData.serviceProvider : formData?.serviceProvider?._id ?? ''} 
              id="serviceProvider"
              name="serviceProvider"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option>Select Provider</option>
              {providers?.map((provider, index) => {
                return (
                  <option key={index} value={provider._id}>
                    {provider.providerName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <textarea
              onChange={handleChange}
              value={formData?.description ?? ""}
              id="description"
              name="description"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description"
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
