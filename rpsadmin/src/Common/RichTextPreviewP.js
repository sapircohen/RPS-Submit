import React from 'react';
import {Row,Col} from 'react-bootstrap';

const RichTextPreviewParagraph = (props)=>{
    return(
        <Row  style={{marginTop:'3%'}} className="show-grid Box">
            <Col style={{textAlign:'center'}} sm="12">
            {props.Title&&
            <h3><props.Icon size={25}/> {props.Title}</h3>
            }
            </Col>
            <Col xs={12} style={{marginTop:'1%'}}>
                <Row dir="rtl">
                    <Col>
                    <p dangerouslySetInnerHTML={{ __html:props.Paragraph}} style={{overflowWrap: 'break-word',textAlign:'right'}}/>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
export default RichTextPreviewParagraph;