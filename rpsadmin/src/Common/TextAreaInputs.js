
import React,{Component} from 'react';
import {Form,Col,Row} from 'react-bootstrap';
const TextareaInput = (props)=>{
    return(
        //project textarea type inputs
        <Form.Group as={Row}>
            <Col  sm="10">
                <Form.Control as="textarea" value={props.defaultInput} onChange={(e)=>props.ChangeInputTextarea(e,props.InputTitle)} dir="rtl" rows={3} />
                <p style={{border:'solid #CED4DA 0.5px',color:'#1C5F8A'}}>{props.defaultInput.length}</p>
            </Col>
            <Form.Label style={{textAlign:'right'}} column sm="2">
            {props.IsMandatory&&<span style={{color:'red'}}>*</span>}
            {props.InputTitle}
            <br/>
            {props.IsMandatory&&<span style={{color:'blue'}}> {props.maximum&&'מקסימום '+ props.maximum + ' תוים'}</span>}
            </Form.Label>
        </Form.Group>
    
    )
}

export default TextareaInput;