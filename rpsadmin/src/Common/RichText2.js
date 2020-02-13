import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import {Form,Col,Row} from 'react-bootstrap';

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

const RichText = (props) => {
  const [counter,setCounter] = useState(props.defaultInput.length);
  const changeText=(value,title)=>{
    //this.GetLength(value);
    props.ChangeInputTextarea(value,title);
  }
    // //benny's function
  // const walkTheDOM=(node, func) =>{
  //   func(node);
  //   node = node.firstChild;
  //   while (node) {
  //       WalkTheDOM(node, func);
  //       node = node.nextSibling;
  //   }
  // }
  // const getLength=(text)=>{
  //     let xmlString = text;
  //     var doc = new DOMParser().parseFromString(xmlString, "text/html");
  //     let txt = "";
  //     // Example usage: Process all Text nodes on the page
  //     walkTheDOM(doc.body, function (node) {
  //         if (node.nodeType === 3) { // Is it a Text node?
  //             var text = node.data.trim();
  //             if (text.length > 0) { // Does it have non white-space text content?
  //                 // process text
  //                 txt += text;
  //             }
  //         }
  //     });
  //     setState({
  //       counter:txt.length
  //     })
  // }
  return ( 
      <Form.Group as={Row}>
        <Col dir='rtl' sm="10">
            <ReactQuill modules={modules} formats={formats} value={props.defaultInput}  onChange={(value) =>changeText(value,props.InputTitle)} />
            <p style={{border:'solid #CED4DA 0.5px',color:'#1C5F8A'}}>{props.defaultInput.length}</p>
        </Col>
        <Form.Label style={{textAlign:'right'}} column sm="2">
        {props.IsMandatory&&<span style={{color:'red'}}>*</span>}
        {props.InputTitle}
        
        </Form.Label>
      </Form.Group>
   );
}
 
export default RichText;
// export default class RichText extends React.Component {
//     state={
//       counter:this.props.defaultInput.length
//     }
//     ChangeText=(value,title)=>{
//       //this.GetLength(value);
//       this.props.ChangeInputTextarea(value,title);
//     }
    
//     render() {
//       return (
//         <Form.Group as={Row}>
//         <Col dir='rtl' sm="10">
//             <ReactQuill modules={modules} formats={formats} value={this.props.defaultInput}  onChange={(value) =>this.props.ChangeInputTextarea(value,this.props.InputTitle)} />
//             <p style={{border:'solid #CED4DA 0.5px',color:'#1C5F8A'}}>{this.props.defaultInput.length}</p>
//         </Col>
//         <Form.Label style={{textAlign:'right'}} column sm="2">
//         {this.props.IsMandatory&&<span style={{color:'red'}}>*</span>}
//         {this.props.InputTitle}
        
//         </Form.Label>
//       </Form.Group>

//       )
//     }
//   }

