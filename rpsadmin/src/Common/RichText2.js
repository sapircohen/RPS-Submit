import React from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import {Form,Col,Row} from 'react-bootstrap';


export default class RichText extends React.Component {
    render() {
      return (
        <Form.Group as={Row}>
        <Col dir='rtl' sm="10">
            <ReactQuill value={this.props.defaultInput}  onChange={(value) =>this.props.ChangeInputTextarea(value,this.props.InputTitle)} />
        </Col>
        <Form.Label style={{textAlign:'right'}} column sm="2">
        {this.props.IsMandatory&&<span style={{color:'red'}}>*</span>}
        {this.props.InputTitle}
        </Form.Label>
    </Form.Group> 
        
      )
    }
  }