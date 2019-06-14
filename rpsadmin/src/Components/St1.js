import React from 'react';
import NavbarProjs from './NavbarStudents';
import {Col,Row,Form,Button} from 'react-bootstrap';
import { FaGoogle,FaAppleAlt,FaCameraRetro } from "react-icons/fa";
import HeaderForm from '../Common/HeaderForm';
import SmallHeaderForm from '../Common/SmallHeaderForm';
import ModalImage from '../Common/ImageModal';
import firebase from 'firebase';
import StudentDetails from '../Common/StudentsDetails';
import ProjectModules from '../Common/ProjectModules';
import ProjectGoals from '../Common/ProjectGoals';
import PreviewModal from "../Common/imagesModalPrevies";
import SaveAction from '../Common/SaveAction';
import PreviewCard from './PreviewProjectCard';
import Loader from 'react-loader-spinner';
//commons
import RichText from '../Common/RichText2';
import PublishProject from '../Common/PublishProject';
import TextareaInput from '../Common/TextAreaInputs';
import TextInputs from '../Common/TextInputs';
import SelectInput from '../Common/inputSelect';
import LinkInput from '../Common/Projectlinks';
import AppLinksInput from '../Common/appLinks';
import HashTags from '../Common/Tag';
import Techs from '../Common/techs';
import {Years} from '../Common/Years';


const course = JSON.parse(localStorage.getItem('course'));
const projectKey = JSON.parse(localStorage.getItem('projectKey'));
const groupData = JSON.parse(localStorage.getItem('groupData'));

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
    Github:'קוד הפרויקט בגיטהאב',
    projectSemester:'סמסטר',
    projectYear:'שנה'
}
class St1 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isSaved:false,
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
            topicList:[],
            firstAdvisor:'',
            secondAdvisor:'',
            appleLink:'',
            googleLink:'',
            Github:'',
            Year:'',
            Semester:'',
            ProjectCourse:''
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.TechsChosen = this.TechsChosen.bind(this);
    }

    componentDidMount(){
        this.GetData();
    }
    GetData = ()=>{
        const ref = firebase.database().ref('RuppinProjects').child(projectKey);
        let dataForGroup ={};
        ref.once("value", (snapshot)=> {
            dataForGroup=snapshot.val();
            console.log(dataForGroup)
        })
        .then(()=>{
            let tagsList = [];
            if(dataForGroup.HashTags){
                dataForGroup.HashTags.forEach((tag)=>{
                    let t = {
                        'id':tag,
                        'text':tag
                    }
                    tagsList.push(t);
                })
            }
            this.setState({
                Year:dataForGroup.Year?dataForGroup.Year:'',
                Semester:dataForGroup.Semester?dataForGroup.Semester:'',
                Github:dataForGroup.Github?dataForGroup.Github:'',
                CustomerName:dataForGroup.CustomerName?dataForGroup.CustomerName:'',
                Advisor:dataForGroup.Advisor?dataForGroup.Advisor:'',
                firstAdvisor:dataForGroup.Advisor?(dataForGroup.Advisor.length?dataForGroup.Advisor[0]:''):'',
                secondAdvisor:dataForGroup.Advisor?(dataForGroup.Advisor.length===2?dataForGroup.Advisor[1]:''):'',
                Challenges:dataForGroup.Challenges?dataForGroup.Challenges:'',
                GroupName:dataForGroup.GroupName,
                ProjectName:dataForGroup.ProjectName?dataForGroup.ProjectName:'',
                PDescription:dataForGroup.PDescription?dataForGroup.PDescription:'',
                ProjectSite:dataForGroup.ProjectSite?dataForGroup.ProjectSite:'',
                MovieLink:dataForGroup.MovieLink?dataForGroup.MovieLink:'',
                ScreenShots:dataForGroup.ScreenShots?dataForGroup.ScreenShots:[],
                logo:dataForGroup.ProjectLogo?[dataForGroup.ProjectLogo]:[],
                customerLogo:dataForGroup.CustomerLogo?[dataForGroup.CustomerLogo]:[],
                comments:dataForGroup.Comments?dataForGroup.Comments:'',
                CustCustomers:dataForGroup.CustCustomers?dataForGroup.CustCustomers:'',
                CStackholders:dataForGroup.CStackholders?dataForGroup.CStackholders:'',
                CDescription:dataForGroup.CDescription?dataForGroup.CDescription:'',
                ScreenShotsNames:dataForGroup.ScreenShotsNames?dataForGroup.ScreenShotsNames:[],
                projectModules:dataForGroup.Module?dataForGroup.Module:[],
                projectGoals:dataForGroup.Goals?dataForGroup.Goals:[],
                isPublished:dataForGroup.isPublished?dataForGroup.isPublished:false,
                StudentDetails:dataForGroup.Students?dataForGroup.Students:[],
                chosenTechs:dataForGroup.Technologies?dataForGroup.Technologies:[],
                ProjectCourse:course,
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
        })
        
    }
    getCourses= ()=>{
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(groupData.Faculty).child('Departments').child(groupData.Department).child('Experties').child(groupData.Major).child('Courses');
        ref.once("value", (snapshot)=> {
            snapshot.forEach((course)=>{
                this.setState({coursesList:[...this.state.coursesList,course.val().Name]});
                console.log(course.val())
            })
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
        })
    }
    getTopicForFinalProject = ()=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(groupData.Faculty).child('Departments').child(groupData.Department).child('Experties').child(groupData.Major).child('Courses').child('Final project').child('Topics');
        ref.once("value", (snapshot)=> {
            snapshot.forEach((topicName)=>{
                this.setState({topicList:[...this.state.topicList,topicName.val().Name]});
                console.log(topicName.val())
            })
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
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
            this.setState({finalProject:false,organization:false})
        }
    }
    handleDelete(i){
        const { tags } = this.state;
        this.setState({tags: tags.filter((tag, index) => index !== i),});
    }
    handleAddition(tag){
        this.setState(state => ({ tags: [...state.tags, tag] }));
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
        this.setState({
            chosenTechs:value.map((val)=>{
                return val.value;
            })
        })
    }
    OpenImageModal = (title,pic)=>this.setState({openModal:true,modalTitle:title,picTitle:pic})
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
    OpenImagePreview = (title)=>{
        switch (title) {
            case 'Screenshots':
                this.setState({modalTitle:title,showImagesMode:true,imagesToShowInModal:this.state.ScreenShots})
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
        const project = {
            ProjectName:this.state.ProjectName,
            PDescription:this.state.PDescription,
            Challenges:this.state.Challenges,
            ProjectTopic:this.state.organization===true?'ארגוני':'יזמי',
            ProjectCourse:course,
            advisor:[this.state.firstAdvisor,this.state.secondAdvisor],
            HashTags:arrayOfTags,
            Technologies:this.state.chosenTechs,
            Year:this.state.Year,
            Semester:this.state.Semester,
            isPublished:this.state.isPublished,
            CustomerName:this.state.organization===true?this.state.CustomerName:'',
            CDescription:this.state.CDescription,
            Goals:this.state.projectGoals,
            Module:this.state.projectModules,
            ProjectSite:this.state.ProjectSite,
            MovieLink:this.state.MovieLink,
            GooglePlay:this.state.appExists?this.state.googleLink:'',
            AppStore:this.state.appExists?this.state.appleLink:'',
            Students:this.state.StudentsDetails,
            ScreenShots:this.state.ScreenShots,
            ProjectLogo:this.state.logo,
            CustomerLogo:this.state.organization===true?this.state.customerLogo:'',
            Comments:this.state.comments,
            CustCustomers:this.state.CustCustomers,
            CStackholders:this.state.CStackholders,
            ScreenShotsNames:this.state.ScreenShotsNames,
            Github:this.state.Github,
            isApproved:1,
        }
        console.log(project);
        this.setState({
            projectDetails:project,
        },()=>{
            this.setState({showPreview:true})
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
        console.log(projectData);
        // project name validation
        if (projectData.ProjectName==='' || projectData.ProjectName.length<2) {
            alert('שם הפרויקט חסר');
            return false;
        }
        //project custCustomers(משתמשי המערכת)
        if(projectData.CustCustomers===''){
            alert('חסר שדה משתמשי המערכת');
            return false;
        }
        //project stackholders(בעלי ענייןs)
        if(projectData.CStackholders===''){
            alert('חסר שדה בעלי עניין');
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
        //project comments
        if(projectData.Comments.length<5 && projectData.Comments!==''){
            alert("שדה הערות צריך להיות גדול מ-5 תווים");
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
                    alert(" תיאור מטרה מספר " +(index+1)+" צריך להיות גדול מ10 תווים ");
                    flag= false;
                }
                if (goal.GoalDescription.length>100) {
                    alert(" תיאור מטרה מספר " +(index+1)+" צריך להיות קטן מ100 תווים ");
                    flag= false;
                }
                if(goal.GoalStatus.length<4){
                    alert(" סטטוס מטרה מספר " +(index+1)+"צריך להיות גדול מ4 תווים ");
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
        //project modules -->Module
        if(projectData.Module.length<2){
            alert('מספר מודולי הפרויקט צריך להיות לפחות 2');
            return false;
        }
        else{
            let flag = true;
            projectData.Module.forEach((mod,index)=>{
                if (mod.ModuleDescription.length<20) {
                    alert(" תיאור מודול מספר " +(index+1)+" צריך להיות גדול מ20 תווים ");
                    flag= false;
                }
                if (mod.ModuleDescription.length>200) {
                    alert(" תיאור מודול מספר " +(index+1)+" צריך להיות קטן מ200 תווים ");
                    flag= false;
                }
                if(mod.ModuleName.length<3){
                    alert(" שם מודול מספר " +(index+1)+"צריך להיות גדול מ3 תווים ");
                    flag= false;
                }
                if(mod.ModuleName.length>70){
                    alert(" שם מודול מספר " +(index+1)+" צריך להיות קטן מ100 תווים ");
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
    SaveData = (event)=>{
        event.preventDefault();
        const course = JSON.parse(localStorage.getItem('course'));
        if(this.ValidateData(this.state.projectDetails)){
            this.setState({isReady:false},()=>{
                const ref = firebase.database().ref('RuppinProjects/'+projectKey);
                ref.update({
                    templateSubmit:'st1',
                    templateView:'vt1',
                    ProjectCourse:course,
                    ProjectName: this.state.projectDetails.ProjectName,
                    ProjectSite:this.state.projectDetails.ProjectSite,
                    isPublished:this.state.projectDetails.isPublished,
                    Year:this.state.projectDetails.Year,
                    Semester:this.state.projectDetails.Semester,
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
                    PDescription:this.state.projectDetails.PDescription,
                    Github:this.state.projectDetails.Github
                })
                .then(()=>{
                    this.setState({isReady:true,showPreview:false},()=>{
                        alert('הפרויקט נשמר בהצלחה');
                        this.GetData();
                    })
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
    ChangeInputTextarea = (event,textareaTitle)=>{
        switch (textareaTitle) {
            case sectionNames.projectDesc:
                this.setState({PDescription:event})
                break;
            case sectionNames.projectChallenges:
                    this.setState({Challenges:event.target.value})
                    break;
            case sectionNames.projectSmallDesc:
                    this.setState({CDescription:event.target.value})
                    break;
            case sectionNames.projectComments:
                    this.setState({comments:event.target.value})
                    break;
            case sectionNames.projectName:
                    this.setState({ProjectName:event.target.value})
                break;
            case sectionNames.projectStackholders:
                    this.setState({CStackholders:event.target.value})
                break;
            case sectionNames.projectCustCustomers:
                    this.setState({CustCustomers:event.target.value})
                break;
            case sectionNames.projectCustomerName:
                    this.setState({CustomerName:event.target.value},()=>{
                        console.log(this.state.CustomerName)
                    })
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
    ChangeLinkInput = (event,linkTitle)=>{
        switch (linkTitle) {
            case sectionNames.projectLink:
                this.setState({ProjectSite:event.target.value})
                break;
            case sectionNames.projectMovie:
                this.setState({MovieLink:event.target.value})
                break;
            case sectionNames.appleLinke:
                this.setState({appleLink:event.target.value})
                break;
            case sectionNames.googleLink:
                this.setState({googleLink:event.target.value})
                break;
                case sectionNames.Github:
                    this.setState({Github:event.target.value})
                    break;
            default:
                break;
        }
    }
    ChangeTags = (newTags)=>{
        this.setState({
            tags:newTags
        })
    }
    closePreview = ()=>this.setState({showPreview:false})
    imagesModalClose = ()=>this.setState({showImagesMode:false})
    ChangePublish = ()=>{
        const temp = !this.state.isPublished;
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
                <ModalImage aspect={this.state.imageAspect} savePic={this.savePic} picTitle={this.state.picTitle} title={this.state.modalTitle} modalClose={this.handleClose} modalOpen={this.state.openModal} />
                <PreviewModal deletePic={this.DeletePic} title={this.state.modalTitle} onHide={this.imagesModalClose} images={this.state.imagesToShowInModal} modalOpen={this.state.showImagesMode}/>
                <SaveAction Save={this.SetProjectOnFirbase}/>
                <NavbarProjs />
                <HeaderForm title={this.state.GroupName}/>
                {/* preview project card */}
                <PreviewCard close={this.closePreview} projectDetails={this.state.projectDetails} openPreview={this.state.showPreview} SaveData={this.SaveData} />
                {/*publish project? */}
                <PublishProject ChangePublish={this.ChangePublish} isPublished={this.state.isPublished}  />
                <Form style={{marginTop:'4%',marginLeft:'10%',marginRight:'10%'}}>
                    {/* Poject details */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title={"תיאור הפרויקט"}/>
                        {/* projectName */}
                        <TextInputs IsMandatory={true} defaultInput={this.state.ProjectName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectName} inputSize="lg" />
                        {/* stalkholders */}
                        <TextInputs IsMandatory={true}  defaultInput={this.state.CStackholders} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectStackholders} inputSize="lg" />
                        {/* CustCustomers */}
                        <TextInputs IsMandatory={true}  defaultInput={this.state.CustCustomers} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectCustCustomers} inputSize="lg" />
                        {/* project Small Description */}
                        <TextareaInput IsMandatory={true}  defaultInput={this.state.CDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectSmallDesc} />
                        {/* project description */}
                        <RichText IsMandatory={true}  defaultInput={this.state.PDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectDesc} />
                        {/* project Challenges  */}
                        <TextareaInput IsMandatory={true}  defaultInput={this.state.Challenges} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectChallenges} />
                        {/* project Comments */}
                        <TextareaInput defaultInput={this.state.comments} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectComments} />
                        <Form.Row dir="rtl">
                            {/* year  */}
                            <SelectInput IsMandatory={true} inputList={Years} InputTitle={sectionNames.projectYear} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* semester */}
                            <SelectInput IsMandatory={true}  inputList={['א','ב','קיץ']} InputTitle={sectionNames.projectSemester} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* projectType */}
                            <SelectInput IsMandatory={true}  inputList={this.state.topicList} InputTitle={sectionNames.projectType} ChangeSelectInput={this.changeProjectType} />
                            {/* first advisor */}
                            <SelectInput IsMandatory={true}  defaultInput={this.state.firstAdvisor} inputList={this.state.advisorsList} InputTitle={sectionNames.projectFirstAdvisor} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* second advisor */}
                            <SelectInput IsMandatory={true}  defaultInput={this.state.secondAdvisor} inputList={this.state.advisorsList} InputTitle={sectionNames.projectSecondAdvisor} ChangeSelectInput={this.ChangeSelectedInputs} />
                        </Form.Row>
                    
                        {/* if the topic is organization */}
                        {this.state.organization &&
                        (<div>
                            {/* projectCustomerName */}
                            <TextInputs IsMandatory={true} defaultInput={this.state.CustomerName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectCustomerName} inputSize="lg" />
                        </div>)}
                    </div>
                    <ProjectGoals initalProjectGoals={this.state.projectGoals} setProjectGoals={this.getProjectGoals}/>
                    <ProjectModules initalProjectModule={this.state.projectModules} setProjectModules={this.getprojectModules}/>
                    {/* tag the project */}
                    <HashTags tags={this.state.tags}  handleDelete={this.handleDelete} handleAddition={this.handleAddition} changeTags={this.ChangeTags}/>
                    {/* techs tag */}
                    <Techs TechsChosen={this.TechsChosen} techs={this.state.techOptions}/>
                    {/* Project links */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:30,marginTop:'2%',backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title="קישורים"/>
                        {/* project site link */}
                        <LinkInput ChangeLinkInput={this.ChangeLinkInput} defaultInput={this.state.ProjectSite} InputTitle={sectionNames.projectLink} inputSize="sm" placeholder="http://proj.ruppin.ac.il/..."/>
                        {/* project movie link */}
                        <LinkInput ChangeLinkInput={this.ChangeLinkInput} defaultInput={this.state.MovieLink} InputTitle={sectionNames.projectMovie} inputSize="sm" placeholder="www.youtube.com"/>
                        {/* project github link */}
                        <LinkInput ChangeLinkInput={this.ChangeLinkInput} defaultInput={this.state.Github} InputTitle={sectionNames.Github} inputSize="sm" placeholder="www.github.com"/>
                        <Form.Group dir="rtl" style={{marginTop:15}} as={Row}>
                            <Col sm="1">
                            <Form.Check onChange={this.appExisting} id="projectApplication" type="checkbox"/> 
                            </Col>
                            <Form.Label  column sm="1">קיימת אפליקציה?</Form.Label>
                            <Col sm="10"></Col>
                        </Form.Group>
                        {
                            this.state.appExists &&
                            <Form.Group as={Row}>
                                <AppLinksInput InputTitle={sectionNames.appleLinke} ChangeLinkInput={this.ChangeLinkInput} IconName={FaAppleAlt} iconColor="silver" placeholder="Appstore..." />
                                <AppLinksInput InputTitle={sectionNames.googleLink} ChangeLinkInput={this.ChangeLinkInput} IconName={FaGoogle} iconColor="green" placeholder="Google play..." />
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
                                        {this.state.logo?`  עריכת לוגו פרויקט`:`  הוספת לוגו פרויקט`}
                                    </Button>
                                </Col>
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#85B9A7',borderColor:'#85B9A7'}} onClick={()=>this.OpenImageModal('Screenshots','')}>
                                        <FaCameraRetro/>
                                        {`  הוספת תמונות מסך`}
                                    </Button>
                                </Col>
                                {this.state.organization ?
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#85B9A7',borderColor:'#85B9A7'}} onClick={()=>this.OpenImageModal('Customer Logo','Clogo')}>
                                         <FaCameraRetro/>
                                         {this.state.customerLogo?`  עריכת לוגו לקוח`:`  הוספת לוגו לקוח`}
                                    </Button>
                                </Col>
                                :
                                <Col sm="4"></Col>
                                }
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
                    </div>
                    <StudentDetails setStudents={this.getStudentsDetails} OpenImageModal={this.OpenImageModal} studentInitalDetails={this.state.StudentDetails} OpenPreviewModal={this.OpenImagePreviewForStudent}/>
                </Form>
            </div>
        );
    }
}
export default St1;

