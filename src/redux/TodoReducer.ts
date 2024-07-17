import {statuses} from "../const/const";
import {object} from "yup";

const CREATE_NEW_POST = "CREATE_NEW_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";
const OPEN_DELETE_MODAL = "OPEN_DELETE_MODAL";
const CLOSE_DELETE_MODAL = "CLOSE_DELETE_MODAL";
const OPEN_UPDATE_MODAL = "OPEN_UPDATE_MODAL";
const CLOSE_UPDATE_MODAL = "CLOSE_UPDATE_MODAL";
const MARK_TASK_AS_COMPLETED = "MARK_AS_COMPLETED";
const MARK_TASK_AS_UNCOMPLETED = "MARK_AS_UNCOMPLETED";
const SET_TASK_AS_OVERDUE = "SET_TASK_AS_OVERDUE";
const SET_TASK_AS_PENDING = "SET_TASK_AS_PENDING";

export type PostType = {
    id: number | null,
    title: string | null,
    description: string | null,
    date: string | Date | number,
    status: string | null,
}

interface TodoState {
    posts: Array<PostType>;
    deleteModal: boolean;
    updateModal: boolean;
    currentPost: PostType;
}

const initialState: TodoState = {
    posts: [],
    deleteModal: false,
    updateModal: false,
    currentPost: {
        id: null,
        title: null,
        description: null,
        date: "",
        status: null
    },
};

export type ActionType =
    | { type: typeof CREATE_NEW_POST; title: string; description: string; date: string }
    | { type: typeof UPDATE_POST; post: PostType }
    | { type: typeof DELETE_POST; post: PostType }
    | { type: typeof OPEN_DELETE_MODAL; open: boolean; currentPost: PostType }
    | { type: typeof CLOSE_DELETE_MODAL; open: boolean }
    | { type: typeof OPEN_UPDATE_MODAL; open: boolean; currentPost: PostType }
    | { type: typeof CLOSE_UPDATE_MODAL; open: boolean; currentPost: {} }
    | { type: typeof MARK_TASK_AS_COMPLETED; post: PostType }
    | { type: typeof MARK_TASK_AS_UNCOMPLETED; post: PostType }
    | { type: typeof SET_TASK_AS_OVERDUE; post: PostType }
    | { type: typeof SET_TASK_AS_PENDING; post: PostType };

const TodoReducer = (state = initialState, action: ActionType): TodoState => {
    switch (action.type) {
        case CREATE_NEW_POST:
            return {
                ...state,
                posts: [...state.posts, {
                    id: state.posts.length,
                    title: action.title,
                    description: action.description,
                    date: action.date,
                    status: statuses.pending
                }]
            }
        case UPDATE_POST:
            return {
                ...state, posts: [...state.posts.map((post) => {
                    if (post.id === action.post.id) {
                        return {
                            ...post,
                            title: action.post.title,
                            description: action.post.description,
                            date: action.post.date
                        }
                    } else {
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
            return {...state, deleteModal: action.open, currentPost: {  id: null,
                    title: null,
                    description: null,
                    date: "",
                    status: null}}
        }
        case OPEN_UPDATE_MODAL:
            return {...state, updateModal: action.open, currentPost: action.currentPost}
        case CLOSE_UPDATE_MODAL:
            return {...state, updateModal: action.open, currentPost: {  id: null,
                    title: null,
                    description: null,
                    date: "",
                    status: null}}
        case MARK_TASK_AS_COMPLETED: {
            return {
                ...state, posts: [...state.posts.map((post) => {
                    if (post.id === action.post.id && action.post.status !== statuses.removed) {
                        return {...post, status: statuses.completed}
                    } else {
                        return post
                    }
                })]
            }
        }
        case SET_TASK_AS_OVERDUE:
            return {
                ...state, posts: [...state.posts.map((post) => {
                    if (post.status !== statuses.removed && post.status !== statuses.completed) {
                        return {...post, status: statuses.overdue}
                    } else {
                        return post
                    }

                })]
            }
        case MARK_TASK_AS_UNCOMPLETED:
            return {
                ...state, posts: [...state.posts.map((post) => {
                    if (post.status !== statuses.removed && post.status !== statuses.overdue) {
                        return {...post, status: statuses.pending}
                    } else {
                        return post
                    }
                })]
            }
        case SET_TASK_AS_PENDING:
            return {
                ...state, posts: [...state.posts.map((post) => {
                    if (post.status !== statuses.removed && post.status !== statuses.completed) {
                        return {...post, status: statuses.pending}
                    } else {
                        return post
                    }
                })]
            }
        default :
            return state
    }
    return state
}

export const createNewPost = (date: string, title: string, description: string): ActionType => {
    return {
        type: CREATE_NEW_POST,
        title,
        description,
        date
    }
}


export const updatePost = (post: PostType): ActionType => {
    return {
        type: UPDATE_POST,
        post
    }
}

export const deletePost = (post: PostType): ActionType => {
    return {
        type: DELETE_POST,
        post,
    }
}

export const openDeleteModal = (post: PostType): ActionType => {
    return {
        type: OPEN_DELETE_MODAL,
        open: true,
        currentPost: post,
    }
}

export const closeDeleteModal = (): ActionType => {
    return {
        type: CLOSE_DELETE_MODAL,
        open: false,
    }
}

export const openUpdateModal = (post: PostType): ActionType => {
    return {
        type: OPEN_UPDATE_MODAL,
        open: true,
        currentPost: post,
    }
}

export const closeUpdateModal = (): ActionType => {
    return {
        type: CLOSE_UPDATE_MODAL,
        open: false,
        currentPost: {},
    }
}

export const markTaskAsCompleted = (post: PostType): ActionType => {
    return {
        type: MARK_TASK_AS_COMPLETED,
        post
    }
}

export const markTaskAsUncompleted = (post: PostType): ActionType => {
    return {
        type: MARK_TASK_AS_UNCOMPLETED,
        post
    }
}

export const setTaskAsOverdue = (post: PostType): ActionType => {
    return {
        type: SET_TASK_AS_OVERDUE,
        post
    }
}

export const setTaskAsPending = (post: PostType): ActionType => {
    return {
        type: SET_TASK_AS_PENDING,
        post
    }
}

export default TodoReducer;