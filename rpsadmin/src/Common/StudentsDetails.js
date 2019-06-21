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
            //numberOfStudents:1,
            students: [{Name:"", Email:"",Picture:"",Id:""}],
        }

    }
    componentDidMount = ()=>{
        window.setTimeout(()=>{
            console.log(this.props)
            if(this.props.studentInitalDetails&&this.props.studentInitalDetails.length!==0){
                this.setState({
                    students:this.props.studentInitalDetails,
                   
                },()=>{
                    this.setState({
                        numberOfStudents:this.state.students+1,
                    },()=>{
                        this.props.setStudents(this.state.students);
                    })
                })
            }
            else this.props.setStudents(this.state.students);
        },1000)
    }
    addStudent = ()=>{
        this.setState((prevState) => ({
            students: [...prevState.students, {Name:"", Email:"",Picture:"",Id:""}],
        }),()=>{
            this.props.setStudents(this.state.students);
        });
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
                        <div key={idx}>
                            <SmallHeaderForm title={`#סטודנט/ית ${idx+1}`}/>
                            <Form.Group dir="rtl" style={{marginTop:'2%'}} as={Row} id="studentName">
                                <Form.Label column sm="2">
                                    <span style={{color:'red'}}>*</span>
                                    שם הסטודנט/ית
                                </Form.Label>
                                <Col sm="2">
                                <Form.Control defaultValue={students[idx].Name} onChange={(e)=>this.changeName(idx,e)} type="text" dir="rtl"/>
                                </Col>
                                <Form.Label column sm="2">אימייל</Form.Label>
                                <Col sm="4">
                                <Form.Control defaultValue={students[idx].Email} onChange={(e)=>this.changeEmail(idx,e)} type="text" dir="rtl"/>
                                </Col>
                                <Button onClick={()=>this.removeStudent(idx)} style={{backgroundColor:'#fff',borderColor:'#fff',color:'red'}}>
                                    <IoIosCloseCircleOutline color="red" size={40}/>
                                </Button>
                            </Form.Group>
                            <Form.Group dir="rtl" style={{marginTop:'2%'}} as={Row} id="studentName">
                                <Form.Label column sm="2">תעודת זהות</Form.Label>
                                <Col sm="2">
                                <Form.Control defaultValue={students[idx].Id} onChange={(e)=>this.changeId(idx,e)} type="text" dir="rtl"/>
                                </Col>
                                <Col sm="2">
                                
                                </Col>
                                <Col sm="2">
                                    <Button block onClick={()=>this.OpenImageModalStudent(`Student Pic`,idx)} variant="primary">
                                        <FaCameraRetro/>
                                        {`  תמונה  `} 
                                        {this.props.isMandatory&&<span style={{color:'red'}}>*</span>}
                                    </Button>
                                </Col>
                                <Col sm="2">
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