import React from 'react'
import { Container } from 'react-floating-action-button'
import {FaEye} from "react-icons/fa";
import Button from 'react-bootstrap/Button';
const SaveAction = (props) => {
    return (
        <Container zIndex={999999}>
            <Button onClick={props.Save} size={100} style={{borderRadius:'90%',zIndex:23,backgroundColor:'#96B2CC',borderColor:'#96B2CC'}}>
                <FaEye  style={{zIndex:26,color:"#fff"}} size={40} />
            </Button>
        </Container>
    )
}
export default SaveAction;

