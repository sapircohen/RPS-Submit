import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import {Form,Col,Row} from 'react-bootstrap';


const RichText = (props) => {
  const [counter,setCounter] = useState(props.defaultInput.length?props.defaultInput.length:0);
  const {isMandatory,maximum,minimum} = props.configs;
  const changeText=(value,title)=>{
    props.ChangeInputTextarea(value,title);
    console.log(value.length)
    setCounter(value.length);
  }
  const walkTheDOM=(node, func) =>{
    func(node);
    node = node.firstChild;
    while (node) {
        walkTheDOM(node, func);
        node = node.nextSibling;
    }
  }
  const getLength=(text)=>{
      let xmlString = text;
      var doc = new DOMParser().parseFromString(xmlString, "text/html");
      let txt = "";
      // Example usage: Process all Text nodes on the page
      walkTheDOM(doc.body,  (node)=> {
          if (node.nodeType === 3) { // Is it a Text node?
              var text = node.data.trim();
              if (text.length > 0) { // Does it have non white-space text content?
                  // process text
                  txt += text;
              }
          }
      });
      setCounter(txt.length);
  }
  let validInput = "";
    if(isMandatory){
        switch (minimum) {
            case -20000:
                validInput=`מקסימום ${maximum} תווים`
                break;
            default:
                validInput=`בין ${minimum} - ${maximum} תווים`
                break;
        }
  }
  return ( 
    <Form.Group as={Row}>
        <Col style={{direction:'rtl'}} sm="10">
            <ReactQuill modules={modules} formats={formats} value={props.defaultInput}  onChange={(value) =>changeText(value,props.InputTitle)} />
            <p style={{border:'solid #CED4DA 0.5px',color:'#1C5F8A'}}>{counter}</p>
        </Col>
        <Form.Label style={{textAlign:'right'}} column sm="2">
        {props.InputTitle}
        {isMandatory&&<span style={{color:'red',fontSize:'22px'}}>*</span>}
        <br/>
        <span style={{color:'blue'}}>{validInput}</span>
        </Form.Label>
    </Form.Group>
  );
}
 
export default RichText;


const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3,4,false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'},{ 'direction': 'rtl' },{ 'align':[]}],
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
