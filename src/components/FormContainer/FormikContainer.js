import React from "react";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from "./FormikControl";


const FormikContainer = (props) => {
    let initialValue = {
        title: "",
        description: "",
        date: "",
    };

    if (props.post) {
        initialValue = props.post;
    }

    const onSubmit = (value, onSubmitProps) => {
        if (props.post) {

            props.updatePost({...props.post, date: value.date, description: value.description, title: value.title});
            props.closeUpdateModal()
        } else {
            let month = value.date.getUTCMonth() + 1;
            let day = value.date.getUTCDate();
            let year = value.date.getUTCFullYear();

            props.createNewPost(month + "/" + day + "/" + year, value.title, value.description);
        };
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();

    }

    const validationSchema = Yup.object({
        title: Yup.string().required('required'),
        description: Yup.string().required('required'),
        date: Yup.date().required("required").nullable(),
    });
    return (
        <Formik initialValues={initialValue}  onSubmit={onSubmit} validationSchema={validationSchema}>
            {
                (formik) => {
                    return (
                        <Form autoComplete="off">
                            <FormikControl type='text' name="title" control="input" label="Title"/>
                            <FormikControl as="textarea" name="description" control="input" label="Description"/>
                            <FormikControl name="date" control="date" label="DatePicker"/>
                            <button  type="submit" className="btn">submit</button>
                        </Form>
                    )
                }
            }
        </Formik>
    )

}
export default FormikContainer