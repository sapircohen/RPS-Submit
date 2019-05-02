import React, { Component } from 'react';
import './App.css';
import LoginPage from "./Components/LoginScreen";
import ISProjectTemplate from "./Components/ISProjectForm";
import { withRouter,Route } from "react-router-dom";

//test and prod enviorments
import firebase from 'firebase';
import 'firebase/storage';
import StudentsDetails from './Common/StudentsDetails';

import { FirebaseProdConfig } from './Constants/APIkeys';
import { FirebaseTestConfig } from './Constants/APIkeys';

//firebase.initializeApp(FirebaseProdConfig);
firebase.initializeApp(FirebaseTestConfig);
export const storage =  firebase.storage();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/' exact component={LoginPage}/>
        <Route path='/ISproject'  component={ISProjectTemplate}/>
        <Route path='/Students'  component={StudentsDetails}/>
      </div>
    );
  }
}

export default withRouter(App);
