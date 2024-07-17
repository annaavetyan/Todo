import React from 'react'
import './App.css';

import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import {connect} from "react-redux";
import {
    closeDeleteModal, closeUpdateModal,
    createNewPost,
    deletePost, markTaskAsCompleted, markTaskAsUncompleted,
    openDeleteModal, openUpdateModal, setTaskAsOverdue,
    updatePost, setTaskAsPending, PostType
} from "./redux/TodoReducer";
import {Box} from "@mui/material";


export type TodoStateType = {
    posts: Array<PostType>;
    name: string;
    date: string;
    deleteModal: boolean;
    updateModal: boolean;
    currentPost: PostType;
};

export type AppContainerProps = {
    createNewPost: (date: string, title: string, description: string) => void;
    updatePost: (post: PostType) => void;
    deletePost: (post: PostType) => void;
    openDeleteModal: (post: PostType) => void;
    closeDeleteModal: () => void;
    openUpdateModal: (post: PostType) => void;
    closeUpdateModal: () => void;
    markTaskAsUncompleted: (post: PostType) => void;
    markTaskAsCompleted: (post: PostType) => void;
    setTaskAsOverdue: (post: PostType) => void;
    setTaskAsPending: (post: PostType) => void;
    posts: Array<PostType>;
    name: string;
    date: string;
    deleteModal: boolean;
    updateModal: boolean;
    currentPost: PostType;
};
const AppContainer: React.FC<AppContainerProps> = (props) => {
    return (
        <Box className="App">
            <TodoForm {...props} />
            <TodoList {...props} />
        </Box>
    );
};

const mapStateToProps = (state: { todoPage: TodoStateType }) => {
    return {
        posts: state.todoPage.posts,
        name: state.todoPage.name,
        date: state.todoPage.date,
        deleteModal: state.todoPage.deleteModal,
        updateModal: state.todoPage.updateModal,
        currentPost: state.todoPage.currentPost,
    };
};

export default connect(mapStateToProps, {
    createNewPost,
    updatePost,
    deletePost,
    openDeleteModal,
    closeDeleteModal,
    openUpdateModal,
    closeUpdateModal,
    markTaskAsUncompleted,
    markTaskAsCompleted,
    setTaskAsOverdue,
    setTaskAsPending,
})(AppContainer);
