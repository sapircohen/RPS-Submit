import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropzone from 'react-dropzone';
import 'react-image-crop/dist/ReactCrop.css'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Loader from 'react-loader-spinner';

import {base64StringtoFile,extractImageFileExtensionFromBase64, image64toCanvasRef} from '../Constants/ResuableUtils';


import {storage} from '../App';
import RadioB from './RadioButton';

const acceptedFileType = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypeArray = acceptedFileType.split(",").map((item)=>{return item.trim()});
const ratio = [
    {
        Name:'ריבועי',
        aspect:1
    },
    {
        Name:'נוף',
        aspect:16/9
    },
    {
        Name:'ורטיקלי',
        aspect:9/16
    },
]
const aspects = [
    {
        checked:false,
        id:1,
        value:1/1,
    },
    {
        checked:false,
        id:1,
        value:1/1,
    },
    {
        checked:false,
        id:1,
        value:1/1,
    },
]
class ModalImage extends React.Component{
    constructor(props){
        super(props);
        this.PreviewCanvasRef = React.createRef();
        this.state={
            isReady:true,
            screenshotName:'',
            croppedAreaPixels:null,
            imgSrc:null,
            crop: { x: 0, y: 0 },
            aspect: 1,
            zoom:1,
            aspectName:''
        }
        this.handleOnCropComplete = this.handleOnCropComplete.bind(this);
    }
    verifyFile = (files)=>{
        if(files && files.length>0){
            const currentFile = files[0];
            const currentFileType =currentFile.type;
            const currentFileSize = currentFile.size;
            if (!acceptedFileTypeArray.includes(currentFileType)) {
                alert('סוג זה של קובץ אינו מורשה!');
                return false;
            }
            if(this.props.fileSize!==undefined){
                if(this.props.fileSize!==0) {
                    const checkSize = currentFileSize/1000;
                    alert('גודל התמונה צריך להיות עד 100KB');
                    return this.props.fileSize>checkSize?true:false;
                }
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
            if(isVerified){
                const currentFile = files[0];
                console.log(currentFile)
                const reader = new FileReader();
                reader.addEventListener('load',()=>{
                    this.setState({
                        imgSrc:reader.result
                    })
                },false)
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
        
        let fileName='';
        if (this.props.title ==='Customer Logo') {
            fileName = 'CustomerLogo.'+fileExtension;
        }
        else if (this.props.title ==='Project Logo') {
            fileName = 'ProjectLogo.'+fileExtension;
        }
        else if(this.props.title ==='Screenshots') {
            if(this.state.screenshotName ===''){
                alert('בבקשה הכנס שם לתמונת מסך')
                return;
            }
            else{
                const min = 1;
                const max = 1000;
                const rand = min + Math.random() * (max - min);
                fileName = 'screenShot'+rand+'.' + fileExtension;
            }
        }
        else if(this.props.title ==='Student Pic'){
            fileName = 'studentPic'+this.props.picTitle+'.' + fileExtension;
        }        
        const canvasRef = this.PreviewCanvasRef.current;
        const image = canvasRef.toDataURL('image/'+fileExtension);

        //upload file:
        const myImage = base64StringtoFile(image,fileName);
        
        this.setState({isReady:false},()=>{
            this.saveToFirebaseStorage(myImage);
        })
        
    }
    modalClose = ()=>{
        this.cleanPhoto();
        this.props.modalClose();
    }
    cleanPhoto=()=>{
        this.setState({
            croppedAreaPixels:null,
            imgSrc:null,
            crop: { x: 0, y: 0},
            aspect: 1,
            zoom:1,
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
                this.props.savePic(url,this.props.title,this.props.picTitle,this.state.screenshotName);
                this.setState({
                    isReady:true,
                },()=>{
                    this.modalClose();
                })
            })
        })
    }
    onZoomChange = zoom => {
        this.setState({ zoom })
    }
    screenShotName = (e)=>{
        this.setState({screenshotName:e.target.value},
        ()=>{
            console.log(this.state.screenshotName)
        })
    }
    changeAspect=(e)=>{
        this.setState({aspect:e.target.value})
    }
    render(){
        const {imgSrc} = this.state;
         
        return(
        <Modal onHide={this.modalClose}  centered size='lg'	show={this.props.modalOpen}>
            {/* put inside spinner inside the modal */}

            <Modal.Header style={{justifyContent:'center'}}>
                <Modal.Title>
                    {this.props.title}
                </Modal.Title>
            </Modal.Header>
            {this.state.isReady?
            <Modal.Body>
                
            {
                this.props.title==='Screenshots' &&
                <div>
                    <Form.Group style={{marginTop:'2%'}} as={Row} id="projectName">
                        <Col sm="4"></Col>
                        <Col sm="4">
                            <Form.Control onChange={this.screenShotName} size="lg" type="text" dir="rtl"/>
                        </Col>
                        <Form.Label column sm="4">שם התמונה</Form.Label>
                    </Form.Group>
                </div>
            }
           { this.props.showRatio&&
           <Row  style={{textAlign:'center',direction:'rtl'}}>
                    {
                        ratio.map((aspect,key)=>
                            <Col>
                                <input 
                                    
                                    onChange={this.changeAspect}
                                    type="radio"
                                    checked={this.state.aspect==aspect.aspect} 
                                    value={aspect.aspect}
                                    key={key}
                                />
                                <span style={{margin:'4px'}}>{aspect.Name}</span>
                            </Col>                                
                        )
                    }
                </Row>
            }
            <div style={{flex:1,marginTop:'5%'}}>
                {imgSrc !== null ?
                    <div style={{height:400,width:'100%',position:'relative'}}> 
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
                            min={1}
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
                <br/>
                <canvas d style={{display:'none',position:'relative'}} ref={this.PreviewCanvasRef}></canvas>
            </div>
                
            </Modal.Body>
            :
            <Modal.Body style={{textAlign:'center'}}>
                <Loader 
                type="Watch"
                color="#58947B"
                height="100"	
                width="100"
                /> 
            </Modal.Body>
            }
            <Modal.Footer dir="rtl" style={{justifyContent:'space-around'}}>
                <Button variant="success" onClick={this.saveImage}>
                שמירה
                </Button>
                <Button style={{marginLeft:'1%'}} variant="warning" onClick={this.cleanPhoto}>
                נקה תמונה
                </Button>
                <Button  variant="danger" onClick={this.modalClose}>
                ביטול
                </Button>
            </Modal.Footer>
        </Modal>
        )
    }
}

export default ModalImage;