import React from 'react';
import SelectInput from '../Common/inputSelect';
import firebase from 'firebase';
import {Button} from 'react-bootstrap';



export default class CourseChoice extends React.Component{
    state={
        template:'',
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
        this.setState({template:template})
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
    render(){
        return(
            <div style={{width:'50%',margin:'20px auto'}}>
                <SelectInput inputList={this.state.coursesList} InputTitle='בחרו קורס' ChangeSelectInput={this.changeProjectType} />
                <Button onClick={()=>this.props.history.push('/'+this.state.template)}>
                    {`אישור`}
                </Button>
            </div>
        )
    }
}