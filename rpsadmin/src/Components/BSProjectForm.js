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
//toggle library for publish
import Toggle from 'react-toggle';
import "react-toggle/style.css";

//fire up an alert 
import SweetAlert from 'react-bootstrap-sweetalert';


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
            projectDetails:{},
            showPreview:false,
            CDescription:'',
            ProjectTopic:'',
            isReady:true,
        }

        //refs
        this.projectName = React.createRef();
        this.projectDescription = React.createRef();
        this.projectSmallDescription = React.createRef();
        this.ProjectCourse = React.createRef();
        this.projectMajor = React.createRef();
        this.projectAdvisor = React.createRef();
        this.ProjectTopic = React.createRef();
        this.MovieLink = React.createRef();
    }
    componentDidMount(){
        //get group data from local storage
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        console.log(groupData);
        this.setState({
            GroupName:groupData.GroupName,
            ProjectName:groupData.ProjectName?groupData.ProjectName:'',
            PDescription:groupData.PDescription?groupData.PDescription:'',
            poster:groupData.ProjectLogo?[groupData.ProjectLogo]:[],
            ProjectPDF:groupData.ProjectPDF?groupData.ProjectPDF:'',
            isPublished:true,
            StudentDetails:groupData.Students?groupData.Students:[],

            CDescription:groupData.CDescription?groupData.CDescription:groupData.CDescription
        })
        
        //get list of advisors from firebase
        this.getAdvisorsForDepartment();

        //get list of courses
        this.getCoursesForExpertis();

    }
    getAdvisorsForDepartment = ()=>{
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        if (groupData.Department === 'מדעי התנהגות') {
            const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child('Social and community sciences').child('Departments').child('Behavioral Sciences').child('Advisors');
            ref.once("value", (snapshot)=> {
                this.setState({advisorsList:snapshot.val()});
                console.log(snapshot.val())
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
                console.log(this.state.coursesList)
                this.getTopicsListForCourses();
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
    handleClose = ()=> {
        this.setState({ openModal: false });
    }
    OpenImageModal = (title,index)=>{
 
        this.setState({
            openModal:true,
            modalTitle:title,
            picTitle:index
        })
    }
    getStudentsDetails = (students)=>{
        this.setState({StudentsDetails:students},()=>{
            console.log(this.state.StudentsDetails);
        })
    }
    handlePublishedChange = ()=>{
        this.setState({isPublished:!this.state.isPublished})
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
        //need to validate here too.
        console.log(this.state.StudentsDetails)
        const project = {
            ProjectName:this.projectName.current.value,
            PDescription:this.projectDescription.current.value,
            advisor:[this.projectAdvisor.current.value],
            Major:this.projectMajor.current.value,
            ProjectCourse:this.ProjectCourse.current.value,
            ProjectTopic:this.ProjectTopic.current.value,
            Students:this.state.StudentsDetails,
            Year:(new Date().getFullYear()),
            isPublished:this.state.isPublished,
            MovieLink:this.MovieLink.current.value,
            ProjectLogo:this.state.poster[0],
            ProjectPDF:this.state.ProjectPDF,
            CDescription:this.projectSmallDescription.current.value,
        }
        
        this.setState({
            projectDetails:project,
        },()=>{
            console.log(this.state.projectDetails.Students.length);
            this.setState({showPreview:true})
        })
    }
    //close preview:
    closePreview = ()=>{
        this.setState({
            showPreview:false
        })
    }
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
                //id validation
                //pic validation
                //email validation
            })
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
            CDescription:this.state.projectDetails.CDescription,
            Students:this.state.projectDetails.Students,
            Technologies:this.state.projectDetails.Technologies,
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
                    CDescription:this.state.projectDetails.CDescription,
                    Students:this.state.projectDetails.Students,
                    Technologies:this.state.projectDetails.Technologies,
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
                <label>
                    <p dir="rtl">{`  פרסם פרויקט?`}</p>
                    <Toggle
                        defaultChecked={this.state.isPublished}
                        onChange={this.handlePublishedChange} />
                </label>
                {/* Popup modal for uploading an image */}
                <ModalImage aspect={this.state.imageAspect} savePic={this.savePic} picTitle={this.state.picTitle} title={this.state.modalTitle} modalClose={this.handleClose} modalOpen={this.state.openModal} />
                <PreviewModal onHide={this.projectLogoClose} images={this.state.imagesToShowInModal} modalOpen={this.state.showPoster} title='תצוגה מקדימה'/>
                
                {/* preview project card */}
                <PreviewCard close={this.closePreview} projectDetails={this.state.projectDetails} openPreview={this.state.showPreview} SaveData={this.SaveData} />

                <Form style={{marginTop:'4%',marginLeft:'10%',marginRight:'10%'}}>
                    
                    {/* Project details */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>   
                        <SmallHeaderForm title={"תיאור הפרויקט"}/>
                        
                        {/* project name */}
                        <Form.Group style={{marginTop:'2%'}} as={Row} id="projectName">
                            <Col sm="3"></Col>
                            <Col sm="7">
                                <Form.Control defaultValue={this.state.ProjectName} ref={this.projectName}  size="lg" type="text" dir="rtl"/>
                            </Col>
                            <Form.Label column sm="2">שם הפרויקט</Form.Label>
                        </Form.Group>
                        
                        {/* project small description */}
                         <Form.Group as={Row} id="smalldescription">
                            <Col sm="10">
                                <Form.Control defaultValue={this.state.CDescription} ref={this.projectSmallDescription}  dir="rtl" type="textarea" rows="3" />
                            </Col>
                            <Form.Label column sm="2">תיאור קצר</Form.Label>
                        </Form.Group>
                        
                        {/* project description */}
                        <Form.Group as={Row} id="description">
                            <Col sm="10">
                                <Form.Control defaultValue={this.state.PDescription} ref={this.projectDescription}  dir="rtl" type="textarea" rows="3" />
                            </Col>
                            <Form.Label column sm="2">תיאור הפרויקט</Form.Label>
                        </Form.Group>               

                        <Form.Row dir="rtl">
                            
                            {/* project major */}
                            <Form.Group as={Col} id="projectType">
                                <Form.Label>התמחות</Form.Label>
                                <Form.Control ref={this.projectMajor} dir="rtl" as="select">
                                    <option>בחר</option>
                                    <option>פסיכולוגיה</option>
                                    <option>סוציולוגיה ואנתרופולוגיה</option>
                                </Form.Control>
                            </Form.Group>

                            {/* project advisor */}
                            <Form.Group as={Col} id="firstAdvisor">
                            <Form.Label dir="rtl">מנחה הפרויקט</Form.Label>
                            <Form.Control ref={this.projectAdvisor} dir="rtl" as="select">
                                <option>בחר</option>
                                {this.state.advisorsList.map((a,key)=>
                                    <option>{a}</option>
                                )}
                            </Form.Control>
                            </Form.Group>
                        </Form.Row>


                        <Form.Row dir="rtl">
                                    
                            {/* Project Course */}
                            <Form.Group as={Col} id="projectType">
                                <Form.Label>סוג הפרויקט</Form.Label>
                                <Form.Control ref={this.ProjectCourse} dir="rtl" as="select">
                                    <option>בחר</option>
                                    {this.state.coursesList.map((a,key)=>
                                    <option>{a}</option>
                                    )}
                                </Form.Control>
                            </Form.Group>

                            {/*project topic */}
                            <Form.Group as={Col} id="firstAdvisor">
                            <Form.Label dir="rtl">נושא הפרויקט</Form.Label>
                            <Form.Control ref={this.ProjectTopic} dir="rtl" as="select">
                                <option>בחר</option>
                                {this.state.topicsList.map((a,key)=>
                                    <option>{a}</option>
                                )}
                            </Form.Control>
                            </Form.Group>
                        </Form.Row>

                    </div>

                    {/* FILES UPLOAD */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,marginTop:30,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title="הוספת קבצים"/>
                            <Row dir="rtl" style={{marginTop:'2%'}} >
                                <Form.Label column sm="2">קישור לסרטון</Form.Label>
                                <Col sm="4">
                                    <Form.Control size="lg" ref={this.MovieLink} defaultValue={this.state.MovieLink} dir="ltr" id="projectMovie" size="sm" type="text" placeholder="www.youtube.com" /> 
                                </Col>
                                <Col sm="4">
                                    {/* <PDFupload /> */}
                                </Col>
                                
                                
                            </Row>
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

