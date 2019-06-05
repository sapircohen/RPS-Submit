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
        // if(groupData.Major ==='מערכות מידע' && groupData.Department==='הנדסת תעשייה וניהול'){
        //     this.coursesFromFirebase('Engineering','Industrial Engineering','Information systems');
        // }
        // else if(groupData.Major ==='יזמות' && groupData.Department==='הנדסת תעשייה וניהול'){
        //     this.coursesFromFirebase('Engineering','Industrial Engineering','Entrepreneurship');
        // }
        // else if(groupData.Major ==='ייצור ושירות בסביבה דיגיטלית' && groupData.Department==='הנדסת תעשייה וניהול'){
        //     this.coursesFromFirebase('Engineering','Industrial Engineering','Operation and production');
        // }
        // else if(groupData.Major ==='פסיכולוגיה' && groupData.Department==='מדעי התנהגות'){
        //     this.coursesFromFirebase('Social and community sciences','Behavioral Sciences','Psychology');
        // }
        // else if(groupData.Major ==='סוציולוגיה ואנתרופולוגיה' && groupData.Department==='מדעי התנהגות'){
        //     this.coursesFromFirebase('Social and community sciences','Behavioral Sciences','Sociology and anthropology');
        // }
        // else if(groupData.Major==='מערכות מידע' && groupData.Department==='מנהל עסקים'){
        //     this.coursesFromFirebase('Economics and Business Administration','Business Administration','Information systems');
        // }
        // else if(groupData.Major==='ניהול השיווק' && groupData.Department==='מנהל עסקים'){
        //     this.coursesFromFirebase('Economics and Business Administration','Business Administration','Marketing Management');
        // }
        // else if(groupData.Major==='ניהול משאבי אנוש ופיתוח ארגוני' && groupData.Department==='מנהל עסקים'){
        //     this.coursesFromFirebase('Economics and Business Administration','Business Administration','Human resource management');
        // }
        // else if(groupData.Major==='כללי' && groupData.Department==='מנהל עסקים'){
        //     this.coursesFromFirebase('Economics and Business Administration','Business Administration','General');
        // }
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
            <div>
            <SelectInput inputList={this.state.coursesList} InputTitle='בחרו קורס' ChangeSelectInput={this.changeProjectType} />
                <Button onClick={()=>this.props.history.push('/'+this.state.template)}>
                    {`אישור`}
                </Button>
            </div>
        )
    }
}