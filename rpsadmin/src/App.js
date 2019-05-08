import React, { Component } from 'react';
import './App.css';
import LoginPage from "./Components/LoginScreen";
import ISProjectTemplate from "./Components/ISProjectForm";
import BSProjectTemplate from './Components/BSProjectForm';
import { withRouter,Route } from "react-router-dom";

//test and prod enviorments
import firebase from 'firebase';
import 'firebase/storage';

import { FirebaseProdConfig } from './Constants/APIkeys';
import { FirebaseTestConfig } from './Constants/APIkeys';

import UserGeneratedPills from './Common/Tag'

//firebase.initializeApp(FirebaseProdConfig);
firebase.initializeApp(FirebaseTestConfig);
export const storage =  firebase.storage();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/' exact component={LoginPage}/>
        <Route path='/ISproject'  component={ISProjectTemplate}/>
        <Route path='/BSproject'  component={BSProjectTemplate}/>
      </div>
    );
  }
}

export default withRouter(App);
