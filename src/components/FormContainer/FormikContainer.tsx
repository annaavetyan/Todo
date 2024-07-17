import React from "react";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from "./FormikControl";


const FormikContainer: React.FC = () => {
    return (
        <>
            <FormikControl type='text' name="title" control="input" label="Title"/>
            <FormikControl as="textarea" name="description" control="input" label="Description"/>
            <FormikControl name="date" control="date" label="DatePicker"/>
        </>
    )

}
export default FormikContainer