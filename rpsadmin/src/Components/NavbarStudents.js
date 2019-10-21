import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {withRouter} from 'react-router-dom';
import {FaUserTie} from 'react-icons/fa';
//import {FiFacebook,FiLinkedin,FiInstagram,FiYoutube,FiEdit} from 'react-icons/fi';

class NavbarProj extends React.Component{
    Logout = ()=>{
        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push("/");
        window.location.reload();
    }
    render(){
        return(
            <Navbar style={{backgroundColor:'#BFDCD8',elevation:20}}>
                <Navbar.Brand href="#home">
                    <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnrOkHS6TvYS5lXbJIeB-MxYIcUOYQ4Jzfu456ztCKSfIpzle2"
                    width="180"
                    height="40"
                    className="d-inline-block align-top"
                    alt="We Learn"
                    />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="ml-auto">
                        <Nav.Link style={{fontSize:17}} onClick={this.Logout} >התנתקות</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(NavbarProj);
