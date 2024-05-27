import { API } from "../config/apiEndpoint"
import { API_METHOD } from "../config/general"
import { Location } from "../models/Location"
import { fetcher } from "../utils/db"

export const getLocationList = async () => {
    return await fetcher({url:API.LOCATION})
}
export const getLocationById = async (id:string) => {
    return await fetcher({url:API.LOCATION,id})
}
export const createLocation = async (requestBody:Location | {}) => {
    return await fetcher({url:API.LOCATION,method:API_METHOD.POST,body:requestBody})
}
export const updateLocation = async (requestBody:Location | {},id:string) => {
    return await fetcher({url:API.LOCATION,id,method:API_METHOD.PUT,body:requestBody})
}
export const deleteLocation = async (id:string) => {
    return await fetcher({url:API.LOCATION,id,method:API_METHOD.DELETE})
}