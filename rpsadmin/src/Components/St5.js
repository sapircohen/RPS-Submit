//electrical engeeniring
import React from 'react';
import { FaCameraRetro } from "react-icons/fa";
import firebase from 'firebase';
import RichText from '../Common/RichText2';
import {Col,Row,Form,Button} from 'react-bootstrap';
import PublishProject from '../Common/PublishProject';
import PDFupload from '../Common/PdfFileUpload';
import LabelTextPDF from '../Common/LabelText';
import TextareaInput from '../Common/TextAreaInputs';
import TextInputs from '../Common/TextInputs';
import SelectInput from '../Common/inputSelect';
import SmallHeaderForm from '../Common/SmallHeaderForm';
import HeaderForm from '../Common/HeaderForm';
import NavbarProjs from './NavbarStudents';
import {Years} from '../Common/Years';
import Techs from '../Common/techs';
import ProjectGoals from '../Common/ProjectGoals';
import StudentDetails from '../Common/StudentsDetails';
import PreviewModal from "../Common/imagesModalPrevies";
import SaveAction from '../Common/SaveAction';
import PreviewCard from './PreviewProjectCard';
import ModalImage from '../Common/ImageModal';
import LinkInput from '../Common/Projectlinks';
import Loader from 'react-loader-spinner';

//get constants from localstorage
const course = JSON.parse(localStorage.getItem('course'));
const projectKey = JSON.parse(localStorage.getItem('projectKey'));
const groupData = JSON.parse(localStorage.getItem('groupData'));

const sectionNames = {
    projectDesc : "רקע ומוטיבציה",
    projectSystemDesc:"תיאור המערכת/תכנון הנדסי",
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
    projectMovie:'קישור לסרטון הפרויקט ביוטיוב',
    projectSemester:'סמסטר',
    projectYear:'שנה',
    ProjectConclusion:'מסקנות',
    projectFindings:'ממצאים',
    projectPartnerDescription:'תיאור שותף תעשייתי'
}

export default class St5 extends React.Component{
    state={
        isSaved:false,
        imageAspect:4/3,
        showPreview:false,
        Advisor:'',
        isPublished:false,
        ProjectName:'',
        CDescription:'',
        PDescription:'',
        firstAdvisor:'',
        secondAdvisor:'',
        SystemDescription:'',
        projectFindings:'',
        ProjectConclusion:'',
        advisorsList:[],
        GroupName:'',
        MovieLink:'',
        PartnerDescription:'',
        projectGoals:[],
        techOptions : [],
        StudentsDetails:[],
        openModal:false,
        modalTitle:'',
        picTitle:'',
        imagesToShowInModal:[],
        showImagesMode:false,
        ScreenShots:[],
        ScreenShotsNames:[],
        logo:[],
        customerLogo:[],
        ProjectCourse:'',
        projectDetails:{},
        ProjectPDF:'',
        chosenTechs:[],
        Year:'',
        Semester:'',
        isReady:true
    }
    componentDidMount(){
        this.GetData();
        window.setInterval(()=>{
            this.SaveData();
            if(this.state.isPublished){
                if(!this.ValidateData(this.getProjectDetails())){
                    this.setState({isPublished:false});
                    alert('הפרויקט לא יפורסם')
                }
            }
        },3000)
    }
    GetData=()=>{
        const ref = firebase.database().ref('RuppinProjects').child(projectKey);
        let dataForGroup ={};
        ref.once("value", (snapshot)=> {
            dataForGroup=snapshot.val();
        })
        .then(()=>{
            this.setState({
                ProjectPDF:dataForGroup.ProjectPDF?dataForGroup.ProjectPDF:'',
                Year:dataForGroup.Year?dataForGroup.Year:'',
                Semester:dataForGroup.Semester?dataForGroup.Semester:'',
                Advisor:dataForGroup.Advisor?dataForGroup.Advisor:'',
                firstAdvisor:dataForGroup.Advisor?(dataForGroup.Advisor.length?dataForGroup.Advisor[0]:''):'',
                secondAdvisor:dataForGroup.Advisor?(dataForGroup.Advisor.length===2?dataForGroup.Advisor[1]:''):'',
                GroupName:dataForGroup.GroupName,
                ProjectName:dataForGroup.ProjectName?dataForGroup.ProjectName:'',
                PDescription:dataForGroup.PDescription?dataForGroup.PDescription:'',
                MovieLink:dataForGroup.MovieLink?dataForGroup.MovieLink:'',
                ScreenShots:dataForGroup.ScreenShots?dataForGroup.ScreenShots:[],
                logo:dataForGroup.ProjectLogo?[dataForGroup.ProjectLogo]:[],
                customerLogo:dataForGroup.CustomerLogo?[dataForGroup.CustomerLogo]:[],
                CDescription:dataForGroup.CDescription?dataForGroup.CDescription:'',
                ScreenShotsNames:dataForGroup.ScreenShotsNames?dataForGroup.ScreenShotsNames:[],
                projectGoals:dataForGroup.Goals?dataForGroup.Goals:[],
                isPublished:dataForGroup.isPublished?dataForGroup.isPublished:false,
                StudentDetails:dataForGroup.Students?dataForGroup.Students:[],
                chosenTechs:dataForGroup.Technologies?dataForGroup.Technologies:[],
                ProjectCourse:course,
                ProjectConclusion:dataForGroup.ProjectConclusion?dataForGroup.ProjectConclusion:'',
                SystemDescription:dataForGroup.SystemDescription?dataForGroup.SystemDescription:'',
                projectFindings:dataForGroup.projectFindings?dataForGroup.projectFindings:'',
                PartnerDescription:dataForGroup.PartnerDescription?dataForGroup.PartnerDescription:''
            },()=>{
                this.setState({projectDetails:this.getProjectDetails()})
            })
            this.getTechnologies();
            this.getAdvisors();
        })
    }
    OpenImageModal = (title,pic)=>this.setState({openModal:true,modalTitle:title,picTitle:pic})
    getProjectGoals = (goals)=>{
        this.setState({projectGoals:goals},()=>{
            console.log(this.state.projectGoals)
        })
    }
    getAdvisors = ()=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(groupData.Faculty).child('Departments').child(groupData.Department).child('Advisors');
        ref.once("value", (snapshot)=> {
            this.setState({advisorsList:snapshot.val()});
            console.log(snapshot.val())
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
        })
    }
    getTechnologies = ()=>{
        const ref = firebase.database().ref('Technologies');
        ref.once("value", (snapshot)=> {
            snapshot.forEach((tech)=> {
                let techA = {
                    value:tech.val(),
                    label:tech.val()
                }
                this.setState({
                    techOptions:[...this.state.techOptions,techA]
                })
            })
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
        })
    }
    //pdf details
    savePDF = (url)=>{
        const ref = firebase.database().ref('RuppinProjects/'+projectKey);
        this.setState({
            ProjectPDF:url
        },()=>{
            console.log(this.state.ProjectPDF)
            ref.update({
                ProjectPDF:this.state.ProjectPDF,
            })
        })
    }   
    DeletePdf=()=>{
        console.log(this.state.ProjectPDF)
        if(this.state.ProjectPDF!==''){
            const desertRef = firebase.storage().refFromURL(this.state.ProjectPDF);
            // Delete the file
            desertRef.delete().then(()=> { 
                this.setState({
                    ProjectPDF:''
                },()=>{
                    const ref = firebase.database().ref('RuppinProjects/'+projectKey);
                    ref.update({
                        ProjectPDF:this.state.ProjectPDF,
                    })
                })            
            }).catch((error)=> {
                console.log(error)
            });
        }
    }
    getStudentsDetails = (students)=>{
        this.setState({StudentsDetails:students},()=>{
            console.log(this.state.StudentsDetails);
        })
    }
    savePic=(url,title,index,screenshotName)=>{
        console.log(screenshotName)
        switch (title) {
            case 'Customer Logo':this.setState({customerLogo:[url]})
                break;
            case 'Project Logo':this.setState({logo:[url]})
                break;
            case 'Screenshots':this.changeScreenshots(url,screenshotName)
                break;
            case 'Student Pic': this.changeStudentImage(url,index)
                break;
            default:
                break;
        }
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
    getProjectDetails = ()=>{
        const project = {
            ProjectPDF:this.state.ProjectPDF,
            Year:this.state.Year,
            Semester:this.state.Semester,
            advisor:[this.state.firstAdvisor,this.state.secondAdvisor],
            GroupName:this.state.GroupName,
            ProjectName:this.state.ProjectName,
            PDescription:this.state.PDescription,
            MovieLink:this.state.MovieLink,
            Students:this.state.StudentsDetails,
            ScreenShots:this.state.ScreenShots,
            ProjectLogo:this.state.logo,
            CustomerLogo:this.state.customerLogo,
            CDescription:this.state.CDescription,
            ScreenShotsNames:this.state.ScreenShotsNames,
            Goals:this.state.projectGoals,
            isPublished:this.state.isPublished,
            Technologies:this.state.chosenTechs,
            ProjectCourse:course,
            ProjectConclusion:this.state.ProjectConclusion,
            SystemDescription:this.state.SystemDescription,
            projectFindings:this.state.projectFindings,
            PartnerDescription:this.state.PartnerDescription
        }
        return project;
    }
    SetProjectOnFirbase = ()=>{
        const project = this.getProjectDetails();
        console.log(project);
        this.setState({
            projectDetails:project,
        },()=>{
            this.setState({showPreview:true})
        })
    }
    OpenImagePreview = (title)=>{
        switch (title) {
            case 'Screenshots':
                this.setState({modalTitle:title,showImagesMode:true,imagesToShowInModal:this.state.ScreenShots})
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
    SaveData = ()=>{
            const ref = firebase.database().ref('RuppinProjects/'+projectKey);
            ref.update({
                templateSubmit:'st5',
                templateView:'vt1',
                ProjectCourse:course,
                ProjectPDF:this.state.ProjectPDF,
                Year:this.state.Year,
                Semester:this.state.Semester,
                Advisor:[this.state.firstAdvisor,this.state.secondAdvisor],
                CustomerLogo:this.state.customerLogo,
                GroupName:this.state.GroupName,
                ProjectName:this.state.ProjectName,
                PDescription:this.state.PDescription,
                MovieLink:this.state.MovieLink,
                Students:this.state.StudentsDetails,
                ScreenShots:this.state.ScreenShots,
                ProjectLogo:this.state.logo,
                CDescription:this.state.CDescription,
                ScreenShotsNames:this.state.ScreenShotsNames,
                projectGoals:this.state.projectGoals,
                isPublished:this.state.isPublished,
                Technologies:this.state.chosenTechs,
                ProjectConclusion:this.state.ProjectConclusion,
                SystemDescription:this.state.SystemDescription,
                projectFindings:this.state.projectFindings,
                PartnerDescription:this.state.PartnerDescription
            })
    }
    changeStudentImage = (url,index)=>{
        this.state.StudentsDetails[index].Picture = url;
        this.forceUpdate();
        console.log(this.state.StudentsDetails);
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
    DeletePic = (picURL)=>{
        console.log(picURL)
        const desertRef = firebase.storage().refFromURL(picURL);
        // Delete the file
        desertRef.delete().then(()=> {
            alert('התמונה נמחקה');
            const index = this.state.ScreenShots.indexOf(picURL);
            console.log(index)
            const array = this.state.ScreenShots.splice(index,1);
            console.log(array);
            this.setState({ScreenShots:array},()=>console.log(this.state.ScreenShots));
        }).catch((error)=> {
            console.log(error)
        });
    }
    TechsChosen (value){
        this.setState({
            chosenTechs:value.map((val)=>{
                return val.value;
            })
        })
    }
    ChangeInputTextarea = (event,textareaTitle)=>{
        switch (textareaTitle) {
            case sectionNames.projectDesc:this.setState({PDescription:event})
                break;
            case sectionNames.projectSmallDesc:this.setState({CDescription:event.target.value})
                    break;
            case sectionNames.projectName:this.setState({ProjectName:event.target.value})
                break;
            case sectionNames.projectFindings:this.setState({projectFindings:event})
                break;
            case sectionNames.ProjectConclusion:this.setState({ProjectConclusion:event})
                break;
            case sectionNames.PartnerDescription:this.setState({PartnerDescription:event.target.value})
                break;
            case sectionNames.projectSystemDesc:this.setState({SystemDescription:event})
                break;
           default:
               break;
        }
    }
    ChangeSelectedInputs = (event,selectedTitle)=>{
        switch (selectedTitle) {
            case sectionNames.projectFirstAdvisor:
                this.setState({firstAdvisor:event.target.value})
                break;
            case sectionNames.projectSecondAdvisor:
                this.setState({secondAdvisor:event.target.value})
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
    ValidateData = (projectData)=>{
        console.log(projectData);
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
                alert("תיאור רקע ומוטיבציה צריך להיות גדול מ-200 תווים");
                return false;
            }
            if(projectData.PDescription.length>500){
                alert("תיאור רקע ומוטיבציה צריך להיות קטן מ-500 תווים");
                return false;
            }
            //project Topic 
            if (projectData.ProjectTopic==='') {
                alert('בחר נושא פרויקט');
                return false;
            }
            //project year
            if (projectData.Year === "" || projectData.Year === "בחר") {
                alert(' בחרו שנה');
                return false;
            }
            //project semester
            if (projectData.Semester === "" || projectData.Semester === "בחר") {
                alert(' בחרו סמסטר');
                return false;
            }
            //project Advisors
            if(projectData.advisor[0]===''){
                alert('מנחה א חסר ');
                return false;
            } 
            if(projectData.advisor[1]===''){
                alert('מנחה ב חסר ');
                return false;
            } 
            //project goals-->Goals
            if(projectData.Goals.length<2){
                alert('מספר מטרות הפרויקט צריך להיות לפחות 2');
                return false;
            }
            else{
                let flag = true;
                projectData.Goals.forEach((goal,index)=>{
                    if (goal.GoalDescription.length<10) {
                        alert(" תיאור מטרה מספר " +(index+1)+" צריך להיות גדול מ2 תווים ");
                        flag= false;
                    }
                    if (goal.GoalDescription.length>100) {
                        alert(" תיאור מטרה מספר " +(index+1)+" צריך להיות קטן מ100 תווים ");
                        flag= false;
                    }
                    if(goal.GoalStatus.length<4){
                        alert(" סטטוס מטרה מספר " +(index+1)+"צריך להיות גדול מ2 תווים ");
                        flag= false;
                    }
                    if(goal.GoalStatus.length>100){
                        alert(" סטטוס מטרה מספר " +(index+1)+" צריך להיות קטן מ100 תווים ");
                        flag= false;
                    }
                })
                if (!flag) {
                    return false;
                }
            }
            //project technologies -->Technologies
            if(projectData.Technologies.length<5){
                alert('מספר הטכנולוגיות צריך להיות לפחות 5');
                return false;
            }
            //project screenshots
            if (projectData.ScreenShots.length<5) {
                alert('מספר תמונות המסך צריך להיות לפחות 5');
                return false;
            }        
            //project logo
            if (projectData.ProjectLogo<1) {
                alert('חסר לוגו הפרויקט');
                return false;
            }
            //project students
            if(projectData.Students.length<1){
                alert('חייב שיהיה לפחות חבר צוות אחת');
                return false;
            }
            else{
                let flag = true;
                projectData.Students.forEach((student,index)=>{
                    if(student.Name===''){
                        alert('לסטודנט/ית מספר '+(index+1)+' חסר שם');
                        flag = false;
                    }
                    if (student.Picture==='') {
                        alert('לסטודנט/ית מספר '+(index+1)+' חסרה תמונה');
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
    handleClose = ()=> {this.setState({ openModal: false });}
    imagesModalClose = ()=>this.setState({showImagesMode:false})
    closePreview = ()=>this.setState({showPreview:false})
    ChangePublish = ()=>{
        const temp = !this.state.isPublished;
        if(this.ValidateData(this.getProjectDetails())){
            this.setState({isPublished:temp},()=>{
                if(this.state.isSaved===true || groupData.ProjectName!==undefined){
                    const ref = firebase.database().ref('RuppinProjects/'+projectKey);
                    ref.update({
                        isPublished:this.state.isPublished,
                    })
                    .then(()=>{
                        this.state.isPublished===true?alert('הפרויקט פורסם'):alert('הפרויקט לא יפורסם');
                    })
                }
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
            <div style={{flex:1,backgroundColor:'#eee'}}>
                <NavbarProjs />
                <HeaderForm title={this.state.GroupName}/>
                <ModalImage aspect={this.state.imageAspect} savePic={this.savePic} picTitle={this.state.picTitle} title={this.state.modalTitle} modalClose={this.handleClose} modalOpen={this.state.openModal} />
                <PreviewModal deletePic={this.DeletePic} title={this.state.modalTitle} onHide={this.imagesModalClose} images={this.state.imagesToShowInModal} modalOpen={this.state.showImagesMode}/>
                {/* preview project card */}
                <PreviewCard close={this.closePreview} projectDetails={this.state.projectDetails} openPreview={this.state.showPreview} SaveData={this.SaveData} />
                <SaveAction Save={this.SetProjectOnFirbase}/>
                <PublishProject ChangePublish={this.ChangePublish} isPublished={this.state.isPublished}  />
                <Form style={{marginTop:'4%',marginLeft:'10%',marginRight:'10%'}}>
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title={"תיאור הפרויקט"}/>
                        {/* projectName */}
                        <TextInputs IsMandatory={true} defaultInput={this.state.ProjectName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectName} inputSize="lg" />
                        {/* project Small Description */}
                        <TextareaInput IsMandatory={true}  defaultInput={this.state.CDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectSmallDesc} />
                        {/* project background and motivation */}
                        <RichText IsMandatory={true}  defaultInput={this.state.PDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectDesc} />
                        {/* project description */}
                        <RichText IsMandatory={true}  defaultInput={this.state.SystemDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectSystemDesc} />
                        {/* Project Findings*/}
                        <RichText  defaultInput={this.state.projectFindings} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectFindings} />
                        {/* Project Conclusion*/}
                        <RichText  defaultInput={this.state.ProjectConclusion} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.ProjectConclusion} />
                        {/* project partner Description */}
                        <TextareaInput IsMandatory={false}  defaultInput={this.state.PartnerDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectPartnerDescription} />
                        <Form.Row dir="rtl">
                            {/* year  */}
                            <SelectInput IsMandatory={true} defaultInput={this.state.Year} inputList={Years} InputTitle={sectionNames.projectYear} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* semester */}
                            <SelectInput IsMandatory={true} defaultInput={this.state.Semester} inputList={['א','ב','קיץ']} InputTitle={sectionNames.projectSemester} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* first advisor */}
                            <SelectInput IsMandatory={true}  defaultInput={this.state.firstAdvisor} inputList={this.state.advisorsList} InputTitle={sectionNames.projectFirstAdvisor} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* second advisor */}
                            <SelectInput IsMandatory={true}  defaultInput={this.state.secondAdvisor} inputList={this.state.advisorsList} InputTitle={sectionNames.projectSecondAdvisor} ChangeSelectInput={this.ChangeSelectedInputs} />
                        </Form.Row>
                    </div>
                    <ProjectGoals initalProjectGoals={this.state.projectGoals} setProjectGoals={this.getProjectGoals}/>
                    {/* techs tag */}
                    <Techs TechsChosen={this.TechsChosen} techs={this.state.techOptions}/>
                    {/* FILES UPLOAD */}
                    <div style={{border:'solid 1px',padding:20,borderRadius:30,marginTop:'2%',backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                    <SmallHeaderForm title="קבצים"/>
                            <Row dir="rtl" style={{marginTop:'2%'}} >
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#85B9A7',borderColor:'#85B9A7'}} onClick={()=>this.OpenImageModal('Project Logo','Plogo')}>
                                        <FaCameraRetro/>
                                        {this.state.logo.length!==0?`  עריכת תמונה מייצגת`:`  הוספת תמונה מייצגת`}
                                    </Button>
                                </Col>
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#85B9A7',borderColor:'#85B9A7'}} onClick={()=>this.OpenImageModal('Screenshots','')}>
                                        <FaCameraRetro/>
                                        {`  הוספת תמונות תוצרי הפרויקט`}
                                    </Button>
                                </Col>
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#85B9A7',borderColor:'#85B9A7'}} onClick={()=>this.OpenImageModal('Customer Logo','Clogo')}>
                                         <FaCameraRetro/>
                                         {this.state.customerLogo.length!==0?`  עריכת לוגו לקוח תעשייתי`:`  הוספת לוגו לקוח תעשייתי`}
                                    </Button>
                                </Col>
                                :
                                <Col sm="4"></Col>
                            </Row>
                            <Row dir="rtl" style={{marginTop:'2%'}} >
                                <Col sm="4"></Col>
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#EECC4D',borderColor:'#EEE'}} onClick={()=>this.OpenImagePreview('Screenshots')}>
                                        <FaCameraRetro/>
                                        {`  עריכת תמונות מסך`}
                                    </Button>
                                </Col>
                                <Col sm="4"></Col>
                            </Row>
                            {/* pdf */}
                            <Row dir="rtl" style={{marginTop:'2%'}} >
                                <Col sm="4"></Col>
                                <Col sm="4">
                                    <LabelTextPDF ProjectPDF={this.state.ProjectPDF} IsMandatory={false} />
                                    <PDFupload DeletePdf={this.DeletePdf} pdfFileSize={20000000} wordFileSize={5000000} savePDF={this.savePDF}/>
                                </Col>
                            </Row>
                            {/* project movie link */}
                            <LinkInput ChangeLinkInput={this.ChangeLinkInput} defaultInput={this.state.MovieLink} InputTitle={sectionNames.projectMovie} inputSize="sm" placeholder="www.youtube.com.."/>
                    </div>
                    <StudentDetails setStudents={this.getStudentsDetails} OpenImageModal={this.OpenImageModal} studentInitalDetails={this.state.StudentDetails} OpenPreviewModal={this.OpenImagePreviewForStudent}/>
                </Form>
            </div>

        )
    }
}
