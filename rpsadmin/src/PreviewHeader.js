import React from 'react';
import {Col} from 'react';
const PreviewHeader = (props)=>{
    return(
        <Col style={{textAlign:'center',fontFamily:'Calibri'}} sm="12">
            <h3>{props.title} <props.Icon size={50}/></h3>
        </Col>
    )
}

export default PreviewHeader;