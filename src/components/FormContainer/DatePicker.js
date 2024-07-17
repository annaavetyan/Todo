import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import {ErrorMessage, Field} from "formik";
import TextError from "./TextError";
import DateView from 'react-datepicker'


const DatePicker = (props)=> {
    const {label,name,...rest} = props
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name}>
                {
                    ({form,field})=> {

                        const {setFieldValue,...rest} = form;
                        const {value} = field;
                        return <DateView id={name}  {...field} {...rest} selected={value} onChange = {(val)=>setFieldValue(name,val)} />
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )

}
export default DatePicker