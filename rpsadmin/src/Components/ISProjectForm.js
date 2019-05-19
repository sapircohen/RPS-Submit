import React from 'react';
import NavbarProjs from './NavbarStudents';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { FaGoogle,FaAppleAlt,FaCameraRetro } from "react-icons/fa";
import { WithContext as ReactTags } from 'react-tag-input';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import HeaderForm from '../Common/HeaderForm';
import SmallHeaderForm from '../Common/SmallHeaderForm';
import ModalImage from '../Common/ImageModal';
import firebase from 'firebase';
import StudentDetails from '../Common/StudentsDetails';
import ProjectModules from '../Common/ProjectModules';
import ProjectGoals from '../Common/ProjectGoals';
import PreviewModal from "../Common/imagesModalPrevies";
import SaveAction from '../Common/SaveAction';
import PreviewCard from '../Common/PreviewProjectCard';
import Loader from 'react-loader-spinner';
//import {storage} from '../App';

import Toggle from 'react-toggle';
import "react-toggle/style.css";
//import { forEach } from '@firebase/util';


const KeyCodes = {
    comma: 188,
    enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];


class ISProjectTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state={
            imageAspect:4/3,
            showPreview:false,
            imagesToShowInModal:[],
            showImagesMode:false,
            ScreenShots:[],
            ScreenShotsNames:[],
            logo:[],
            customerLogo:[],
            isPublished:true,
            Advisor:'',
            Challenges:'',
            CustomerName:'',
            GroupName:'',
            HashTags:[],
            MovieLink:'',
            PDescription:'',
            CDescription:null,
            ProjectSite:'',
            ProjectName:'',
            modalTitle:'',
            picTitle:'',
            advisorsList:[],
            openModal:false,
            finalProject:false,
            organization:false,
            tags:[],
            appExists:false,
            chosenTechs:[],
            suggestions: [],
            techOptions : [],
            StudentsDetails:[],
            projectGoals:[],
            projectModules:[],
            comments:'',
            CustCustomers:'',
            CStackholders:'',
            projectDetails:{},
            isReady:true,
            coursesList:[],
            topicList:[]
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.TechsChosen = this.TechsChosen.bind(this);

        //refs (doing the same job as getElementById)
        this.projectName = React.createRef();
        this.projectDescription = React.createRef();
        this.projectChallenges = React.createRef();
        this.projectType = React.createRef();
        this.projectCustomerName = React.createRef();
        this.projectSmallDescription = React.createRef();
        this.projectMovieLink = React.createRef();
        this.projectSiteLink = React.createRef();
        this.appleStoreLink = React.createRef();
        this.googlePlayLink = React.createRef();
        this.firstAdvisor = React.createRef();
        this.secondAdvisor = React.createRef();
        this.projectComments = React.createRef();
        this.CustCustomersRef = React.createRef();
        this.CStackholdersRef = React.createRef();
    }
    componentDidMount(){

        //get group data from local storage
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        let tagsList = [];
        
        if(groupData.HashTags){
            groupData.HashTags.forEach((tag)=>{
                let t = {
                    'id':tag,
                    'text':tag
                }
                tagsList.push(t);
            })
        }
        
        console.log(groupData)
        this.setState({
            Advisor:groupData.Advisor?groupData.Advisor:'',
            Challenges:groupData.Challenges?groupData.Challenges:'',
            GroupName:groupData.GroupName,
            ProjectName:groupData.ProjectName?groupData.ProjectName:'',
            PDescription:groupData.PDescription?groupData.PDescription:'',
            ProjectSite:groupData.ProjectSite?groupData.ProjectSite:'',
            MovieLink:groupData.MovieLink?groupData.MovieLink:'',
            ScreenShots:groupData.ScreenShots?groupData.ScreenShots:[],
            logo:groupData.ProjectLogo?[groupData.ProjectLogo]:[],
            customerLogo:groupData.CustomerLogo?[groupData.CustomerLogo]:[],
            comments:groupData.Comments?groupData.Comments:'',
            CustCustomers:groupData.CustCustomers?groupData.CustCustomers:'',
            CStackholders:groupData.CStackholders?groupData.CStackholders:'',
            CDescription:groupData.CDescription?groupData.CDescription:'',
            ScreenShotsNames:groupData.ScreenShotsNames?groupData.ScreenShotsNames:[],
            projectModules:groupData.Module?groupData.Module:[],
            projectGoals:groupData.Goals?groupData.Goals:[],
            StudentDetails:groupData.Students?groupData.Students:[],
            chosenTechs:groupData.Technologies?groupData.Technologies:[],
            tags:tagsList
        },()=>console.log(this.state.StudentDetails))
        //get list of advisors from firebase
        this.getAdvisors();
        //get technologies from firebase
        this.getTechnologies();
        //get courses from firebase
        this.getCourses();
        //get topics for Final project from firebase
        this.getTopicForFinalProject();
    }
    getCourses= ()=>{
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        if (groupData.Department === "הנדסת תעשייה וניהול") {///Ruppin/Faculties/Engineering/Departments/Industrial Engineering/Advisors'
            const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child('Engineering').child('Departments').child('Industrial Engineering').child('Experties').child('Information systems').child('Courses');
            ref.once("value", (snapshot)=> {
                snapshot.forEach((course)=>{
                    this.setState({coursesList:[...this.state.coursesList,course.val().Name]});
                    console.log(course.val())
                })
            }, (errorObject)=> {
                console.log("The read failed: " + errorObject.code);
            })
        }
        ///need another one for "מנהל עסקים"
    }
    getTopicForFinalProject = ()=>{
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        if (groupData.Department === "הנדסת תעשייה וניהול" || groupData.Department === "מנהל עסקים" ) {///Ruppin/Faculties/Engineering/Departments/Industrial Engineering/Advisors'
            const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child('Engineering').child('Departments').child('Industrial Engineering').child('Experties').child('Information systems').child('Courses').child('Final project').child('Topics');
            ref.once("value", (snapshot)=> {
                snapshot.forEach((topicName)=>{
                    this.setState({topicList:[...this.state.topicList,topicName.val().Name]});
                    console.log(topicName.val())
                })
            }, (errorObject)=> {
                console.log("The read failed: " + errorObject.code);
            })
        }
        ///need another one for "מנהל עסקים"
    }
    getAdvisors = ()=>{

        const groupData = JSON.parse(localStorage.getItem('groupData'));
        if (groupData.Department === "הנדסת תעשייה וניהול") {///Ruppin/Faculties/Engineering/Departments/Industrial Engineering/Advisors'
            const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child('Engineering').child('Departments').child('Industrial Engineering').child('Advisors');
            ref.once("value", (snapshot)=> {
                this.setState({advisorsList:snapshot.val()});
                console.log(snapshot.val())
            }, (errorObject)=> {
                console.log("The read failed: " + errorObject.code);
            })
        }
        //need to go to another route, only for the mean time.
        else if(groupData.Department === "מנהל עסקים"){
            const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child('Engineering').child('Departments').child('Industrial Engineering').child('Advisors');
            ref.once("value", (snapshot)=> {
                this.setState({advisorsList:snapshot.val()});
                console.log(snapshot.val())
            }, (errorObject)=> {
                console.log("The read failed: " + errorObject.code);
            })
        }

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
    appExisting = (e)=>{
        this.setState({
            appExists:!this.state.appExists
        })
    }
    changeCourseType = (e)=>{
        if(e.target.value==='פרויקט גמר'){
            this.setState({finalProject:true})
        }
        //different courses have different options
        else{
            this.setState({
                finalProject:false,
                organization:false
            })
        }
    }
    handleDelete(i){
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }
    handleAddition(tag){
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }
    handleDrag(tag, currPos, newPos){
        const tags = [...this.state.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: newTags });
    }
    changeProjectType = (e)=>{
        if (e.target.value==='ארגוני') {
            this.setState({organization:true})
        }
        else{
            this.setState({organization:false})
        }
    }
    TechsChosen (value){
        //insert all techs to an array
        this.setState({
            chosenTechs:value.map((val)=>{
                return val.value;
            })
        },()=>{
            console.log(this.state.chosenTechs)
        })
    }
    OpenImageModal = (title,pic)=>{
        this.setState({
            openModal:true,
            modalTitle:title,
            picTitle:pic
        })
    }
    OpenImagePreviewForStudent = (index)=>{
        console.log(this.state.StudentsDetails[index].Picture);
        if(this.state.StudentsDetails[index].Picture !==''){
            let temp = [];
            temp.push(this.state.StudentsDetails[index].Picture);
            console.log(temp);
            this.setState({
                showImagesMode:true,
                imagesToShowInModal:temp
            })
        }
        else{
            alert("לא הועלתה תמונת סטודנט");
        }
    }
    OpenImagePreview = (title)=>{
        switch (title) {
            case 'Screenshots':
                this.setState({
                    //showScreenshotsPreview:true,
                    modalTitle:title,
                    showImagesMode:true,
                    imagesToShowInModal:this.state.ScreenShots
                })
                break;
            case 'Project Logo':
                if(this.state.logo[0]!==undefined){
                    this.setState({
                        showImagesMode:true,
                        modalTitle:title,
                        //showProjectLogoPreview:true,
                        imagesToShowInModal:this.state.logo
                    })
                }
                else{
                    this.setState({
                        showImagesMode:true,
                        modalTitle:title,
                        //showProjectLogoPreview:true,
                        imagesToShowInModal:undefined
                    })
                }
                break;
            case 'Customer Logo':
                if(this.state.customerLogo[0]!==undefined){
                    this.setState({
                        showImagesMode:true,
                        modalTitle:title,
                        //showCustomerLogoPreview:true,
                        imagesToShowInModal:this.state.customerLogo
                    })
                }
                else{
                    this.setState({
                        showImagesMode:true,
                        modalTitle:title,
                        //showProjectLogoPreview:true,
                        imagesToShowInModal:undefined
                    })
                }
                break;
            default:
                break;
        }
    }
    handleClose = ()=> {
        this.setState({ openModal: false });
    }
    handlePublishedChange = ()=>{
        this.setState({isPublished:!this.state.isPublished})
    }
    getStudentsDetails = (students)=>{
        
        this.setState({StudentsDetails:students},()=>{
            console.log(this.state.StudentsDetails);
        })
        
    }
    getProjectGoals = (goals)=>{
        this.setState({projectGoals:goals},()=>{
            console.log(this.state.projectGoals)
        })
    }
    getprojectModules = (modules)=>{
        this.setState({projectModules:modules},()=>{
            console.log(this.state.projectModules)
        })
    }
    SetProjectOnFirbase = ()=>{

        const arrayOfTags = this.state.tags.map((text)=>text.text);
        console.log(arrayOfTags)
        
        console.log(this.state.tags);
        console.log(arrayOfTags)
        const project = {
            ProjectName:this.projectName.current.value,
            PDescription:this.projectDescription.current.value,
            Challenges:this.projectChallenges.current.value,
            ProjectTopic:this.projectType.current.value,
            ProjectCourse:'פרויקט גמר',
            advisor:[this.firstAdvisor.current.value,this.secondAdvisor.current.value],
            HashTags:arrayOfTags,
            Technologies:this.state.chosenTechs,
            Year:(new Date().getFullYear()),
            isPublished:this.state.isPublished,
            CustomerName:this.state.organization?this.projectCustomerName.current.value:'',
            CDescription:this.projectSmallDescription.current.value,
            Goals:this.state.projectGoals,
            Module:this.state.projectModules,
            ProjectSite:this.projectSiteLink.current.value,
            MovieLink:this.projectMovieLink.current.value,
            GooglePlay:this.state.appExists?this.googlePlayLink.current.value:'',
            AppStore:this.state.appExists?this.appleStoreLink.current.value:'',
            Students:this.state.StudentsDetails,
            ScreenShots:this.state.ScreenShots,
            ProjectLogo:this.state.logo,
            CustomerLogo:this.state.organization?this.state.customerLogo:'',
            Comments:this.projectComments.current.value,
            CustCustomers:this.CustCustomersRef.current.value,
            CStackholders:this.CStackholdersRef.current.value,
            ScreenShotsNames:this.state.ScreenShotsNames,
        }
        console.log(project);
        this.setState({
            projectDetails:project,
        },()=>{
            this.setState({showPreview:true})
        })
    }
    //Get pics url from firebase storage
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
    changeScreenshots= (url,name)=>{
        
        this.setState({
            ScreenShots:[...this.state.ScreenShots,url],
            ScreenShotsNames:[...this.state.ScreenShotsNames,name]
        })
    }
    changeStudentImage = (url,index)=>{
        this.state.StudentsDetails[index].Picture = url;
        this.forceUpdate();
        console.log(this.state.StudentsDetails);
    }
    ValidateData = (projectData)=>{
        // project name validation
        if (projectData.ProjectName==='' || projectData.ProjectName.length<2) {
            alert('שם הפרויקט חסר');
            return false;
        }
        //project modules -->Module
        if(projectData.Module.length<2){
            alert('מספר מודולי הפרויקט צריך להיות לפחות 2');
            return false;
        }
        else{
            projectData.Module.forEach((mod,index)=>{
                if (mod.ModuleDescription.length<20) {
                    alert(" תיאור מודול מספר " +(index+1)+" צריך להיות גדול מ20 תווים ");
                    return false;
                }
                if (mod.ModuleDescription.length>200) {
                    alert(" תיאור מודול מספר " +(index+1)+" צריך להיות קטן מ200 תווים ");
                    return false;
                }
                if(mod.ModuleName.length<3){
                    alert(" שם מודול מספר " +(index+1)+"צריך להיות גדול מ3 תווים ");
                    return false;
                }
                if(mod.ModuleName.length>70){
                    alert(" שם מודול מספר " +(index+1)+" צריך להיות קטן מ100 תווים ");
                    return false;
                }
            })
        }

        //project goals-->Goals
        if(projectData.Goals.length<2){
            alert('מספר מטרות הפרויקט צריך להיות לפחות 2');
            return false;
        }
        else{
            projectData.Goals.forEach((goal,index)=>{
                if (goal.GoalDescription.length<10) {
                    alert(" תיאור מטרה מספר " +(index+1)+" צריך להיות גדול מ10 תווים ");
                    return false;
                }
                if (goal.GoalDescription.length>100) {
                    alert(" תיאור מטרה מספר " +(index+1)+" צריך להיות קטן מ100 תווים ");
                    return false;
                }
                if(goal.GoalStatus.length<4){
                    alert(" סטטוס מטרה מספר " +(index+1)+"צריך להיות גדול מ4 תווים ");
                    return false;
                }
                if(goal.GoalStatus.length<100){
                    alert(" סטטוס מטרה מספר " +(index+1)+" צריך להיות קטן מ100 תווים ");
                    return false;
                }
            })
        }
        //project comments
        if(projectData.Comments.length<5 && projectData.Comments!==''){
            alert("שדה הערות צריך להיות גדול מ-5 תווים");
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
        // project Challenges -->Challenges
        if(projectData.Challenges.length<50){
            alert("שדה אתגרי הפרויקט צריך להיות גדול מ-50 תווים");
            return false;
        }
        if(projectData.Challenges.length>200){
            alert("שדה אתגרי הפרויקט צריך להיות קטן מ-200 תווים");
            return false;
        }
        //project technologies -->Technologies
        if(projectData.technologies.length<5){
            alert('מספר הטכנולוגיות צריך להיות לפחות 5');
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
        
        const project = {
            ProjectName: this.state.projectDetails.ProjectName,
            ProjectSite:this.state.projectDetails.ProjectSite,
            isPublished:this.state.projectDetails.isPublished,
            Year:this.state.projectDetails.Year,
            isApproved:1,
            CDescription:this.state.projectDetails.CDescription,
            CStackholders:this.state.projectDetails.CStackholders,
            ScreenShotsNames:this.state.projectDetails.ScreenShotsNames,
            ScreenShots:this.state.projectDetails.ScreenShots,
            Students:this.state.projectDetails.Students,
            Technologies:this.state.projectDetails.Technologies,
            CustCustomers:this.state.projectDetails.CustCustomers,
            Challenges:this.state.projectDetails.Challenges,
            Comments:this.state.projectDetails.Comments,
            Advisor:this.state.projectDetails.advisor,
            CustomerLogo:this.state.projectDetails.CustomerLogo,
            ProjectLogo:this.state.projectDetails.ProjectLogo,
            MovieLink:this.state.projectDetails.MovieLink,
            Goals:this.state.projectDetails.Goals,
            Module:this.state.projectDetails.Module,
            GooglePlay:this.state.projectDetails.GooglePlay,
            AppStore:this.state.projectDetails.AppStore,
            CustomerName:this.state.projectDetails.CustomerName,
            HashTags:this.state.projectDetails.HashTags,
            PDescription:this.state.projectDetails.PDescription
        }
        if(this.ValidateData(project)){
            this.setState({isReady:false},()=>{
                const projectKey = JSON.parse(localStorage.getItem('projectKey'));
                const ref = firebase.database().ref('RuppinProjects/'+projectKey);
                ref.update({
                    ProjectName: this.state.projectDetails.ProjectName,
                    ProjectSite:this.state.projectDetails.ProjectSite,
                    isPublished:this.state.projectDetails.isPublished,
                    Year:this.state.projectDetails.Year,
                    isApproved:1,
                    CDescription:this.state.projectDetails.CDescription,
                    CStackholders:this.state.projectDetails.CStackholders,
                    ScreenShotsNames:this.state.projectDetails.ScreenShotsNames,
                    ScreenShots:this.state.projectDetails.ScreenShots,
                    Students:this.state.projectDetails.Students,
                    Technologies:this.state.projectDetails.Technologies,
                    CustCustomers:this.state.projectDetails.CustCustomers,
                    Challenges:this.state.projectDetails.Challenges,
                    Comments:this.state.projectDetails.Comments,
                    Advisor:this.state.projectDetails.advisor,
                    CustomerLogo:this.state.projectDetails.CustomerLogo,
                    ProjectLogo:this.state.projectDetails.ProjectLogo,
                    MovieLink:this.state.projectDetails.MovieLink,
                    Goals:this.state.projectDetails.Goals,
                    Module:this.state.projectDetails.Module,
                    GooglePlay:this.state.projectDetails.GooglePlay,
                    AppStore:this.state.projectDetails.AppStore,
                    CustomerName:this.state.projectDetails.CustomerName,
                    HashTags:this.state.projectDetails.HashTags,
                    PDescription:this.state.projectDetails.PDescription
                })
                .then(()=>{
                    this.setState({isReady:true,showPreview:false})
                })
            })
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
    //close preview:
    closePreview = ()=>this.setState({showPreview:false})
    imagesModalClose = ()=>this.setState({showImagesMode:false})
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

                <ModalImage aspect={this.state.imageAspect}savePic={this.savePic} picTitle={this.state.picTitle} title={this.state.modalTitle} modalClose={this.handleClose} modalOpen={this.state.openModal} />
                <PreviewModal deletePic={this.DeletePic} title={this.state.modalTitle} onHide={this.imagesModalClose} images={this.state.imagesToShowInModal} modalOpen={this.state.showImagesMode}/>
                <SaveAction Save={this.SetProjectOnFirbase}/>
                <NavbarProjs />
                
                <HeaderForm title={this.state.GroupName}/>
                
                {/* preview project card */}
                <PreviewCard close={this.closePreview} projectDetails={this.state.projectDetails} openPreview={this.state.showPreview} SaveData={this.SaveData} />

                <label>
                    <p dir="rtl">{`  האם לפרסם את הפרויקט?`}</p>
                    <Toggle
                        defaultChecked={this.state.isPublished}
                        onChange={this.handlePublishedChange} />
                </label>
                
                <Form style={{marginTop:'4%',marginLeft:'10%',marginRight:'10%'}}>
                    {/* Poject details */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title={"תיאור הפרויקט"}/>
                        
                        {/* projectName */}
                        {/* <ProjectName /> */}
                        <Form.Group style={{marginTop:'2%'}} as={Row} id="projectName">
                            <Col sm="3"></Col>
                            <Col sm="7">
                                <Form.Control ref={this.projectName} defaultValue={this.state.ProjectName} size="lg" type="text" dir="rtl"/>
                            </Col>
                            <Form.Label column sm="2">שם הפרויקט</Form.Label>
                        </Form.Group>
                        
                        {/* stalkholders */}
                        <Form.Group style={{marginTop:'2%'}} as={Row} id="CustCustomers">
                            <Col sm="3"></Col>
                            <Col sm="7">
                                <Form.Control ref={this.CStackholdersRef} defaultValue={this.state.CStackholders} size="lg" type="text" dir="rtl"/>
                            </Col>
                            <Form.Label column sm="2">בעלי עניין</Form.Label>
                        </Form.Group>
                        
                        {/* CustCustomers */}
                        <Form.Group style={{marginTop:'2%'}} as={Row} id="CustCustomers">
                            <Col sm="3"></Col>
                            <Col sm="7">
                                <Form.Control ref={this.CustCustomersRef} defaultValue={this.state.CustCustomers} size="lg" type="text" dir="rtl"/>
                            </Col>
                            <Form.Label column sm="2">משתמשי המערכת</Form.Label>
                        </Form.Group>
                        
                        {/* project Small Description */}
                        <Form.Group as={Row} id="projectSmallDescription">
                            <Col sm="10">
                                <Form.Control ref={this.projectSmallDescription} type="textarea" defaultValue={this.state.CDescription} dir="rtl" />
                            </Col>
                        <Form.Label column sm="2">תיאור קצר</Form.Label>
                        </Form.Group>
                        
                        {/* project description */}
                        <Form.Group as={Row} id="description">
                            <Col  sm="10">
                                {/* <textarea dir="rtl" defaultValue= ref={this.projectDescription}>
                                </textarea> */}
                                
                                <Form.Control ref={this.projectDescription} type="textarea" defaultValue={this.state.PDescription} dir="rtl" rows={3} />
                            </Col>
                            <Form.Label column sm="2">תיאור הפרויקט</Form.Label>
                        </Form.Group>
                        
                        {/* project Challenges  */}
                        <Form.Group as={Row} id="projectChallenges">
                            <Col sm="10">
                                <Form.Control ref={this.projectChallenges} type="textarea" defaultValue={this.state.Challenges} dir="rtl" rows="3" />
                            </Col>
                            <Form.Label column sm="2">אתגרי הפרויקט</Form.Label>
                        </Form.Group>

                        {/* project Comments */}
                        <Form.Group as={Row} id="comments">
                            <Col sm="10">
                                <Form.Control defaultValue={this.state.comments} ref={this.projectComments} dir="rtl" type="textarea" rows="3" />
                            </Col>
                            <Form.Label column sm="2">הערות</Form.Label>
                        </Form.Group>

                        {/* projectType */}
                        <Form.Row dir="rtl">
                            <Form.Group as={Col} id="projectType">
                            <Form.Label>נושא הפרויקט</Form.Label>
                            <Form.Control ref={this.projectType} onChange={this.changeProjectType} dir="rtl" as="select">
                                <option>בחר</option>
                                {this.state.topicList.map((topicName,key)=>
                                    <option>{topicName}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                            

                        {/* first advisor */}
                        <Form.Group as={Col} id="firstAdvisor">
                        <Form.Label dir="rtl">מנחה חלק א'</Form.Label>
                        <Form.Control defaultValue={this.state.a} ref={this.firstAdvisor} dir="rtl" as="select">
                            <option>בחר</option>
                            {this.state.advisorsList.map((a,key)=>
                                <option>{a}</option>
                            )}
                        </Form.Control>
                        </Form.Group>
                        
                        {/* second advisor */}
                        <Form.Group as={Col} id="secondAdvisor">
                        <Form.Label dir="rtl">מנחה חלק ב'</Form.Label>
                        <Form.Control ref={this.secondAdvisor} dir="rtl" as="select">
                            <option>בחר</option>
                            {this.state.advisorsList.map((a)=>
                                <option>{a}</option>
                            )}
                        </Form.Control>
                        </Form.Group>   
                    </Form.Row>
                    
                    {/* if the topic is organization */}
                    {this.state.organization &&
                    (<div>
                        {/* projectCustomerName */}
                        <Form.Group as={Row} id="projectCustomerName">
                            <Col sm="3"></Col>
                            <Col sm="7">
                                <Form.Control defaultValue='' ref={this.projectCustomerName} size="lg" type="text" dir="rtl"/>
                            </Col>
                            <Form.Label column sm="2">שם הלקוח</Form.Label>
                        </Form.Group>
                    </div>)}
                    </div>
                    
                    <ProjectGoals initalProjectGoals={this.state.projectGoals} setProjectGoals={this.getProjectGoals}/>
                    <ProjectModules initalProjectModule={this.state.projectModules} setProjectModules={this.getprojectModules}/>
                    
                    {/* tag the project */}
                    <div dir="rtl" style={{padding:15,borderRadius:20,marginTop:30,border:'solid 1px',backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <Row>
                                <Col sm="4" style={{fontSize:20}}>
                                    <h4>
                                        <Badge style={{backgroundColor:'#'}}>תייגו את הפרויקט</Badge>
                                    </h4>
                                </Col>       
                                <Col sm="3">
                                <ReactTags
                                tags={this.state.tags}
                                //suggestions={this.state.suggestions}
                                handleDelete={this.handleDelete}
                                handleAddition={this.handleAddition}
                                handleDrag={this.handleDrag}
                                delimiters={delimiters} />
                                </Col>
                            <Col sm="5"></Col>
                        </Row>
                    </div>
                    
                    {/* techs tag */}
                    <div dir="rtl" style={{padding:15,borderRadius:20,marginTop:30,border:'solid 1px',marginBottom:20,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <Row>
                            <Col sm="4" style={{fontSize:20}}>
                                <h4>
                                    <Badge style={{backgroundColor:'#'}}>בחרו טכנולוגיות</Badge>
                                </h4>
                            </Col> 
                            <Col sm="8">
                            <Select
                            onChange={this.TechsChosen}
                            closeMenuOnSelect={false}
                            components={makeAnimated()}
                            isMulti
                            options={this.state.techOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            />
                            </Col>
                        </Row>
                    </div>

                    {/* Project links */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:30,marginTop:'2%',backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title="קישורים"/>

                        {/* project site link */}
                        <Form.Group style={{marginTop:15}} dir="rtl" as={Row}>
                            <Form.Label column sm="2">קישור לאתר הפרויקט</Form.Label>
                            <Col sm="7">
                                <Form.Control ref={this.projectSiteLink} defaultValue={this.state.ProjectSite} dir="ltr" id="projectSite" size="sm" type="text" placeholder="http://proj.ruppin.ac.il/..." /> 
                            </Col>
                            <Col sm="3"></Col>
                        </Form.Group>

                        {/* project movie link */}
                        <Form.Group style={{marginTop:15}} dir="rtl" as={Row} id="formGridState">
                            <Form.Label column sm="4">קישור לסרטון הפרויקט ביוטיוב</Form.Label>
                            <Col sm="4">
                                <Form.Control ref={this.projectMovieLink} defaultValue={this.state.MovieLink} dir="ltr" id="projectMovie" size="sm" type="text" placeholder="www.youtube.com" /> 
                            </Col>
                            <Col sm="2"></Col>
                        </Form.Group>

                        <Form.Group dir="rtl" style={{marginTop:15}} as={Row}>
                            <Col sm="1">
                            <Form.Check onChange={this.appExisting} id="projectApplication" type="checkbox"/> 
                            </Col>
                            <Form.Label  column sm="1">קיימת אפליקציה?</Form.Label>
                            <Col sm="10"></Col>
                        </Form.Group>

                        {
                            this.state.appExists &&
                            <Form.Group as={Row} id="projectName">
                                <Form.Label column sm="1"><FaAppleAlt style={{color:'silver',fontSize:18}}/> link</Form.Label>
                                <Col sm="5">
                                    {/* apple store link */}
                                    <Form.Control ref={this.appleStoreLink} dir="ltr" id="appstoreURL" size="sm" type="text" placeholder="Appstore..." /> 
                                </Col>
                                <Form.Label column sm="1"><FaGoogle style={{color:'green',fontSize:18}}/> link</Form.Label>
                                <Col sm="5">
                                    {/* google store link */}
                                    <Form.Control ref={this.googlePlayLink} dir="ltr" id="googleURL" size="sm" type="text" placeholder="Google play..." /> 
                                </Col>
                            </Form.Group>
                        }
                    </div>                    
                    
                    {/* FILES UPLOAD */}
                    <div style={{border:'solid 1px',padding:20,borderRadius:30,marginTop:'2%',backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title="קבצים"/>
                            <Row dir="rtl" style={{marginTop:'2%'}} >
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#85B9A7',borderColor:'#85B9A7'}} onClick={()=>this.OpenImageModal('Project Logo','Plogo')}>
                                        <FaCameraRetro/>
                                        {`  הוסף לוגו`}
                                        
                                    </Button>
                                </Col>
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#85B9A7',borderColor:'#85B9A7'}} onClick={()=>this.OpenImageModal('Screenshots','')}>
                                        <FaCameraRetro/>
                                        {`  תמונות מסך`}
                                    </Button>
                                </Col>
                                {this.state.organization ?
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#85B9A7',borderColor:'#85B9A7'}} onClick={()=>this.OpenImageModal('Customer Logo','Clogo')}>
                                         <FaCameraRetro/>
                                        {` לוגו לקוח`}
                                    </Button>
                                </Col>
                                :
                                <Col sm="4"></Col>
                                }
                            </Row>
                            <Row dir="rtl" style={{marginTop:'2%'}} >
                                <Col sm="4">
                                    {/* <Button style={{backgroundColor:'#96B2CC',borderColor:'#96B2CC'}} onClick={()=>this.OpenImagePreview('Project Logo')}>
                                        <FaCameraRetro/>
                                        {`  הראה לוגו`}
                                        
                                    </Button> */}
                                </Col>
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#EECC4D',borderColor:'#EEE'}} onClick={()=>this.OpenImagePreview('Screenshots')}>
                                        <FaCameraRetro/>
                                        {`  עריכת תמונות מסך`}
                                    </Button>
                                </Col>
                                {this.state.organization ?
                                <Col sm="4">
                                    {/* <Button style={{backgroundColor:'#B9CABF',borderColor:'#B9CABF'}} onClick={()=>this.OpenImagePreview('Customer Logo')}>
                                         <FaCameraRetro/>
                                        {` צפה בלוגו לקוח`}
                                    </Button> */}
                                </Col>
                                :
                                <Col sm="4"></Col>
                                }
                            </Row>
                    </div>

                    <StudentDetails setStudents={this.getStudentsDetails} OpenImageModal={this.OpenImageModal} studentInitalDetails={this.state.StudentDetails} OpenPreviewModal={this.OpenImagePreviewForStudent}/>
                    
                </Form>
            </div>
        );
    }
}



export default ISProjectTemplate;

