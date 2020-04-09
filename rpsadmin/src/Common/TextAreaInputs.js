
import React from 'react';
import {Form,Col,Row} from 'react-bootstrap';
const TextareaInput = (props)=>{
    const {InputTitle,defaultInput}= props;
    const {isMandatory,maximum,minimum} = props.configs;
    return(
        //project textarea type inputs
        <Form.Group as={Row}>
            <Col  sm="10">
                <Form.Control as="textarea" value={defaultInput} onChange={(e)=>props.ChangeInputTextarea(e,InputTitle)} dir="rtl" rows={3} />
                <p style={{border:'solid #CED4DA 0.5px',color:'#1C5F8A'}}>{defaultInput.length}</p>
            </Col>
            <Form.Label style={{textAlign:'right'}} column sm="2">
            {isMandatory&&<span style={{color:'red'}}>*</span>}
            {InputTitle}
            <br/>
            {isMandatory&&<span style={{color:'blue'}}> {maximum} - {minimum}</span>}
            </Form.Label>
        </Form.Group>
    
    )
}

export default TextareaInput;