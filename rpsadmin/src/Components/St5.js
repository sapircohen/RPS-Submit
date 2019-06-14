//electrical engeeniring
import React from 'react';
import firebase from 'firebase';

//get constants from localstorage
const course = JSON.parse(localStorage.getItem('course'));
const projectKey = JSON.parse(localStorage.getItem('projectKey'));
const groupData = JSON.parse(localStorage.getItem('groupData'));

const sectionNames = {
    projectName:"שם הפרויקט",
    projectSmallDesc:"תיאור קצר",
    
}

export default class St5 extends React.Component{
    state={
        isSaved:false,
        imageAspect:4/3,
        showPreview:false,
    }
    componentDidMount(){

    }
    GetData=()=>{
        const ref = firebase.database().ref('RuppinProjects').child(projectKey);
        let dataForGroup ={};
        ref.once("value", (snapshot)=> {
            dataForGroup=snapshot.val();
        })
        .then(()=>{
            
        })
    }
    render(){
        return(
            ''
        )
    }
}
