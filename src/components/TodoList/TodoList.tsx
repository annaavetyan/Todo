import React, {useEffect} from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Box, IconButton, Typography} from "@mui/material";
import {statuses} from "../../const/const";
import UpdateModal from "../../modals/UpdateModal/UpdateModal";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TodoItem from "./components/TodoItem";
import DeleteModal from "../../modals/DeleteModal/DeleteModal";

type TodoListProps = {
    posts: Array<PostType>;
    deleteModal: boolean;
    updateModal: boolean;
    openDeleteModal: (post: PostType) => void;
    closeDeleteModal: () => void;
    openUpdateModal: (post: PostType) => void;
    closeUpdateModal: () => void;
    currentPost: PostType;
    updatePost: (post: PostType) => void;
    markTaskAsUncompleted: (post: PostType) => void;
    markTaskAsCompleted: (post: PostType) => void;
    setTaskAsOverdue: (post: PostType) => void;
    setTaskAsPending: (post: PostType) => void;
    deletePost: (post: PostType) => void;
};

export type PostType = {
    id: number | null,
    title: string | null,
    description: string | null,
    date: string | number | Date ,
    status: string | null,
}


const TodoList: React.FC<TodoListProps> = (props) => {
    const {
        posts,
        deleteModal,
        updateModal,
        openDeleteModal,
        closeDeleteModal,
        openUpdateModal,
        closeUpdateModal,
        currentPost,
        updatePost,
        markTaskAsUncompleted,
        markTaskAsCompleted,
        setTaskAsOverdue,
        setTaskAsPending
    } = props;

    const activePosts = posts.filter((post) => post.status !== statuses.removed);
    const trashedPosts = posts.filter((post) => post.status === statuses.removed);

    const style = (theme: any)  => ({
        minHeight: '40px',
        backgroundColor: theme.palette.primary.main,
        color:theme.palette.white,
        position: "relative",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        marginBottom: '10px',
        borderRadius: '5px'
    })

    useEffect(() => {
        let interval = setInterval(() => {
            let now = new Date();

            posts.forEach((post) => {

                let date = new Date(post.date);

                if (date < now) {
                    setTaskAsOverdue(post);
                }

                if (date > now) {
                    setTaskAsPending(post)
                }
            })
        }, 1000);

        return () => clearInterval(interval);
    }, [posts]);

    const deletePost = (post: PostType) => {
        props.deletePost(post);
        closeDeleteModal()
    }
    return (
        <>
            <Box sx={{
                maxWidth: '700px',
                margin: 'auto',
            }}>
                {
                    !!activePosts.length && <Box sx={(theme) => ({
                        padding: '20px',
                        borderRadius:'10px',
                        backgroundColor: theme.palette.secondary.main,
                    })} mb={8}>

                        <Typography variant="h4" component="h4" mb={3}
                                    sx={(theme) => ({color: theme.palette.primary.contrastText})}>{'Active Tasks'}</Typography>
                        {
                            activePosts.map((post, index) => {
                                return (
                                    <Box sx={style} key={index}>
                                        <Box mr={2} display={'flex'}>
                                            <Box>
                                                <TodoItem post={post}/>
                                            </Box>
                                        </Box>
                                        <Box>
                                            {
                                                post.status === statuses.completed ?
                                                    <IconButton sx={{ color: 'white', marginRight: 2 }}  onClick={() => markTaskAsUncompleted(post)}>
                                                        <CheckBoxIcon />
                                                    </IconButton> :
                                                    <IconButton  sx={{ color: 'white', marginRight: 2 }} onClick={() => markTaskAsCompleted(post)} disabled={post.status === statuses.overdue}>
                                                        <CheckBoxOutlineBlankIcon  />
                                                    </IconButton>

                                            }
                                            <IconButton  sx={{ color: 'white', marginRight: 2 }}>
                                                <EditIcon  onClick={() => openUpdateModal(post)}/>
                                            </IconButton>
                                            <IconButton sx={{ color: 'white', marginRight: 2 }}>
                                                <DeleteIcon  onClick={() => openDeleteModal(post)}/>
                                            </IconButton>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                }
                {
                    !!trashedPosts.length && <Box sx={(theme) => ({
                        padding: '20px',
                        borderRadius:'10px',
                        backgroundColor: theme.palette.secondary.main,
                    })}>

                        <Typography variant="h4" component="h4" mb={3}
                                    sx={(theme) => ({color: theme.palette.primary.contrastText})}>{'Trashed Tasks'}</Typography>
                        {
                            trashedPosts.map((post, index) => {
                                return (
                                    <Box sx={style} key={index}>
                                        <Box>
                                            <TodoItem post={post}/>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                }
            </Box>

             <DeleteModal
                open={deleteModal}
                onClose={closeDeleteModal}
                deletePost={deletePost}
                post={currentPost}
            />

            <UpdateModal
                open={updateModal}
                onClose={closeUpdateModal}
                post={currentPost}
                updatePost={updatePost}
            />
        </>
    )
}

export default TodoList;