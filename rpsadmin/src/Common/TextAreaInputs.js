
import React,{Component} from 'react';
import {Form,Col,Row} from 'react-bootstrap';
const TextareaInput = (props)=>{
    return(
        //project textarea type inputs
        <Form.Group as={Row}>
            <Col  sm="10">
                <Form.Control style={props.isMandatory&&{borderColor:'red'}} as="textarea" value={props.defaultInput} onChange={(e)=>props.ChangeInputTextarea(e,props.InputTitle)} dir="rtl" rows={3} />
            </Col>
            <Form.Label style={{textAlign:'right'}} column sm="2">{props.InputTitle}</Form.Label>
        </Form.Group>
    
    )
}

export default TextareaInput;