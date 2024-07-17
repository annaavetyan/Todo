import React from "react";
import {Box, Button, Modal, Typography} from "@mui/material";
import FormikContainer from "../../components/FormContainer/FormikContainer";
import {Form, Formik} from "formik";
import FormikControl from "../../components/FormContainer/FormikControl";
import * as Yup from "yup";


const UpdateModal = (props) => {
    const {open, onClose, post} = props;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    let initialValue = {
        title: post.title,
        description: post.description,
        date: post.date,
    };

    const onSubmit = (value, onSubmitProps) => {
        props.updatePost(post.id, value.title, value.description, value.date);
        props.closeUpdateModal()

        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();

    }

    const validationSchema = Yup.object({
        title: Yup.string().required('required'),
        description: Yup.string().required('required'),
        date: Yup.date().required("required").nullable(),
    });


    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {"Task"}
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    <Formik initialValues={initialValue} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {
                            (formik) => {
                                return (
                                    <Form autoComplete="off">
                                        <FormikControl type='text' name="title" control="input" label="Title"/>
                                        <FormikControl as="textarea" name="description" control="input"
                                                       label="Description"/>
                                        <FormikControl name="date" control="date" label="DatePicker"/>
                                        <button type="submit" className="btn">submit</button>
                                    </Form>
                                )
                            }
                        }
                    </Formik>
                </Typography>
            </Box>
        </Modal>
    )
}

export default UpdateModal