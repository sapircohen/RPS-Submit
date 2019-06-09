import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
//CSS:
import '../css/previewStyle.css';

const HeaderForm = (props)=>{
    return(
    <Container style={{marginTop:20,borderWidth:12}}>
        <Row>
            <Col style={{fontSize:25}}>
                <h1 className="Headers">
                    {props.title}
                </h1>
            </Col>
        </Row>
    </Container>
    ) 
}

export default HeaderForm;