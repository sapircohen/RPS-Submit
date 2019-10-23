import React from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import {Form,Col,Row} from 'react-bootstrap';


export default class RichText extends React.Component {
    state={
      counter:this.props.defaultInput.length
    }
    ChangeText=(value,title)=>{
      //this.GetLength(value);
      this.props.ChangeInputTextarea(value,title);
    }
    WalkTheDOM=(node, func) =>{
      func(node);
      node = node.firstChild;
      while (node) {
          this.WalkTheDOM(node, func);
          node = node.nextSibling;
      }
    }
    GetLength=(text)=>{
        let xmlString = text;
        var doc = new DOMParser().parseFromString(xmlString, "text/html");
        let txt = "";
        // Example usage: Process all Text nodes on the page
        this.WalkTheDOM(doc.body, function (node) {
            if (node.nodeType === 3) { // Is it a Text node?
                var text = node.data.trim();
                if (text.length > 0) { // Does it have non white-space text content?
                    // process text
                    txt += text;
                }
            }
        });
        this.setState({
          counter:txt.length
        })
    }
    render() {
      return (
        <Form.Group as={Row}>
        <Col dir='rtl' sm="10">
            <ReactQuill modules={modules} formats={formats} value={this.props.defaultInput}  onChange={(value)=>this.ChangeText(value,this.props.InputTitle)} />
            <p style={{border:'solid #CED4DA 0.5px',color:'#1C5F8A'}}>{this.props.defaultInput.length}</p>
        </Col>
        <Form.Label style={{textAlign:'right'}} column sm="2">
        {this.props.IsMandatory&&<span style={{color:'red'}}>*</span>}
        {this.props.InputTitle}
        </Form.Label>
    </Form.Group> 
        
      )
    }
  }

 const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3,4,false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'},{ 'direction': 'rtl' },{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  }

 const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent','direction','align',
    'link', 'image'
  ]
