import React from 'react';
import SelectInput from '../Common/inputSelect';
import firebase from 'firebase';
import {Button} from 'react-bootstrap';



export default class CourseChoice extends React.Component{
    state={
        template:'',
        course:'',
        coursesList:[],
        templateList:[]
    }
    componentDidMount(){
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        this.coursesFromFirebase(groupData.Faculty,groupData.Department,groupData.Major);
    }
    changeProjectType = (e)=>{
        console.log(e.target.options.selectedIndex);
        const template = this.state.templateList[e.target.options.selectedIndex-1];
        const course = this.state.coursesList[e.target.options.selectedIndex-1];
        this.setState({template:template,course:course})
    }
    coursesFromFirebase=(fac,dep,exp)=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(fac).child('Departments').child(dep).child('Experties').child(exp).child('Courses');
        ref.once("value", (snapshot)=> {
            snapshot.forEach((course)=>{
                console.log(course.val())
                this.setState({coursesList:[...this.state.coursesList,course.val().Name]});
                this.setState({templateList:[...this.state.templateList,course.val()['Submit Template']]});

            })
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
        })
    }
    GoToTemplate = ()=>{
        localStorage.setItem('course', JSON.stringify(this.state.course));
        this.props.history.push('/'+this.state.template);
    }
    render(){
        return(
            <div style={{width:'50%',margin:'20px auto'}}>
                <SelectInput inputList={this.state.coursesList} InputTitle='בחרו קורס' ChangeSelectInput={this.changeProjectType} />
                <Button onClick={()=>this.GoToTemplate()}>
                    {`אישור`}
                </Button>
            </div>
        )
    }
}