import React, { Component } from 'react';
import './App.css';
import LoginPage from "./Components/LoginScreen";
import St1 from "./Components/St1";
import St2 from './Components/St2';
import St3 from './Components/St3';
import St4 from './Components/St4';

import { withRouter,Route } from "react-router-dom";
import CourseChoice from './Components/CourseChoice';
//test and prod enviorments
import firebase from 'firebase';
import 'firebase/storage';

import { FirebaseProdConfig } from './Constants/APIkeys';
//import { FirebaseTestConfig } from './Constants/APIkeys';

firebase.initializeApp(FirebaseProdConfig);
//firebase.initializeApp(FirebaseTestConfig);
export const storage =  firebase.storage();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/' exact component={LoginPage}/>
        <Route path='/CourseChoice'  component={CourseChoice}/>
        <Route path='/st1'  component={St1}/>
        <Route path='/st2'  component={St2}/>
        <Route path='/st3' component={St3}/>
        <Route path='/st4' component={St4}/>
      </div>
    );
  }
}

export default withRouter(App);
