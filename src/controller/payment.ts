import { API } from "../config/apiEndpoint"
import { API_METHOD } from "../config/general"
import { Payment } from "../models/Payment"
import { fetcher } from "../utils/db"

export const getPaymentList = async () => {
    return await fetcher({url:API.PAYMENT})
}
export const getPaymentById = async (id:string) => {
    return await fetcher({url:API.PAYMENT,id})
}
export const createPayment = async (requestBody:Payment | {}) => {
    return await fetcher({url:API.PAYMENT,method:API_METHOD.POST,body:requestBody})
}
export const updatePayment = async (requestBody:Payment | {},id:string) => {
    return await fetcher({url:API.PAYMENT,id,method:API_METHOD.PUT,body:requestBody})
}
export const deletePayment = async (id:string) => {
    return await fetcher({url:API.PAYMENT,id,method:API_METHOD.DELETE})
}