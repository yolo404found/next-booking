import { API } from "../config/apiEndpoint"
import { API_METHOD } from "../config/general"
import { Review } from "../models/Review"
import { fetcher } from "../utils/db"

export const getReviewList = async () => {
    return await fetcher({url:API.REVIEW})
}
export const getReviewById = async (id:string) => {
    return await fetcher({url:API.REVIEW,id})
}
export const createReview = async (requestBody:Review | {}) => {
    return await fetcher({url:API.REVIEW,method:API_METHOD.POST,body:requestBody})
}
export const updateReview = async (requestBody:Review | {},id:string) => {
    return await fetcher({url:API.REVIEW,id,method:API_METHOD.PUT,body:requestBody})
}
export const deleteReview = async (id:string) => {
    return await fetcher({url:API.REVIEW,id,method:API_METHOD.DELETE})
}