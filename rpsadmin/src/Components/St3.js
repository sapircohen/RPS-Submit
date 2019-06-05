import React from 'react';
import Loader from 'react-loader-spinner';
import NavbarProjs from './NavbarStudents';
import {Form,Row,Col,Button} from 'react-bootstrap';
import SelectInput from '../Common/inputSelect';
import TextInputs from '../Common/TextInputs';
import TextareaInput from '../Common/TextAreaInputs';
import SmallHeaderForm from '../Common/SmallHeaderForm';
import { FaPlusCircle,FaEye } from "react-icons/fa";
import PDFupload from '../Common/PdfFileUpload';
import LinkInput from '../Common/Projectlinks';
import StudentDetails from '../Common/StudentsDetails';

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
}

export default class St3 extends React.Component{
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
            projectCourse:'',
            Year:'',
            Semester:'',
            ProjectGoal:'',
            ProjectNeed:'',
            ProjectConclusion:'',
            projectFindings:'',
            projectSolution:''
        }
    }
    componentDidMount(){

    }
    ChangeInputTextarea = (e)=>{
        //switch-case
    }
    getStudentsDetails = ()=>{
        
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
                <Form style={{marginTop:'4%',marginLeft:'10%',marginRight:'10%'}}>
                    {/* Project details */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>   
                        <SmallHeaderForm title={"תיאור הפרויקט"}/>
                        {/* project name */}
                        <TextInputs defaultInput={this.state.ProjectName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectName} inputSize="lg" />
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
                            <SelectInput inputList={['א','ב','קיץ']} InputTitle={sectionNames.projectYear} ChangeSelectInput={this.ChangeSelectedInputs} />
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