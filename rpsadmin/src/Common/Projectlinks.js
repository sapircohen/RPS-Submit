import React from 'react';
import {Form,Col,Row} from 'react-bootstrap';

const LinkInput = (props)=>{
    return(
        <Form.Group style={{marginTop:15}} dir="rtl" as={Row}>
            <Form.Label style={{textAlign:'right'}} column sm="2">{props.IsMandatory&&<span style={{color:'red'}}>*</span>} {props.InputTitle}</Form.Label>
                <Col sm="7">
                    <Form.Control onChange={(e)=>props.ChangeLinkInput(e,props.InputTitle)} defaultValue={props.defaultInput} dir="ltr" size={props.inputSize} type="text" placeholder={props.placeholder} /> 
                </Col>
                <Col sm="3"></Col>
        </Form.Group>
    )
}

export default LinkInput;