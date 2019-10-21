import React,{Component} from 'react';
import {Form,Col,Row} from 'react-bootstrap';

const TextInputs =(props)=>{
    return(
        <Form.Group style={{marginTop:'2%'}} as={Row} id="projectName">
            <Col sm="3"></Col>
            <Col sm="7">
                <Form.Control defaultValue={props.defaultInput} size={props.inputSize} onChange={(e)=>props.ChangeInputTextarea(e,props.InputTitle)} type="text" dir="rtl"/>
                <p style={{border:'solid #CED4DA 0.5px',color:'red'}}>{props.defaultInput.length}</p>
            </Col>
            <Form.Label style={{textAlign:'right'}} column sm="2">
                {props.IsMandatory&&<span style={{color:'red'}}>*</span>}
                {props.InputTitle}
            </Form.Label>
        </Form.Group>
    )
}
export default TextInputs;