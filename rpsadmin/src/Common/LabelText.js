import React from 'react';
import {Form} from 'react-bootstrap';

const LabelTextPDF = (props)=>{
    return(
        <Form.Label>
            {props.ProjectPDF!==''?'ערוך קובץ PDF':'הוסף קובץ PDF'}
            {props.IsMandatory&&<span style={{color:'red'}}>*</span>}
        </Form.Label>
    )
}

export default LabelTextPDF;