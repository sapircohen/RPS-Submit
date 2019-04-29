import React,{Component} from 'react';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'

const acceptedFileType = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypeArray = acceptedFileType.split(",").map((item)=>{return item.trim()});
class ImageCropper extends React.Component{
        constructor(props){
            super(props);
            this.state={
                imgSrc:null,
                crop:{
                    aspect:4/3
                }
            }
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
            console.log(files)
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
                    console.log(reader)
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
        handleOnCropComplete = (crop,pixelCrop)=>{

        }
        render(){
            const {imgSrc} = this.state;
        return (
        <div style={{felx:1,marginTop:'5%'}}>
            {imgSrc !== null ?
                <div> 
                    <ReactCrop 
                    src={imgSrc} 
                    crop={this.state.crop} 
                    onChange={this.handleOnCropChange}
                    onImageLoaded={this.handleImageLoaded}
                    onComplete={this.handleOnCropComplete}
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
        </div>
        );
    }
}

export default ImageCropper;