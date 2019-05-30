import React from 'react';
import Button from 'react-bootstrap/Button';

const SimpleButton = (props)=>{
    return(
        <Button style={{backgroundColor:props.backgroundColor,borderColor:props.borderColor}}>
            <props.IconName/>
            {props.titleName}
        </Button>
    )
}

export default SimpleButton;