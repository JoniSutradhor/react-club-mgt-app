import { CREATE_MEMBER, DELETE_MEMBER } from "./memberTypes";

export const createMember = ()=> {
    return {
        type : CREATE_MEMBER
    }
}

export const deleteMember = ()=> {
    return {
        type : DELETE_MEMBER
    }
}