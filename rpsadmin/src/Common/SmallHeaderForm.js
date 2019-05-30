import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';

//CSS:
import '../css/previewStyle.css';

const SmallHeaderForm = (props)=>{
    return(
    <Container style={{marginTop:20,borderWidth:12}}>
        <Row>
            <Col>
                <h2 className="Headers">
                    {props.title}
                </h2>
            </Col>
        </Row>
    </Container>
    ) 
}

export default SmallHeaderForm;