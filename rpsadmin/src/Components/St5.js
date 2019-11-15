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
        groupData :''
    }
    componentDidMount(){
        this.setState({
            course :JSON.parse(localStorage.getItem('course')),
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
                ProjectCourse:this.state.course,
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
    OpenImageModal = (title,pic)=>this.setState({openModal:true,modalTitle:title,picTitle:pic})
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
            ProjectCourse:this.state.course,
            ProjectConclusion:this.state.ProjectConclusion,
            projectFindings:this.state.projectFindings,
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
                projectGoals:this.state.projectGoals,
                isPublished:this.state.isPublished,
                Technologies:this.state.chosenTechs,
                ProjectConclusion:this.state.ProjectConclusion,
                projectFindings:this.state.projectFindings,
                PartnerDescription:this.state.PartnerDescription,
                ProjectSummery:this.state.ProjectSummery,
                HashTags:this.state.tags,
            })
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
    ValidateData = (projectData)=>{
            if (projectData.ProjectName==='' || projectData.ProjectName.length<2) {
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'שם הפרויקט חסר',alertIcon:'warning'})
                return false;
            }
            if(projectData.CDescription.length>200 || projectData.CDescription.length===0){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'תיאור קצר צריך להיות קטן מ-200 תווים',alertIcon:'warning'})
                return false;
            }
            if(projectData.CDescription.length===0){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'תיאור קצר חסר',alertIcon:'warning'})
                return false;
            }
            //project summery
            if(projectData.ProjectSummery.length>1100 || projectData.ProjectSummery.length===0){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'התקציר צריך להיות קטן מ-1000 תווים',alertIcon:'warning'})
                return false;
            }
            if(projectData.ProjectSummery.length===0){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'התקציר חסר',alertIcon:'warning'})
                return false;
            }
            //project long description -->PDescription
            if(projectData.PDescription.length>500 || projectData.PDescription.length===0){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'תיאור רקע מטרת הפרויקט צריך להיות קטן מ-400 תווים',alertIcon:'warning'})
                return false;
            }
            if( projectData.PDescription.length===0){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'תיאור רקע מטרת הפרויקט חסר',alertIcon:'warning'})
                return false;
            }
            //project findings
            if(projectData.projectFindings.length>2200){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'שדה תוצאות הפרויקט צריך להיות קטן מ-2000 תווים',alertIcon:'warning'})
                return false;
            }
            if(projectData.projectFindings.length===0){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'שדה תוצאות הפרויט חסר',alertIcon:'warning'})
                return false;
            }
            //project Conclusion
            if(projectData.ProjectConclusion.length>1100){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'שדה סיכום ומסקנות הפרויקט צריך להיות קטן מ-1000 תווים',alertIcon:'warning'})
                return false;
            }
            if(projectData.ProjectConclusion.length===0){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'שדה סיכום ומסקנות הפרויקט חסר',alertIcon:'warning'})
                return false;
            }

            //project year
            if (projectData.Year === "" || projectData.Year === "בחר") {
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'בחרו שנה',alertIcon:'warning'})
                return false;
            }
            //project semester
            if (projectData.Semester === "" || projectData.Semester === "בחר") {
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'בחרו סמסטר',alertIcon:'warning'})
                return false;
            }
            //project Advisors
            if(projectData.advisor[0]===''){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'מנחה א חסר',alertIcon:'warning'})
                return false;
            } 
            //project Topic 
            if (projectData.ProjectTopic==='בחר' || projectData.ProjectTopic==='') {
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'בחרו נושא פרויקט'})
                return false;
            }
            //project goals-->Goals
            if(projectData.Goals.length<2){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'מספר מטרות ודרישות הנדסיות צריך להיות לפחות 2',alertIcon:'warning'})
                return false;
            }
            else{
                let flag = true;
                projectData.Goals.forEach((goal,index)=>{
                    if (goal.GoalDescription.length<2) {
                        this.setState({alertShow:true,alertTitle:'שימו לב',alertText:' תיאור מטרה מספר ' +(index+1)+' צריך להיות גדול מ2 תווים ',alertIcon:'warning'})
                        flag= false;
                    }
                    if (goal.GoalDescription.length>150) {
                        this.setState({alertShow:true,alertTitle:'שימו לב',alertText:' תיאור מטרה מספר ' +(index+1)+' צריך להיות קטן מ100 תווים ',alertIcon:'warning'})
                        flag= false;
                    }
                    if(goal.GoalStatus.length<2){
                        this.setState({alertShow:true,alertTitle:'שימו לב',alertText:' סטטוס מטרה מספר ' +(index+1)+' צריך להיות גדול מ2 תווים ',alertIcon:'warning'})
                        flag= false;
                    }
                    if(goal.GoalStatus.length>150){
                        this.setState({alertShow:true,alertTitle:'שימו לב',alertText:' סטטוס מטרה מספר ' +(index+1)+' צריך להיות קטן מ100 תווים ',alertIcon:'warning'})
                        flag= false;
                    }
                })
                if (!flag) {
                    return false;
                }
            }
            //project technologies -->Technologies
            if(projectData.Technologies.length<3){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'מספר הטכנולוגיות צריך להיות לפחות 5',alertIcon:'warning'})
                return false;
            }
            //project screenshots
            if (projectData.ScreenShots.length<2) {
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'מינימום 5 תמונות של תוצרי פרויקט.'})
                return false;
            }        
            //project logo
            if (projectData.ProjectLogo<1) {
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'חסרה תמונה מייצגת',alertIcon:'warning'})
                return false;
            }
            //project book pdf
            if(projectData.ProjectPDF ===''){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'חסר מסמך PDF של ספר הפרויקט',alertIcon:'warning'})
                return false;
            }
            //project system pdf
            if(projectData.SystemDescriptionPDF ===''){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'חסר מסמך PDF של תיאור מערכת / תכנון הנדסי ',alertIcon:'warning'})
                return false;
            }
            //project students
            if(projectData.Students.length<1){
                this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'חייב להיות לפחות חבר צוות אחד',alertIcon:'warning'})
                return false;
            }
            else{
                let flag = true;
                projectData.Students.forEach((student,index)=>{
                    if(student.Name===''){
                        this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'לסטודנט/ית מספר '+(index+1)+' חסר שם',alertIcon:'warning'})
                        flag = false;
                    }
                    if (student.Picture==='') {
                        this.setState({alertShow:true,alertTitle:'שימו לב',alertText:'לסטודנט/ית מספר '+(index+1)+' חסר תמונה',alertIcon:'warning'})
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
    CloseAlert = ()=>{this.setState({alertShow:false},()=>console.log(this.state.alertShow))}
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
                <Idle/>
                <NavbarProjs />
                <SAlert alertIcon={this.state.alertIcon} CloseAlert={this.CloseAlert} show={this.state.alertShow} title={this.state.alertTitle} text={this.state.alertText}/>
                <HeaderForm title={this.state.GroupName}/>
                <ModalImage aspect={this.state.imageAspect} savePic={this.savePic} picTitle={this.state.picTitle} title={this.state.modalTitle} modalClose={this.handleClose} modalOpen={this.state.openModal} />
                <PreviewModal deletePic={this.DeletePic} title={this.state.modalTitle} onHide={this.imagesModalClose} images={this.state.imagesToShowInModal} modalOpen={this.state.showImagesMode}/>
                {/* preview project card */}
                {/* <PreviewCard close={this.closePreview} projectDetails={this.state.projectDetails} openPreview={this.state.showPreview} SaveData={this.SaveData} /> */}
                <ModalExample1 close={this.closePreview} projectDetails={this.state.projectDetails} openPreview={this.state.showPreview} SaveData={this.SaveData}/>
                <SaveAction Save={this.SetProjectOnFirbase}/>
                <PublishProject ChangePublish={this.ChangePublish} isPublished={this.state.isPublished}  />
                <Form style={{marginTop:'4%',marginLeft:'10%',marginRight:'10%'}}>
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title={"תיאור הפרויקט"}/>
                        {/* projectName */}
                        <TextInputs IsMandatory={true} defaultInput={this.state.ProjectName} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectName} inputSize="lg" />
                        {/* project Small Description */}
                        <TextareaInput IsMandatory={true}  defaultInput={this.state.CDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectSmallDesc} />
                        {/* Project Summery*/}
                        <RichText IsMandatory={true} defaultInput={this.state.ProjectSummery} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.ProjectSummery} />
                        {/* project background and motivation */}
                        <RichText IsMandatory={true}  defaultInput={this.state.PDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectDesc} />
                        {/* Project Findings*/}
                        <RichText IsMandatory={true}   defaultInput={this.state.projectFindings} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectFindings} />
                        {/* Project Conclusion*/}
                        <RichText IsMandatory={true}   defaultInput={this.state.ProjectConclusion} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.ProjectConclusion} />
                        {/* project partner Description */}
                        <TextareaInput IsMandatory={false}  defaultInput={this.state.PartnerDescription} ChangeInputTextarea={this.ChangeInputTextarea} InputTitle={sectionNames.projectPartnerDescription} />
                        <Form.Row dir="rtl">
                            {/* year  */}
                            <SelectInput IsMandatory={true} defaultInput={this.state.Year} inputList={Years} InputTitle={sectionNames.projectYear} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* semester */}
                            <SelectInput IsMandatory={true} defaultInput={this.state.Semester} inputList={['שנתי']} InputTitle={sectionNames.projectSemester} ChangeSelectInput={this.ChangeSelectedInputs} />
                            <SelectInput IsMandatory={true} defaultInput={this.state.ProjectTopic}  inputList={this.state.topicList} InputTitle={sectionNames.projectType} ChangeSelectInput={this.changeProjectType} />
                            {/* first advisor */}
                            <SelectInput IsMandatory={true}  defaultInput={this.state.firstAdvisor} inputList={this.state.advisorsList} InputTitle={sectionNames.projectFirstAdvisor} ChangeSelectInput={this.ChangeSelectedInputs} />
                            {/* second advisor */}
                            <SelectInput IsMandatory={false}  defaultInput={this.state.secondAdvisor} inputList={this.state.advisorsList} InputTitle={sectionNames.projectSecondAdvisor} ChangeSelectInput={this.ChangeSelectedInputs} />
                        </Form.Row>
                    </div>
                    <ProjectGoals title={"מטרות ודרישות הנדסיות"} initalProjectGoals={this.state.projectGoals} setProjectGoals={this.getProjectGoals}/>
                    {/* project system pdf description */}
                    <div style={{border:'solid 1px',padding:20,borderRadius:30,marginTop:'2%',backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                        <SmallHeaderForm title="תיאור מערכת / תכנון הנדסי"/>
                        <Row dir="rtl" style={{marginTop:'2%'}} >
                            <Col sm="4"></Col>
                            <Col sm="4">
                                <LabelTextPDF ProjectPDF={this.state.SystemDescriptionPDF} IsMandatory={true} />
                                <PDFupload DeletePdf={this.DeleteDescPdf} pdfFileSize={30000000} wordFileSize={5000000} savePDF={this.saveDescPDF}/>
                            </Col>
                        </Row>
                        <SmallHeaderForm title="ספר הפרויקט"/>
                        {/* pdf */}
                        <Row dir="rtl" style={{marginTop:'2%'}} >
                            <Col sm="4"></Col>
                            <Col sm="4">
                                <LabelTextPDF ProjectPDF={this.state.ProjectPDF} IsMandatory={true} />
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
                            
                            {/* project movie link */}
                            <LinkInput ChangeLinkInput={this.ChangeLinkInput} defaultInput={this.state.MovieLink} InputTitle={sectionNames.projectMovie} inputSize="sm" placeholder="www.youtube.com.."/>
                    </div>
                    {/* tag the project */}
                    <Hashtags chosenHashs={this.state.tags} HashsChosen={this.HashsChosen} hashs={this.state.HashOptions}/>
                    <StudentDetails setStudents={this.getStudentsDetails} OpenImageModal={this.OpenImageModal} studentInitalDetails={this.state.StudentDetails} OpenPreviewModal={this.OpenImagePreviewForStudent}/>
                </Form>
            </div>

        )
    }
}
