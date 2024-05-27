import { User } from "../models/User"
import { fetcher } from "../utils/db"
import { API } from "../config/apiEndpoint"
import { API_METHOD } from "../config/general"
 
export const getUserList = async (params?:{userType?:string}) => {
 return await fetcher({url:API.USER,param:{userType: params?.userType}})
}
export const getUserById = async (id:string) => {
    return await fetcher({url:API.USER,id})
}
export const createUser = async (requestBody:User | {}) => {
    return await fetcher({url:API.USER,method:API_METHOD.POST,body:requestBody})
}
export const updateUser = async (requestBody:User | {},id:string) => {
    return await fetcher({url:API.USER,id,method:API_METHOD.PUT,body:requestBody})
}
export const deleteUser = async (id:string) => {
    return await fetcher({url:API.USER,id,method:API_METHOD.DELETE})
}