import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProjectName = (props)=>{
    return(
        <Form.Group style={{marginTop:'2%'}} as={Row} id="projectName">
            <Col sm="3"></Col>
                <Col sm="7">
                    <Form.Control ref={props.projectName} defaultValue={props.ProjectName} size="lg" type="text" dir="rtl"/>
                </Col>
            <Form.Label column sm="2">שם הפרויקט</Form.Label>
        </Form.Group>
    )
}

export default ProjectName;