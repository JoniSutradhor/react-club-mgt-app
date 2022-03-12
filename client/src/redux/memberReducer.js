import { CREATE_MEMBER, DELETE_MEMBER } from "./memberTypes";

const initialsStat = {
    totalMember: 0
}

const memberReducer = (state = initialsStat, action) => {
    switch (action.type) {
        case CREATE_MEMBER: return {
            ...state,
            totalMember: state.totalMember + 1
        }
        case DELETE_MEMBER: return {
            ...state,
            totalMember: state.totalMember - 1
        }
        default: return state
    }
}

export default memberReducer;