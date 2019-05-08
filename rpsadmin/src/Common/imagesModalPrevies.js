import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'react-image-crop/dist/ReactCrop.css'
import ImagesCarousel from './Carousel';

const PreviewModal = (props)=>{
    return(
        <Modal onHide={props.onHide} centered size='lg' show={props.modalOpen}>
            <Modal.Header style={{justifyContent:'center'}}>
                <Modal.Title>
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{flex:1,marginTop:'5%'}}>
                <ImagesCarousel images={props.images}/>
            </div>
                
            </Modal.Body>
            <Modal.Footer dir="rtl" style={{justifyContent:'space-around'}}>
                <Button  variant="danger">
                מחיקה
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PreviewModal;