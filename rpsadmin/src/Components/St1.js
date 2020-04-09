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
import Loader from 'react-loader-spinner';
//commons
import RichText from '../Common/RichText2';
import PublishProject from '../Common/PublishProject';
import TextareaInput from '../Common/TextAreaInputs';
import TextInputs from '../Common/TextInputs';
import SelectInput from '../Common/inputSelect';
import LinkInput from '../Common/Projectlinks';
import AppLinksInput from '../Common/appLinks';
import Hashtags from '../Common/Tag2';
import Techs from '../Common/techs';
import {Years} from '../Common/Years';
import SAlert from '../Common/SAlert';
import Idle from '../Common/Idle';
import ModalExample1 from './PreviewProject';
import { isObject } from 'util';
import {GetHashtags} from '../Common/HashtagsSetup';
import Validator from '../Classes/Validator';
//functions
import {ValidateData2} from '../functions/functions';

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
    Github:'קישור לפרויקט בגיטהאב',
    projectSemester:'סמסטר',
    projectYear:'שנה',
    projectFunctionalityMovie:'קישור לסרטון שימושיות ביוטיוב'
}
class St1 extends React.Component{
    constructor(props){
        super(props); 
        this.state={
            alertTitle:'',
            alertText:'',
            alertShow:false,
            alertIcon:'warning',
            isSaved:false,
            imageAspect:4/3,
            showPreview:false,
            imagesToShowInModal:[],
            showImagesMode:false,
            ScreenShots:[],
            ScreenShotsNames:[],
            logo:[],
            customerLogo:[],
            isPublished:false,
            Advisor:'',
            Challenges:'',
            CustomerName:'',
            GroupName:'',
            HashSuggestions: [],
            HashOptions : [],
            tags:[],
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
            isReady:false,
            coursesList:[],
            topicList:[],
            firstAdvisor:'',
            secondAdvisor:'',
            appleLink:'',
            googleLink:'',
            Github:'',
            Year:'',
            Semester:'',
            ProjectCourse:'',
            ProjectTopic:'בחר',
            functionalityMovie:'',
            course :'',
            projectKey:'',
            groupData :'',
            showRatio:false,
            templateValidators:[],
            Configs:null
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.TechsChosen = this.TechsChosen.bind(this);
        this.HashsChosen = this.HashsChosen.bind(this);
    }
    componentDidMount(){
        this.setState({
            course :JSON.parse(localStorage.getItem('course')),
            projectKey:JSON.parse(localStorage.getItem('projectKey')),
            groupData :JSON.parse(localStorage.getItem('groupData')),
            templateValidators:JSON.parse(localStorage.getItem('st1')),
            Configs:new Validator(JSON.parse(localStorage.getItem('st1')))

        },()=>{
            this.GetData();
        })
        window.setInterval(()=>{
            let currentTime = JSON.parse(localStorage.getItem('currentTime'));
            let time = new Date();
            if((time-currentTime)>10000){
                //console.log("not save:", time-currentTime);
            }
            else{
                this.SaveData();
                if(this.state.isPublished){
                    if(!this.ValidateData2(this.getProjectDetails())){
                        this.setState({isPublished:false});
                        this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'הפרויקט לא יפורסם, תקנו את הנדרש ופרסמו שוב',alertIcon:'warning'})
                    }
                }
        }
        },6000)
    }
    GetData = ()=>{
        this.setState({isReady:false},()=>{
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
                ProjectCourse:this.state.course,
                ProjectTopic:dataForGroup.ProjectTopic?dataForGroup.ProjectTopic:'בחר',
                tags:tagsList,
                functionalityMovie:dataForGroup.functionalityMovie?dataForGroup.functionalityMovie:'',
                appleLink:dataForGroup.AppStore?dataForGroup.AppStore:'',
                googleLink:dataForGroup.GooglePlay?dataForGroup.GooglePlay:'',
                appExists:dataForGroup.GooglePlay?true:false
            },()=>{
                this.setState({projectDetails:this.getProjectDetails()})
            })
            //get list of advisors from firebase
            this.getAdvisors();
            //get technologies from firebase
            this.getTechnologies();
            //get courses from firebase
            this.getCourses();
            //get topics for Final project from firebase
            this.getTopicForFinalProject();
            //get hashtags for options - autocomplite
            this.getHashs();
        })
    })
    }
    getProjectDetails=()=>{
        // const arrayOfTags = this.state.tags.map((text)=>text.text);
        const project = {
            ProjectName:this.state.ProjectName,
            PDescription:this.state.PDescription,
            Challenges:this.state.Challenges,
            ProjectTopic:this.state.ProjectTopic,
            ProjectCourse:this.state.course,
            advisor:[this.state.firstAdvisor,this.state.secondAdvisor],
            HashTags:this.state.tags,
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
            FunctionalityMovie:this.state.functionalityMovie
        }
        this.setState({
            isReady:true
        })
        return project;
    }
    getCourses= ()=>{
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(groupData.Faculty).child('Departments').child(groupData.Department).child('Experties').child(groupData.Major).child('Courses');
        ref.once("value", (snapshot)=> {
            snapshot.forEach((course)=>{
                this.setState({coursesList:[...this.state.coursesList,course.val().Name]});
            })
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
        })
    }
    getTopicForFinalProject = ()=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(this.state.groupData.Faculty).child('Departments').child(this.state.groupData.Department).child('Experties').child(this.state.groupData.Major).child('Courses').child('Final project').child('Topics');
        ref.once("value", (snapshot)=> {
            snapshot.forEach((topicName)=>{
                this.setState({topicList:[...this.state.topicList,topicName.val().Name]});
            })
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
        })
    }
    getAdvisors = ()=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(this.state.groupData.Faculty).child('Departments').child(this.state.groupData.Department).child('Advisors');
        ref.once("value", (snapshot)=> {
            this.setState({advisorsList:snapshot.val()});
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
    appExisting = (e)=>{this.setState({appExists:!this.state.appExists})}
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
        this.setState({tags: tags.filter((tag, index) => index !== i),})
    }
    handleAddition(tag){this.setState(state => ({ tags: [...state.tags, tag] }))}
    changeProjectType = (e)=>{
        if (e.target.value==='יזמי') {
            this.setState({organization:false,ProjectTopic:e.target.value})
        }
        else{
            this.setState({organization:true,ProjectTopic:e.target.value})
        }
    }
    TechsChosen (value){
        this.setState({
            chosenTechs:value.map((val)=>{
                return val;
            })
        })
    }
    HashsChosen (value){
        this.setState({
            tags:value.map((val)=>{
                return val;
            })
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
    handleClose = ()=> {this.setState({ openModal: false });}
    handlePublishedChange = ()=>{this.setState({isPublished:!this.state.isPublished})}
    getStudentsDetails = (students)=>{this.setState({StudentsDetails:students},()=>this.SaveData())}
    getProjectGoals = (goals)=>{this.setState({projectGoals:goals})}
    getprojectModules = (modules)=>{this.setState({projectModules:modules})}
    SetProjectOnFirbase = ()=>{
        const project = this.getProjectDetails();
        this.setState({
            projectDetails:project,
        },()=>{
            this.setState({showPreview:true})
        })
    }
    savePic=(url,title,index,screenshotName)=>{
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
        this.setState({ScreenShots:[...this.state.ScreenShots,url],ScreenShotsNames:[...this.state.ScreenShotsNames,name]})
    }
    changeStudentImage = (url,index)=>{
        this.state.StudentsDetails[index].Picture = url;
        this.forceUpdate();
    }
    //new validation
    CheckValidation=(projectData)=>{
        const { templateValidators} = this.state;
        const validation = ValidateData2(projectData,templateValidators);
        if(!validation.isPublish){
            this.setState({alertShow:validation.alertShow,alertTitle:validation.alertTitle,alertText:validation.alertText,alertIcon:validation.alertIcon})
        }
        return validation.isPublish;
    }
    SaveData = ()=>{
        //const arrayOfTags = this.state.tags.map((text)=>text.text);
        const ref = firebase.database().ref('RuppinProjects/'+this.state.projectKey);
        ref.update({
            templateSubmit:'st1',
            templateView:'vt1',
            ProjectTopic:this.state.ProjectTopic,
            ProjectCourse:this.state.course,
            ProjectName: this.state.ProjectName,
            ProjectSite:this.state.ProjectSite,
            isPublished:this.state.isPublished,
            Year:this.state.Year,
            Semester:this.state.Semester,
            isApproved:1,
            CDescription:this.state.CDescription,
            CStackholders:this.state.CStackholders,
            ScreenShotsNames:this.state.ScreenShotsNames,
            ScreenShots:this.state.ScreenShots,
            Students:this.state.StudentsDetails,
            Technologies:this.state.chosenTechs,
            CustCustomers:this.state.CustCustomers,
            Challenges:this.state.Challenges,
            Comments:this.state.comments,
            Advisor:[this.state.firstAdvisor,this.state.secondAdvisor],
            CustomerLogo:this.state.customerLogo,
            ProjectLogo:this.state.logo,
            MovieLink:this.state.MovieLink,
            Goals:this.state.projectGoals,
            Module:this.state.projectModules,
            GooglePlay:this.state.googleLink,
            AppStore:this.state.appleLink,
            CustomerName:this.state.CustomerName,
            HashTags:this.state.tags,
            PDescription:this.state.PDescription,
            Github:this.state.Github,
            functionalityMovie:this.state.functionalityMovie
        })
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
                    this.setState({CustomerName:event.target.value})
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
            case sectionNames.projectFunctionalityMovie:
                this.setState({functionalityMovie:event.target.value})
                break;
            default:
                break;
        }
    }
    closePreview = ()=>this.setState({showPreview:false})
    imagesModalClose = ()=>this.setState({showImagesMode:false})
    ChangePublish = ()=>{
        const temp = !this.state.isPublished;
        const isPublish = this.CheckValidation(this.getProjectDetails());
        if(isPublish){
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
                <SAlert alertIcon={this.state.alertIcon} CloseAlert={this.CloseAlert} show={this.state.alertShow} title={this.state.alertTitle} text={this.state.alertText}/>
                <ModalImage showRatio={this.state.showRatio} aspect={this.state.imageAspect} savePic={this.savePic} picTitle={this.state.picTitle} title={this.state.modalTitle} modalClose={this.handleClose} modalOpen={this.state.openModal} />
                <PreviewModal deletePic={this.DeletePic} title={this.state.modalTitle} onHide={this.imagesModalClose} images={this.state.imagesToShowInModal} modalOpen={this.state.showImagesMode}/>
                <SaveAction Save={this.SetProjectOnFirbase}/>
                <NavbarProjs />
                <HeaderForm title={this.state.GroupName}/>

                {/* preview project card */}
                <ModalExample1 close={this.closePreview} projectDetails={this.state.projectDetails} openPreview={this.state.showPreview} SaveData={this.SaveData} />
                {/* <PreviewCard close={this.closePreview} projectDetails={this.state.projectDetails} openPreview={this.state.showPreview} SaveData={this.SaveData} /> */}
                {/*publish project? */}
                <PublishProject ChangePublish={this.ChangePublish} isPublished={this.state.isPublished}  />
                <br/>
                <Button style={{backgroundColor:'#EECC4D',borderColor:'#EEE'}} onClick={()=>this.CheckValidation(this.getProjectDetails())}>אמת נתונים</Button>
                <Form style={{marginTop:'4%',marginLeft:'10%',marginRight:'10%'}}>
                    {/* Poject details */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:5,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title={"תיאור הפרויקט"}/>
                        {/* projectName */}
                        <TextInputs configs={Configs.ProjectName} defaultInput={this.state.ProjectName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectName} inputSize="lg" />
                        {/* stalkholders */}
                        <TextInputs configs={Configs.CStackholders} defaultInput={this.state.CStackholders} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectStackholders} inputSize="lg" />
                        {/* CustCustomers */}
                        <TextInputs configs={Configs.CustCustomers} defaultInput={this.state.CustCustomers} ChangeInputTextarea={this.ChangeInputTextarea}  InputTitle={sectionNames.projectCustCustomers} inputSize="lg" />
                        {/* project Small Description */}
                        <TextareaInput configs={Configs.CDescription} defaultInput={this.state.CDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectSmallDesc} />
                        {/* project description */}
                        <RichText configs={Configs.PDescription} defaultInput={this.state.PDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectDesc}/>
                        {/* project Challenges  */}
                        <TextareaInput configs={Configs.Challenges} defaultInput={this.state.Challenges} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectChallenges} />
                        {/* project Comments */}
                        <TextareaInput configs={Configs.Comments} defaultInput={this.state.comments} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectComments} />
                        <Form.Row dir="rtl">
                            {/* year  */}
                            <SelectInput IsMandatory={Configs.Year.isMandatory} defaultInput={this.state.Year} inputList={Years} InputTitle={sectionNames.projectYear} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* semester */}
                            <SelectInput IsMandatory={Configs.Semester.isMandatory} defaultInput={this.state.Semester}   inputList={['א','ב','קיץ']} InputTitle={sectionNames.projectSemester} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* projectType */}
                            <SelectInput IsMandatory={Configs.ProjectTopic.isMandatory} defaultInput={this.state.ProjectTopic}  inputList={this.state.topicList} InputTitle={sectionNames.projectType} ChangeSelectInput={this.changeProjectType} />
                            {/* first advisor */}
                            <SelectInput IsMandatory={Configs.FirstAdvisor.isMandatory} defaultInput={this.state.firstAdvisor} inputList={this.state.advisorsList} InputTitle={sectionNames.projectFirstAdvisor} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* second advisor */}
                            <SelectInput IsMandatory={Configs.SecondAdvisor.isMandatory} defaultInput={this.state.secondAdvisor} inputList={this.state.advisorsList} InputTitle={sectionNames.projectSecondAdvisor} ChangeSelectInput={this.ChangeSelectedInputs} />
                        </Form.Row>
                        {/* if the topic is organization */}
                        {this.state.organization &&
                        (<div>
                            {/* projectCustomerName */}
                            <TextInputs defaultInput={this.state.CustomerName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectCustomerName} inputSize="lg" />
                        </div>)}
                    </div>
                    <ProjectGoals minimum={Configs.Goals.minimum} maximumGoalStatus={Configs.GoalStatus.maximum} maximumGoalDescription={Configs.GoalDescription.maximum} isMandatory={Configs.Goals.isMandatory} initalProjectGoals={this.state.projectGoals} setProjectGoals={this.getProjectGoals}/>
                    <ProjectModules minimum={Configs.Module.minimum} maximumModuleName={Configs.ModuleName.maximum} maximumModuleDescription={Configs.ModuleDescription.maximum} isMandatory={Configs.Module.isMandatory} initalProjectModule={this.state.projectModules} setProjectModules={this.getprojectModules}/>
                    {/* tag the project */}
                    <Hashtags isMandatory={Configs.HashTags.isMandatory} minimum={Configs.HashTags.minimum} chosenHashs={this.state.tags} HashsChosen={this.HashsChosen} hashs={this.state.HashOptions}/>
                    {/* techs tag */}
                    <Techs isMandatory={Configs.Technologies.isMandatory} minimum={Configs.Technologies.minimum} chosenTechs={this.state.chosenTechs} TechsChosen={this.TechsChosen} techs={this.state.techOptions}/>
                    {/* Project links */}
                    <div style={{border:'solid 1px',padding:15,borderRadius:5,marginTop:'2%',backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title="קישורים"/>
                        {/* project site link */}
                        <LinkInput IsMandatory={Configs.ProjectSite.isMandatory} ChangeLinkInput={this.ChangeLinkInput} defaultInput={this.state.ProjectSite} InputTitle={sectionNames.projectLink} inputSize="sm" placeholder="http://proj.ruppin.ac.il/..."/>
                        {/* project movie link */}
                        <LinkInput IsMandatory={Configs.MovieLink.isMandatory} ChangeLinkInput={this.ChangeLinkInput} defaultInput={this.state.MovieLink} InputTitle={sectionNames.projectMovie} inputSize="sm" placeholder="www.youtube.com.."/>
                        {/* project usability movie link */}
                        <LinkInput IsMandatory={Configs.FunctionalityMovie.isMandatory} ChangeLinkInput={this.ChangeLinkInput} defaultInput={this.state.functionalityMovie} InputTitle={sectionNames.projectFunctionalityMovie} inputSize="sm" placeholder="www.youtube.com.."/>
                        {/* project github link */}
                        <LinkInput IsMandatory={Configs.Github.isMandatory} ChangeLinkInput={this.ChangeLinkInput} defaultInput={this.state.Github} InputTitle={sectionNames.Github} inputSize="sm" placeholder="www.github.com"/>
                        <Form.Group dir="rtl" style={{marginTop:15}} as={Row}>
                            <Col sm="1">
                            <Form.Check checked={this.state.appExists} onChange={this.appExisting} id="projectApplication" type="checkbox"/> 
                            </Col>
                            <Form.Label  column sm="1">קיימת אפליקציה?</Form.Label>
                            <Col sm="10"></Col>
                        </Form.Group>
                        {
                            this.state.appExists &&
                            <Form.Group as={Row}>
                                <AppLinksInput defaultInput={this.state.appleLink} InputTitle={sectionNames.appleLinke} ChangeLinkInput={this.ChangeLinkInput} IconName={FaAppleAlt} iconColor="silver" placeholder="Appstore..." />
                                <AppLinksInput defaultInput={this.state.googleLink} InputTitle={sectionNames.googleLink} ChangeLinkInput={this.ChangeLinkInput} IconName={FaGoogle} iconColor="green" placeholder="Google play..." />
                            </Form.Group>
                        }
                    </div>                    
                    {/* FILES UPLOAD */}
                    <div style={{border:'solid 1px',padding:20,borderRadius:5,marginTop:'2%',backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title="קבצים"/>
                            <Row dir="rtl" style={{marginTop:'2%'}} >
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#85B9A7',borderColor:'#85B9A7'}} onClick={()=>this.OpenImageModal('Project Logo','Plogo')}>
                                        <FaCameraRetro/>
                                        {this.state.logo.length!==0?`  עריכת לוגו פרויקט`:`  הוספת לוגו פרויקט`}
                                    </Button>
                                    <br/>
                                    {Configs.ProjectLogo.isMandatory&&(Configs.ProjectLogo.minimum&&<span style={{color:'blue'}}>מינימום {Configs.ProjectLogo.minimum}</span>)}
                                </Col>
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#85B9A7',borderColor:'#85B9A7'}} onClick={()=>this.OpenImageModal('Screenshots','')}>
                                        <FaCameraRetro/>{`  הוספת תמונות מסך`}
                                    </Button>
                                    <br/>
                                    {Configs.ScreenShots.isMandatory&&(Configs.ScreenShots.minimum&&<span style={{color:'blue'}}>מינימום {Configs.ScreenShots.minimum}</span>)}
                                </Col>
                                {this.state.organization ?
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#85B9A7',borderColor:'#85B9A7'}} onClick={()=>this.OpenImageModal('Customer Logo','Clogo')}>
                                         <FaCameraRetro/>
                                         {this.state.customerLogo.length!==0?`  עריכת לוגו לקוח`:`  הוספת לוגו לקוח`}
                                    </Button>
                                    <br/>
                                    {Configs.CustomerLogo.isMandatory&&(Configs.CustomerLogo.minimum&&<span style={{color:'blue'}}>מינימום {Configs.CustomerLogo.minimum}</span>)}
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
                    <StudentDetails Students={Configs.Students} Name={Configs.StudentName} Picture={Configs.StudentPicture} Email={Configs.StudentEmail} Id={Configs.StudentId} setStudents={this.getStudentsDetails} OpenImageModal={this.OpenImageModal} studentInitalDetails={this.state.StudentDetails} OpenPreviewModal={this.OpenImagePreviewForStudent}/>
                </Form>
            </div>
        );
    }
}
export default St1;

