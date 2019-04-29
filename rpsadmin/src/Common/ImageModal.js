import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ImageCrop from './ImageCrop';
import Button from 'react-bootstrap/Button';



class ModalImage extends React.Component{
    render(){
        return(
        <Modal centered	show={this.props.modalOpen}>
            <Modal.Header dir="rtl" style={{justifyContent:'center'}}>
                <Modal.Title>
                    {this.props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ImageCrop/>
            </Modal.Body>
            <Modal.Footer dir="rtl" style={{justifyContent:'center'}}>
                <Button style={{marginLeft:'1%'}} variant="danger" onClick={this.props.modalClose}>
                ביטול
                </Button>
                <Button variant="success" onClick={this.props.modalClose}>
                שמירה
                </Button>
            </Modal.Footer>
        </Modal>
        )
    }
}

export default ModalImage;