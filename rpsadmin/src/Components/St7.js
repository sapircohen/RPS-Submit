import React from 'react';
import Loader from 'react-loader-spinner';
import NavbarProjs from './NavbarStudents';
import {Form,Row,Col,Button} from 'react-bootstrap';
import SelectInput from '../Common/inputSelect';
import TextInputs from '../Common/TextInputs';
import TextareaInput from '../Common/TextAreaInputs';
import SmallHeaderForm from '../Common/SmallHeaderForm';
import { FaPlusCircle,FaCameraRetro } from "react-icons/fa";
import PDFupload from '../Common/PdfFileUpload';
import StudentDetails from '../Common/StudentsDetails';
import ModalImage from '../Common/ImageModal';
import SaveAction from '../Common/SaveAction';
import HeaderForm from '../Common/HeaderForm';
import PublishProject from '../Common/PublishProject';
import firebase from 'firebase';
import {YearsSt3} from '../Common/Years';
import LabelTextPDF from '../Common/LabelText';
import PreviewModal from '../Common/imagesModalPrevies'
import RichText from '../Common/RichText2';
import SAlert from '../Common/SAlert';
import Idle from '../Common/Idle';
import Vt7 from './Vt7'
import Hashtags from '../Common/Tag2';
import { isObject } from 'util';
import {GetHashtags} from '../Common/HashtagsSetup';
import {ValidateData2} from '../functions/functions';
import Validator from '../Classes/Validator';
import {isArray} from 'util';

const sectionNames = {
    projectNeed:'שיטה',
    projectDesc : "שאלות המחקר",
    projectChallenges:"אתגרי הפרויקט",
    projectSmallDesc:"רקע תיאורטי ומדעי",
    projectGoal:"מטרת המחקר",
    projectName:"נושא המחקר",
    projectStackholders:"בעלי עניין",
    projectCustCustomers:"משתמשי המערכת",
    projectCustomerName:'שם הלקוח',
    projectType:'נושא הפרויקט',
    projectFirstAdvisor:"מנחה",
    projectMovie:'קישור לסרטון הפרויקט ביוטיוב',
    projectMajor:'התמחות',
    projectCourse:'סוג הפרויקט',
    projectSemester:'סמסטר',
    projectYear:'שנה',
    ProjectConclusion:'דיון ומסקנות',
    projectNeedSummery:'תקציר',
    projectFindings:'ממצאים',
    course :'',
    projectKey:'',
    projectSource:'מקורות',
    groupData :'',
}
export default class St3 extends React.Component{
    constructor(props){
        super(props);
        this.configs = JSON.parse(localStorage.getItem('TemplateConfig'))?JSON.parse(localStorage.getItem('TemplateConfig')):JSON.parse(localStorage.getItem('st7'));
        this.state = {
            alertTitle:'',
            alertText:'',
            alertShow:false,
            alertIcon:'warning',
            fileSize:0,
            isSaved:false,
            imageAspect:4/3,
            openModal:false,
            modalTitle:'',
            isPublished:true,
            StudentsDetails:[],
            poster:[],
            picTitle:'',
            imagesToShowInModal:[],
            GroupName:'',
            ProjectName:'',
            PDescription:'',
            ProjectPDF:'',
            advisorsList:[],
            coursesList:[],
            topicsList:[],
            expertiesList:[],
            projectDetails:{},
            HashSuggestions: [],
            HashOptions : [],
            tags:[],
            showPreview:false,
            CDescription:'',
            ProjectTopic:'',
            isReady:true,
            ProjectAdvisor:'',
            projectMajor:'',
            projectCourse:'',
            Year:'',
            Semester:'',
            ProjectGoal:'',
            ProjectNeed:'',
            ProjectConclusion:'',
            projectFindings:'',
            ScreenShots:[],
            ScreenShotsNames:[],
            showImagesMode:false,
            showRatio:false,
            Summery:'',
            Sources:'',
            templateValidators:this.configs,
            Configs:new Validator(this.configs)
        }
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
                // console.log("not save:", time-currentTime);
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
    GetData=()=>{
        const ref = firebase.database().ref('RuppinProjects').child(this.state.projectKey);
        let dataForGroup ={};
        ref.once("value", (snapshot)=> {
            dataForGroup=snapshot.val();
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
                ProjectTopic:dataForGroup.ProjectTopic?dataForGroup.ProjectTopic:'',
                projectCourse:dataForGroup.ProjectCourse?dataForGroup.ProjectCourse:this.state.course,
                projectMajor:dataForGroup.Major?dataForGroup.Major:'',
                GroupName:dataForGroup.GroupName,
                ProjectGoal:dataForGroup.ProjectGoal?dataForGroup.ProjectGoal:'',
                ProjectName:dataForGroup.ProjectName?dataForGroup.ProjectName:'',
                PDescription:dataForGroup.PDescription?dataForGroup.PDescription:'',
                poster:dataForGroup.ProjectLogo?(isArray(dataForGroup.ProjectLogo)?dataForGroup.ProjectLogo[0]:dataForGroup.ProjectLogo):[],
                ProjectPDF:dataForGroup.ProjectPDF?dataForGroup.ProjectPDF:'',
                isPublished:dataForGroup.isPublished?dataForGroup.isPublished:false,
                StudentDetails:dataForGroup.Students?dataForGroup.Students:[],
                CDescription:dataForGroup.CDescription?dataForGroup.CDescription:'',
                ProjectAdvisor:dataForGroup.Advisor?dataForGroup.Advisor:'',
                projectFindings:dataForGroup.projectFindings?dataForGroup.projectFindings:'',
                ProjectConclusion:dataForGroup.ProjectConclusion?dataForGroup.ProjectConclusion:'',
                ProjectNeed:dataForGroup.ProjectNeed?dataForGroup.ProjectNeed:'',
                Summery:dataForGroup.Summery?dataForGroup.Summery:'',
                ScreenShots:dataForGroup.ScreenShots?dataForGroup.ScreenShots:[],
                ScreenShotsNames:dataForGroup.ScreenShotsNames?dataForGroup.ScreenShotsNames:[],
                Sources:dataForGroup.Sources?dataForGroup.Sources:'',
                tags:tagsList,
            })
            //get list of advisors from firebase
            this.getAdvisorsForDepartment();
            //get list of Experties
            this.getExperties();
            //get list of courses
            this.getCoursesForExpertis();
            //get hashtags
            this.getHashs();
            
        },()=>this.setState({projectDetails:this.getProjectDetails()}))
    }
    getProjectDetails = ()=>{
        const project = {
            ProjectName:this.state.ProjectName,
            PDescription:this.state.PDescription,
            Advisor:[this.state.ProjectAdvisor],
            Major:this.state.projectMajor,
            ProjectCourse:this.state.projectCourse,
            ProjectTopic:this.state.ProjectTopic,
            Students:this.state.StudentsDetails,
            isPublished:this.state.isPublished,
            ProjectLogo:this.state.poster[0],
            ProjectPDF:this.state.ProjectPDF,
            CDescription:this.state.CDescription,
            ProjectGoal:this.state.ProjectGoal,
            ProjectNeed:this.state.ProjectNeed,
            Summery:this.state.Summery,
            ProjectConclusion:this.state.ProjectConclusion,
            ProjectFindings:this.state.projectFindings,
            Year:this.state.Year,
            Semester:this.state.Semester,
            ScreenShots:this.state.ScreenShots,
            ScreenShotsNames:this.state.ScreenShotsNames,
            HashTags:this.state.tags,
            Sources:this.state.Sources,
        }
        return project;
    }
    getAdvisorsForDepartment = ()=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(this.state.groupData.Faculty).child('Departments').child(this.state.groupData.Department).child('Advisors');
        ref.once("value", (snapshot)=> {
            this.setState({advisorsList:snapshot.val()});
            //console.log(snapshot.val())
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
        })
    }
    getCoursesForExpertis = ()=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(this.state.groupData.Faculty).child('Departments').child(this.state.groupData.Department).child('Experties').child(this.state.groupData.Major).child('Courses');
        ref.once("value", (snapshot)=> {
            snapshot.forEach((course)=> {
                this.setState({
                    coursesList:[...this.state.coursesList,course.val().Name]
                })
            })
        })
        .then(()=>{
            this.getTopicsListForCourses();
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
    getExperties = ()=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(this.state.groupData.Faculty).child('Departments').child(this.state.groupData.Department).child('Experties');
        ref.once("value", (snapshot)=> {
            snapshot.forEach((exp)=> {
                this.setState({
                    expertiesList:[...this.state.expertiesList,exp.val().Name]
                })
            })
        })
        
    }
    getTopicsListForCourses=()=>{
        this.state.coursesList.forEach((course)=>{
            let ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(this.state.groupData.Faculty).child('Departments').child(this.state.groupData.Department).child('Experties').child(this.state.groupData.Major).child('Courses').child(course).child('Topics');
            ref.once("value", (snapshot)=> {
                snapshot.forEach((topic)=> {
                    this.setState({
                        topicsList:[...this.state.topicsList,topic.val().Name]
                    })
                })
            })
        })
    }
    //text input area details
    ChangeInputTextarea = (event,textareaTitle)=>{
        switch (textareaTitle) {
            case sectionNames.projectDesc:this.setState({PDescription:event})
                break;
            case sectionNames.projectSmallDesc:this.setState({CDescription:event.target.value})
                    break;
            case sectionNames.projectName:this.setState({ProjectName:event.target.value})
                break;
            case sectionNames.projectNeedSummery:this.setState({Summery:event})
                break;
            case sectionNames.projectFindings:this.setState({projectFindings:event})
                break;
            case sectionNames.projectGoal:this.setState({ProjectGoal:event})
                break;
            case sectionNames.ProjectConclusion:this.setState({ProjectConclusion:event})
                break;
            case sectionNames.projectNeed:this.setState({ProjectNeed:event})
                break;
            case sectionNames.projectSource:this.setState({Sources:event})
                break;
           default:
               break;
        }
    }
    //select input details
    ChangeSelectedInputs = (event,selectedTitle)=>{
        switch (selectedTitle) {
            case sectionNames.projectType:this.setState({ProjectTopic:event.target.value})
                break;
            case sectionNames.projectFirstAdvisor:this.setState({ProjectAdvisor:event.target.value})
                break;
            case sectionNames.projectMajor:this.setState({projectMajor:event.target.value})
                break;
            case sectionNames.projectCourse:this.setState({projectCourse:event.target.value})
                break;
            case sectionNames.projectSemester:this.setState({Semester:event.target.value})
                break;
            case sectionNames.projectYear:this.setState({Year:event.target.value})
                break;
            default:
                break;
        }
    }
    //screenshots preview
    OpenImagePreview = (title)=>{
        switch (title) {
            case 'Screenshots':
                this.setState({
                    modalTitle:title,
                    showImagesMode:true,
                    imagesToShowInModal:this.state.ScreenShots
                })
                break;
            default:
                break;
        }
    }
    //close screenshots modal
    imagesModalClose = ()=>this.setState({showImagesMode:false})
    //delete image from screenshots
    DeletePic = (picURL)=>{
        console.log(picURL)
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
    //students details
    getStudentsDetails = (students)=>{
        this.setState({StudentsDetails:students});
    }
    changeStudentImage = (url,index)=>{
        this.state.StudentsDetails[index].Picture = url;
        this.forceUpdate();
        console.log(this.state.StudentsDetails);
    }
    HashsChosen =(value)=>{
        this.setState({
            tags:value.map((val)=>{
                console.log(val)
                return val;
            })
        })
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
    //image modal
    OpenImageModal = (title,index,fileSize)=>{
        let temp = false;
        if(title==='Screenshots'){
            temp = true;
        }
        if(title==='Project Logo'){
            this.setState({modalTitle:title,picTitle:index,fileSize:fileSize,openModal:true,showRatio:temp})
        }
        else{
            this.setState({openModal:true,modalTitle:title,picTitle:index,fileSize:0,showRatio:temp})
        }
    }
    handleClose = ()=> this.setState({ openModal: false });
    //save picture
    savePic=(url,title,index,screenshotName)=>{
        switch (title) {
            case 'Project Logo':this.setState({poster:[url]})
                break;
            case 'Student Pic': this.changeStudentImage(url,index)
                break;
            case 'Screenshots':this.changeScreenshots(url,screenshotName)
                break;
            default:
                break;
        }
    }
    changeScreenshots= (url,name)=>{
        this.setState({
            ScreenShots:[...this.state.ScreenShots,url],
            ScreenShotsNames:[...this.state.ScreenShotsNames,name]
        })
    }
    //save project to object and show preview
    SetProjectOnFirbase = ()=>{
        const project = this.getProjectDetails();
        this.setState({
            projectDetails:project,
        },()=>{
            this.setState({showPreview:true})
        })
    }
    //close project preview
    closePreview = ()=>this.setState({showPreview:false})
    //new validation
    CheckValidation=(projectData,trigger)=>{
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
        const ref = firebase.database().ref('RuppinProjects/'+this.state.projectKey);
        ref.update({
            templateSubmit:'st7',
            templateView:'vt7',
            Summery:this.state.Summery,
            ProjectName:this.state.ProjectName,
            PDescription:this.state.PDescription,
            Sources:this.state.Sources,
            Advisor:[this.state.ProjectAdvisor],
            Major:this.state.projectMajor,
            ProjectCourse:this.state.projectCourse,
            ProjectTopic:this.state.ProjectTopic,
            Students:this.state.StudentsDetails,
            isPublished:this.state.isPublished,
            ProjectLogo:this.state.poster[0]?this.state.poster[0]:'',
            ProjectPDF:this.state.ProjectPDF,
            CDescription:this.state.CDescription,
            ProjectGoal:this.state.ProjectGoal,
            ProjectNeed:this.state.ProjectNeed,
            ProjectConclusion:this.state.ProjectConclusion,
            projectFindings:this.state.projectFindings,
            Year:this.state.Year,
            Semester:this.state.Semester,
            ScreenShots:this.state.ScreenShots,
            ScreenShotsNames:this.state.ScreenShotsNames,
            HashTags:this.state.tags,
        })
       // call hashtag method
       //
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
    CloseAlert = ()=>{this.setState({alertShow:false},()=>console.log(this.state.alertShow))}
    render(){
        const {Configs} = this.state;
        if (!this.state.isReady) {
            return(
                <div style={{flex:1,backgroundColor:'#eee'}}>
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
            <div style={{flex:1}}>
                <Idle/>
                <NavbarProjs/>
                <SAlert alertIcon={this.state.alertIcon} CloseAlert={this.CloseAlert} show={this.state.alertShow} title={this.state.alertTitle} text={this.state.alertText}/>
                <HeaderForm title={this.state.GroupName}/>
                <PublishProject ChangePublish={this.ChangePublish} isPublished={this.state.isPublished}  />
                <br/>
                <Button style={{backgroundColor:'#EECC4D',borderColor:'#EEE'}} onClick={()=>this.CheckValidation(this.getProjectDetails(),"check")}>אמת נתונים</Button>
                <ModalImage showRatio={this.state.showRatio} fileSize={this.state.fileSize} aspect={this.state.imageAspect} savePic={this.savePic} picTitle={this.state.picTitle} title={this.state.modalTitle} modalClose={this.handleClose} modalOpen={this.state.openModal} />
                {/* preview for screenshots  */}
                <PreviewModal deletePic={this.DeletePic} title={this.state.modalTitle} onHide={this.imagesModalClose} images={this.state.imagesToShowInModal} modalOpen={this.state.showImagesMode}/>
                
                {/* showPreview */}
                <SaveAction Save={this.SetProjectOnFirbase}/>
                <Vt7 showRatio={this.state.showRatio} close={this.closePreview} projectDetails={this.state.projectDetails} openPreview={this.state.showPreview} SaveData={this.SaveData}/>
                {/* inputs */}
                <Form style={{marginTop:'4%',marginLeft:'10%',marginRight:'10%'}}>
                    {/* Project details */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>   
                        <SmallHeaderForm title={"תיאור המחקר"}/>
                        {/* project name */}
                        <TextInputs configs={Configs.ProjectName} defaultInput={this.state.ProjectName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectName} inputSize="lg" />
                        {/* project need summery */}
                        <RichText configs={Configs.ProjectSummery} defaultInput={this.state.Summery} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectNeedSummery} />
                        {/* project small description */}
                        <TextareaInput configs={Configs.CDescription} defaultInput={this.state.CDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectSmallDesc} />
                        {/* project description */}
                        <RichText configs={Configs.PDescription} defaultInput={this.state.PDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectDesc} />
                        {/* project Goal */}
                        <RichText configs={Configs.ProjectGoal}  defaultInput={this.state.ProjectGoal} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectGoal} />
                        {/* project need */}
                        <RichText configs={Configs.ProjectNeed} defaultInput={this.state.ProjectNeed} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectNeed} />
                        {/* Project Findings*/}
                        <RichText configs={Configs.ProjectFindings} defaultInput={this.state.projectFindings} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectFindings} />
                        {/* Project Conclusion*/}
                        <RichText configs={Configs.ProjectConclusion} defaultInput={this.state.ProjectConclusion} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.ProjectConclusion} />
                        {/* project sources */}
                        <RichText configs={Configs.Sources} defaultInput={this.state.Sources} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectSource} />
                        <Form.Row dir="rtl">
                            {/* project major
                            <SelectInput IsMandatory={true}  inputList={this.state.expertiesList} defaultInput={this.state.projectMajor} InputTitle={sectionNames.projectMajor} ChangeSelectInput={this.ChangeSelectedInputs} /> */}
                        </Form.Row>
                        <Form.Row dir="rtl">
                            {/* project advisor */}
                            <SelectInput IsMandatory={Configs.FirstAdvisor.isMandatory} inputList={this.state.advisorsList} defaultInput={this.state.ProjectAdvisor} InputTitle={sectionNames.projectFirstAdvisor} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* year  */}
                            <SelectInput IsMandatory={Configs.Year.isMandatory}defaultInput={this.state.Year}  inputList={YearsSt3} InputTitle={sectionNames.projectYear} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* semester */}
                            <SelectInput IsMandatory={Configs.Semester.isMandatory} defaultInput={this.state.Semester}  inputList={['שנתי','א','ב','קיץ']} InputTitle={sectionNames.projectSemester} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/*project topic */}
                            <SelectInput IsMandatory={Configs.ProjectTopic.isMandatory} inputList={this.state.topicsList} defaultInput={this.state.ProjectTopic} InputTitle={sectionNames.projectType} ChangeSelectInput={this.ChangeSelectedInputs} />
                        </Form.Row>
                    </div>
                    {/* FILES UPLOAD */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,marginTop:30,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title="הוספת קבצים"/>
                        <Row dir="rtl" style={{marginTop:'2%'}} >
                            <Col sm="4"></Col>
                            <Col sm="4">
                                <LabelTextPDF ProjectPDF={this.state.ProjectPDF} IsMandatory={Configs.ProjectPDF.isMandatory} />
                                <PDFupload DeletePdf={this.DeletePdf} pdfFileSize={20000000} wordFileSize={5000000} savePDF={this.savePDF}/>
                            </Col>
                            <Col sm="4"></Col>
                        </Row>
                        <Row dir="rtl" style={{marginTop:'2%'}} >
                            <Col sm="4"></Col>
                            <Col sm="4">
                                {
                                    this.state.ProjectPDF!==''&&
                                    <Button onClick={this.DeletePdf} variant="danger">
                                        {` מחיקת המסמך`}
                                    </Button>
                                }
                            </Col>
                            <Col sm="4"></Col>
                        </Row>
                        <Row dir="rtl" style={{marginTop:'2%'}} >
                            <Col sm="2"></Col> 
                            <Col sm="4">
                                <Button variant="primary" onClick={()=>this.OpenImageModal('Screenshots','')}>
                                    <FaPlusCircle size={15}/>
                                    {` הוספת תמונות/תרשימים`}
                                </Button>
                                <br/>
                                {Configs.ScreenShots.isMandatory&&(Configs.ScreenShots.minimum&&<span style={{color:'blue'}}>מינימום {Configs.ScreenShots.minimum}</span>)}
                            </Col>
                            <Col sm="4">
                                <Button onClick={()=>this.OpenImageModal('Project Logo')} variant="primary">
                                    <FaPlusCircle size={15}/>
                                    {this.state.poster.length!==0?`  עריכת תמונה מייצגת`:`  הוספת תמונה מייצגת`}   
                                </Button>
                                <br/>
                                {Configs.ProjectLogo.isMandatory&&(Configs.ProjectLogo.minimum&&<span style={{color:'blue'}}>מינימום {Configs.ProjectLogo.minimum}</span>)}
                            </Col>
                            <Col sm="2"> </Col>
                        </Row>
                        <Row dir="rtl" style={{marginTop:'2%'}} >
                            <Col sm="2"></Col>
                            <Col sm="4">
                                <Button style={{backgroundColor:'#EECC4D',borderColor:'#EEE'}} onClick={()=>this.OpenImagePreview('Screenshots')}>
                                    <FaCameraRetro/>
                                    {`  עריכת תמונות/תרשימים`}
                                </Button>
                            </Col>
                            <Col sm="4"></Col>
                            <Col sm="2"></Col>
                        </Row>
                    </div>
                    {/* tag the project */}
                    <Hashtags isMandatory={Configs.HashTags.isMandatory} minimum={Configs.HashTags.minimum} chosenHashs={this.state.tags} HashsChosen={this.HashsChosen} hashs={this.state.HashOptions}/>
                    {/* Students details */}
                    <StudentDetails Students={Configs.Students} Name={Configs.StudentName} Picture={Configs.StudentPicture} Email={Configs.StudentEmail} Id={Configs.StudentId} setStudents={this.getStudentsDetails} studentInitalDetails={this.state.StudentDetails} OpenImageModal={this.OpenImageModal}/>
                </Form>
            </div>
        )
    }
}