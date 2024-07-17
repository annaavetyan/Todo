
import {combineReducers, createStore} from "redux";
import TodoReducer from "./TodoReducer";




let reducer = combineReducers({
    todoPage:TodoReducer,
})

let store = createStore(reducer);
window.store = store;


export default store