import { API } from "../config/apiEndpoint"
import { API_METHOD } from "../config/general"
import { Service } from "../models/Service"
import { fetcher } from "../utils/db"

export const getServiceList = async () => {
    return await fetcher({url:API.SERVICE})
}
export const getServiceById = async (id:string) => {
    return await fetcher({url:API.SERVICE,id})
}
export const createService = async (requestBody:Service | {}) => {
    return await fetcher({url:API.SERVICE,method:API_METHOD.POST,body:requestBody})
}
export const updateService = async (requestBody:Service | {},id:string) => {
    return await fetcher({url:API.SERVICE,id,method:API_METHOD.PUT,body:requestBody})
}
export const deleteService = async (id:string) => {
    return await fetcher({url:API.SERVICE,id,method:API_METHOD.DELETE})
}