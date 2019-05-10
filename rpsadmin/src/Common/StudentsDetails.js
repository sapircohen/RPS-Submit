import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import SmallHeaderForm from './SmallHeaderForm';
import Form from 'react-bootstrap/Form';
import { FaPlusCircle,FaCameraRetro,FaEye } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default class StudentsDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            numberOfStudents:1,
            students: [{Name:"", Email:"",Picture:"",Id:""}],
        }

    }
    componentDidMount = ()=>{
        this.props.setStudents(this.state.students);
    }
    ChangeStudentsInputNumber = (e)=>{
        this.setState({
            numberOfStudents:e.target.value,
        })
    }
    addStudent = ()=>{
        if (this.state.students.length >= this.state.numberOfStudents) {
            alert("בבקשה הגדל/י את מספר הסטודנטים לפני המשך הזנה");
        }
        else{
            this.setState((prevState) => ({
                students: [...prevState.students, {Name:"", Email:"",Picture:"",Id:""}],
            }),()=>{
                this.props.setStudents(this.state.students);
            });
        }
    }
    OpenImageModalStudent = (title,id)=>{
        this.props.OpenImageModal(title,id)
    }
    removeStudent = (index)=>{
        //remove a student in position index 
        var array = [...this.state.students];
        if (index !== -1) {
            array.splice(index, 1);
            console.log(array);
            this.setState({students: array},()=>{
                this.props.setStudents(this.state.students);
            });
        }
    }
    changeName = (id,e)=>{
        this.state.students[id].Name = e.target.value;
        this.forceUpdate();
        this.props.setStudents(this.state.students);
    }
    changeEmail = (id,e)=>{
        this.state.students[id].Email = e.target.value;
        this.forceUpdate();
        this.props.setStudents(this.state.students);

    }
    changeId = (id,e)=>{
        this.state.students[id].Id = e.target.value;
        this.forceUpdate();
        this.props.setStudents(this.state.students);

    }
    OpenPreviewModal=(index)=>{
        this.props.OpenPreviewModal(index);
    }
    
    render(){
        const {students} = this.state;
        return(
            <div dir="rtl" style={{border:'solid 1px',padding:20,borderRadius:20,marginTop:'3%',marginBottom:'2%',backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                                
                <SmallHeaderForm title="חברי הצוות"/>
                <Row dir="rtl" style={{marginTop:'2%'}} >
                    {/* NUMBER OF STUDENTS */}
                    <Col sm="4"></Col>
                    <Col sm="4">
                        <Form.Label>מספר חברי צוות</Form.Label>
                        <Form.Control onChange={this.ChangeStudentsInputNumber} id="studentsNumber" as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Col>
                    <Col sm="4"></Col>
                </Row>
                <Row dir="rtl" style={{marginTop:'2%'}}>
                    <Col sm="4">
                        <Button onClick={this.addStudent} variant="success">
                            <FaPlusCircle/>
                            הוסף חבר/ת צוות
                        </Button>
                    </Col>
                    <Col sm="4"></Col>
                    <Col sm="4"></Col>
                </Row>
                {
                    students.map((val, idx)=> {
                        return (
                        <div  key={idx}>
                            <SmallHeaderForm title={`#סטודנט/ית ${idx+1}`}/>
                            <Form.Group dir="rtl" style={{marginTop:'2%'}} as={Row} id="studentName">
                                <Form.Label column sm="2">שם הסטודנט/ית</Form.Label>
                                <Col sm="2">
                                <Form.Control value={students[idx].fullName} onChange={(e)=>this.changeName(idx,e)} type="text" dir="rtl"/>
                                </Col>

                                <Form.Label column sm="2">אימייל</Form.Label>
                                <Col sm="4">
                                <Form.Control value={students[idx].email} onChange={(e)=>this.changeEmail(idx,e)} type="text" dir="rtl"/>
                                </Col>
                                <Button onClick={()=>this.removeStudent(idx)} style={{backgroundColor:'#fff',borderColor:'#fff',color:'red'}}>
                                    <IoIosCloseCircleOutline color="red" size={40}/>
                                </Button>
                            </Form.Group>
                            <Form.Group dir="rtl" style={{marginTop:'2%'}} as={Row} id="studentName">
                                <Form.Label  column sm="2">תעודת זהות</Form.Label>
                                <Col sm="2">
                                <Form.Control value={students[idx].id} onChange={(e)=>this.changeId(idx,e)} type="text" dir="rtl"/>
                                </Col>
                                <Col sm="2"></Col>
                                <Col sm="2">
                                    <Button block onClick={()=>this.OpenImageModalStudent(`Student Pic`,idx)} variant="primary">
                                        <FaCameraRetro/>
                                        {`  תמונה`} 
                                    </Button>
                                </Col>
                                <Col sm="2">
                                    <Button block onClick={()=>this.OpenPreviewModal(idx)} variant="info" >
                                        <FaEye/>
                                        {`  תצוגה`} 
                                    </Button>
                                </Col>
                            </Form.Group>
                        </div>
                        )
                    })
                }
            </div>
        )
    }
}