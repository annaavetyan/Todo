import {statuses} from "../const/const";

const CREATE_NEW_POST = "CREATE_NEW_POST";
const CHANGE_INPUT_BOX= "CHANGE_INPUT_BOX";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";
const OPEN_DELETE_MODAL = "OPEN_DELETE_MODAL";
const CLOSE_DELETE_MODAL = "CLOSE_DELETE_MODAL";
const OPEN_UPDATE_MODAL = "OPEN_UPDATE_MODAL";
const CLOSE_UPDATE_MODAL = "CLOSE_UPDATE_MODAL";

let initialState = {
    posts:[],
    deleteModal: false,
    updateModal: false,
    currentPost: {},
}

const TodoReducer = (state = initialState,action)=> {

    switch (action.type) {
        case CREATE_NEW_POST:
            return {
                ...state,
                posts: [...state.posts,{id: state.posts.length ,title:action.title, description: action.description, date:action.date, status: statuses.pending}]
            }
        case UPDATE_POST:
            return {
                ...state, posts: [...state.posts.map((post) => {
                    if (post.id === action.id) {
                        return {...post, description: action.description, title: action.title, date: action.date}
                    } else {
                        debugger
                        return post
                    }
                })]
            }
        case DELETE_POST: {
            return {
                ...state, posts: [...state.posts.map((post) => {
                    if (post.id !== action.post.id) {
                        return post
                    } else {
                        return {...post, status: statuses.removed}
                    }
                })]
            }
        }
        case OPEN_DELETE_MODAL:
            return {...state, deleteModal: action.open, currentPost: action.currentPost}
        case CLOSE_DELETE_MODAL: {
            return {...state, deleteModal: action.open, currentPost: {}}
        }
        case OPEN_UPDATE_MODAL:
            return {...state, updateModal: action.open, currentPost: action.currentPost}
        case CLOSE_UPDATE_MODAL:
            return {...state, updateModal: action.open, currentPost: {}}
        default :
            return state
    }

    return state
}

export const createNewPost = (date,title, description, status)=> {
    return {
        type:CREATE_NEW_POST,
        title,
        description,
        date,
        status,
    }
}


export const updatePost = (id, title, description, date) => {
    return {
        type: UPDATE_POST,
        id: id,
        title: title,
        description: description,
        date: date,
    }
}

export const deletePost = (post) => {
    return {
        type: DELETE_POST,
        post,
    }
}

export const openDeleteModal = (post) => {
    return {
        type: OPEN_DELETE_MODAL,
        open: true,
        currentPost: post,
    }
}

export const closeDeleteModal = () => {
    return {
        type: CLOSE_DELETE_MODAL,
        open: false,
    }
}

export const openUpdateModal = (post) => {
    return {
        type: OPEN_UPDATE_MODAL,
        open: true,
        currentPost: post,
    }
}

export const closeUpdateModal = () => {
    return {
        type: CLOSE_UPDATE_MODAL,
        open: false,
        currentPost: {},
    }
}

export default TodoReducer;