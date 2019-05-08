import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';

const HeaderForm = (props)=>{
    return(
    <Container style={{marginTop:20,borderWidth:12}}>
        <Row>
            <Col style={{fontSize:25}}>
                <h2>
                    <Badge variant="secondary">{props.title}</Badge>
                </h2>
            </Col>
        </Row>
    </Container>
    ) 
}

export default HeaderForm;