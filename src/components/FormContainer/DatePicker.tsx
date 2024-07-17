import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import {ErrorMessage, Field, FieldProps} from "formik";
import TextError from "./TextError";
import DateView from 'react-datepicker'
import {Box} from "@mui/material";

interface DatePickerProps {
    label: string;
    name: string;
}
const DatePicker:React.FC<DatePickerProps> = (props)=> {
    const {label,name,...rest} = props;

    return (
        <Box
            sx={(theme)=>({
                '& label': {
                    display: 'block',
                    fontSize: 13,
                    marginBottom: '10px',
                },
                '& input': {
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
                }
            })}
        >
            <label htmlFor={name}>{label}</label>
            <Field name={name}

            >
                {
                    ({form,field}: FieldProps)=> {

                        const {setFieldValue,...rest} = form;
                        const {value} = field;
                        return <DateView id={name}  {...field} {...rest} selected={value} onChange = {(val)=>setFieldValue(name,val)} />
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </Box>
    )

}
export default DatePicker