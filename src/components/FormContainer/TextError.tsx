import React from 'react';

const TextError: React.FC<any> = (props)=> {

    return (
        <div className="error">
            {props.children}
        </div>
    )
}
export default TextError;