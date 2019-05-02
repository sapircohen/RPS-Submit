import React from 'react';
import NavbarProjs from './NavbarStudents';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { FaGoogle,FaAppleAlt } from "react-icons/fa";
import { WithContext as ReactTags } from 'react-tag-input';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import HeaderForm from '../Common/HeaderForm';
import SmallHeaderForm from '../Common/SmallHeaderForm';
import ModalImage from '../Common/ImageModal';
import firebase from 'firebase';
import StudentDetails from '../Common/StudentsDetails';


const KeyCodes = {
    comma: 188,
    enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];


class ISProjectTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Advisor:'',
            Challenges:'',
            CustomerName:'',
            GroupName:'',
            HashTags:[],
            MovieLink:'',
            PDescription:'',
            CDescription:'',
            ProjectSite:'',
            ProjectName:'',
            modalTitle:'',
            openModal:false,
            finalProject:false,
            organization:false,
            tags:[],
            appExists:false,
            chosenTechs:[],
            suggestions: [
                { id: 'USA', text: 'USA' },
                { id: 'Germany', text: 'Germany' },
                { id: 'Austria', text: 'Austria' },
                { id: 'Costa Rica', text: 'Costa Rica' },
                { id: 'Sri Lanka', text: 'Sri Lanka' },
                { id: 'Thailand', text: 'Thailand' }
             ],
            techOptions : []
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.TechsChosen = this.TechsChosen.bind(this);
    }
    componentDidMount(){
        //get group data from local storage
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        this.setState({
            Challenges:groupData.Challenges,
            GroupName:groupData.GroupName,
            ProjectName:groupData.ProjectName,
            PDescription:groupData.PDescription,
            ProjectSite:groupData.ProjectSite,
            MovieLink:groupData.MovieLink
        })
        //get technologies from firebase
        const ref = firebase.database().ref('Technologies');
        ref.once("value", (snapshot)=> {
            snapshot.forEach((tech)=> {
                console.log(tech.val())
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
    OpenImageModal = (title)=>{
        this.setState({
            openModal:true,
            modalTitle:title
        })
    }
    handleClose = ()=> {
        this.setState({ openModal: false });
    }
    
    render(){
        return(
            <div style={{flex:1}}>

                <ModalImage title={this.state.modalTitle} modalClose={this.handleClose} modalOpen={this.state.openModal} />

                <NavbarProjs/>
                
                <HeaderForm title={this.state.GroupName}/>

                <Form style={{marginTop:'4%',marginLeft:'10%',marginRight:'10%'}}>
                    <div style={{border:'solid 1px',padding:15,borderRadius:20}}>
                        <SmallHeaderForm title={"תיאור הפרויקט"}/>
                        
                        <Form.Group style={{marginTop:'2%'}} as={Row} id="projectName">
                            <Col sm="3"></Col>
                            <Col sm="7">
                                <Form.Control value={this.state.ProjectName} size="lg" type="text" dir="rtl"/>
                            </Col>
                            <Form.Label column sm="2">שם הפרויקט</Form.Label>
                        </Form.Group>

                        <Form.Group as={Row} id="description">
                            <Col sm="10">
                                <Form.Control value={this.state.PDescription} dir="rtl" as="textarea" rows="3" />
                            </Col>
                            <Form.Label column sm="2">תיאור הפרויקט</Form.Label>
                        </Form.Group>
                        
                        <Form.Group as={Row} id="projectChallenges">
                            <Col sm="10">
                                <Form.Control value={this.state.Challenges} dir="rtl" as="textarea" rows="3" />
                            </Col>
                            <Form.Label column sm="2">אתגרי הפרויקט</Form.Label>
                        </Form.Group>

                        <Form.Group dir="rtl" as={Row} id="formGridState">
                        <Form.Label column sm="2">קורס</Form.Label>
                        <Col sm="4">
                            <Form.Control onChange={this.changeCourseType} id="courseType" dir="rtl" as="select">
                                <option>בחר</option>
                                <option>פרויקט גמר</option>
                                <option>דברים אחרים..</option>
                            </Form.Control>
                        </Col>
                        <Col sm="6"></Col>
                    </Form.Group>

                    {this.state.finalProject &&
                    (<Form.Row dir="rtl">
                        <Form.Group as={Col} id="projectType">
                            <Form.Label>סוג הפרויקט</Form.Label>
                            <Form.Control onChange={this.changeProjectType} dir="rtl" as="select">
                                <option>בחר</option>
                                <option>ארגוני</option>
                                <option>יזמי</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} id="firstAdvisor">
                        <Form.Label dir="rtl">מנחה חלק א'</Form.Label>
                        <Form.Control dir="rtl" as="select">
                            <option>בחר</option>
                            <option>...</option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} id="secondAdvisor">
                        <Form.Label dir="rtl">מנחה חלק ב'</Form.Label>
                        <Form.Control dir="rtl" as="select">
                            <option>בחר</option>
                            <option>...</option>
                        </Form.Control>
                        </Form.Group>   
                    </Form.Row>) }
                    
                    {this.state.organization &&
                    (<div>
                        <Form.Group as={Row} id="projectCustomerName">
                            <Col sm="3"></Col>
                            <Col sm="7">
                                <Form.Control size="lg" type="text" dir="rtl"/>
                            </Col>
                            <Form.Label column sm="2">שם הלקוח</Form.Label>
                        </Form.Group>
                        <Form.Group as={Row} id="projectCustomerDescription">
                            <Col sm="10">
                                <Form.Control dir="rtl" as="textarea" rows="3" />
                            </Col>
                        <Form.Label column sm="2">תיאור הלקוח</Form.Label>
                        </Form.Group>
                    </div>)}
                    </div>
                   
                    <div style={{border:'solid 1px',padding:15,borderRadius:20,marginTop:'2%'}}>
                        <SmallHeaderForm title="הוספת קישורים"/>

                        <Form.Group style={{marginTop:15}} dir="rtl" as={Row}>
                            <Form.Label column sm="2">קישור לאתר הפרויקט</Form.Label>
                            <Col sm="7">
                                <Form.Control value={this.state.ProjectSite} dir="ltr" id="projectSite" size="sm" type="text" placeholder="http://proj.ruppin.ac.il/..." /> 
                            </Col>
                            <Col sm="3"></Col>
                        </Form.Group>

                        <Form.Group style={{marginTop:15}} dir="rtl" as={Row} id="formGridState">
                            <Form.Label column sm="4">קישור לסרטון הפרויקט ביוטיוב</Form.Label>
                            <Col sm="4">
                                <Form.Control value={this.state.MovieLink} dir="ltr" id="projectMovie" size="sm" type="text" placeholder="www.youtube.com" /> 
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
                                    <Form.Control dir="ltr" id="appstoreURL" size="sm" type="text" placeholder="Appstore..." /> 
                                </Col>
                                <Form.Label column sm="1"><FaGoogle style={{color:'green',fontSize:18}}/> link</Form.Label>
                                <Col sm="5">
                                    <Form.Control dir="ltr" id="googleURL" size="sm" type="text" placeholder="Google play..." /> 
                                </Col>
                            </Form.Group>
                        }
                    </div>                    
                    
                    {/* FILES UPLOAD */}
                    <div style={{border:'solid 1px',padding:20,borderRadius:20,marginTop:'2%'}}>
                        <SmallHeaderForm title="הוספת קבצים"/>

                            <Row dir="rtl" style={{marginTop:'2%'}} >
                                <Col sm="4">
                                    <Button onClick={()=>this.OpenImageModal('Project Logo')} variant="primary">
                                        הוסף לוגו
                                    </Button>
                                </Col>
                                <Col sm="4">
                                    <Button onClick={()=>this.OpenImageModal('Screenshots')} variant="primary">
                                        הוסף תמונות מסך
                                    </Button>
                                </Col>
                                {this.state.organization ?
                                <Col sm="4">
                                    <Button onClick={()=>this.OpenImageModal('Customer Logo')} variant="primary">
                                        הוסף לוגו לקוח
                                    </Button>
                                </Col>
                                :
                                <Col sm="4"></Col>
                                }
                            </Row>
                    </div>

                    <StudentDetails OpenImageModal={this.OpenImageModal}/>
                    
                    {/* tag the project */}
                    <div dir="rtl" style={{padding:15,borderRadius:20,marginTop:20}}>
                        <Row>
                            <Col sm="4" style={{fontSize:25}}>
                                <h4>
                                    <Badge variant="info">תייג את הפרויקט:</Badge>
                                </h4>
                            </Col>
                            <Col sm="3">
                                <ReactTags
                                tags={this.state.tags}
                                suggestions={this.state.suggestions}
                                handleDelete={this.handleDelete}
                                handleAddition={this.handleAddition}
                                handleDrag={this.handleDrag}
                                delimiters={delimiters} />
                            </Col>
                            <Col sm="5"></Col>
                        </Row>
                    </div>
                    
                    {/* techs tag */}
                    <div dir="rtl" style={{padding:15,borderRadius:20,marginTop:20}}>
                        <Row>
                            <Col sm="4" style={{fontSize:25}}>
                                <h4>
                                    <Badge variant="info">בחר/י טכנולוגיות:</Badge>
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
                </Form>
            </div>
        );
    }
}

export default ISProjectTemplate;

