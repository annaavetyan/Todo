import React from "react";

import FormikContainer from "../FormContainer/FormikContainer";
import {Form, Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import {Box, Button} from "@mui/material";
import {string} from "yup";

export type FormValues = {
    title: string;
    description: string;
    date: string;
};

export type TodoFormProps = {
    createNewPost: (date: string, title: string, description: string) => void;
};
const TodoForm: React.FC<TodoFormProps> = (props) => {
    const initialValue: FormValues = {
        title: "",
        description: "",
        date: "",
    };

    const onSubmit = (value: FormValues, onSubmitProps: FormikHelpers<FormValues>) => {
        setTimeout(() => {
            const date = new Date(value.date);
            const month = date.getUTCMonth() + 1;
            const day = date.getUTCDate() + 1;
            const year = date.getUTCFullYear();

            props.createNewPost(`${month}/${day}/${year}`, value.title, value.description);

            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();
        }, 1000);
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('required'),
        description: Yup.string().required('required'),
        date: Yup.date().required("required").nullable(),
    });

    return (
        <Box sx={{
            maxWidth: '700px',
            margin: 'auto',

            "& form": {
                marginTop: '50px',
                marginBottom: '30px',
                margin: '50px 10px 30px',
            }
        }}>
            <Formik enableReinitialize initialValues={initialValue} onSubmit={onSubmit}
                    validationSchema={validationSchema}>
                {
                    (formik) => {
                        return (
                            <Form autoComplete="off">
                                <FormikContainer/>
                                <Box mt={5}>
                                    <Button type="submit" variant="contained" >{'Submit'}</Button>
                                </Box>
                            </Form>
                        )
                    }
                }
            </Formik>
        </Box>
    )
}

export default TodoForm;