import React from 'react';
import {Button,Col} from 'react-bootstrap';

const LinkButton = (props)=>{
    return(
        <Col style={{textAlign:'center'}}>
            <Button size="lg" variant={props.color} onClick={()=>window.open(props.href,"_blank")} >
                <props.Icon/>
                {props.Title}
            </Button>
        </Col>
    )
}
export default LinkButton;