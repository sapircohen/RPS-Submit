import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';

const SmallHeaderForm = (props)=>{
    return(
    <Container style={{marginTop:20,borderWidth:12}}>
        <Row>
            <Col style={{fontSize:20}}>
                <h4>
                    <Badge style={{backgroundColor:'#B5DBF8'}}>{props.title}</Badge>
                </h4>
            </Col>
        </Row>
    </Container>
    ) 
}

export default SmallHeaderForm;