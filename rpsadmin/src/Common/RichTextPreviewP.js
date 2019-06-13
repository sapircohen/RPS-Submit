import React from 'react';
import {Row,Col} from 'react-bootstrap';

const RichTextPreviewParagraph = (props)=>{
    return(
        <Row  style={{marginTop:'3%'}} className="show-grid Box">
            <Col style={{textAlign:'center'}} sm="12">
            <h3>{props.Title}<props.Icon size={50}/></h3>
            </Col>
            <Col xs={12} style={{marginTop:'1%'}}>
                <Row dir="rtl">
                    <Col sm="2"></Col>
                    <Col sm="8">
                    <p dangerouslySetInnerHTML={{ __html:props.Paragraph}} style={{overflowWrap: 'break-word',textAlign:'right'}}/>
                    </Col>
                    <Col sm="2"></Col>
                </Row>
            </Col>
        </Row>
    )
}
export default RichTextPreviewParagraph;