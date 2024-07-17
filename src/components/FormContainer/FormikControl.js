import React from 'react';
import Input from "./Input";
import DatePicker from "./DatePicker";

const FormikControl = (props)=> {
    const {control,...rest} = props;

    switch (control) {
        case 'input': {
            return <Input {...rest}/>
        }
        case 'date':{
            return <DatePicker {...rest}/>
        }
        default: return null;
    }
}

export default FormikControl