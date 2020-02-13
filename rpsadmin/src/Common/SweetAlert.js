import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

const Alerts = (props)=>{
    return(
        <SweetAlert showCancel title={props.title} onConfirm={props.ConfirmAlert} onCancel={props.CancelAlert}>
            {props.content}
        </SweetAlert>
    )
}

export default Alerts;