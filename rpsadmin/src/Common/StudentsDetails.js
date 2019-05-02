import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import SmallHeaderForm from '../Common/SmallHeaderForm';
import Form from 'react-bootstrap/Form';
import { FaPlusCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline,IoMdCheckmark } from "react-icons/io";

export default class StudentsDetails extends React.Component{
    state = {
        numberOfStudents:1,
        students: [{fullName:"", email:"",image:"",id:""}],
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
                students: [...prevState.students, {fullName:"", email:"",image:"",id:""}],
            }));
        }
    }
    OpenImageModalStudent = (title)=>{
        this.props.OpenImageModal(title)
    }
    removeStudent = (index)=>{
        alert(index);
        //remove a student in position index 
        var array = [...this.state.students];
        if (index !== -1) {
            array.splice(index, 1);
            console.log(array);
            this.setState({students: array});
        }
    }
    saveStudent = (index)=>{
        //save student to firebase 
    }
    render(){
        const {students} = this.state;
        return(
            <div dir="rtl" style={{border:'solid 1px',padding:20,borderRadius:20,marginTop:'2%'}}>
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
                    <Col sm="4"></Col>
                    <Col sm="4">
                        <Button onClick={this.addStudent} variant="success">
                            <FaPlusCircle/>
                            הוסף חבר/ת צוות
                        </Button>
                    </Col>
                    <Col sm="4"></Col>
                </Row>
                {
                    students.map((val, idx)=> {
                        let studentId = `studentId-${idx}`;
                        let emailId = `email-${idx}`;
                        return (
                        <div  key={idx}>
                            <SmallHeaderForm title={`#סטודנט/ית ${idx+1}`}/>
                            <Form.Group dir="rtl" style={{marginTop:'2%'}} as={Row} id="studentName">
                                <Form.Label column sm="2">שם הסטודנט/ית</Form.Label>
                                <Col sm="2">
                                <Form.Control onChange={()=>this.changeName(idx)} type="text" dir="rtl"/>
                                </Col>

                                <Form.Label column sm="2">אימייל</Form.Label>
                                <Col sm="4">
                                <Form.Control type="text" dir="rtl"/>
                                </Col>
                                <IoIosCloseCircleOutline color="red" size={40}/>
                                <Button onClick={()=>this.removeStudent(idx)} style={{backgroundColor:'grey'}}>
                                    מחיקה
                                </Button>
                            </Form.Group>
                            <Form.Group dir="rtl" style={{marginTop:'2%'}} as={Row} id="studentName">
                                <Form.Label column sm="2">תעודת זהות</Form.Label>
                                <Col sm="2">
                                <Form.Control type="text" dir="rtl"/>
                                </Col>

                                <Form.Label column sm="2">תמונה</Form.Label>
                                <Col sm="4">
                                    <Button onClick={()=>this.OpenImageModalStudent(`Student Number ${idx+1}`)} variant="primary">
                                        תמונה
                                    </Button>
                                </Col>
                                <IoMdCheckmark onClick={()=>this.saveStudent(idx)} color="green" size={40}/>
                                <Button style={{backgroundColor:'grey'}}>
                                    שמירה
                                </Button>
                            </Form.Group>
                        </div>
                        )
                    })
                }
            </div>
        )
    }
}