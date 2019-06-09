import React from 'react';
import {Form} from 'react-bootstrap';

const LabelTextPDF = (props)=>{
    return(
        <Form.Label>
            {props.ProjectPDF!==''?'ערוך קובץ PDF/WORD':'הוסף קובץ PDF/WORD'}
            {props.IsMandatory&&<span style={{color:'red'}}>*</span>}
        </Form.Label>
    )
}

export default LabelTextPDF;