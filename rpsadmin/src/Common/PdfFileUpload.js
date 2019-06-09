import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import {storage} from '../App';

class PDFupload extends React.Component{
    AddPDF = (error, file)=>{
        console.log(file)
        if(this.fileValidate(file)){
            this.saveToFirebaseStorage(file.file);
        }
    }
    fileValidate = (file)=>{
        console.log(file.fileExtension)
        let isValid = false;
        if (file.fileExtension !=='pdf') {
            if (file.fileExtension !== 'docx') {
                alert('ניתן להעלות אך ורק קבצי PDF או Word');
                file.abortLoad();
                return false;
            }
            else{
                isValid = true;
            }
        }
        else{
            isValid=true;
        }
        if(isValid){
            console.log(file.fileExtension);
            console.log(this.props.pdfFileSize);
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
                console.log('good')
                return true;
            }
        }
    }
    saveToFirebaseStorage = (file)=>{
        console.log(file);
        // const fileExtension = file.name.split(".");
        // console.log(fileExtension);

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
                console.log(url)
                this.props.savePDF(url);
            })
        })
    }
    render(){
        return(
            <FilePond allowMultiple={false} onaddfile={this.AddPDF} labelIdlE='PDF UPLOAD'/>
        )
    }
}
export default PDFupload;