import React from 'react';
import {Field, ErrorMessage} from 'formik';
import TextError from "./TextError";
import {Box} from "@mui/material";


interface InputProps {
    label: string;
    name: string;
}
const Input: React.FC<InputProps> = (props) => {

    const {label, name, ...rest} = props
    return (
        <Box
            sx={{
                '& label': {
                    display: 'block',
                    fontSize: 13,
                    marginBottom: '10px',
                },
                '& input': {
                    width: '70%'
                }
            }}
        >
            <label htmlFor={name}>{label}</label>
            <Field name={name} id={name} {...rest}/>
            <ErrorMessage name={name} component={TextError}/>
        </Box>
    )
}

export default Input