import React from 'react'
import Trumbowyg from 'react-trumbowyg'
import {Form,Col,Row} from 'react-bootstrap';

import 'react-trumbowyg/dist/trumbowyg.min.css'



class RichText extends React.Component{
    render(){
      return (
          //project textarea type inputs
        <Form.Group as={Row}>
            <Col dir='rtl' sm="10">
                <Trumbowyg

                    buttons={
                        [
                            ['formatting'],
                            'btnGrp-semantic',
                            ['link'],
                            'btnGrp-justify',
                            'btnGrp-lists',
                            ['fullscreen'],
                            ['table'],
                        ]
                    }
                    dangerouslySetInnerHTML={{_html:this.props.defaultInput}}
                    autogrow={true}
                    data={this.props.defaultInput}
                    onChange={(data) =>this.props.ChangeInputTextarea(data.target.innerHTML,this.props.InputTitle)}
                />
            </Col>
            <Form.Label style={{textAlign:'right'}} column sm="2">
            {this.props.IsMandatory&&<span style={{color:'red'}}>*</span>}
            {this.props.InputTitle}
            </Form.Label>
        </Form.Group> 
      )
    }
  }
  
  export default RichText;
