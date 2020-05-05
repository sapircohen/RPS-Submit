
import React from 'react';
import {Form,Col,Row} from 'react-bootstrap';
const TextareaInput = (props)=>{
    const {InputTitle,defaultInput}= props;
    const {isMandatory,maximum,minimum} = props.configs;
    let validInput = "";
    if(isMandatory){
        switch (minimum) {
            case -20000:
                validInput=`מקסימום ${maximum} תווים`
                break;
            default:
                validInput=`בין ${minimum} - ${maximum} תווים`
                break;
        }
    }
    return(
        //project textarea type inputs
        <Form.Group as={Row}>
            <Col  sm="10">
                <Form.Control as="textarea" value={defaultInput} onChange={(e)=>props.ChangeInputTextarea(e,InputTitle)} dir="rtl" rows={3} />
                <p style={{border:'solid #CED4DA 0.5px',color:'#1C5F8A'}}>{defaultInput.length}</p>
            </Col>
            <Form.Label style={{textAlign:'right'}} column sm="2">
            {InputTitle}
            {isMandatory&&<span style={{color:'red',fontSize:'22px'}}>*</span>}
            <br/>
            <span style={{color:'blue'}}>{validInput}</span>
            </Form.Label>
        </Form.Group>
    
    )
}

export default TextareaInput;