import { API } from "../config/apiEndpoint"
import { API_METHOD } from "../config/general"
import { ServiceProvider } from "../models/ServiceProvider"
import { fetcher } from "../utils/db"

export const getProviderList = async () => {
    return await fetcher({url:API.SERVICE_PROVIDER})
}
export const getProviderById = async (id:string) => {
    return await fetcher({url:API.SERVICE_PROVIDER,id})
}
export const createProvider = async (requestBody:ServiceProvider | {}) => {
    return await fetcher({url:API.SERVICE_PROVIDER,method:API_METHOD.POST,body:requestBody})
}
export const updateProvider = async (requestBody:ServiceProvider | {},id:string) => {
    return await fetcher({url:API.SERVICE_PROVIDER,id,method:API_METHOD.PUT,body:requestBody})
}
export const deleteProvider = async (id:string) => {
    return await fetcher({url:API.SERVICE_PROVIDER,id,method:API_METHOD.DELETE})
}