import React, { Component } from 'react';
import './App.css';
import LoginPage from "./Components/LoginScreen";
import ISProjectTemplate from "./Components/ISProjectForm";
import { withRouter,Route } from "react-router-dom";
import ImageCrop from './Common/ImageCrop'

import firebase from 'firebase';
import { FirebaseProdConfig } from './Constants/APIkeys';
import { FirebaseTestConfig } from './Constants/APIkeys';

//firebase.initializeApp(FirebaseProdConfig);
firebase.initializeApp(FirebaseTestConfig);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/' exact component={LoginPage}/>
        <Route path='/ISproject'  component={ISProjectTemplate}/>
        {/* <Route path='/Crop'  component={ImageCrop}/> */}
      </div>
    );
  }
}

export default withRouter(App);
