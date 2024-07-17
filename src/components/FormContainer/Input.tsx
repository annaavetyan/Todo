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
        <Box mb={3} sx={(theme) => ({
            '& label': {
                display: 'block',
                fontSize: 13,
                marginBottom: '10px',
            },
            '& input, textarea': {
                border: `1px solid ${theme.palette.primary.main}`,
                width: '70%',
                marginRight: '5%',
                minHeight: '40px',
                borderRadius: '5px',
                padding: '0 10px',
                "&:focus": {
                    border: `1px solid ${theme.palette.primary.main}`
                },
                "&:focus-visible": {
                    border: `1px solid ${theme.palette.primary.main}`
                }

            },
            '& textarea': {
                padding: '5px',
                minHeight: '100px',
            }
        })}>
            <label htmlFor={name}>{label}</label>
            <Field name={name} id={name} {...rest}/>
            <ErrorMessage name={name} component={TextError}/>
        </Box>
    )
}

export default Input