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
import LinkInput from '../Common/Projectlinks';
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
import Hashtags from '../Common/Tag2';
import { isObject } from 'util';
import {GetHashtags} from '../Common/HashtagsSetup';
import Vt6 from './Vt6';


export default class St3 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ProjectName:'',
            ServiceName:'',
            Instructor:'',
            TargetPopulation:'',
            Summery:'',
            Goals:'',
            Rationale:'',
            PDescription:'',
            Recommendations:'',
            Sources:'',
            ProjectPDF:'',
            ProjectLogo:[],
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
            picTitle:'',
            imagesToShowInModal:[],
            GroupName:'',
            advisorsList:[],
            coursesList:[],
            topicsList:[],
            expertiesList:[],
            projectDetails:{},
            HashSuggestions: [],
            HashOptions : [],
            tags:[],
            showPreview:false,
            ProjectTopic:'',
            isReady:true,
            ProjectAdvisor:'',
            projectMajor:'',
            projectCourse:'',
            Year:'',
            Semester:'',
            ScreenShots:[],
            ScreenShotsNames:[],
            MovieLink:'',
            showImagesMode:false,
        }
    }
    componentDidMount(){
        this.setState({
            course :JSON.parse(localStorage.getItem('course')),
            projectKey:JSON.parse(localStorage.getItem('projectKey')),
            groupData :JSON.parse(localStorage.getItem('groupData'))
        },()=>{
            this.GetData();
        })
        window.setInterval(()=>{
            let currentTime = JSON.parse(localStorage.getItem('currentTime'));
            let time = new Date();
            if((time-currentTime)>10000){
                console.log("not save:", time-currentTime);
            }
            else{
            this.SaveData();
            if(this.state.isPublished){
                if(!this.ValidateData(this.getProjectDetails())){
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
                projectCourse:this.state.course,
                projectMajor:dataForGroup.Major?dataForGroup.Major:'',
                MovieLink:dataForGroup.MovieLink?dataForGroup.MovieLink:'',
                GroupName:dataForGroup.GroupName,
                Goals:dataForGroup.Goals?dataForGroup.Goals:'',
                ProjectName:dataForGroup.ProjectName?dataForGroup.ProjectName:'',
                ServiceName:dataForGroup.ServiceName?dataForGroup.ServiceName:'',
                Instructor:dataForGroup.Instructor?dataForGroup.Instructor:'',
                PDescription:dataForGroup.PDescription?dataForGroup.PDescription:'',
                ProjectLogo:dataForGroup.ProjectLogo?dataForGroup.ProjectLogo:[],
                ProjectPDF:dataForGroup.ProjectPDF?dataForGroup.ProjectPDF:'',
                isPublished:dataForGroup.isPublished?dataForGroup.isPublished:false,
                StudentDetails:dataForGroup.Students?dataForGroup.Students:[],
                Summery:dataForGroup.Summery?dataForGroup.Summery:'',
                ProjectAdvisor:dataForGroup.Advisor?dataForGroup.Advisor:'',
                TargetPopulation:dataForGroup.TargetPopulation?dataForGroup.TargetPopulation:'',
                Rationale:dataForGroup.Rationale?dataForGroup.Rationale:'',
                Recommendations:dataForGroup.Recommendations?dataForGroup.Recommendations:'',
                Sources:dataForGroup.Sources?dataForGroup.Sources:'',
                ScreenShots:dataForGroup.ScreenShots?dataForGroup.ScreenShots:[],
                ScreenShotsNames:dataForGroup.ScreenShotsNames?dataForGroup.ScreenShotsNames:[],
                tags:tagsList,

            },()=>{console.log(this.state.ProjectAdvisor)})
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
            ServiceName:this.state.ServiceName,
            ProjectName:this.state.ProjectName,
            PDescription:this.state.PDescription,
            Advisor:[this.state.ProjectAdvisor],
            Major:this.state.projectMajor,
            ProjectCourse:this.state.projectCourse,
            ProjectTopic:this.state.ProjectTopic,
            Students:this.state.StudentsDetails,
            isPublished:this.state.isPublished,
            MovieLink:this.state.MovieLink,
            ProjectLogo:this.state.ProjectLogo[0],
            ProjectPDF:this.state.ProjectPDF,
            Rationale:this.state.Rationale,
            TargetPopulation:this.state.TargetPopulation,
            Goals:this.state.Goals,
            Recommendations:this.state.Recommendations,
            Instructor:this.state.Instructor,
            Sources:this.state.Sources,
            Summery:this.state.Summery,
            Year:this.state.Year,
            Semester:this.state.Semester,
            ScreenShots:this.state.ScreenShots,
            ScreenShotsNames:this.state.ScreenShotsNames,
            HashTags:this.state.tags,
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
                    console.log(topic.val().Name)
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
            case sectionNames.projectName:this.setState({ProjectName:event.target.value})
                break;
            case sectionNames.projectServiceName:this.setState({ServiceName:event.target.value})
                break;
            case sectionNames.projectInstructor:this.setState({Instructor:event.target.value})
                break;
            case sectionNames.projectTargetPopulation:this.setState({TargetPopulation:event.target.value})
                break;
            case sectionNames.projectNeedSummery:this.setState({Summery:event})
                break;
            case sectionNames.projectDescription:this.setState({PDescription:event})
                break;
            case sectionNames.projectGoals:this.setState({Goals:event})
                break;
            case sectionNames.projectRationale:this.setState({Rationale:event})
                break;
            case sectionNames.projectRecommendations:this.setState({Recommendations:event})
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
        if(title==='Project Logo'){
            this.setState({modalTitle:title,picTitle:index,fileSize:fileSize,openModal:true})
        }
        else{
            this.setState({openModal:true,modalTitle:title,picTitle:index,fileSize:0})
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
    ChangeLinkInput = (event,linkTitle)=>{
        switch (linkTitle) {
            case sectionNames.projectMovie:
                this.setState({MovieLink:event.target.value})
                break;
            default:
                break;
        }
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
    //validate inputs
    ValidateData = (projectData)=>{
        // project name validation
        if (projectData.ProjectName.length<30 || projectData.ProjectName.length>150) {
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'שם הפרויקט צריך להיות בין 30 ל150 תוים',alertIcon:'warning'})
            return false;
        }
        if (projectData.ServiceName.length<30 || projectData.ServiceName.length>150) {
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'שם השירות צריך להיות בין 30 ל150 תוים',alertIcon:'warning'})
            return false;
        }
        if (projectData.Instructor.length<30 || projectData.Instructor.length>100) {
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'שם המדריך/ה צריך להיות בין 30 ל100 תוים',alertIcon:'warning'})
            return false;
        }
        if (projectData.TargetPopulation.length<30 || projectData.TargetPopulation.length>300) {
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'תיאור אוכלוסיית יעד צריך להיות בין 30 ל300 תוים',alertIcon:'warning'})
            return false;
        }
        if(projectData.Summery.length<30 || projectData.Summery.length>1000){
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'תקציר הבעיה צריך להיות בין 30 ל1000 תוים',alertIcon:'warning'})
            return false;
        }
        if(projectData.Goals.length<30 || projectData.Goals.length>1000){
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'מטרות ההתערבות צריך להיות בין 30 ל1000 תוים',alertIcon:'warning'})
            return false;
        }
        if(projectData.Rationale.length<30 || projectData.Rationale.length>1000){
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'רציונאל ההתערבות צריך להיות בין 30 ל1000 תוים',alertIcon:'warning'})
            return false;
        }
        if(projectData.PDescription.length<30 || projectData.PDescription.length>1000){
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'תיאור הפרויקט צריך להיות בין 30 ל1000 תווים',alertIcon:'warning'})
            return false;
        }
        if(projectData.Recommendations.length<30 || projectData.Recommendations.length>1000){
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'שדה מסקנות והמלצות צריך להיות בין 30 ל1000 תווים',alertIcon:'warning'})
            return false;
        }
        if(projectData.Sources.length<30 || projectData.Sources.length>1000){
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'שדה מקורות צריך להיות בין 30 ל1000 תווים',alertIcon:'warning'})
            return false;
        }
        //project year
        if(projectData.Year === "" || projectData.Year === "בחר"){
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'יש לבחור שנה',alertIcon:'warning'})

            return false;
        }
        //project Semester
        if(projectData.Semester === "" || projectData.Semester === "בחר"){
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'יש לבחור סמסטר',alertIcon:'warning'})

            return false;
        }
        //project major/experties
        if(projectData.Major === ""){
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'יש לבחור התמחות',alertIcon:'warning'})

            return false;
        }
        //project course
        if(projectData.ProjectCourse === ""){
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'יש לבחור סוג',alertIcon:'warning'})

            return false;
        }
        //project topic
        if(projectData.ProjectTopic === ""){
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'יש לבחור נושא',alertIcon:'warning'})

            return false;
        }
        //project advisor
        if(projectData.Advisor[0] === ""){
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'יש לבחור מנחה',alertIcon:'warning'})

            return false;
        }
        //project students
        if(projectData.Students.length<1){
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'חובה שיהיה לפחות חבר צוות אחד',alertIcon:'warning'})

            return false;
        }
        else{
            let flag = true;
            projectData.Students.forEach((student,index)=>{
                if(student.Name===''){
                    this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'לסטודנט/ית מספר '+(index+1)+' חסר שם',alertIcon:'warning'})

                    flag = false;
                }
            })
            if (!flag) {
                return false;
            }
        }
        if(projectData.ProjectPDF ===''){
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'חסר קובץ PDF/WORD',alertIcon:'warning'})

            return false;
        }
        //project screenshots
        if (projectData.ScreenShots.length>5) {
            this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'מספר תמונות המסך הוא עד 5',alertIcon:'warning'})

            return false;
        }      
        this.setState({
            isSaved:true
        })
        return true;
    }
    SaveData = ()=>{
        const ref = firebase.database().ref('RuppinProjects/'+this.state.projectKey);
        ref.update({
            templateSubmit:'st6',
            templateView:'vt6',
            ProjectName:this.state.ProjectName,
            Instructor:this.state.Instructor,
            ServiceName:this.state.ServiceName,
            Sources:this.state.Sources,
            Recommendations:this.state.Recommendations,
            Rationale:this.state.Rationale,
            TargetPopulation:this.state.TargetPopulation,
            Summery:this.state.Summery,
            Goals:this.state.Goals,
            PDescription:this.state.PDescription,
            Advisor:this.state.ProjectAdvisor,
            Major:this.state.projectMajor,
            ProjectCourse:this.state.projectCourse,
            ProjectTopic:this.state.ProjectTopic,
            Students:this.state.StudentsDetails,
            isPublished:this.state.isPublished,
            MovieLink:this.state.MovieLink,
            ProjectLogo:this.state.ProjectLogo[0]?this.state.ProjectLogo[0]:'',
            ProjectPDF:this.state.ProjectPDF,
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
        if(this.ValidateData(this.getProjectDetails())){
            this.setState({isPublished:temp},()=>{
                if(this.state.isSaved===true || this.state.groupData.ProjectName!==undefined){
                    const ref = firebase.database().ref('RuppinProjects/'+this.state.projectKey);
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
    CloseAlert = ()=>{this.setState({alertShow:false})}
    render(){
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
                <ModalImage fileSize={this.state.fileSize} aspect={this.state.imageAspect} savePic={this.savePic} picTitle={this.state.picTitle} title={this.state.modalTitle} modalClose={this.handleClose} modalOpen={this.state.openModal} />
                {/* preview for screenshots  */}
                <PreviewModal deletePic={this.DeletePic} title={this.state.modalTitle} onHide={this.imagesModalClose} images={this.state.imagesToShowInModal} modalOpen={this.state.showImagesMode}/>
                {/* showPreview */}
                <SaveAction Save={this.SetProjectOnFirbase}/>
                <Vt6 close={this.closePreview} projectDetails={this.state.projectDetails} openPreview={this.state.showPreview} SaveData={this.SaveData}/>
                {/* inputs */}
                <Form style={{marginTop:'4%',marginLeft:'10%',marginRight:'10%'}}>
                    {/* Project details */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>   
                        <SmallHeaderForm title={"תיאור הפרויקט"}/>
                        {/* project name */}
                        <TextInputs IsMandatory={true}  defaultInput={this.state.ProjectName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectName} inputSize="lg" />
                        {/* project service name */}
                        <TextInputs IsMandatory={true}  defaultInput={this.state.ServiceName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectServiceName} inputSize="lg" />
                        {/* project instructor name */}
                        <TextInputs IsMandatory={true}  defaultInput={this.state.Instructor} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectInstructor} inputSize="lg" />                    
                        {/* project target population */}
                        <TextareaInput IsMandatory={true}  defaultInput={this.state.TargetPopulation} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectTargetPopulation} />
                        {/* project need summery */}
                        <RichText IsMandatory={true}  defaultInput={this.state.Summery} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectNeedSummery} />
                        {/* project goals */}
                        <RichText IsMandatory={true}  defaultInput={this.state.Goals} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectGoals} />
                        {/* project Rationale */}
                        <RichText IsMandatory={true}  defaultInput={this.state.Rationale} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectRationale} />
                        {/* project description */}
                        <RichText IsMandatory={true}  defaultInput={this.state.PDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectDescription} />
                        {/* project Recommendations */}
                        <RichText IsMandatory={true}  defaultInput={this.state.Recommendations} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectRecommendations} />
                        {/* project sources */}
                        <RichText IsMandatory={true}  defaultInput={this.state.Sources} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectSource} />
                        <Form.Row dir="rtl">
                            {/* project advisor */}
                            <SelectInput IsMandatory={true}  inputList={this.state.advisorsList} defaultInput={this.state.ProjectAdvisor} InputTitle={sectionNames.projectFirstAdvisor} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* year  */}
                            <SelectInput IsMandatory={true} defaultInput={this.state.Year}  inputList={YearsSt3} InputTitle={sectionNames.projectYear} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* semester */}
                            <SelectInput IsMandatory={true} defaultInput={this.state.Semester}  inputList={['שנתי','א','ב','קיץ']} InputTitle={sectionNames.projectSemester} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/*project topic */}
                            <SelectInput IsMandatory={true}  inputList={this.state.topicsList} defaultInput={this.state.ProjectTopic} InputTitle={sectionNames.projectType} ChangeSelectInput={this.ChangeSelectedInputs} />
                        </Form.Row>
                    </div>
                    {/* FILES UPLOAD */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,marginTop:30,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title="הוספת קבצים"/>
                        {/* project movie link */}
                        <LinkInput ChangeLinkInput={this.ChangeLinkInput} defaultInput={this.state.MovieLink} InputTitle={sectionNames.projectMovie} inputSize="sm" placeholder="www.youtube.com"/>
                        <Row dir="rtl" style={{marginTop:'2%'}} >
                            <Col sm="4"></Col>
                            <Col sm="4">
                                <LabelTextPDF ProjectPDF={this.state.ProjectPDF} IsMandatory={true} />
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
                            </Col>
                            <Col sm="4">
                                <Button onClick={()=>this.OpenImageModal('Project Logo')} variant="primary">
                                    <FaPlusCircle size={15}/>
                                    {this.state.ProjectLogo.length!==0?`  עריכת תמונה מייצגת`:`  הוספת תמונה מייצגת`}   
                                </Button>
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
                                        <Hashtags chosenHashs={this.state.tags} HashsChosen={this.HashsChosen} hashs={this.state.HashOptions}/>

                    {/* Students details */}
                    <StudentDetails setStudents={this.getStudentsDetails} studentInitalDetails={this.state.StudentDetails} OpenImageModal={this.OpenImageModal}/>
                </Form>
            </div>
        )
    }
}


const sectionNames = {
    projectServiceName:'שם השירות',
    projectName:"שם הפרויקט",
    projectInstructor:"שם המדריך/ה", 
    projectTargetPopulation:'אוכלוסיית היעד',
    projectNeedSummery:'תקציר הבעיה',
    projectGoals:'מטרות ההתערבות',
    projectRationale:'רציונל ההתערבות',
    projectDescription:'תיאור ההתערבות',
    projectRecommendations:'הערכה והמלצות',
    projectSource:'מקורות',

    projectType:'נושא הפרויקט',
    projectFirstAdvisor:"מרצה",
    projectMovie:'קישור לסרטון הפרויקט ביוטיוב',
    projectMajor:'התמחות',
    projectCourse:'סוג הפרויקט',
    projectSemester:'סמסטר',
    projectYear:'שנה',
    course :'',
    projectKey:'',
    groupData :''
}