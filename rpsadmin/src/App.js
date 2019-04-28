import React, { Component } from 'react';
import './App.css';
import LoginPage from "./Components/LoginScreen";
import ISProjectTemplate from "./Components/ISProjectForm";
import { withRouter,Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/' exact component={LoginPage}/>
        <Route path='/ISproject'  component={ISProjectTemplate}/>
      </div>
    );
  }
}

export default withRouter(App);
