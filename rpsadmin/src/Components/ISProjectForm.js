import React from 'react';
import NavbarProjs from './NavbarStudents';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import { FaGoogle,FaAppleAlt } from "react-icons/fa";
import { WithContext as ReactTags } from 'react-tag-input';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';


const KeyCodes = {
    comma: 188,
    enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];


class ISProjectTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state={
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
            techOptions : [
                { value: 'react native', label: 'react native' },
                { value: 'react', label: 'react' },
                { value: 'Jquery mobile', label: 'Jquery mobile' }
              ]
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.TechsChosen = this.TechsChosen.bind(this);
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
            this.setState({finalProject:false})
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
    render(){
        return(
            <div style={{flex:1}}>
                <NavbarProjs/>
                <Container style={{marginTop:20,borderWidth:12}}>
                    <Row>
                        <Col style={{fontSize:25}}>
                            <h2>
                                <Badge pill variant="secondary">פרטי הפרויקט</Badge>
                            </h2>
                        </Col>
                    </Row>
                </Container> 

                <Form style={{marginTop:'4%',marginLeft:'10%',marginRight:'10%'}}>
                    <Form.Group as={Row} controlId="projectName">
                        <Col sm="3"></Col>
                        <Col sm="7">
                            <Form.Control size="lg" type="text" dir="rtl"/>
                        </Col>
                        <Form.Label column sm="2">שם הפרויקט</Form.Label>
                    </Form.Group>

                    <Form.Group style={{marginTop:15}} dir="rtl" as={Row}>
                        <Form.Label column sm="2">קישור לאתר הפרויקט</Form.Label>
                        <Col sm="7">
                            <Form.Control dir="ltr" controlId="projectSite" size="sm" type="text" placeholder="http://proj.ruppin.ac.il/..." /> 
                        </Col>
                        <Col sm="3"></Col>
                    </Form.Group>

                    <Form.Group dir="rtl" style={{marginTop:15}} as={Row}>
                        <Col sm="1">
                           <Form.Check onChange={this.appExisting} controlId="projectApplication" type="checkbox"/> 
                        </Col>
                        <Form.Label  column sm="1">קיימת אפליקציה?</Form.Label>
                        <Col sm="10"></Col>
                    </Form.Group>

                    {
                        this.state.appExists &&
                        <Form.Group as={Row} controlId="projectName">
                            <Form.Label column sm="1"><FaAppleAlt style={{color:'silver',fontSize:18}}/> link</Form.Label>
                            <Col sm="5">
                                <Form.Control dir="ltr" controlId="appstoreURL" size="sm" type="text" placeholder="Appstore..." /> 
                            </Col>
                            <Form.Label column sm="1"><FaGoogle style={{color:'green',fontSize:18}}/> link</Form.Label>
                            <Col sm="5">
                                <Form.Control dir="ltr" controlId="googleURL" size="sm" type="text" placeholder="Google play..." /> 
                            </Col>
                        </Form.Group>
                    }

                    <Form.Group as={Row} controlId="description">
                        <Col sm="10">
                            <Form.Control dir="rtl" as="textarea" rows="3" />
                        </Col>
                        <Form.Label column sm="2">תיאור הפרויקט</Form.Label>
                    </Form.Group>

                    <Form.Group as={Row} controlId="projectChallenges">
                        <Col sm="10">
                            <Form.Control dir="rtl" as="textarea" rows="3" />
                        </Col>
                        <Form.Label column sm="2">אתגרי הפרויקט</Form.Label>
                    </Form.Group>

                    {/* choose project type */}
                    <Form.Group dir="rtl" as={Row} controlId="formGridState">
                        <Form.Label column sm="2">קורס</Form.Label>
                        <Col sm="4">
                            <Form.Control onChange={this.changeCourseType} controlId="courseType" dir="rtl" as="select">
                                <option>בחר</option>
                                <option id="finalProj">פרויקט גמר</option>
                                <option>דברים אחרים..</option>
                            </Form.Control>
                        </Col>
                        <Col sm="6"></Col>
                    </Form.Group>

                    {this.state.finalProject &&
                    (<Form.Row dir="rtl">
                        <Form.Group as={Col} controlId="projectType">
                            <Form.Label>סוג הפרויקט</Form.Label>
                            <Form.Control onChange={this.changeProjectType} dir="rtl" as="select">
                                <option>בחר</option>
                                <option>ארגוני</option>
                                <option>יזמי</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="firstAdvisor">
                        <Form.Label dir="rtl">מנחה חלק א'</Form.Label>
                        <Form.Control dir="rtl" as="select">
                            <option>בחר</option>
                            <option>...</option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="secondAdvisor">
                        <Form.Label dir="rtl">מנחה חלק ב'</Form.Label>
                        <Form.Control dir="rtl" as="select">
                            <option>בחר</option>
                            <option>...</option>
                        </Form.Control>
                        </Form.Group>   
                    </Form.Row>) }
                    
                    {this.state.organization &&
                    (<div>
                        <Form.Group as={Row} controlId="projectCustomerName">
                            <Col sm="3"></Col>
                            <Col sm="7">
                                <Form.Control size="lg" type="text" dir="rtl"/>
                            </Col>
                            <Form.Label column sm="2">שם הלקוח</Form.Label>
                        </Form.Group>
                        <Form.Group as={Row} controlId="projectCustomerDescription">
                            <Col sm="10">
                                <Form.Control dir="rtl" as="textarea" rows="3" />
                            </Col>
                        <Form.Label column sm="2">תיאור הלקוח</Form.Label>
                        </Form.Group>
                    </div>)}
                    
                    <div style={{border:'solid 1px',padding:15,borderRadius:20}}>
                        <Row>
                            <Col style={{fontSize:25}}>
                                <h4>
                                    <Badge variant="info">קבצים</Badge>
                                </h4>
                            </Col>
                        </Row>

                        <Form.Group style={{marginTop:15}} dir="rtl" as={Row} controlId="formGridState">
                            <Form.Label column sm="4">קישור לסרטון הפרויקט ביוטיוב</Form.Label>
                            <Col sm="4">
                                <Form.Control dir="ltr" controlId="projectMovie" size="sm" type="text" placeholder="www.youtube.com" /> 
                            </Col>
                            <Col sm="2"></Col>
                        </Form.Group>

                        <Form.Group style={{marginTop:20}} dir="rtl" as={Row} controlId="formGridState">
                            <Row>
                                <Col sm="1"></Col>
                                <Form.Label column sm="2">לוגו פרויקט:</Form.Label>
                                <Col sm="3">
                                    <Form.Control dir="ltr" controlId="projectLogo" type="file" /> 
                                </Col>
                                <Form.Label column sm="2">תמונות מסך:</Form.Label>
                                <Col sm="3">
                                    <Form.Control multiple dir="ltr" controlId="projectScreenShots" type="file"/> 
                                </Col>
                                <Col sm="1"></Col>
                            </Row>
                            {this.state.organization && <Row style={{marginTop:5}}>
                                <Col sm="2"></Col>
                                <Form.Label column sm="3">לוגו לקוח:</Form.Label>
                                <Col sm="5">
                                    <Form.Control dir="ltr" controlId="projectCustomerLogo" type="file" /> 
                                </Col>
                                <Col sm="2"></Col>
                            </Row>}
                        </Form.Group>
                    </div>
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
                    {/* <Button variant="primary" type="submit">
                        Submit
                    </Button> */}
                </Form>
            </div>
        );
    }
}

export default ISProjectTemplate;

