import React from 'react';
import Input from "./Input";
import DatePicker from "./DatePicker";


interface FormikControlProps {
    control: 'input' | 'date';
    name: string;
    label: string;
    as?: string;
    type?: string
}
const FormikControl: React.FC<FormikControlProps> = (props)=> {
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