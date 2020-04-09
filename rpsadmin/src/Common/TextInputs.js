import React from 'react';
import {Form,Col,Row} from 'react-bootstrap';

const TextInputs =(props)=>{
    const {InputTitle,defaultInput,inputSize} = props;
    const {isMandatory,maximum,minimum} = props.configs;
    return(
        <Form.Group style={{marginTop:'2%'}} as={Row} id="projectName">
            <Col sm="3"></Col>
            <Col sm="7">
                <Form.Control defaultValue={defaultInput} size={inputSize} onChange={(e)=>props.ChangeInputTextarea(e,InputTitle)} type="text" dir="rtl"/>
                <p style={{border:'solid #CED4DA 0.5px',color:'#1C5F8A'}}>{defaultInput.length}</p>
            </Col>
            <Form.Label style={{textAlign:'right'}} column sm="2">
                {isMandatory&&<span style={{color:'red'}}>*</span>}
                {InputTitle}
                <br/>
                {isMandatory&&<span style={{color:'blue'}}>{maximum} - {minimum}</span>}
            </Form.Label>
        </Form.Group>
    )
}
export default TextInputs;