import React, { useEffect } from 'react';
import LoginScreen from './Components/LoginScreen';
import {getGeneralConfigsTemplates} from './functions/functions'
import { withRouter,Route } from "react-router-dom";
import CourseChoice from './Components/CourseChoice';
//templates:
import St1 from "./Components/St1";
import St2 from './Components/St2';
import St3 from './Components/St3';
import St4 from './Components/St4';
import St5 from './Components/St5';
import St6 from './Components/St6';
import St7 from './Components/St7';
import St8 from './Components/St8';

//css:
import './App.css'
//test and prod enviorments
import firebase from 'firebase';
import 'firebase/storage';
import { FirebaseProdConfig } from './Constants/APIkeys';
//import { FirebaseTestConfig } from './Constants/APIkeys';
firebase.initializeApp(FirebaseProdConfig);
//firebase.initializeApp(FirebaseTestConfig);
//firebase storage config
export const storage =  firebase.storage();

const App = ()=>{
  useEffect(() => {
    getGeneralConfigsTemplates();
  }, [])
  return(
    <div className="App">
      <Route path='/' exact component={LoginScreen}/>
      <Route path='/CourseChoice' component={CourseChoice}/>
      <Route path='/st1'  component={St1}/>
      <Route path='/st2'  component={St2}/>
      <Route path='/st3' component={St3}/>
      <Route path='/st4' component={St4}/>
      <Route path='/st5' component={St5}/>
      <Route path='/st6' component={St6}/>
      <Route path='/st7' component={St7}/>
      <Route path='/st8' component={St8}/>
    </div>
  )
}

export default withRouter(App);
