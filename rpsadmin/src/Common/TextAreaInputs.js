
import React from 'react';
import {Form,Col,Row} from 'react-bootstrap';
const TextareaInput = (props)=>{
    const {InputTitle,defaultInput,IsMandatory,maximum,minimum}= props;
    return(
        //project textarea type inputs
        <Form.Group as={Row}>
            <Col  sm="10">
                <Form.Control as="textarea" value={defaultInput} onChange={(e)=>props.ChangeInputTextarea(e,InputTitle)} dir="rtl" rows={3} />
                <p style={{border:'solid #CED4DA 0.5px',color:'#1C5F8A'}}>{defaultInput.length}</p>
            </Col>
            <Form.Label style={{textAlign:'right'}} column sm="2">
            {IsMandatory&&<span style={{color:'red'}}>*</span>}
            {InputTitle}
            <br/>
            {IsMandatory&&<span style={{color:'blue'}}> {props.maximum} - {maximum}</span>}
            </Form.Label>
        </Form.Group>
    
    )
}

export default TextareaInput;