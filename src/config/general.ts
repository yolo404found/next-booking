export enum API_METHOD{
    GET="GET",
    POST="POST",
    PUT="PUT",
    DELETE="DELETE"
}
export enum FormModalType{
    isEdit="IS_EDIT",
    isAdd="IS_ADD",
}
export interface FormModal{
showForm:boolean,
type:FormModalType
}

export const ISO_DATE_REGAX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;