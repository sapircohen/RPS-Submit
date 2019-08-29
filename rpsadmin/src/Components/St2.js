import React from 'react';
import NavbarProjs from './NavbarStudents';
import {Col,Row,Form,Button} from 'react-bootstrap';
import HeaderForm from '../Common/HeaderForm';
import SmallHeaderForm from '../Common/SmallHeaderForm';
import ModalImage from '../Common/ImageModal';
import StudentDetails from '../Common/StudentsDetails';
import { FaPlusCircle } from "react-icons/fa";
import firebase from 'firebase';
import SaveAction from '../Common/SaveAction';
import PDFupload from '../Common/PdfFileUpload';
import PreviewCard from './PreviewProjectCard';
import Loader from 'react-loader-spinner';
//commons
import RichText from '../Common/RichText2';
import PublishProject from '../Common/PublishProject';
import TextInputs from '../Common/TextInputs';
import SelectInput from '../Common/inputSelect';
import LinkInput from '../Common/Projectlinks';
import {Years} from '../Common/Years';
import LabelTextPDF from '../Common/LabelText';
import SAlert from '../Common/SAlert';
import Idle from '../Common/Idle';

const sectionNames = {
    projectDesc : "תיאור הפרויקט",
    projectChallenges:"אתגרי הפרויקט",
    projectComments:"הערות",
    projectName:"שם הפרויקט",
    projectType:'נושא הפרויקט',
    projectFirstAdvisor:"מנחה",
    projectLink:'קישור לאתר הפרויקט',
    projectMovie:'קישור לסרטון הפרויקט ביוטיוב',
    projectMajor:'התמחות',
    projectCourse:'סוג הפרויקט',
    projectSemester:'סמסטר',
    projectYear:'שנה'
}
class St2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            alertTitle:'',
            alertText:'',
            alertIcon:'warning',
            alertShow:false,
            isSaved:false,
            fileSize:0,
            imageAspect:4/3,
            openModal:false,
            modalTitle:'',
            isPublished:false,
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
            showPreview:false,
            ProjectTopic:'',
            isReady:true,
            ProjectAdvisor:'',
            projectMajor:'',
            projectCourse:'',
            Year:'',
            Semester:'',
            projectKey:'',
            groupData :''
        }
    }
    componentDidMount(){
        this.setState({
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
                this.setState({alertShow:true,alertTitle:'הפרויקט לא יפורסם',alertText:'הפרויקט לא יפורסם, תקנו את הנדרש ופרסמו שוב',alertIcon:'warning'})
            }
        }
    }
       },6000)
    }
    GetData=()=>{
        //get group data from local storage
        const ref = firebase.database().ref('RuppinProjects').child(this.state.projectKey);
        let dataForGroup ={};
        ref.once("value", (snapshot)=> {
            dataForGroup=snapshot.val();
            console.log(dataForGroup)
        })
        .then(()=>{
            const course = JSON.parse(localStorage.getItem('course'));
            this.setState({
                Year:dataForGroup.Year?dataForGroup.Year:'',
                Semester:dataForGroup.Semester?dataForGroup.Semester:'',
                ProjectTopic:dataForGroup.ProjectTopic?dataForGroup.ProjectTopic:'',
                projectCourse:course,
                projectMajor:dataForGroup.Major?dataForGroup.Major:'',
                MovieLink:dataForGroup.MovieLink?dataForGroup.MovieLink:'',
                GroupName:dataForGroup.GroupName,
                ProjectName:dataForGroup.ProjectName?dataForGroup.ProjectName:'',
                PDescription:dataForGroup.PDescription?dataForGroup.PDescription:'',
                poster:dataForGroup.ProjectLogo?[dataForGroup.ProjectLogo]:[],
                ProjectPDF:dataForGroup.ProjectPDF?dataForGroup.ProjectPDF:'',
                isPublished:dataForGroup.isPublished!==undefined?dataForGroup.isPublished:false,
                StudentDetails:dataForGroup.Students?dataForGroup.Students:[],
                ProjectAdvisor:dataForGroup.Advisor?dataForGroup.Advisor:'',
            },()=>{
                console.log(this.state.StudentsDetails)
                this.setState({projectDetails:this.getProjectDetails()})
            })
            //get list of advisors from firebase
            this.getAdvisorsForDepartment();
            //get list of Experties
            this.getExperties();
            //get list of courses
            this.getCoursesForExpertis();
        })
    }
    getProjectDetails=()=>{
        const project = {
            ProjectName:this.state.ProjectName,
            PDescription:this.state.PDescription,
            advisor:[this.state.ProjectAdvisor],
            Major:this.state.projectMajor,
            ProjectCourse:this.state.projectCourse,
            ProjectTopic:this.state.ProjectTopic,
            Students:this.state.StudentsDetails,
            isPublished:this.state.isPublished,
            MovieLink:this.state.MovieLink,
            ProjectLogo:this.state.poster?this.state.poster[0]:[],
            ProjectPDF:this.state.ProjectPDF,
            Year:this.state.Year,
            Semester:this.state.Semester
        }
        return project;
    }
    getAdvisorsForDepartment = ()=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(this.state.groupData.Faculty).child('Departments').child(this.state.groupData.Department).child('Advisors');
        ref.once("value", (snapshot)=> {
            this.setState({advisorsList:snapshot.val()});
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
    handleClose = ()=> this.setState({ openModal: false });
    OpenImageModal = (title,index,fileSize)=>{
        if(title==='Project Logo'){
            this.setState({modalTitle:title,picTitle:index,fileSize:fileSize,openModal:true})
        }
        else{
            this.setState({openModal:true,modalTitle:title,picTitle:index,fileSize:0})
        }
    }
    getStudentsDetails = (students)=>{
        this.setState({StudentsDetails:students},()=>{
            console.log(this.state.StudentsDetails);
        })
    }
    savePic=(url,title,index)=>{
        switch (title) {
            case 'Project Logo':this.setState({poster:[url]})
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
        console.log(this.state.StudentsDetails);
    }
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
    //save project to object and show preview
    SetProjectOnFirbase = ()=>{
        const project = this.getProjectDetails();
        this.setState({
            projectDetails:project,
        },()=>{
            this.setState({showPreview:true})
        })
    }
    closePreview = ()=>this.setState({showPreview:false})
    ValidateData = (projectData)=>{          
            // project name validation
            if (projectData.ProjectName==='' || projectData.ProjectName.length<2) {
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'שם הפרויקט חסר',alertIcon:'warning'})
                return false;
            }
            //project long description -->PDescription
            if(projectData.PDescription.length===0){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'תיאור הפרויקט הוא שדה חובה',alertIcon:'warning'})
                return false;
            }
            if(projectData.PDescription.length>5000){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'תיאור הפרויקט צריך להיות קטן מ-5000 תווים',alertIcon:'warning'})
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
            if(projectData.advisor[0] === ""){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'יש לבחור מנחה',alertIcon:'warning'})
                return false;
            }
            //project students
            if(projectData.Students.length<1){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'חייב להיות לפחות חבר צוות אחד',alertIcon:'success'})
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
            this.setState({
                isSaved:true
            })
            return true;
        
        
    }
    //save project to firebase.
    SaveData = ()=>{
        //event.preventDefault();
        const ref = firebase.database().ref('RuppinProjects/'+this.state.projectKey);
                ref.update({
                    templateSubmit:'st2',
                    templateView:'vt2',
                    ProjectName: this.state.ProjectName,
                    isPublished:this.state.isPublished,
                    Year:this.state.Year,
                    Semester:this.state.Semester,
                    isApproved:1,
                    Major:this.state.projectMajor,
                    Students:this.state.StudentsDetails,
                    Advisor:this.state.ProjectAdvisor,
                    ProjectLogo:this.state.poster?this.state.poster:'',
                    MovieLink:this.state.MovieLink,
                    PDescription:this.state.PDescription,
                    ProjectCourse:this.state.projectCourse,
                    ProjectTopic:this.state.ProjectTopic,
                    ProjectPDF:this.state.ProjectPDF?this.state.ProjectPDF:'',
                })
                .then(()=>{
                    console.log('saved')
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
    ChangeInputTextarea = (event,textareaTitle)=>{
        console.log(event)
        switch (textareaTitle) {
            case sectionNames.projectDesc:this.setState({PDescription:event})
                break;
            case sectionNames.projectName:this.setState({ProjectName:event.target.value},()=>{console.log(this.state.ProjectName)})
                break;
           default:
               break;
        }
    }
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
    ChangeLinkInput = (event,selectedTitle)=>{
        switch (selectedTitle) {
            case sectionNames.projectMovie:this.setState({MovieLink:event.target.value})
                break;
            default:
                break;
        }
    }
    CloseAlert = ()=>{this.setState({alertShow:false},()=>console.log(this.state.alertShow))}
    changePublished = ()=>{
        const temp = !this.state.isPublished;
        const ref = firebase.database().ref('RuppinProjects/'+this.state.projectKey);
        if(this.ValidateData(this.getProjectDetails())){
            this.setState({isPublished:temp},()=>{
                if(this.state.isSaved===true || this.state.groupData.ProjectName!==undefined){
                    ref.update({
                        isPublished:this.state.isPublished,
                    })
                    .then(()=>{
                        if(this.state.isPublished===true){
                            this.setState({alertShow:true,alertTitle:'הפרויקט פורסם',alertText:'',alertIcon:'success'})
                        }
                        else this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'הפרויקט לא יפורסם',alertIcon:'warning'})
                    })
                }
            })
        }
    }
    render(){
        if (!this.state.isReady) {
            return(
                <div style={{flex:1,backgroundColor:'#eee'}}>
                    <Loader type="Watch" color="#58947B" height="100" width="100"/> 
                </div>
            )
        }
        return(
            <div style={{flex:1}}>
                <Idle/>
                <NavbarProjs/>
                <SaveAction  style={{zIndex:26}} Save={this.SetProjectOnFirbase}/>
                <HeaderForm title={this.state.GroupName}/>
                <PublishProject ChangePublish={this.changePublished} isPublished={this.state.isPublished}  />
                <ModalImage fileSize={this.state.fileSize} aspect={this.state.imageAspect} savePic={this.savePic} picTitle={this.state.picTitle} title={this.state.modalTitle} modalClose={this.handleClose} modalOpen={this.state.openModal} />
                <SAlert alertIcon={this.state.alertIcon} CloseAlert={this.CloseAlert} show={this.state.alertShow} title={this.state.alertTitle} text={this.state.alertText}/>
                {/* preview project card */}
                <PreviewCard close={this.closePreview} projectDetails={this.state.projectDetails} openPreview={this.state.showPreview} SaveData={this.SaveData} />
                <Form style={{marginTop:'4%',marginLeft:'10%',marginRight:'10%'}}>
                    {/* Project details */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>   
                        <SmallHeaderForm title={"תיאור הפרויקט"}/>
                        {/* project name */}
                        <TextInputs IsMandatory={true}  defaultInput={this.state.ProjectName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectName} inputSize="lg" />
                        {/* project description */}
                        <RichText IsMandatory={true}  defaultInput={this.state.PDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectDesc} />
                        <Form.Row dir="rtl">
                            {/* project major */}
                            <SelectInput IsMandatory={true}  inputList={this.state.expertiesList} defaultInput={this.state.projectMajor} InputTitle={sectionNames.projectMajor} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* project advisor */}
                            <SelectInput IsMandatory={true}  inputList={this.state.advisorsList} defaultInput={this.state.ProjectAdvisor} InputTitle={sectionNames.projectFirstAdvisor} ChangeSelectInput={this.ChangeSelectedInputs} />
                        </Form.Row>
                        <Form.Row dir="rtl">
                            {/* year  */}
                            <SelectInput IsMandatory={true} defaultInput={this.state.Year} inputList={Years} InputTitle={sectionNames.projectYear} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* semester */}
                            <SelectInput IsMandatory={true} defaultInput={this.state.Semester} inputList={['שנתי','א','ב','קיץ']} InputTitle={sectionNames.projectSemester} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/*project topic */}
                            <SelectInput IsMandatory={true}  inputList={this.state.topicsList} defaultInput={this.state.ProjectTopic} InputTitle={sectionNames.projectType} ChangeSelectInput={this.ChangeSelectedInputs} />
                        </Form.Row>
                    </div>
                    {/* FILES UPLOAD */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,margin:30,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title="הוספת קבצים"/>
                            {/* project movie link */}
                            <LinkInput ChangeLinkInput={this.ChangeLinkInput} defaultInput={this.state.MovieLink} InputTitle={sectionNames.projectMovie} inputSize="sm" placeholder="www.youtube.com"/>
                            <Row dir="rtl" style={{marginTop:'2%'}} >
                                <Col sm="4"></Col>
                                <Col sm="4">
                                    <LabelTextPDF ProjectPDF={this.state.ProjectPDF} IsMandatory={false} />
                                    <PDFupload DeletePdf={this.DeletePdf} pdfFileSize={20000000} wordFileSize={5000000} savePDF={this.savePDF}/>
                                </Col>
                                <Col sm="4"></Col>
                            </Row>
                            <Row dir="rtl" style={{marginTop:'2%'}} >
                                <Col sm="4"> </Col>
                                <Col sm="4">
                                    {
                                        this.state.ProjectPDF!==''&&
                                        <Button onClick={this.DeletePdf} variant="danger">
                                            {` מחיקת המסמך`}
                                        </Button>
                                    }
                                </Col>
                                <Col sm="4">
                                    <Button onClick={()=>this.OpenImageModal('Project Logo')} variant="primary">
                                        <FaPlusCircle size={15}/>
                                        {this.state.poster.length!==0?`  עריכת תמונה מייצגת`:`  הוספת תמונה מייצגת`}
                                    </Button>
                                </Col>
                            </Row>
                    </div>
                    {/* Students details */}
                    <StudentDetails isMandatory={false} setStudents={this.getStudentsDetails} studentInitalDetails={this.state.StudentDetails} OpenImageModal={this.OpenImageModal}/>
                </Form>
            </div>
        )
    }
}
export default St2;

