import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'react-image-crop/dist/ReactCrop.css'
import ImagesCarousel from './Carousel';

class PreviewModal extends React.Component{
    state={
        currentPic:''
    }
    deletePicureFromFirebase = ()=>{
        this.props.deletePic(this.state.currentPic);
    }
    PicCurrentIndex = (image)=>{
        console.log(image);
        this.setState({
            currentPic:image
        },()=>{
            this.deletePicureFromFirebase();
        })
    }
    render(){
    return(
        <Modal onHide={this.props.onHide} centered size='lg' show={this.props.modalOpen}>
            <Modal.Header style={{justifyContent:'center'}}>
                <Modal.Title>
                    {this.props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{flex:1,marginTop:'5%'}}>
                <ImagesCarousel title={this.props.title} ChangedPic={this.PicCurrentIndex} images={this.props.images}/>
            </div>
                
            </Modal.Body>
            <Modal.Footer dir="rtl" style={{justifyContent:'space-around'}}>
            {/* {this.props.title ==='Screenshots'&&
                <Button onClick={this.deletePicureFromFirebase} variant="danger">
                    מחיקה
                </Button>
            } */}
            </Modal.Footer>
        </Modal>
    )
    }
}

export default PreviewModal;