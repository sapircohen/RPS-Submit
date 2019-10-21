import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {FiFacebook,FiLinkedin,FiInstagram,FiYoutube} from 'react-icons/fi';
import {home} from '../assests/image'
//css
import '../css/previewStyle.css';
const Header = (props)=>{
    return(
        <Navbar dir="rtl" style={{paddingRight:'0px',backgroundColor:'transparent',textAlign:'right',justifyContent:'space-between'}} variant="dark">
            <Navbar.Brand dir="rtl" href="#/">
                <img
                    style={{height:40,width:'auto'}}
                    src={home}
                    className="d-inline-block align-top"
                    alt="Ruppin logo"
                />
                <Navbar.Brand className="displayStaff" dir="rtl">
                    <Nav.Link style={{fontSize:17}} onClick={()=>window.open("http://proj.ruppin.ac.il/gallery/#/" ,"_blank")} >תוצרי הסטודנטים</Nav.Link>
                </Navbar.Brand>       
            </Navbar.Brand>
             
            <Navbar.Brand className="displayStaff" dir="rtl" href="#/">
            </Navbar.Brand>
            <Navbar.Brand dir="rtl">
                <a alt="Ruppin facebook url" href="https://www.facebook.com/Ruppin.Academic.Center" target="_blank" rel="noopener noreferrer"><FiFacebook style={{marginRight:'5px'}} size={30} color="#3B5897"/></a>
                <a alt="Ruppin linkedin url" href="https://www.linkedin.com/school/ruppin-academic-center/" target="_blank" rel="noopener noreferrer"><FiLinkedin style={{marginRight:'2px'}} size={30} color="#017FB1"/></a>
                <a alt="Ruppin instagrem url" href="https://www.instagram.com/ruppin/" target="_blank" rel="noopener noreferrer"><FiInstagram style={{marginRight:'7px'}} size={30} color="pink"/></a>
                <a alt="Ruppin youtube url" href="https://www.youtube.com/user/RuppinTube" target="_blank" rel="noopener noreferrer"><FiYoutube style={{marginRight:'7px'}} size={30} color="red"/></a>
            </Navbar.Brand>
        </Navbar>
    )
}

export default Header;