import { IUser } from "../models/User"
import { fetcher } from "../utils/db"
import { API } from "../config/apiEndpoint"
import { API_METHOD } from "../config/general"
 
export const getUserList = async () => {
    return await fetcher({url:API.USER})
}
export const getUserById = async (id:string) => {
    return await fetcher({url:API.USER,id})
}
export const createUser = async (requestBody:IUser | {}) => {
    return await fetcher({url:API.USER,method:API_METHOD.POST,body:requestBody})
}
export const updateUser = async (requestBody:IUser | {},id:string) => {
    return await fetcher({url:API.USER,id,method:API_METHOD.PUT,body:requestBody})
}
export const deleteUser = async (id:string) => {
    return await fetcher({url:API.USER,id,method:API_METHOD.DELETE})
}