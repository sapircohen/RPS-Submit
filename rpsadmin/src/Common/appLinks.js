import React from 'react';
import {Form,Col,Row} from 'react-bootstrap';

const AppLinksInput = (props)=>{
    return(
            <Col sm="6">
                <Form.Label column sm="1"><props.IconName style={{color:props.iconColor,fontSize:22}}/>link</Form.Label>
                <Form.Control onChange={(e)=>props.ChangeLinkInput(e,props.InputTitle)} dir="ltr" size={props.inputSize} type="text" placeholder={props.placeholder} /> 
            </Col>
    )
}

export default AppLinksInput;