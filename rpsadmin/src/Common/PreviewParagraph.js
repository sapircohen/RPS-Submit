import React from 'react';
import {Row,Col} from 'react-bootstrap';

const PreviewParagraph = (props)=>{
    return(
        <Row  style={{marginTop:'3%'}} className="show-grid Box">
            <Col style={{textAlign:'center'}} sm="12">
            <h3><props.Icon size={25}/>{props.Title}</h3>
            </Col>
            <Col xs={12} style={{marginTop:'1%'}}>
                <Row dir="rtl">
                    <Col>
                    <p style={{overflowWrap: 'break-word',textAlign:'right'}}>{props.Paragraph}</p>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
export default PreviewParagraph;