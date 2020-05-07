import React from 'react';
import SelectInput from '../Common/inputSelect';
import firebase from 'firebase';
import Loader from 'react-loader-spinner';

import {Button} from 'react-bootstrap';
import {getConfigsForProject} from '../functions/functions'



export default class CourseChoice extends React.Component{
    state={
        template:'',
        course:'',
        coursesList:[],
        templateList:[],
        isReady:true
    }
    componentDidMount(){
        const groupData = JSON.parse(localStorage.getItem('groupData'));
        this.coursesFromFirebase(groupData.Faculty,groupData.Department,groupData.Major);
    }
    changeProjectType = (e)=>{
        const template = this.state.templateList[e.target.options.selectedIndex-1];
        const course = this.state.coursesList[e.target.options.selectedIndex-1];
        this.setState({template:template,course:course})
    }
    coursesFromFirebase=(fac,dep,exp)=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(fac).child('Departments').child(dep).child('Experties').child(exp).child('Courses');
        ref.once("value", (snapshot)=> {
            snapshot.forEach((course)=>{
                this.setState({coursesList:[...this.state.coursesList,course.val().Name]});
                this.setState({templateList:[...this.state.templateList,course.val()['Submit Template']]});
            })
        }, (errorObject)=> {
            console.log("The read failed: " + errorObject.code);
        })
    }
    GoToTemplate =  ()=>{
        this.setState({isReady:false},()=>{
            const groupData = JSON.parse(localStorage.getItem('groupData'));
            localStorage.setItem('course', JSON.stringify(this.state.course));
            getConfigsForProject(groupData,this.state.course)
            window.setTimeout(()=>this.props.history.push('/'+this.state.template),4000)    
        })
    }
    render(){
        if(!this.state.isReady){
            return(
              <div style={{flex:1,marginTop:'20%'}}>
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
            <div style={{width:'50%',margin:'20px auto'}}>
                <SelectInput inputList={this.state.coursesList} InputTitle='בחרו קורס' ChangeSelectInput={this.changeProjectType} />
                <Button onClick={()=>this.GoToTemplate()}>
                    {`אישור`}
                </Button>
            </div>
        )
    }
}