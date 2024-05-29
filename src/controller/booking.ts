import { API } from "../config/apiEndpoint"
import { API_METHOD } from "../config/general"
import { Booking } from "../models/Booking"
import { fetcher } from "../utils/db"

export const getBookingList = async () => {
    return await fetcher({url:API.BOOKING})
}
export const getBookingById = async (id:string) => {
    return await fetcher({url:API.BOOKING,id})
}
export const createBooking = async (requestBody:Booking | {},bookingNo:string) => {
    return await fetcher({url:API.BOOKING,method:API_METHOD.POST,body:{...requestBody,bookingNo:bookingNo}})
}
export const updateBooking = async (requestBody:Booking | {},id:string) => {
    return await fetcher({url:API.BOOKING,id,method:API_METHOD.PUT,body:requestBody})
}
export const deleteBooking = async (id:string) => {
    return await fetcher({url:API.BOOKING,id,method:API_METHOD.DELETE})
}