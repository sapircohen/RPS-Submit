import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropzone from 'react-dropzone';
import 'react-image-crop/dist/ReactCrop.css'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/lab/Slider';

//TAKS:
//enable ZOOM
//enable insert of Students

import {base64StringtoFile,extractImageFileExtensionFromBase64, image64toCanvasRef} from '../constant/ResuableUtils';

import {storage} from '../App';

const acceptedFileType = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypeArray = acceptedFileType.split(",").map((item)=>{return item.trim()});


class ModalImage extends React.Component{
    constructor(props){
        super(props);
        this.PreviewCanvasRef = React.createRef();
        this.state={
            croppedAreaPixels:null,
            imgSrc:null,
            crop: { x: 0, y: 0 },
            aspect: 4 / 3,
            zoom:1
        }
        this.handleOnCropComplete = this.handleOnCropComplete.bind(this);
    }
    verifyFile = (files)=>{
        if(files && files.length>0){
            const currentFile = files[0];
            const currentFileType =currentFile.type;
            //const currentFileSize = currentFile.size;
            if (!acceptedFileTypeArray.includes(currentFileType)) {
                alert('this file type is not allowed!');
                return false;
            }
            return true;
        }
        return false;
    }
    handleOnDrop = (files,rejectedFiles)=>{
        //console.log(files)
        if (rejectedFiles && rejectedFiles.length>0) {
            this.verifyFile(rejectedFiles);
        }
        if (files && files.length>0) {
            const isVerified = this.verifyFile(files);
            console.log(isVerified)
            if(isVerified){
                const currentFile = files[0];
                console.log(currentFile)
                const reader = new FileReader();
                reader.addEventListener('load',()=>{
                    this.setState({
                        imgSrc:reader.result
                    })
                    console.log(reader.result);
                },false)
                //console.log(reader)
                reader.readAsDataURL(currentFile);

            }
        }
    }
    handleOnCropChange = (crop)=>{
        this.setState({
            crop:crop
        })
    }
    handleImageLoaded = (image)=>{

    }
    handleOnCropComplete(crop,pixelCrop){
        this.setState({ croppedAreaPixels:pixelCrop })
        const canvasRef = this.PreviewCanvasRef.current;
        const {imgSrc} = this.state;
        image64toCanvasRef(canvasRef,imgSrc,pixelCrop);
    }
    saveImage = (event)=>{
        if (this.state.imgSrc === null) {
            alert('ומה לגבי התמונה?');
            return;
        }
        event.preventDefault();
        const {imgSrc} = this.state;
        const fileExtension = extractImageFileExtensionFromBase64(imgSrc);      
        const fileName = 'previewFile.' + fileExtension;
        const canvasRef = this.PreviewCanvasRef.current;
        const image = canvasRef.toDataURL('image/'+fileExtension);

        //upload file:
        const myImage = base64StringtoFile(image,fileName);
        this.saveToFirebaseStorage(myImage);
    }
    modalClose = ()=>{
        this.setState({
            croppedAreaPixels:null,
            imgSrc:null,
            crop: { x: 0, y: 0},
            aspect: 4 / 3,
            zoom:1
        },()=>{
            return this.props.modalClose;
        })
    }
    saveToFirebaseStorage = (image)=>{
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        const uploadPic = storage.ref('images/'+groupData.GroupName+'/'+this.props.title+'/'+image.name).put(image);
        uploadPic.on('state_changed',
        (snapshot)=>{

        },(error)=>{
            console.log(error);
        },
        ()=>{
            storage.ref('images/'+groupData.GroupName+'/'+this.props.title+'/'+image.name).getDownloadURL()
            .then((url)=>{
                console.log(url)
            })
        })
    }
    onZoomChange = zoom => {
        this.setState({ zoom })
    }
    render(){
        const {imgSrc} = this.state;

        return(
        <Modal centered	show={this.props.modalOpen}>
            <Modal.Header style={{justifyContent:'center'}}>
                <Modal.Title>
                    {this.props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            {/* image crop */}
            <div style={{flex:1,marginTop:'5%'}}>
                {imgSrc !== null ?
                    <div style={{height:300,width:'100%',position:'relative'}}> 
                        <Cropper
                                zoom={this.state.zoom}
                                image={this.state.imgSrc}
                                crop={this.state.crop}
                                aspect={this.state.aspect}
                                onCropChange={this.handleOnCropChange}
                                onCropComplete={this.handleOnCropComplete}
                                onZoomChange={this.onZoomChange}
                            />
                        <Slider
                            value={this.state.zoom}
                            min={0.1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e, zoom) => this.onZoomChange(zoom)}
                            classes={{ container: 'slider' }}
                        />
                    </div>
                : (
                    <Dropzone multiple={false} accept={acceptedFileType} onDrop={this.handleOnDrop}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div style={{height:300,width:300,flex:1,margin:'0px auto',border:'dotted 0.5px'}} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p style={{textAlign:'center'}}>גרור תמונה לכאן</p>
                            </div>
                            </section>
                        )}
                    </Dropzone>
                )}
                <br/>
            </div>
            <canvas style={{display:'none'}} ref={this.PreviewCanvasRef}></canvas>
            
            </Modal.Body>
            <Modal.Footer dir="rtl" style={{justifyContent:'space-around'}}>
                <Button variant="success" onClick={this.saveImage}>
                שמירה
                </Button>
                <Button style={{marginLeft:'1%'}} variant="warning" onClick={this.modalClose}>
                נקה תמונה
                </Button>
                <Button  variant="danger" onClick={this.props.modalClose}>
                ביטול
                </Button>
            </Modal.Footer>
        </Modal>
        )
    }
}

export default ModalImage;