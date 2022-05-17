import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import {storage} from '../App';
import firebase from 'firebase';

class PDFupload extends React.Component{
    AddPDF = (file)=>{
        if(this.fileValidate(file)){
            this.saveToFirebaseStorage(file.file);
        }
    }
    fileValidate = (file)=>{
        let isValid = false;
        let extensiton = ["pdf"];
        if(this.props.extension){
            extensiton=this.props.extension;
        }
        extensiton.map((e,key)=>{
            if (file.fileExtension === e) {
                isValid=true;
            }
        })
        if(!isValid){
            alert(`ניתן להעלות אך ורק קבצי ${extensiton.join()}`);
            file.abortLoad();
            return false;
        }
        else{
            alert(file.fileSize)
            if (file.fileExtension ==='pdf' && file.fileSize > this.props.pdfFileSize) {
                alert('הקובץ עובר את ה20 מגה');
                file.abortLoad();
                return false;
            }
            else if (file.fileExtension ==='docx' && file.fileSize > this.props.wordFileSize) {
                alert('הקובץ עובר את ה5 מגה');
                file.abortLoad();
                return false;
            }
            else{
                return true;
            }
        }
    }
    saveToFirebaseStorage = (file)=>{
        
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        const uploadPic = storage.ref('images/'+groupData.GroupName+'/ProjectDocument/'+file.name).put(file);
        uploadPic.on('state_changed',
        (snapshot)=>{
        },(error)=>{
            console.log(error);
        },
        ()=>{
            storage.ref('images/'+groupData.GroupName+'/ProjectDocument/'+file.name).getDownloadURL()
            .then((url)=>{
                this.props.savePDF(url);
            })
        })
    }
    render(){
        return(
            <FilePond onremovefile={this.props.DeletePdf} allowMultiple={false} onaddfilestart={this.AddPDF} labelIdlE='PDF UPLOAD'/>
        )
    }
}
export default PDFupload;