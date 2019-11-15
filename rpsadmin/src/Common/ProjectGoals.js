import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import SmallHeaderForm from './SmallHeaderForm';
import Form from 'react-bootstrap/Form';
import { FaPlusCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default class ProjectGoals extends React.Component{
    state = {
        //numberOfStudents:1,
        goals: [{GoalDescription:"", GoalStatus:""}],
    }
    componentDidMount(){
        window.setTimeout(()=>{
            //console.log(this.props)
            if(this.props.initalProjectGoals&&this.props.initalProjectGoals.length!==0){
                this.setState({
                    goals:this.props.initalProjectGoals,
                   
                },()=>{
                    this.props.setProjectGoals(this.state.goals);
                })
            }
            else this.props.setProjectGoals(this.state.goals);
        },3000)
    }
    addGoal = ()=>{
        this.setState((prevState) => ({
            goals: [...prevState.goals, {GoalDescription:"", GoalStatus:""}],
        }),()=>{
            this.props.setProjectGoals(this.state.goals);
        });
        
    }
    removeGoal= (index)=>{
        //alert(index);
        //remove a student in position index
        let array = [...this.state.goals];
    
        //console.log(this.state.goals)
        if (index !== -1) {
            array.splice(index, 1);
            //console.log(array);
            this.setState({goals: array},()=>{
                this.props.setProjectGoals(this.state.goals);
            });
        }
    }
    changeGoalDesc = (index,e)=>{
        this.state.goals[index].GoalDescription =e.target.value;
        this.forceUpdate();
        this.props.setProjectGoals(this.state.goals);
    }
    changeGoalStatus = (index,e)=>{
        this.state.goals[index].GoalStatus = e.target.value;
        this.forceUpdate();
        this.props.setProjectGoals(this.state.goals);
    }
    render(){
        const {goals} = this.state;
        return(
            <div dir="rtl" style={{border:'solid 1px',padding:20,borderRadius:5,marginTop:30,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                <SmallHeaderForm title={this.props.title?this.props.title:"מטרות הפרויקט"}/>
                <Row dir="rtl" style={{marginTop:'2%'}}>
                    <Col sm="4">
                        <Button onClick={this.addGoal} variant="success">
                            <FaPlusCircle/>
                            מטרה חדשה
                        </Button>
                    </Col>
                    <Col sm="4"></Col>
                    <Col sm="4"></Col>
                </Row>
                {
                    goals.map((val, idx)=> {
                        return (
                        <div  key={idx}>
                            <SmallHeaderForm title={`#מטרה ${idx+1}`}/>
                            <Form.Group dir="rtl" style={{marginTop:'2%'}} as={Row} id="goalName">
                                <Form.Label column sm="1">תיאור המטרה</Form.Label>
                                <Col sm="4">
                                    <Form.Control value={this.state.goals[idx].GoalDescription} onChange={(e)=>this.changeGoalDesc(idx,e)} dir="rtl" as="textarea" rows="5"/>
                                </Col>

                                <Form.Label column sm="2">סטטוס המטרה</Form.Label>
                                <Col sm="3">
                                    <Form.Control value={this.state.goals[idx].GoalStatus} onChange={(e)=>this.changeGoalStatus(idx,e)} dir="rtl" as="textarea" rows="3"/>
                                </Col>
                                <Col sm="2">
                                    <Button onClick={()=>this.removeGoal(idx)} style={{backgroundColor:'#fff',borderColor:'#fff',color:'red'}}>
                                        <IoIosCloseCircleOutline color="red" size={40}/>
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