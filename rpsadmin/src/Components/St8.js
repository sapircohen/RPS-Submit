import React from 'react';
import NavbarProjs from './NavbarStudents';
import {Col,Row,Form,Button} from 'react-bootstrap';
import {FaCameraRetro } from "react-icons/fa";
import HeaderForm from '../Common/HeaderForm';
import SmallHeaderForm from '../Common/SmallHeaderForm';
import ModalImage from '../Common/ImageModal';
import firebase from 'firebase';
import StudentDetails from '../Common/StudentsDetails';
import PreviewModal from "../Common/imagesModalPrevies";
import SaveAction from '../Common/SaveAction';
import Loader from 'react-loader-spinner';
//commons
import PDFupload from '../Common/PdfFileUpload';
import LabelTextPDF from '../Common/LabelText';
import RichText from '../Common/RichText2';
import PublishProject from '../Common/PublishProject';
import TextareaInput from '../Common/TextAreaInputs';
import TextInputs from '../Common/TextInputs';
import SelectInput from '../Common/inputSelect';
import LinkInput from '../Common/Projectlinks';
import Hashtags from '../Common/Tag2';
import {Years} from '../Common/Years';
import SAlert from '../Common/SAlert';
import Idle from '../Common/Idle';
import Vt8 from './Vt8';
import { isObject } from 'util';
import {GetHashtags} from '../Common/HashtagsSetup';
import Validator from '../Classes/Validator';
//functions
import {ValidateData2} from '../functions/functions';

const sectionNames = {
    projectDesc : "תיאור הפרויקט",
    projectSmallDesc:"תיאור קצר",
    Recommendations:"חוות דעת של הארגון",
    projectComments:"הערות",
    projectName:"שם הפרויקט",
    projectCustomerName:'שם הלקוח',
    projectType:'נושא הפרויקט',
    projectFirstAdvisor:"מנחה",
    projectMovie:'קישור לסרטון הפרויקט ביוטיוב',
    projectSemester:'סמסטר',
    projectYear:'שנה',
}
class St8 extends React.Component{
    constructor(props){
        super(props); 
        this.configs = JSON.parse(localStorage.getItem('TemplateConfig'))?JSON.parse(localStorage.getItem('TemplateConfig')):JSON.parse(localStorage.getItem('st8'));
        this.state={
            alertTitle:'',
            alertText:'',
            alertShow:false,
            alertIcon:'warning',
            isSaved:false,
            imageAspect:4/3,
            showPreview:false,
            imagesToShowInModal:[],
            showImagesMode:false,
            logo:[],
            isPublished:false,
            Advisor:'',
            CustomerName:'',
            GroupName:'',
            HashSuggestions: [],
            HashOptions : [],
            tags:[],
            PDescription:'',
            CDescription:null,
            ProjectName:'',
            modalTitle:'',
            picTitle:'',
            advisorsList:[],
            openModal:false,
            finalProject:false,
            organization:false,
            appExists:false,
            suggestions: [],
            StudentsDetails:[],
            comments:'',
            projectDetails:{},
            isReady:false,
            coursesList:[],
            topicList:[],
            ProjectAdvisor:'',
            Year:'',
            Semester:'',
            ProjectCourse:'',
            ProjectTopic:'בחר',
            course :'',
            projectKey:'',
            groupData :'',
            showRatio:false,
            ProjectPDF:'',
            ProjectPresentation:'',
            Recommendations:'',
            templateValidators:this.configs,
            Configs:new Validator(this.configs)
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.HashsChosen = this.HashsChosen.bind(this);
    }
    componentDidMount(){
        this.setState({
            course :JSON.parse(localStorage.getItem('course')),
            projectKey:JSON.parse(localStorage.getItem('projectKey')),
            groupData :JSON.parse(localStorage.getItem('groupData')),
            
        },()=>{
            this.GetData();
        })
        window.setInterval(()=>{
            let currentTime = JSON.parse(localStorage.getItem('currentTime'));
            let time = new Date();
            if((time-currentTime)>10000){
                //console.log("not save:", time-currentTime);
            }
            else{
                this.SaveData();
                if(this.state.isPublished){
                    if(!ValidateData2(this.getProjectDetails(),this.state.templateValidators)){
                        this.setState({isPublished:false});
                        this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'הפרויקט לא יפורסם, תקנו את הנדרש ופרסמו שוב',alertIcon:'warning'})
                    }
                }
        }
        },6000)
    }
    GetData = ()=>{
        this.setState({isReady:false},()=>{
        const ref = firebase.database().ref('RuppinProjects').child(this.state.projectKey);
        let dataForGroup ={};
        ref.once("value", (snapshot)=> {
            dataForGroup=snapshot.val();
            console.log(snapshot.val())
        })
        .then(()=>{
            let tagsList = [];
            if(dataForGroup.HashTags){
                    dataForGroup.HashTags.forEach((tag)=>{
                        let t={};
                        if(tag.__isNew__ || tag.label){
                            t = {
                                'value':tag.value,
                                'label':tag.label
                            }
                        }
                        else{
                            t = {
                                'value':tag,
                                'label':tag
                            }
                        }
                        tagsList.push(t);
                    })
            }
            this.setState({
                Year:dataForGroup.Year?dataForGroup.Year:'',
                Semester:dataForGroup.Semester?dataForGroup.Semester:'',
                Github:dataForGroup.Github?dataForGroup.Github:'',
                CustomerName:dataForGroup.CustomerName?dataForGroup.CustomerName:'',
                ProjectAdvisor:dataForGroup.Advisor?dataForGroup.Advisor:'',
                GroupName:dataForGroup.GroupName,
                ProjectName:dataForGroup.ProjectName?dataForGroup.ProjectName:'',
                PDescription:dataForGroup.PDescription?dataForGroup.PDescription:'',
                logo:dataForGroup.ProjectLogo?(dataForGroup.ProjectLogo.length>0?dataForGroup.ProjectLogo[0]:[]):[],
                comments:dataForGroup.Comments?dataForGroup.Comments:'',
                CDescription:dataForGroup.CDescription?dataForGroup.CDescription:'',
                isPublished:dataForGroup.isPublished?dataForGroup.isPublished:false,
                StudentDetails:dataForGroup.Students?dataForGroup.Students:[],
                ProjectCourse:dataForGroup.ProjectCourse?dataForGroup.ProjectCourse:this.state.course,
                ProjectTopic:dataForGroup.ProjectTopic?dataForGroup.ProjectTopic:'בחר',
                tags:tagsList,
                Recommendations:dataForGroup.Recommendations?dataForGroup.Recommendations:'',
                ProjectPDF:dataForGroup.ProjectPDF?dataForGroup.ProjectPDF:'',
                ProjectPresentation:dataForGroup.ProjectPresentation?dataForGroup.ProjectPresentation:''
            },()=>{
                this.setState({projectDetails:this.getProjectDetails(),isReady:true})
            })
            //get list of advisors from firebase
            this.getAdvisors();
            //get courses from firebase
            this.getCourses();
            //get topics for Final project from firebase
            this.getTopicForFinalProject();
            //get hashtags for options - autocomplite
            this.getHashs();
        })
    })
    }
    getProjectDetails=()=>{
        // const arrayOfTags = this.state.tags.map((text)=>text.text);
        const project = {
            Recommendations:this.state.Recommendations,
            ProjectPDF:this.state.ProjectPDF,
            ProjectPresentation:this.state.ProjectPresentation,
            ProjectName:this.state.ProjectName,
            PDescription:this.state.PDescription,
            ProjectTopic:this.state.ProjectTopic,
            ProjectCourse:this.state.ProjectCourse,
            Advisor:[this.state.ProjectAdvisor],
            HashTags:this.state.tags,
            Year:this.state.Year,
            Semester:this.state.Semester,
            isPublished:this.state.isPublished,
            CustomerName:this.state.CustomerName,
            CDescription:this.state.CDescription,
            Students:this.state.StudentsDetails,
            ProjectLogo:this.state.logo,
            Comments:this.state.comments,
            isApproved:1,
        }
        this.setState({
            isReady:true
        })
        return project;
    }
    getCourses= ()=>{
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(groupData.Faculty).child('Departments').child(groupData.Department).child('Experties').child(groupData.Major).child('Courses');
        ref.once("value", (snapshot)=> {
            snapshot.forEach((course)=>{
                this.setState({coursesList:[...this.state.coursesList,course.val().Name]});
            })
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
        })
    }
    getTopicForFinalProject = ()=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(this.state.groupData.Faculty).child('Departments').child(this.state.groupData.Department).child('Experties').child(this.state.groupData.Major).child('Courses').child('Final project').child('Topics');
        ref.once("value", (snapshot)=> {
            snapshot.forEach((topicName)=>{
                console.log(topicName.val())
                this.setState({topicList:[...this.state.topicList,topicName.val().Name]});
            })
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
        })
    }
    
    getAdvisors = ()=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(this.state.groupData.Faculty).child('Departments').child(this.state.groupData.Department).child('Advisors');
        ref.once("value", (snapshot)=> {
            console.log(snapshot.val())
            this.setState({advisorsList:snapshot.val()});
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
        })
    }
    getHashs = ()=>{
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(groupData.Faculty).child('HashTags');
        ref.once("value", (snapshot)=> {
            snapshot.forEach((hash)=> {
                let Hash={};
                if(isObject(hash.val().Name)){
                    Hash = {
                        value: hash.val().Name.Name,
                        label:hash.val().Name.Name,
                    }
                }
                else{
                    Hash = {
                        value:hash.val().Name,
                        label:hash.val().Name
                    }
                }
                this.setState({
                    HashOptions:[...this.state.HashOptions,Hash]
                })
            })
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
        })
    }
    appExisting = (e)=>{this.setState({appExists:!this.state.appExists})}
    handleDelete(i){
        const { tags } = this.state;
        this.setState({tags: tags.filter((tag, index) => index !== i),})
    }
    //pdf details
    savePDF = (url)=>{
        const ref = firebase.database().ref('RuppinProjects/'+this.state.projectKey);
        this.setState({
            ProjectPDF:url
        },()=>{
            console.log(this.state.ProjectPDF)
            ref.update({
                ProjectPDF:this.state.ProjectPDF,
            })
        })
    }
    savePresentation=(url)=>{
        const ref = firebase.database().ref('RuppinProjects/'+this.state.projectKey);
        this.setState({
            ProjectPresentation:url
        },()=>{
            console.log(this.state.ProjectPresentation)
            ref.update({
                ProjectPresentation:this.state.ProjectPresentation,
            })
        })
    }
    handleAddition(tag){this.setState(state => ({ tags: [...state.tags, tag] }))}
    HashsChosen (value){
        this.setState({
            tags:value.map((val)=>{
                return val;
            })
        })
    }
    OpenImageModal = (title,pic)=>{
        let temp = false;
        if(title==='Screenshots'){
            temp = true;
        }
        this.setState({
        showRatio:temp,
        openModal:true,
        modalTitle:title,
        picTitle:pic})
    }
    OpenImagePreviewForStudent = (index)=>{
        if(this.state.StudentsDetails[index].Picture !==''){
            let temp = [];
            temp.push(this.state.StudentsDetails[index].Picture);
            this.setState({
                showImagesMode:true,
                imagesToShowInModal:temp
            })
        }
        else{
            alert("לא הועלתה תמונת סטודנט");
        }
    }
    handleClose = ()=> {this.setState({ openModal: false });}
    handlePublishedChange = ()=>{this.setState({isPublished:!this.state.isPublished})}
    getStudentsDetails = (students)=>{this.setState({StudentsDetails:students},()=>this.SaveData())}
    SetProjectOnFirbase = ()=>{
        const project = this.getProjectDetails();
        this.setState({
            projectDetails:project,
        },()=>{
            this.setState({showPreview:true})
        })
    }
    savePic=(url,title,index,screenshotName)=>{
        switch (title) {
            case 'Project Logo':this.setState({logo:[url]})
                break;
            case 'Student Pic': this.changeStudentImage(url,index)
                break;
            default:
                break;
        }
    }
    changeStudentImage = (url,index)=>{
        this.state.StudentsDetails[index].Picture = url;
        this.forceUpdate();
    }
    //new validation
    CheckValidation=(projectData,trigger="")=>{
        const { templateValidators} = this.state;
        const validation = ValidateData2(projectData,templateValidators);
        if(!validation.isPublish){
            this.setState({alertShow:validation.alertShow,alertTitle:validation.alertTitle,alertText:validation.alertText,alertIcon:validation.alertIcon})
        }
        if(trigger === "check" && validation.isPublish){
            this.setState({alertShow:true,alertTitle:'אימות נתונים',alertText:'הנתונים מאומתים, ניתן לפרסם את הפרויקט',alertIcon:'success'})
        }
        return validation.isPublish;
    }
    SaveData = ()=>{
        //const arrayOfTags = this.state.tags.map((text)=>text.text);
        const ref = firebase.database().ref('RuppinProjects/'+this.state.projectKey);
        ref.update({
            templateSubmit:'st8',
            templateView:'vt8',
            Recommendations:this.state.Recommendations,
            ProjectTopic:this.state.ProjectTopic,
            ProjectCourse:this.state.course,
            ProjectName: this.state.ProjectName,
            isPublished:this.state.isPublished,
            Year:this.state.Year,
            Semester:this.state.Semester,
            isApproved:1,
            CDescription:this.state.CDescription,
            Students:this.state.StudentsDetails,
            Comments:this.state.comments,
            Advisor:[this.state.ProjectAdvisor],
            ProjectLogo:this.state.logo,
            CustomerName:this.state.CustomerName,
            HashTags:this.state.tags,
            PDescription:this.state.PDescription,
            ProjectPDF:this.state.ProjectPDF,
            ProjectPresentation:this.state.ProjectPresentation
        })
    }
    //delete pdf/word file
    DeletePdf=()=>{
        console.log(this.state.ProjectPDF)
        if(this.state.ProjectPDF!==''){
            const desertRef = firebase.storage().refFromURL(this.state.ProjectPDF);
            // Delete the file
            desertRef.delete().then(()=> { 
                this.setState({
                    ProjectPDF:''
                },()=>{
                    const ref = firebase.database().ref('RuppinProjects/'+this.state.projectKey);
                    ref.update({
                        ProjectPDF:this.state.ProjectPDF,
                    })
                })            
            }).catch((error)=> {
                console.log(error)
            });
        }
    }
    DeletePresentation=()=>{
        if(this.state.ProjectPresentation!==''){
            console.log(this.state.ProjectPresentation)
            const desertRef = firebase.storage().refFromURL(this.state.ProjectPresentation);
            // Delete the file
            desertRef.delete().then(()=> { 
                this.setState({
                    ProjectPresentation:''
                },()=>{
                    const ref = firebase.database().ref('RuppinProjects/'+this.state.projectKey);
                    ref.update({
                        ProjectPresentation:this.state.ProjectPresentation,
                    })
                })            
            }).catch((error)=> {
                console.log(error)
            });
        }
    }
    DeletePic = (picURL)=>{
        const desertRef = firebase.storage().refFromURL(picURL);
        // Delete the file
        desertRef.delete().then(()=> {
            alert('התמונה נמחקה');
            const index = this.state.ScreenShots.indexOf(picURL);
            let array = [...this.state.ScreenShots];
            array.splice(index,1);
            let array2 = [...this.state.ScreenShotsNames];
            array2.splice(index,1);
            this.setState({ScreenShots:array,ScreenShotsNames:array2,showImagesMode:false});
        }).catch((error)=> {
            console.log(error)
        });
    }
    ChangeInputTextarea = (event,textareaTitle)=>{
        switch (textareaTitle) {
            case sectionNames.projectDesc:
                this.setState({PDescription:event})
                break;
                case sectionNames.Recommendations:
                    this.setState({Recommendations:event})
                    break;
            case sectionNames.projectSmallDesc:
                    this.setState({CDescription:event.target.value})
                    break;
            case sectionNames.projectComments:
                    this.setState({comments:event})
                    break;
            case sectionNames.projectName:
                    this.setState({ProjectName:event.target.value})
                break;
            case sectionNames.projectCustomerName:
                    this.setState({CustomerName:event.target.value})
                break;
            default:
                break;
        }
    }   
    ChangeSelectedInputs = (event,selectedTitle)=>{
        switch (selectedTitle) {
            case sectionNames.projectFirstAdvisor:
                this.setState({ProjectAdvisor:event.target.value})
                break;
            case sectionNames.projectType:
                this.setState({ProjectTopic:event.target.value})
                break;
            case sectionNames.projectSemester:
                this.setState({Semester:event.target.value})
                break;
            case sectionNames.projectYear:
                this.setState({Year:event.target.value})
                break;
            default:
                break;
        }
    }
    
    closePreview = ()=>this.setState({showPreview:false})
    imagesModalClose = ()=>this.setState({showImagesMode:false})
    ChangePublish = ()=>{
        const temp = !this.state.isPublished;
        const ref = firebase.database().ref('RuppinProjects/'+this.state.projectKey);
        if(!temp){
            this.setState({isPublished:temp})
            ref.update({
                isPublished:false,
            })
        }
        else{
            const isPublish = this.CheckValidation(this.getProjectDetails());
            if(isPublish){
                this.setState({isPublished:temp},()=>{
                        if(this.state.isSaved===true || this.state.groupData.ProjectName!==undefined){
                            ref.update({
                                isPublished:this.state.isPublished,
                            })
                            .then(()=>{
                                if(this.state.isPublished===true){
                                    this.setState({alertShow:true,alertTitle:'הפרויקט פורסם',alertText:'',alertIcon:'success'});
                                    const groupData = JSON.parse(localStorage.getItem('groupData'));
                                    GetHashtags(groupData.Faculty);
                                }
                                else this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'הפרויקט לא יפורסם',alertIcon:'warning'})
                            })
                            
                        }
                })
            }
        }
    }
    CloseAlert = ()=>{this.setState({alertShow:false})}
    render(){
        const {Configs} = this.state;
        if (!this.state.isReady) {
            return(
                <div style={{flex:1,marginTop:'20%'}}>
                    <Loader 
                    type="Watch"
                    color="#58947B"
                    height="100"	
                    width="100"
                    /> 
                </div>
            )
        }
        return(
            <div style={{flex:1,backgroundColor:'#eee'}}>
                <Idle/>
                <SAlert alertIcon={this.state.alertIcon} CloseAlert={this.CloseAlert} show={this.state.alertShow} title={this.state.alertTitle} text={this.state.alertText}/>
                <ModalImage showRatio={this.state.showRatio} aspect={this.state.imageAspect} savePic={this.savePic} picTitle={this.state.picTitle} title={this.state.modalTitle} modalClose={this.handleClose} modalOpen={this.state.openModal} />
                <PreviewModal deletePic={this.DeletePic} title={this.state.modalTitle} onHide={this.imagesModalClose} images={this.state.imagesToShowInModal} modalOpen={this.state.showImagesMode}/>
                <SaveAction Save={this.SetProjectOnFirbase}/>
                <NavbarProjs />
                <HeaderForm title={this.state.GroupName}/>
                {/* preview project card */}
                <Vt8 close={this.closePreview} projectDetails={this.state.projectDetails} openPreview={this.state.showPreview} SaveData={this.SaveData} />
                {/*publish project? */}
                <PublishProject ChangePublish={this.ChangePublish} isPublished={this.state.isPublished}  />
                <br/>
                <Button style={{backgroundColor:'#EECC4D',borderColor:'#EEE'}} onClick={()=>this.CheckValidation(this.getProjectDetails(),"check")}>אמת נתונים</Button>
                <Form style={{marginTop:'4%',marginLeft:'10%',marginRight:'10%'}}>
                    {/* Poject details */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:5,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title={"תיאור הפרויקט"}/>
                        {/* projectName */}
                        <TextInputs configs={Configs.ProjectName} defaultInput={this.state.ProjectName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectName} inputSize="lg" />
                        {/* project Customer name */}
                        <TextInputs configs={Configs.CustomerName} defaultInput={this.state.CustomerName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectCustomerName} inputSize="lg" />
                        {/* project Small Description */}
                        <TextareaInput configs={Configs.CDescription} defaultInput={this.state.CDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectSmallDesc} />
                        {/* project description */}
                        <RichText configs={Configs.PDescription} defaultInput={this.state.PDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectDesc}/>
                        {/* project Comments */}
                        <RichText configs={Configs.Comments} defaultInput={this.state.comments} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectComments} />
                        {/* project Recommendations */}
                        <RichText configs={Configs.Recommendations} defaultInput={this.state.Recommendations} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.Recommendations} />
                        <Form.Row dir="rtl">
                            {/* year  */}
                            <SelectInput IsMandatory={Configs.Year.isMandatory} defaultInput={this.state.Year} inputList={Years} InputTitle={sectionNames.projectYear} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* semester */}
                            <SelectInput IsMandatory={Configs.Semester.isMandatory} defaultInput={this.state.Semester}   inputList={['שנתי']} InputTitle={sectionNames.projectSemester} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* projectType */}
                            <SelectInput IsMandatory={Configs.ProjectTopic.isMandatory} defaultInput={this.state.ProjectTopic}  inputList={this.state.topicList} InputTitle={sectionNames.projectType} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* project advisor */}
                            <SelectInput IsMandatory={Configs.FirstAdvisor.isMandatory} inputList={this.state.advisorsList} defaultInput={this.state.ProjectAdvisor} InputTitle={sectionNames.projectFirstAdvisor} ChangeSelectInput={this.ChangeSelectedInputs} />
                        </Form.Row>
                    </div>
                    {/* tag the project */}
                    <Hashtags isMandatory={Configs.HashTags.isMandatory} minimum={Configs.HashTags.minimum} chosenHashs={this.state.tags} HashsChosen={this.HashsChosen} hashs={this.state.HashOptions.length===0?['']:this.state.HashOptions}/>                
                    {/* FILES UPLOAD */}
                    <div style={{border:'solid 1px',padding:20,borderRadius:5,marginTop:'2%',backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title="הוספת קבצים"/>
                            <Row dir="rtl" style={{marginTop:'2%'}} >
                                <Col sm="6">
                                    <Form.Label>
                                        {this.state.ProjectPDF!==''?'עריכת פוסטר':'הוספת פוסטר'}
                                        {Configs.ProjectPDF.isMandatory&&<span style={{color:'red'}}>*</span>}
                                    </Form.Label>
                                    <PDFupload  DeletePdf={this.DeletePdf} pdfFileSize={20000000} wordFileSize={5000000} savePDF={this.savePDF}/>
                                </Col>
                                <Col sm="6">
                                    <Form.Label>
                                        {this.state.ProjectPresentation!==''?' פורמט pdf ,עריכת מצגת':'הוספת מצגת'}
                                        {Configs.ProjectPresentation.isMandatory&&<span style={{color:'red'}}>*</span>}
                                    </Form.Label>                                    
                                    <PDFupload DeletePdf={this.DeletePresentation} pdfFileSize={20000000} wordFileSize={5000000} savePDF={this.savePresentation}/>
                                </Col>
                            </Row>
                            <Row dir="rtl" style={{marginTop:'2%'}} >
                                <Col sm="6">
                                    {
                                        this.state.ProjectPDF!==''&&
                                        <Button onClick={this.DeletePdf} variant="danger">
                                            {` מחיקת הפוסטר`}
                                        </Button>
                                    }
                                </Col>
                                <Col sm="6">
                                    {
                                        this.state.ProjectPresentation!==''&&
                                        <Button onClick={this.DeletePresentation} variant="danger">
                                            {` מחיקת המצגת`}
                                        </Button>
                                    }
                                </Col>
                            </Row>
                            
                            <Row dir="rtl" style={{marginTop:'2%'}} >
                                <Col></Col>
                                <Col>
                                    <Button style={{backgroundColor:'#85B9A7',borderColor:'#85B9A7'}} onClick={()=>this.OpenImageModal('Project Logo','Plogo')}>
                                        <FaCameraRetro/>
                                        {this.state.logo.length!==0?`  עריכת תמונה מייצגת`:`  הוספת תמונה מייצגת`}
                                    </Button>
                                    <br/>
                                    {Configs.ProjectLogo.isMandatory&&(Configs.ProjectLogo.minimum&&<span style={{color:'blue'}}>מינימום {Configs.ProjectLogo.minimum}</span>)}
                                </Col>
                                <Col></Col>
                            </Row>
                            
                    </div>
                    <StudentDetails Students={Configs.Students} Name={Configs.StudentName} Picture={Configs.StudentPicture} Email={Configs.StudentEmail} Id={Configs.StudentId} setStudents={this.getStudentsDetails} OpenImageModal={this.OpenImageModal} studentInitalDetails={this.state.StudentDetails} OpenPreviewModal={this.OpenImagePreviewForStudent}/>
                </Form>
            </div>
        );
    }
}
export default St8;

