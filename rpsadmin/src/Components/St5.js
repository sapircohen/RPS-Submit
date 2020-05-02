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
import Hashtags from '../Common/Tag2';
import ModalImage from '../Common/ImageModal';
import LinkInput from '../Common/Projectlinks';
import Loader from 'react-loader-spinner';
import SAlert from '../Common/SAlert';
import Idle from '../Common/Idle';
import ModalExample1 from './PreviewProject';
import { isObject } from 'util';
import {GetHashtags} from '../Common/HashtagsSetup';
import Validator from '../Classes/Validator';
import {ValidateData2} from '../functions/functions';
const configs = JSON.parse(localStorage.getItem('TemplateConfig'))?JSON.parse(localStorage.getItem('TemplateConfig')):JSON.parse(localStorage.getItem('st5'));

const sectionNames = {
    projectDesc : "רקע ומטרת הפרויקט *עד 400 תוים",
    projectChallenges:"אתגרי הפרויקט",
    projectSmallDesc:" תיאור קצר *עד 200 תוים",
    projectComments:"הערות",
    projectName:"שם הפרויקט",
    projectStackholders:"בעלי עניין",
    projectCustCustomers:"משתמשי המערכת",
    projectCustomerName:'שם הלקוח',
    projectType:'נושא הפרויקט',
    projectFirstAdvisor:"מנחה א",
    projectSecondAdvisor:"מנחה ב",
    projectMovie:'קישור לסרטון הפרויקט ביוטיוב',
    projectSemester:'סמסטר',
    projectYear:'שנה',
    ProjectConclusion:'סיכום ומסקנות *עד 1000 תוים',
    projectFindings:'תוצאות *עד 2000 תוים',
    projectPartnerDescription:'תיאור שותף תעשייתי',
    ProjectSummery:'תקציר *עד 1000 תוים'
}
export default class St5 extends React.Component{
    state={
        alertTitle:'',
        alertText:'',
        alertShow:false,
        alertIcon:'warning',
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
        projectFindings:'',
        ProjectConclusion:'',
        advisorsList:[],
        GroupName:'',
        MovieLink:'',
        PartnerDescription:'',
        projectGoals:[],
        techOptions : [],
        StudentsDetails:[],
        HashSuggestions: [],
        HashOptions : [],
        tags:[],
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
        SystemDescriptionPDF:'',
        chosenTechs:[],
        Year:'',
        Semester:'',
        isReady:true,
        ProjectSummery:'',
        ProjectTopic:'בחר',
        topicList:[],
        course :'',
        projectKey:'',
        groupData :'',
        showRatio:false,
        templateValidators:configs,
        Configs:new Validator(configs)    
    }
    componentDidMount(){
        this.setState({
            course :JSON.parse(localStorage.getItem('course')),
            projectKey:JSON.parse(localStorage.getItem('projectKey')),
            groupData :JSON.parse(localStorage.getItem('groupData')),
            
        },()=>{
            console.log(this.state.Configs)
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
                    console.log(tag)
                    let t={};
                    if(tag.__isNew__ || tag.label){
                        console.log(tag)
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
                ProjectSummery:dataForGroup.ProjectSummery?dataForGroup.ProjectSummery:'',
                ProjectPDF:dataForGroup.ProjectPDF?dataForGroup.ProjectPDF:'',
                SystemDescriptionPDF:dataForGroup.SystemDescriptionPDF?dataForGroup.SystemDescriptionPDF:'',
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
                ProjectCourse:dataForGroup.ProjectCourse?dataForGroup.ProjectCourse:this.state.course,

                ProjectConclusion:dataForGroup.ProjectConclusion?dataForGroup.ProjectConclusion:'',
                projectFindings:dataForGroup.projectFindings?dataForGroup.projectFindings:'',
                PartnerDescription:dataForGroup.PartnerDescription?dataForGroup.PartnerDescription:'',
                ProjectTopic:dataForGroup.ProjectTopic?dataForGroup.ProjectTopic:'בחר',
                tags:tagsList,
            },()=>{
                this.setState({projectDetails:this.getProjectDetails()})
            })
            this.getTechnologies();
            this.getAdvisors();
            this.getTopicForFinalProject();
            this.getHashs();
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
    getProjectGoals = (goals)=>{
        this.setState({projectGoals:goals},()=>{
            console.log(this.state.projectGoals)
        })
    }
    getAdvisors = ()=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(this.state.groupData.Faculty).child('Departments').child(this.state.groupData.Department).child('Advisors');
        ref.once("value", (snapshot)=> {
            this.setState({advisorsList:snapshot.val()});
            console.log(snapshot.val())
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
        })
    }
    getTopicForFinalProject = ()=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(this.state.groupData.Faculty).child('Departments').child(this.state.groupData.Department).child('Experties').child(this.state.groupData.Major).child('Courses').child('Final project').child('Topics');
        ref.once("value", (snapshot)=> {
            snapshot.forEach((topicName)=>{
                this.setState({topicList:[...this.state.topicList,topicName.val().Name]});
                console.log(topicName.val())
            })
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
        })
    }
    getTechnologies = ()=>{
        const ref = firebase.database().ref('TechnologiesE');
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
                this.setState({HashOptions:[...this.state.HashOptions,Hash]})
            })
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
        })
        .then(()=>console.log(this.state.HashOptions))
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
    saveDescPDF = (url)=>{
        const ref = firebase.database().ref('RuppinProjects/'+this.state.projectKey);
        this.setState({SystemDescriptionPDF:url
        },()=>{
            console.log(this.state.ProjectPDF)
            ref.update({
                ProjectPDF:this.state.ProjectPDF,
            })
        })
    }     
    DeletePdf=()=>{
        if(this.state.ProjectPDF!==''){
            const desertRef = firebase.storage().refFromURL(this.state.ProjectPDF);
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
    DeleteDescPdf=()=>{
        if(this.state.SystemDescriptionPDF!==''){
            const desertRef = firebase.storage().refFromURL(this.state.SystemDescriptionPDF);
            desertRef.delete().then(()=> { 
                this.setState({
                    SystemDescriptionPDF:''
                },()=>{
                    const ref = firebase.database().ref('RuppinProjects/'+this.state.projectKey);
                    ref.update({
                        SystemDescriptionPDF:this.state.SystemDescriptionPDF,
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
            ProjectTopic:this.state.ProjectTopic,
            ProjectPDF:this.state.ProjectPDF,
            ProjectSummery:this.state.ProjectSummery,
            SystemDescriptionPDF:this.state.SystemDescriptionPDF,
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
            ProjectCourse:this.state.ProjectCourse,
            ProjectConclusion:this.state.ProjectConclusion,
            ProjectFindings:this.state.projectFindings,
            PartnerDescription:this.state.PartnerDescription,
            HashTags:this.state.tags,
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
    HashsChosen =(value)=>{
        this.setState({
            tags:value.map((val)=>{
                return val;
            })
        })
    }
    SaveData = ()=>{
            const ref = firebase.database().ref('RuppinProjects/'+this.state.projectKey);
            ref.update({
                templateSubmit:'st5',
                templateView:'vt1',
                ProjectTopic:this.state.ProjectTopic,
                ProjectCourse:this.state.course,
                ProjectPDF:this.state.ProjectPDF,
                SystemDescriptionPDF:this.state.SystemDescriptionPDF,
                Year:this.state.Year,
                Semester:this.state.Semester,
                Advisor:[this.state.firstAdvisor,this.state.secondAdvisor],
                CustomerLogo:this.state.customerLogo,
                GroupName:this.state.GroupName,
                ProjectName:this.state.ProjectName,
                PDescription:this.state.PDescription,
                MovieLink:this.state.MovieLink,
                Goals:this.state.projectGoals,
                Students:this.state.StudentsDetails,
                ScreenShots:this.state.ScreenShots,
                ProjectLogo:this.state.logo,
                CDescription:this.state.CDescription,
                ScreenShotsNames:this.state.ScreenShotsNames,
                isPublished:this.state.isPublished,
                Technologies:this.state.chosenTechs,
                ProjectConclusion:this.state.ProjectConclusion,
                projectFindings:this.state.projectFindings,
                PartnerDescription:this.state.PartnerDescription,
                ProjectSummery:this.state.ProjectSummery,
                HashTags:this.state.tags,
            })
    }
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
    changeStudentImage = (url,index)=>{
        this.state.StudentsDetails[index].Picture = url;
        this.forceUpdate();
        console.log(this.state.StudentsDetails);
    }
    changeProjectType = (e)=>{this.setState({ProjectTopic:e.target.value})}
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
    TechsChosen(value){
        this.setState({
            chosenTechs:value.map((val)=>{
                return val;
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
            case sectionNames.projectPartnerDescription:this.setState({PartnerDescription:event.target.value})
                break;
            case sectionNames.ProjectSummery:this.setState({ProjectSummery:event})
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
    handleClose = ()=> {this.setState({ openModal: false });}
    imagesModalClose = ()=>this.setState({showImagesMode:false})
    closePreview = ()=>this.setState({showPreview:false})
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
            <div style={{flex:1,backgroundColor:'#eee'}}>
                <Idle/>
                <NavbarProjs />
                <SAlert alertIcon={this.state.alertIcon} CloseAlert={this.CloseAlert} show={this.state.alertShow} title={this.state.alertTitle} text={this.state.alertText}/>
                <HeaderForm title={this.state.GroupName}/>
                <ModalImage showRatio={this.state.showRatio}  aspect={this.state.imageAspect} savePic={this.savePic} picTitle={this.state.picTitle} title={this.state.modalTitle} modalClose={this.handleClose} modalOpen={this.state.openModal} />
                <PreviewModal deletePic={this.DeletePic} title={this.state.modalTitle} onHide={this.imagesModalClose} images={this.state.imagesToShowInModal} modalOpen={this.state.showImagesMode}/>
                {/* preview project card */}
                <ModalExample1 close={this.closePreview} projectDetails={this.state.projectDetails} openPreview={this.state.showPreview} SaveData={this.SaveData}/>
                <SaveAction Save={this.SetProjectOnFirbase}/>
                <PublishProject ChangePublish={this.ChangePublish} isPublished={this.state.isPublished}  />
                <br/>
                <Button style={{backgroundColor:'#EECC4D',borderColor:'#EEE'}} onClick={()=>this.CheckValidation(this.getProjectDetails())}>אמת נתונים</Button>
                <Form style={{marginTop:'4%',marginLeft:'10%',marginRight:'10%'}}>
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title={"תיאור הפרויקט"}/>
                        {/* projectName */}
                        <TextInputs configs={Configs.ProjectName} defaultInput={this.state.ProjectName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectName} inputSize="lg" />
                        {/* project Small Description */}
                        <TextareaInput configs={Configs.CDescription} defaultInput={this.state.CDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectSmallDesc} />
                        {/* Project Summery*/}
                        <RichText configs={Configs.ProjectSummery} defaultInput={this.state.ProjectSummery} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.ProjectSummery} />
                        {/* project background and motivation */}
                        <RichText configs={Configs.PDescription} defaultInput={this.state.PDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectDesc} />
                        {/* Project Findings*/}
                        <RichText configs={Configs.ProjectFindings} defaultInput={this.state.projectFindings} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectFindings} />
                        {/* Project Conclusion*/}
                        <RichText configs={Configs.ProjectConclusion} defaultInput={this.state.ProjectConclusion} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.ProjectConclusion} />
                        {/* project partner Description */}
                        <TextareaInput configs={Configs.PartnerDescription} defaultInput={this.state.PartnerDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectPartnerDescription} />
                        <Form.Row dir="rtl">
                            {/* year  */}
                            <SelectInput IsMandatory={Configs.Year.isMandatory} defaultInput={this.state.Year} inputList={Years} InputTitle={sectionNames.projectYear} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* semester */}
                            <SelectInput IsMandatory={Configs.Semester.isMandatory} defaultInput={this.state.Semester} inputList={['שנתי']} InputTitle={sectionNames.projectSemester} ChangeSelectInput={this.ChangeSelectedInputs} />
                            <SelectInput IsMandatory={Configs.ProjectTopic.isMandatory} defaultInput={this.state.ProjectTopic}  inputList={this.state.topicList} InputTitle={sectionNames.projectType} ChangeSelectInput={this.changeProjectType} />
                            {/* first advisor */}
                            <SelectInput IsMandatory={Configs.FirstAdvisor.isMandatory} defaultInput={this.state.firstAdvisor} inputList={this.state.advisorsList} InputTitle={sectionNames.projectFirstAdvisor} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* second advisor */}
                            <SelectInput IsMandatory={Configs.SecondAdvisor.isMandatory} defaultInput={this.state.secondAdvisor} inputList={this.state.advisorsList} InputTitle={sectionNames.projectSecondAdvisor} ChangeSelectInput={this.ChangeSelectedInputs} />
                        </Form.Row>
                    </div>
                    <ProjectGoals title={"מטרות ודרישות הנדסיות"} initalProjectGoals={this.state.projectGoals} setProjectGoals={this.getProjectGoals}/>
                    {/* project system pdf description */}
                    <div style={{border:'solid 1px',padding:20,borderRadius:30,marginTop:'2%',backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title="תיאור מערכת / תכנון הנדסי"/>
                        <Row dir="rtl" style={{marginTop:'2%'}} >
                            <Col sm="4"></Col>
                            <Col sm="4">
                                <LabelTextPDF ProjectPDF={this.state.SystemDescriptionPDF} IsMandatory={Configs.ProjectPDF.isMandatory} />
                                <PDFupload DeletePdf={this.DeleteDescPdf} pdfFileSize={30000000} wordFileSize={5000000} savePDF={this.saveDescPDF}/>
                            </Col>
                        </Row>
                        <SmallHeaderForm title="ספר הפרויקט"/>
                        {/* pdf */}
                        <Row dir="rtl" style={{marginTop:'2%'}} >
                            <Col sm="4"></Col>
                            <Col sm="4">
                                <LabelTextPDF ProjectPDF={this.state.ProjectPDF} IsMandatory={Configs.SystemDescriptionPDF.isMandatory} />
                                <PDFupload DeletePdf={this.DeletePdf} pdfFileSize={30000000} wordFileSize={5000000} savePDF={this.savePDF}/>
                            </Col>
                        </Row>
                    </div>
                    {/* techs tag */}
                    <Techs chosenTechs={this.state.chosenTechs} TechsChosen={this.TechsChosen.bind(this)} techs={this.state.techOptions}/>
                    {/* FILES UPLOAD */}
                    <div style={{border:'solid 1px',padding:20,borderRadius:30,marginTop:'2%',backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                    <SmallHeaderForm title="קבצים"/>
                            <Row dir="rtl" style={{marginTop:'2%'}} >
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#85B9A7',borderColor:'#85B9A7'}} onClick={()=>this.OpenImageModal('Project Logo','Plogo')}>
                                        <FaCameraRetro/>
                                        {this.state.logo.length!==0?`  עריכת תמונה מייצגת`:`  הוספת תמונה מייצגת`}
                                    </Button>
                                    <br/>
                                    {Configs.ProjectLogo.isMandatory&&(Configs.ProjectLogo.minimum&&<span style={{color:'blue'}}>מינימום {Configs.ProjectLogo.minimum}</span>)}
                                </Col>
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#85B9A7',borderColor:'#85B9A7'}} onClick={()=>this.OpenImageModal('Screenshots','')}>
                                        <FaCameraRetro/>
                                        {`  הוספת תמונות תוצרי הפרויקט`}
                                    </Button>
                                    <br/>
                                    {Configs.ScreenShots.isMandatory&&(Configs.ScreenShots.minimum&&<span style={{color:'blue'}}>מינימום {Configs.ScreenShots.minimum}</span>)}
                                </Col>
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#85B9A7',borderColor:'#85B9A7'}} onClick={()=>this.OpenImageModal('Customer Logo','Clogo')}>
                                         <FaCameraRetro/>
                                         {this.state.customerLogo.length!==0?`  עריכת לוגו לקוח תעשייתי`:`  הוספת לוגו לקוח תעשייתי`}
                                    </Button>
                                    <br/>
                                    {Configs.CustomerLogo.isMandatory&&(Configs.CustomerLogo.minimum&&<span style={{color:'blue'}}>מינימום {Configs.CustomerLogo.minimum}</span>)}
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
                            
                            {/* project movie link */}
                            <LinkInput IsMandatory={Configs.MovieLink.isMandatory} ChangeLinkInput={this.ChangeLinkInput} defaultInput={this.state.MovieLink} InputTitle={sectionNames.projectMovie} inputSize="sm" placeholder="www.youtube.com.."/>
                    </div>
                    {/* tag the project */}
                    <Hashtags isMandatory={Configs.HashTags.isMandatory} minimum={Configs.HashTags.minimum} chosenHashs={this.state.tags} HashsChosen={this.HashsChosen} hashs={this.state.HashOptions}/>
                    <StudentDetails Students={Configs.Students} Name={Configs.StudentName} Picture={Configs.StudentPicture} Email={Configs.StudentEmail} Id={Configs.StudentId} setStudents={this.getStudentsDetails} OpenImageModal={this.OpenImageModal} studentInitalDetails={this.state.StudentDetails} OpenPreviewModal={this.OpenImagePreviewForStudent}/>
                </Form>
            </div>

        )
    }
}
