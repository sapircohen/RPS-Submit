import React from 'react'
import { Container } from 'react-floating-action-button'
import {FaRegSave ,FaEye} from "react-icons/fa";
import Button from 'react-bootstrap/Button';

const SaveAction = (props) => {

    return (
        <Container>
            <Button onClick={props.Save} size={100} style={{borderRadius:'90%',zIndex:2,backgroundColor:'#96B2CC',borderColor:'#96B2CC'}}>
                <FaEye size={40} style={{color:"#fff"}}  />
                
            </Button>
        </Container>
    )
}
export default SaveAction;