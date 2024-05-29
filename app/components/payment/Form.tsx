"use client";
import { FormModalType } from "@/src/config/general";
import { getBookingList } from "@/src/controller/booking";
import { createPayment, updatePayment } from "@/src/controller/payment";
import { Booking } from "@/src/models/Booking";
import { Payment } from "@/src/models/Payment";
import { formatDate } from "@/src/utils/general";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Form = ({
  type,
  editFormData,
  onSubmit,
}: {
  type: FormModalType;
  editFormData?: Payment;
  onSubmit: () => void;
}) => {
  const [formData, setFormData] = useState<Payment>();
  const [bookings, setBookings] = useState<Booking[]>();

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
        await createPayment(formData);
      } else {
        await updatePayment(formData, editFormData?._id);
      }
      onSubmit();
    }
  };

  const getBookings = async () => {
    const res = await getBookingList();
    setBookings(res.data);
  };

  useEffect(() => {
    setFormData(editFormData);
    if (!bookings) {
      getBookings();
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
                Booking
              </label>
              <select
                onChange={handleChange}
                value={
                  typeof formData?.booking === "string"
                    ? formData.booking
                    : formData?.booking?._id ?? ""
                }
                id="booking"
                name="booking"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option>Select Booking</option>
                {bookings?.map((booking, index) => {
                  return (
                    <option key={index} value={booking._id}>
                      {booking.bookingNo}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Payment Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="paymentDate"
                  value={
                    formData?.paymentDate
                      ? formatDate(formData.paymentDate.toString())
                      : formatDate(new Date().toISOString())
                  }
                  name="paymentDate"
                  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="w-full my-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={formData?.amount ?? ""}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Amount"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Payment Method
              </label>
              <select
                onChange={handleChange}
                value={formData?.paymentMethod ?? ""}
                id="paymentMethod"
                name="paymentMethod"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option>Select Payment Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Status
              </label>
              <select
                onChange={handleChange}
                value={formData?.status ?? ""}
                id="status"
                name="status"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option>Select Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg border border-[#FFF]"
          >
            {type === FormModalType.isAdd ? "Add Payment" : "Edit Payment"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Form;
