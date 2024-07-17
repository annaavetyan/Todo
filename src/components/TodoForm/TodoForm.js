import React from "react";

import FormikContainer from "../FormContainer/FormikContainer";

const TodoForm = (props) => {

    return (
        <div className="container">
            <div>
               <FormikContainer {...props}/>
            </div>
        </div>
    )
}

export default TodoForm;