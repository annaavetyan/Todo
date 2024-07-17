import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Box, Typography} from "@mui/material";
import DeleteModal from "../../modals/DeleteModal/DeleteModal";
import {statuses} from "../../const/const";
import UpdateModal from "../../modals/UpdateModal/UpdateModal";
import FormikContainer from "../FormContainer/FormikContainer";

const TodoList = (props) => {
    const {
        posts,
        deleteModal,
        updateModal,
        openDeleteModal,
        closeDeleteModal,
        openUpdateModal,
        closeUpdateModal,
        currentPost
    } = props;

    const activePosts = posts.filter((post) => post.status !== statuses.removed);
    const trashedPosts = posts.filter((post) => post.status === statuses.removed)

    const deletePost = (post) => {
        props.deletePost(post);
        closeDeleteModal()
    }
    return (
        <>
            <Box className="todoList">
                {
                    !!activePosts.length && <Box className="todoListSection" mb={8}>

                        <Typography variant="h4" component="h4" mb={3}
                                    className='preTitle'>{'Active Tasks'}</Typography>
                        {
                            activePosts.map((post, index) => {
                                return (
                                    <div className="todoItem" key={index}>
                                        <Box mr={2} display={'flex'}>
                                            <Box>
                                                <Box mb={2}>
                                                    <Typography variant='h6' component="h6" mb={0}>
                                                        {'Title'}
                                                    </Typography>
                                                    <Box className="todoTitle">{post.title}</Box>
                                                </Box>
                                                <Box mb={2}>
                                                    <Typography variant='h6' component="h6" mb={0}>
                                                        {'Description'}
                                                    </Typography>
                                                    <Box className="todoTitle">{post.description}</Box>
                                                </Box>
                                                <Box mb={2}>
                                                    <Typography variant='h6' component="h6" mb={0}>
                                                        {'Deadline'}
                                                    </Typography>
                                                    <Box component="span">{post.date}</Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <div className="">
                                            <EditIcon onClick={() => openUpdateModal(post)}/>
                                            <DeleteIcon onClick={() => openDeleteModal(post)}/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Box>
                }
                {
                    !!trashedPosts.length && <Box className="todoListSection">

                        <Typography variant="h4" component="h4" mb={3}
                                    className='preTitle'>{'Trashed Tasks'}</Typography>


                        {
                            trashedPosts.map((post, index) => {
                                return (
                                    <div className="todoItem" key={index}>
                                        <Box>
                                            <Box mb={2}>
                                                <Typography variant='h6' component="h6" mb={0}>
                                                    {'Title'}
                                                </Typography>
                                                <Box className="todoTitle">{post.title}</Box>
                                            </Box>
                                            <Box mb={2}>
                                                <Typography variant='h6' component="h6" mb={0}>
                                                    {'Description'}
                                                </Typography>
                                                <Box className="todoTitle">{post.description}</Box>
                                            </Box>
                                            <Box mb={2}>
                                                <Typography variant='h6' component="h6" mb={0}>
                                                    {'Deadline'}
                                                </Typography>
                                                <Box component="span">{post.date}</Box>
                                            </Box>
                                        </Box>

                                    </div>
                                )
                            })
                        }
                    </Box>
                }
            </Box>


            {deleteModal && <DeleteModal
                open={deleteModal}
                onClose={closeDeleteModal}
                deletePost={deletePost}
                post={currentPost}
            />}

                <UpdateModal
                    open={updateModal}
                    onClose={closeUpdateModal}
                    post={currentPost}
                />


        </>
    )
}

export default TodoList;