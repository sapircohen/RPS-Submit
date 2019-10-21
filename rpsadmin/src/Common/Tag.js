import React from 'react';
import {Row,Col} from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';
import SmallHeaderForm from '../Common/SmallHeaderForm';

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
            <div dir="rtl" style={{padding:15,borderRadius:5,marginTop:30,border:'solid 1px',backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title="תייגו את הפרויקט"/>
                        <Row style={{marginTop:'10px'}}>
                            <Col sm="3"></Col>
                            <Col sm="6">
                                <ReactTags
                                tags={this.props.tags}
                                handleDelete={this.props.handleDelete}
                                handleAddition={this.props.handleAddition}
                                delimiters={delimiters} />
                            </Col>
                            <Col sm="3"></Col>
                        </Row>
                    </div>
        )
    }
}