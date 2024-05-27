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