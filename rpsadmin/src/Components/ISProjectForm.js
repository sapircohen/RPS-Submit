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

import Toggle from 'react-toggle';
import "react-toggle/style.css";

const KeyCodes = {
    comma: 188,
    enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];


class ISProjectTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state={
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
            projectDetails:{}
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
        console.log(groupData)
        this.setState({
            Challenges:groupData.Challenges?groupData.Challenges:'',
            GroupName:groupData.GroupName,
            ProjectName:groupData.ProjectName?groupData.ProjectName:'',
            PDescription:groupData.PDescription?groupData.PDescription:'',
            ProjectSite:groupData.ProjectSite?groupData.ProjectSite:'',
            MovieLink:groupData.MovieLink?groupData.MovieLink:'',
            ScreenShots:groupData.ScreenShots?[groupData.ScreenShots]:[],
            logo:groupData.ProjectLogo?[groupData.ProjectLogo]:[],
            customerLogo:groupData.CustomerLogo?[groupData.CustomerLogo]:[],
            comments:groupData.Comments?groupData.Comments:'',
            CustCustomers:groupData.CustCustomers?groupData.CustCustomers:'',
            CStackholders:groupData.CStackholders?groupData.CStackholders:'',
            CDescription:groupData.CDescription?groupData.CDescription:'',
            ScreenShotsNames:groupData.ScreenShotsNames?[groupData.ScreenShotsNames]:[],
            projectModules:groupData.Module?[groupData.Module]:[],
            projectGoals:groupData.Goals?[groupData.Goals]:[],
            StudentDetails:groupData.Students?[groupData.Students]:[]
        },()=>console.log(this.state.PDescription))
        //get list of advisors from firebase
        this.getAdvisors();
        //get technologies from firebase
        this.getTechnologies();
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
        console.log(this.state.StudentsDetails[index].image);
        if(this.state.StudentsDetails[index].image !==''){
            let temp = [];
            temp.push(this.state.StudentsDetails[index].image);
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
                    showImagesMode:true,
                    imagesToShowInModal:this.state.ScreenShots
                })
                break;
            case 'Project Logo':
                if(this.state.logo[0]!==undefined){
                    this.setState({
                        showImagesMode:true,
                        //showProjectLogoPreview:true,
                        imagesToShowInModal:this.state.logo
                    })
                }
                else{
                    this.setState({
                        showImagesMode:true,
                        //showProjectLogoPreview:true,
                        imagesToShowInModal:undefined
                    })
                }
                break;
            case 'Customer Logo':
                if(this.state.customerLogo[0]!==undefined){
                    this.setState({
                        showImagesMode:true,
                        //showCustomerLogoPreview:true,
                        imagesToShowInModal:this.state.customerLogo
                    })
                }
                else{
                    this.setState({
                        showImagesMode:true,
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
        const project = {
            ProjectName:this.projectName.current.value,
            PDescription:this.projectDescription.current.value,
            Challenges:this.projectChallenges.current.value,
            ProjectType:this.projectType.current.value,
            advisor:[this.firstAdvisor.current.value,this.secondAdvisor.current.value],
            HashTags:this.state.tags,
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
            ScreenShotsNames:this.state.ScreenShotsNames
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
    //close preview:
    closePreview = ()=>this.setState({showPreview:false})
    imagesModalClose = ()=>this.setState({showImagesMode:false})
    render(){
        return(
            <div style={{flex:1,backgroundColor:'#eee'}}>

                <ModalImage savePic={this.savePic} picTitle={this.state.picTitle} title={this.state.modalTitle} modalClose={this.handleClose} modalOpen={this.state.openModal} />
                <PreviewModal onHide={this.imagesModalClose} images={this.state.imagesToShowInModal} modalOpen={this.state.showImagesMode}/>
                <SaveAction Save={this.SetProjectOnFirbase}/>
                <NavbarProjs />
                
                <HeaderForm title={this.state.GroupName}/>
                
                {/* preview project card */}
                <PreviewCard close={this.closePreview} projectDetails={this.state.projectDetails} openPreview={this.state.showPreview} />

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
                                <Form.Control ref={this.projectSmallDescription} defaultValue={this.state.CDescription} dir="rtl" as="textarea" />
                            </Col>
                        <Form.Label column sm="2">תיאור קצר</Form.Label>
                        </Form.Group>
                        
                        {/* project description */}
                        <Form.Group as={Row} id="description">
                            <Col sm="10">
                                <Form.Control ref={this.projectDescription} defaultValue={this.state.PDescription} dir="rtl" as="textarea"/>
                            </Col>
                            <Form.Label column sm="2">תיאור הפרויקט</Form.Label>
                        </Form.Group>
                        
                        {/* project Challenges  */}
                        <Form.Group as={Row} id="projectChallenges">
                            <Col sm="10">
                                <Form.Control ref={this.projectChallenges} defaultValue={this.state.Challenges} dir="rtl" as="textarea" rows="3" />
                            </Col>
                            <Form.Label column sm="2">אתגרי הפרויקט</Form.Label>
                        </Form.Group>

                        {/* project Comments */}
                        <Form.Group as={Row} id="comments">
                            <Col sm="10">
                                <Form.Control defaultValue={this.state.comments} ref={this.projectComments} dir="rtl" as="textarea" rows="3" />
                            </Col>
                            <Form.Label column sm="2">הערות</Form.Label>
                        </Form.Group>

                        {/* projectType */}
                        <Form.Row dir="rtl">
                            <Form.Group as={Col} id="projectType">
                            <Form.Label>סוג הפרויקט</Form.Label>
                            <Form.Control ref={this.projectType} onChange={this.changeProjectType} dir="rtl" as="select">
                                <option>בחר</option>
                                <option>ארגוני</option>
                                <option>יזמי</option>
                            </Form.Control>
                        </Form.Group>
                        
                        {/* first advisor */}
                        <Form.Group as={Col} id="firstAdvisor">
                        <Form.Label dir="rtl">מנחה חלק א'</Form.Label>
                        <Form.Control ref={this.firstAdvisor} dir="rtl" as="select">
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
                    
                    <ProjectGoals setProjectGoals={this.getProjectGoals}/>
                    <ProjectModules setProjectModules={this.getprojectModules}/>
                    
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
                                    <Button style={{backgroundColor:'#96B2CC',borderColor:'#96B2CC'}} onClick={()=>this.OpenImageModal('Project Logo','Plogo')}>
                                        <FaCameraRetro/>
                                        {`  הוסף לוגו`}
                                        
                                    </Button>
                                </Col>
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#EECC4D',borderColor:'#EECC4D'}} onClick={()=>this.OpenImageModal('Screenshots','')}>
                                        <FaCameraRetro/>
                                        {`  תמונות מסך`}
                                    </Button>
                                </Col>
                                {this.state.organization ?
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#B9CABF',borderColor:'#B9CABF'}} onClick={()=>this.OpenImageModal('Customer Logo','Clogo')}>
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
                                    <Button style={{backgroundColor:'#96B2CC',borderColor:'#96B2CC'}} onClick={()=>this.OpenImagePreview('Project Logo')}>
                                        <FaCameraRetro/>
                                        {`  הראה לוגו`}
                                        
                                    </Button>
                                </Col>
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#EECC4D',borderColor:'#EECC4D'}} onClick={()=>this.OpenImagePreview('Screenshots')}>
                                        <FaCameraRetro/>
                                        {`  צפה בתמונות מסך`}
                                    </Button>
                                </Col>
                                {this.state.organization ?
                                <Col sm="4">
                                    <Button style={{backgroundColor:'#B9CABF',borderColor:'#B9CABF'}} onClick={()=>this.OpenImagePreview('Customer Logo')}>
                                         <FaCameraRetro/>
                                        {` צפה בלוגו לקוח`}
                                    </Button>
                                </Col>
                                :
                                <Col sm="4"></Col>
                                }
                            </Row>
                    </div>

                    <StudentDetails setStudents={this.getStudentsDetails} OpenImageModal={this.OpenImageModal} OpenPreviewModal={this.OpenImagePreviewForStudent}/>
                    
                </Form>
            </div>
        );
    }
}


export default ISProjectTemplate;

