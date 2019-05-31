import React from 'react';
import NavbarProjs from './NavbarStudents';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import HeaderForm from '../Common/HeaderForm';
import SmallHeaderForm from '../Common/SmallHeaderForm';
import ModalImage from '../Common/ImageModal';
import StudentDetails from '../Common/StudentsDetails';
import { FaPlusCircle,FaEye, FaFlask } from "react-icons/fa";
import PreviewModal from "../Common/imagesModalPrevies";
import firebase from 'firebase';
import SaveAction from '../Common/SaveAction';
import PDFupload from '../Common/PdfFileUpload';
import PreviewCard from '../Common/PreviewProjectCard';
import Loader from 'react-loader-spinner';
//commons
import PublishProject from '../Common/PublishProject';
import TextareaInput from '../Common/TextAreaInputs';
import TextInputs from '../Common/TextInputs';
import SelectInput from '../Common/inputSelect';
import LinkInput from '../Common/Projectlinks';

const sectionNames = {
    projectDesc : "תיאור הפרויקט",
    projectChallenges:"אתגרי הפרויקט",
    projectSmallDesc:"תיאור קצר",
    projectComments:"הערות",
    projectName:"שם הפרויקט",
    projectStackholders:"בעלי עניין",
    projectCustCustomers:"משתמשי המערכת",
    projectCustomerName:'שם הלקוח',
    projectType:'נושא הפרויקט',
    projectFirstAdvisor:"מנחה חלק א",
    projectSecondAdvisor:"מנחה חלק ב",
    projectLink:'קישור לאתר הפרויקט',
    projectMovie:'קישור לסרטון הפרויקט ביוטיוב',
    appleLinke:'apple',
    googleLink:'google',
    projectMajor:'התמחות',
    projectCourse:'סוג הפרויקט',
}
class BSProjectTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imageAspect:4/3,
            openModal:false,
            modalTitle:'',
            isPublished:true,
            showPoster:false,
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
            projectCourse:''
        }
    }
    componentDidMount(){
        //get group data from local storage
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        console.log(groupData);
        this.setState({
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
        if (groupData.Department === 'מדעי התנהגות') {
            const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child('Social and community sciences').child('Departments').child('Behavioral Sciences').child('Advisors');
            ref.once("value", (snapshot)=> {
                this.setState({advisorsList:snapshot.val()});
                //console.log(snapshot.val())
            }, (errorObject)=> {
                console.log("The read failed: " + errorObject.code);
            })
        }

    }
    getCoursesForExpertis = ()=>{
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        if (groupData.Department === 'מדעי התנהגות') {
            const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child('Social and community sciences').child('Departments').child('Behavioral Sciences').child('Experties').child('Psychology').child('Courses');
            ref.once("value", (snapshot)=> {
                snapshot.forEach((course)=> {
                    this.setState({
                        coursesList:[...this.state.coursesList,course.val().Name]
                    })
                })
            })
            .then(()=>{
                const ref2 = firebase.database().ref('Data').child('Ruppin').child('Faculties').child('Social and community sciences').child('Departments').child('Behavioral Sciences').child('Experties').child('Sociology and anthropology').child('Courses');
                ref2.once("value", (snapshot)=> {
                    snapshot.forEach((course)=> {
                        this.setState({
                            coursesList:[...this.state.coursesList,course.val().Name]
                        })
                    })
                })
            })
            .then(()=>{
                //get list of topics
              //  console.log(this.state.coursesList)
                this.getTopicsListForCourses();
            })
            
        }      
    }
    getExperties = ()=>{
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        if (groupData.Department === 'מדעי התנהגות') {
            const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child('Social and community sciences').child('Departments').child('Behavioral Sciences').child('Experties');
            ref.once("value", (snapshot)=> {
                snapshot.forEach((exp)=> {
                    this.setState({
                        expertiesList:[...this.state.expertiesList,exp.val().Name]
                    })
                })
            })
        }
    }
    getTopicsListForCourses=()=>{
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        if (groupData.Department === 'מדעי התנהגות') {
            this.state.coursesList.forEach((course)=>{
                let ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child('Social and community sciences').child('Departments').child('Behavioral Sciences').child('Experties').child('Psychology').child('Courses').child(course).child('Topics');
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
    }
    handleClose = ()=> this.setState({ openModal: false });
    OpenImageModal = (title,index)=>this.setState({openModal:true,modalTitle:title,picTitle:index})
    getStudentsDetails = (students)=>{
        this.setState({StudentsDetails:students},()=>{
            console.log(this.state.StudentsDetails);
        })
    }
    projectLogoShow=()=>{
        this.setState({
            showPoster:true,
            imagesToShowInModal:this.state.poster
        })
    }
    projectLogoClose=()=>{
        this.setState({showPoster:false})
    }
    OpenImagePreviewForStudent = (index)=>{
        console.log(this.state.StudentsDetails[index].Picture);
        if(this.state.StudentsDetails[index].Picture !==''){
            let temp = [];
            temp.push(this.state.StudentsDetails[index].Picture);
            console.log(temp);
            this.setState({
                showPoster:true, 
                imagesToShowInModal:temp
            })
        }
        else{
            alert('לא הועלתה תמונת סטודנט/ית');
        }
    }
    savePic=(url,title,index,screenshotName)=>{
        console.log(url)
        console.log(index);
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
        console.log(url);
        this.setState({
            ProjectPDF:url
        })
    }
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
            Year:(new Date().getFullYear()),
            isPublished:this.state.isPublished,
            MovieLink:this.state.MovieLink,
            ProjectLogo:this.state.poster[0],
            ProjectPDF:this.state.ProjectPDF,
            CDescription:this.state.CDescription,
        }
        this.setState({
            projectDetails:project,
        },()=>{
            this.setState({showPreview:true})
        })
    }
    //close preview:
    closePreview = ()=>this.setState({showPreview:false})
    ValidateData = (projectData)=>{
        console.log(projectData.Advisor[0]);
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
        if(projectData.Advisor[0] === ""){
            alert('יש לבחור מנחה');
            return false;
        }
        //project students
        if(projectData.Students.length<1){
            alert('חייב שיהיה לפחות חבר צוות אחת');
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
                //id validation
                //pic validation
                //email validation
            })
        }
        if(projectData.ProjectPDF ===''){
            alert('חסר קובץ PDF/WORD');
            return false;
        }
        return true;
    }
    SaveData = (event)=>{
        event.preventDefault();
        //validate project inputs
        let project = {
            ProjectName: this.state.projectDetails.ProjectName,
            isPublished:this.state.projectDetails.isPublished,
            Year:this.state.projectDetails.Year,
            isApproved:1,
            Major:this.state.projectMajor,
            CDescription:this.state.projectDetails.CDescription,
            Students:this.state.projectDetails.Students,
            Advisor:this.state.projectDetails.advisor,
            ProjectLogo:this.state.projectDetails.ProjectLogo,
            MovieLink:this.state.projectDetails.MovieLink,
            PDescription:this.state.projectDetails.PDescription,
            ProjectCourse:this.state.projectDetails.ProjectCourse,
            ProjectTopic:this.state.projectDetails.ProjectTopic,
            ProjectPDF:this.state.projectDetails.ProjectPDF,
        }
        if(this.ValidateData(project)){
            //save project to firebase.
            this.setState({isReady:false},()=>{
                const projectKey = JSON.parse(localStorage.getItem('projectKey'));
                const ref = firebase.database().ref('RuppinProjects/'+projectKey);
                ref.update({
                    ProjectName: this.state.projectDetails.ProjectName,
                    isPublished:this.state.projectDetails.isPublished,
                    Year:this.state.projectDetails.Year,
                    isApproved:1,
                    Major:this.state.projectMajor,
                    CDescription:this.state.projectDetails.CDescription,
                    Students:this.state.projectDetails.Students,
                    Advisor:this.state.projectDetails.advisor,
                    ProjectLogo:this.state.projectDetails.ProjectLogo,
                    MovieLink:this.state.projectDetails.MovieLink,
                    PDescription:this.state.projectDetails.PDescription,
                    ProjectCourse:this.state.projectDetails.ProjectCourse,
                    ProjectTopic:this.state.projectDetails.ProjectTopic,
                    ProjectPDF:this.state.projectDetails.ProjectPDF,
                })
                .then(()=>{
                    this.setState({isReady:true,showPreview:false})
                })
            })
        }
    }
    ChangeInputTextarea = (event,textareaTitle)=>{
        switch (textareaTitle) {
            case sectionNames.projectDesc:this.setState({PDescription:event.target.value})
                break;
            case sectionNames.projectSmallDesc:this.setState({CDescription:event.target.value})
                    break;
            case sectionNames.projectName:this.setState({ProjectName:event.target.value})
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
    ChangePublish = ()=>this.setState({isPublished:!this.state.isPublished})
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
                <SaveAction Save={this.SetProjectOnFirbase}/>
                <HeaderForm title={this.state.GroupName}/>
                <PublishProject isPublished={this.state.isPublished}  />
                {/* <label>
                    <p dir="rtl">{`  פרסם פרויקט?`}</p>
                    <Toggle
                        defaultChecked={this.state.isPublished}
                        onChange={this.handlePublishedChange} />
                </label> */}
                <ModalImage aspect={this.state.imageAspect} savePic={this.savePic} picTitle={this.state.picTitle} title={this.state.modalTitle} modalClose={this.handleClose} modalOpen={this.state.openModal} />
                <PreviewModal onHide={this.projectLogoClose} images={this.state.imagesToShowInModal} modalOpen={this.state.showPoster} title='תצוגה מקדימה'/>
                {/* preview project card */}
                <PreviewCard close={this.closePreview} projectDetails={this.state.projectDetails} openPreview={this.state.showPreview} SaveData={this.SaveData} />
                <Form style={{marginTop:'4%',marginLeft:'10%',marginRight:'10%'}}>
                    {/* Project details */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>   
                        <SmallHeaderForm title={"תיאור הפרויקט"}/>
                        {/* project name */}
                        <TextInputs isMandatory={true} defaultInput={this.state.ProjectName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectName} inputSize="lg" />
                        {/* project small description */}
                        <TextareaInput isMandatory={true} defaultInput={this.state.CDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectSmallDesc} />
                        {/* project description */}
                        <TextareaInput isMandatory={true} defaultInput={this.state.PDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectDesc} />
                        <Form.Row dir="rtl">
                            {/* project major */}
                            <SelectInput inputList={this.state.expertiesList} defaultInput={this.state.projectMajor} InputTitle={sectionNames.projectMajor} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* project advisor */}
                            <SelectInput inputList={this.state.advisorsList} defaultInput={this.state.ProjectAdvisor} InputTitle={sectionNames.projectFirstAdvisor} ChangeSelectInput={this.ChangeSelectedInputs} />
                        </Form.Row>
                        <Form.Row dir="rtl">
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
                                    <Form.Label>קובץ PDF</Form.Label>
                                    <PDFupload savePDF={this.savePDF}/>
                                </Col>
                                <Col sm="4"></Col>
                            </Row>
                            <Row dir="rtl" style={{marginTop:'2%'}} >
                                <Col sm="4"> </Col>
                                <Col sm="4">
                                    <Button onClick={()=>this.OpenImageModal('Project Logo')} variant="primary">
                                        <FaPlusCircle size={15}/>
                                        {`  הוספת פוסטר`}   
                                    </Button>
                                </Col>
                                <Col sm="4"> </Col>
                            </Row>
                            <Row dir="rtl" style={{marginTop:'2%'}} >
                                <Col sm="4"> </Col>
                                <Col sm="4">
                                    <Button onClick={()=>this.projectLogoShow('Project Logo')} variant="info">
                                        <FaEye/>
                                        {`  הצגת פוסטר`}   
                                    </Button>
                                </Col>
                                <Col sm="4"> </Col>
                            </Row>
                    </div>
                    {/* Students details */}
                    <StudentDetails setStudents={this.getStudentsDetails} studentInitalDetails={this.state.StudentDetails} OpenImageModal={this.OpenImageModal}  OpenPreviewModal={this.OpenImagePreviewForStudent}/>
                    
                </Form>
            </div>
        )
    }
     
}
export default BSProjectTemplate;

