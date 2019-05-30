import React from 'react';
import {Row,Col,Badge} from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];


export default class HashTags extends React.Component{
    state={
        tags:[]
    }
    render(){
        return(
            <div dir="rtl" style={{padding:15,borderRadius:20,marginTop:30,border:'solid 1px',backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <Row>
                            <Col sm="4" style={{fontSize:20}}>
                                    <h4>
                                        <Badge style={{backgroundColor:'#'}}>תייגו את הפרויקט</Badge>
                                    </h4>
                                </Col>       
                                <Col sm="3">
                                <ReactTags
                                tags={this.props.tags}
                                handleDelete={this.props.handleDelete}
                                handleAddition={this.props.handleAddition}
                                delimiters={delimiters} />
                                </Col>
                            <Col sm="5"></Col>
                        </Row>
                    </div>
        )
    }
}