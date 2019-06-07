import React from 'react';
import Loader from 'react-loader-spinner';
import NavbarProjs from './NavbarStudents';
import {Form,Row,Col,Button} from 'react-bootstrap';
import SelectInput from '../Common/inputSelect';
import TextInputs from '../Common/TextInputs';
import TextareaInput from '../Common/TextAreaInputs';
import SmallHeaderForm from '../Common/SmallHeaderForm';
import { FaPlusCircle } from "react-icons/fa";
import PDFupload from '../Common/PdfFileUpload';
import LinkInput from '../Common/Projectlinks';
import StudentDetails from '../Common/StudentsDetails';
import ModalImage from '../Common/ImageModal';
import PreviewVt4 from '../Common/PreviewVt4';
import SaveAction from '../Common/SaveAction';
import HeaderForm from '../Common/HeaderForm';
import PublishProject from '../Common/PublishProject';
import firebase from 'firebase';
import {Years} from '../Common/Years';

const sectionNames = {
    projectNeed:'הבעיה/הצורך',
    projectDesc : "תיאור הפרויקט",
    projectChallenges:"אתגרי הפרויקט",
    projectSmallDesc:"תיאור קצר",
    projectGoal:"מטרת הפרויקט",
    projectName:"שם הפרויקט",
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
    ProjectConclusion:'מסקנות',
    projectFindings:'ממצאים',
    projectSolution:'פתרון',
    customerName:'שם הלקוח'
}

export default class St3 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
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
            projectSolution:'',
            customerName:'',
            customerLogo:'',
            ScreenShots:[],
            ScreenShotsNames:[],
            MovieLink:''

        }
    }
    componentDidMount(){
        //get group data from local storage
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        console.log(groupData);
        this.setState({
            Year:groupData.Year?groupData.Year:'',
            Semester:groupData.Semester?groupData.Semester:'',
            ProjectTopic:groupData.ProjectTopic?groupData.ProjectTopic:'',
            projectCourse:groupData.ProjectCourse?groupData.ProjectCourse:'',
            projectMajor:groupData.Major?groupData.Major:'',
            MovieLink:groupData.MovieLink?groupData.MovieLink:'',
            GroupName:groupData.GroupName,
            ProjectName:groupData.ProjectName?groupData.ProjectName:'',
            PDescription:groupData.PDescription?groupData.PDescription:'',
            poster:groupData.ProjectLogo?[groupData.ProjectLogo]:[],
            ProjectPDF:groupData.ProjectPDF?groupData.ProjectPDF:'',
            isPublished:true,
            StudentDetails:groupData.Students?groupData.Students:[],
            CDescription:groupData.CDescription?groupData.CDescription:'',
            ProjectAdvisor:groupData.Advisor?groupData.Advisor:'',
            projectSolution:groupData.projectSolution?groupData.projectSolution:'',
            projectFindings:groupData.projectFindings?groupData.projectFindings:'',
            ProjectConclusion:groupData.ProjectConclusion?groupData.ProjectConclusion:'',
            ProjectNeed:groupData.ProjectNeed?groupData.ProjectNeed:'',
            customerName:groupData.CustomerName?groupData.CustomerName:'',
            customerLogo:groupData.CustomerLogo?groupData.CustomerLogo:'',
            ScreenShots:groupData.ScreenShots?groupData.ScreenShots:[],
            ScreenShotsNames:groupData.ScreenShotsNames?groupData.ScreenShotsNames:[],
        })
        //get list of advisors from firebase
        this.getAdvisorsForDepartment();
        //get list of Experties
        this.getExperties();
        //get list of courses
        this.getCoursesForExpertis();
    }
    getAdvisorsForDepartment = ()=>{
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(groupData.Faculty).child('Departments').child(groupData.Department).child('Advisors');
        ref.once("value", (snapshot)=> {
            this.setState({advisorsList:snapshot.val()});
            //console.log(snapshot.val())
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
        })
    }
    getCoursesForExpertis = ()=>{
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(groupData.Faculty).child('Departments').child(groupData.Department).child('Experties').child(groupData.Major).child('Courses');
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
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(groupData.Faculty).child('Departments').child(groupData.Department).child('Experties');
        ref.once("value", (snapshot)=> {
            snapshot.forEach((exp)=> {
                this.setState({
                    expertiesList:[...this.state.expertiesList,exp.val().Name]
                })
            })
        })
        
    }
    getTopicsListForCourses=()=>{
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        this.state.coursesList.forEach((course)=>{
            let ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(groupData.Faculty).child('Departments').child(groupData.Department).child('Experties').child(groupData.Major).child('Courses').child(course).child('Topics');
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
            case sectionNames.projectDesc:this.setState({PDescription:event.target.value})
                break;
            case sectionNames.projectSmallDesc:this.setState({CDescription:event.target.value})
                    break;
            case sectionNames.projectName:this.setState({ProjectName:event.target.value})
                break;
            case sectionNames.projectFindings:this.setState({projectFindings:event.target.value})
                break;
            case sectionNames.projectGoal:this.setState({ProjectGoal:event.target.value})
                break;
            case sectionNames.projectSolution:this.setState({projectSolution:event.target.value})
                break;
            case sectionNames.ProjectConclusion:this.setState({ProjectConclusion:event.target.value})
                break;
            case sectionNames.projectNeed:this.setState({ProjectNeed:event.target.value})
                break;
            case sectionNames.customerName:this.setState({customerName:event.target.value})
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
    //Change 
    ChangeLinkInput = (event,linkTitle)=>{
        switch (linkTitle) {
            case sectionNames.projectMovie:
                this.setState({MovieLink:event.target.value})
                break;
            default:
                break;
        }
    }
    //students details
    getStudentsDetails = (students)=>{
        this.setState({StudentsDetails:students},()=>{
            console.log(this.state.StudentsDetails);
        })
    }
    changeStudentImage = (url,index)=>{
        this.state.StudentsDetails[index].Picture = url;
        this.forceUpdate();
        console.log(this.state.StudentsDetails);
    }
    //pdf details
    savePDF = (url)=>{this.setState({ProjectPDF:url})}
    //image modal
    OpenImageModal = (title,index)=>this.setState({openModal:true,modalTitle:title,picTitle:index})
    handleClose = ()=> this.setState({ openModal: false });
    //save picture
    savePic=(url,title,index,screenshotName)=>{
        switch (title) {
            case 'Project Logo':this.setState({poster:[url]})
                break;
            case 'Student Pic': this.changeStudentImage(url,index)
                break;
            case 'Customer Logo':this.setState({customerLogo:[url]})
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
    //show preview
    //save project to object and show preview
    SetProjectOnFirbase = ()=>{
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
            ProjectLogo:this.state.poster[0],
            ProjectPDF:this.state.ProjectPDF,
            CDescription:this.state.CDescription,
            ProjectGoal:this.state.ProjectGoal,
            ProjectNeed:this.state.ProjectNeed,
            ProjectConclusion:this.state.ProjectConclusion,
            projectFindings:this.state.projectFindings,
            projectSolution:this.state.projectSolution,
            CustomerName:this.state.customerName,
            CustomerLogo:this.state.customerLogo,
            Year:this.state.Year,
            Semester:this.state.Semester,
            ScreenShots:this.state.ScreenShots,
            ScreenShotsNames:this.state.ScreenShotsNames,
        }
        this.setState({
            projectDetails:project,
        },()=>{
            this.setState({showPreview:true})
        })
    }
    //close project preview
    closePreview = ()=>this.setState({showPreview:false})
    ValidateData = (projectData)=>{
        // project name validation
        if (projectData.ProjectName==='' || projectData.ProjectName.length<2) {
            alert('שם הפרויקט חסר');
            return false;
        }
        // project short description validation
        if(projectData.CDescription.length<50){
            alert("תיאור קצר צריך להיות גדול מ-50 תווים");
            return false;
        }
        if(projectData.CDescription.length>150){
            alert("תיאור קצר צריך להיות קטן מ-150 תווים");
            return false;
        }
        //project long description -->PDescription
        if(projectData.PDescription.length<200){
            alert("תיאור הפרויקט צריך להיות גדול מ-200 תווים");
            return false;
        }
        if(projectData.PDescription.length>500){
            alert("תיאור הפרויקט צריך להיות קטן מ-500 תווים");
            return false;
        }
        //project goal
        if(projectData.ProjectGoal!==''){
            if(projectData.ProjectGoal.length>200){
                alert("תיאור מטרת הפרויקט הוא שדה אופציונאלי אבל אם החלטתם להוסיפו - הוא צריך להיות קטן מ-200 תווים");
                return false;
            }
        }
        //project need
        if(projectData.ProjectNeed!==''){
            if(projectData.ProjectNeed.length>200){
                alert("תיאור הבעיה/צורך הוא שדה אופציונאלי אבל אם החלטתם להוסיפו - הוא צריך להיות קטן מ-200 תווים");
                return false;
            }
        }
        //projectFindings
        if(projectData.projectFindings!==''){
            if(projectData.projectFindings.length>200){
                alert("תיאור הממצאים הוא שדה אופציונאלי אבל אם החלטתם להוסיפו - הוא צריך להיות קטן מ-200 תווים");
                return false;
            }
        }
        //projectSolution
        if(projectData.projectSolution!==''){
            if(projectData.projectSolution.length>500){
                alert("תיאור הפתרון הוא שדה אופציונאלי אבל אם החלטתם להוסיפו - הוא צריך להיות קטן מ-500 תווים");
                return false;
            }
        }
        //ProjectConclusion
        if(projectData.ProjectConclusion!==''){
            if(projectData.ProjectConclusion.length>500){
                alert("תיאור המסקנות הוא שדה אופציונאלי אבל אם החלטתם להוסיפו - הוא צריך להיות קטן מ-500 תווים");
                return false;
            }
        }
        //project year
        if(projectData.Year === "" || projectData.Year === "בחר"){
            alert('יש לבחור שנה');
            return false;
        }
        //project Semester
        if(projectData.Semester === "" || projectData.Semester === "בחר"){
            alert('יש לבחור סמסטר');
            return false;
        }
        //project major/experties
        if(projectData.Major === ""){
            alert('יש לבחור התמחות');
            return false;
        }
        //project course
        if(projectData.ProjectCourse === ""){
            alert('יש לבחור סוג');
            return false;
        }
        //project topic
        if(projectData.ProjectTopic === ""){
            alert('יש לבחור נושא');
            return false;
        }
        //project advisor
        if(projectData.advisor[0] === ""){
            alert('יש לבחור מנחה');
            return false;
        }
        //project students
        if(projectData.Students.length<1){
            alert('חובה שיהיה לפחות חבר צוות אחת');
            return false;
        }
        else{
            projectData.Students.forEach((student,index)=>{
                if(student.Name===''){
                    alert('לסטודנט/ית מספר '+(index+1)+' חסר שם');
                    return false;
                }
                if (student.Picture==='') {
                    alert('לסטודנט/ית מספר '+(index+1)+' חסרה תמונה');
                    return false;
                }
            })
        }
        //project screenshots
        if (projectData.ScreenShots.length>5) {
            alert('מספר תמונות המסך הוא עד 5');
            return false;
        }       
        return true;
    }
    SaveData = (event)=>{
        event.preventDefault();
        if(this.ValidateData(this.state.projectDetails)){
            //save project to firebase.
            this.setState({isReady:false},()=>{
                const projectKey = JSON.parse(localStorage.getItem('projectKey'));
                const ref = firebase.database().ref('RuppinProjects/'+projectKey);
                ref.update({
                    templateView:'vt4',
                    ProjectName:this.state.ProjectName,
                    PDescription:this.state.PDescription,
                    advisor:[this.state.ProjectAdvisor],
                    Major:this.state.projectMajor,
                    ProjectCourse:this.state.projectCourse,
                    ProjectTopic:this.state.ProjectTopic,
                    Students:this.state.StudentsDetails,
                    isPublished:this.state.isPublished,
                    MovieLink:this.state.MovieLink,
                    ProjectLogo:this.state.poster[0],
                    ProjectPDF:this.state.ProjectPDF,
                    CDescription:this.state.CDescription,
                    ProjectGoal:this.state.ProjectGoal,
                    ProjectNeed:this.state.ProjectNeed,
                    ProjectConclusion:this.state.ProjectConclusion,
                    projectFindings:this.state.projectFindings,
                    projectSolution:this.state.projectSolution,
                    CustomerName:this.state.customerName,
                    CustomerLogo:this.state.customerLogo,
                    Year:this.state.Year,
                    Semester:this.state.Semester,
                    ScreenShots:this.state.ScreenShots,
                    ScreenShotsNames:this.state.ScreenShotsNames,
                })
                .then(()=>{
                    this.setState({isReady:true,showPreview:false})
                })
            })
        }
    }
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
                <NavbarProjs/>
                <HeaderForm title={this.state.GroupName}/>
                <PublishProject ChangePublish={()=>this.ChangePublish} isPublished={this.state.isPublished}  />
                <ModalImage aspect={this.state.imageAspect} savePic={this.savePic} picTitle={this.state.picTitle} title={this.state.modalTitle} modalClose={this.handleClose} modalOpen={this.state.openModal} />
                {/* showPreview */}
                <SaveAction Save={this.SetProjectOnFirbase}/>
                <PreviewVt4 close={this.closePreview} projectDetails={this.state.projectDetails} openPreview={this.state.showPreview} SaveData={this.SaveData} />
                {/* inputs */}
                <Form style={{marginTop:'4%',marginLeft:'10%',marginRight:'10%'}}>
                    {/* Project details */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>   
                        <SmallHeaderForm title={"תיאור הפרויקט"}/>
                        {/* project name */}
                        <TextInputs defaultInput={this.state.ProjectName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectName} inputSize="lg" />
                        {/* customer name */}
                        <TextInputs defaultInput={this.state.customerName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.customerName} inputSize="lg" />
                        {/* project small description */}
                        <TextareaInput defaultInput={this.state.CDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectSmallDesc} />
                        {/* project description */}
                        <TextareaInput  defaultInput={this.state.PDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectDesc} />
                        {/* project Goal */}
                        <TextareaInput  defaultInput={this.state.ProjectGoal} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectGoal} />
                        {/* project need */}
                        <TextareaInput  defaultInput={this.state.ProjectNeed} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectNeed} />
                        {/* Project Findings*/}
                        <TextareaInput  defaultInput={this.state.projectFindings} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectFindings} />
                        {/* Project solution*/}
                        <TextareaInput  defaultInput={this.state.projectSolution} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectSolution} />
                        {/* Project Conclusion*/}
                        <TextareaInput  defaultInput={this.state.ProjectConclusion} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.ProjectConclusion} />
                        <Form.Row dir="rtl">
                            {/* project major */}
                            <SelectInput inputList={this.state.expertiesList} defaultInput={this.state.projectMajor} InputTitle={sectionNames.projectMajor} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* project advisor */}
                            <SelectInput inputList={this.state.advisorsList} defaultInput={this.state.ProjectAdvisor} InputTitle={sectionNames.projectFirstAdvisor} ChangeSelectInput={this.ChangeSelectedInputs} />
                        </Form.Row>
                        <Form.Row dir="rtl">
                            {/* year  */}
                            <SelectInput inputList={Years} InputTitle={sectionNames.projectYear} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* semester */}
                            <SelectInput inputList={['א','ב','קיץ']} InputTitle={sectionNames.projectSemester} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* Project Course */}
                            <SelectInput inputList={this.state.coursesList} defaultInput={this.state.projectCourse} InputTitle={sectionNames.projectCourse} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/*project topic */}
                            <SelectInput inputList={this.state.topicsList} defaultInput={this.state.ProjectTopic} InputTitle={sectionNames.projectType} ChangeSelectInput={this.ChangeSelectedInputs} />
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
                                <Form.Label>קובץ PDF/WORD</Form.Label>
                                <PDFupload pdfFileSize={20000000} wordFileSize={5000000} savePDF={this.savePDF}/>
                            </Col>
                            <Col sm="4"></Col>
                        </Row>
                        <Row dir="rtl" style={{marginTop:'2%'}} >
                            <Col sm="4"> 
                                <Button variant="primary" onClick={()=>this.OpenImageModal('Screenshots','')}>
                                    <FaPlusCircle size={15}/>
                                    {` הוספת תמונות/תרשימים`}
                                </Button>
                            </Col>
                            <Col sm="4">
                                <Button onClick={()=>this.OpenImageModal('Project Logo')} variant="primary">
                                    <FaPlusCircle size={15}/>
                                    {`  הוספת פוסטר`}   
                                </Button>
                            </Col>
                            <Col sm="4">
                                <Button onClick={()=>this.OpenImageModal('Customer Logo')} variant="primary">
                                    <FaPlusCircle size={15}/>
                                    {`  הוספת לוגו לקוח`}   
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    {/* Students details */}
                    <StudentDetails setStudents={this.getStudentsDetails} studentInitalDetails={this.state.StudentDetails} OpenImageModal={this.OpenImageModal}/>
                </Form>
            </div>
        )
    }
}