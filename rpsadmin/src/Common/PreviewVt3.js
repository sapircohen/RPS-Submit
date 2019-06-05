import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import ReactPlayer from 'react-player'
import ImagesCarousel from './Carousel';
import Badge from 'react-bootstrap/Badge';
import randomColor from 'randomcolor'

//CSS:
import '../css/previewStyle.css';

//ICONS:
import { FaGoogle,FaAppleAlt,FaCameraRetro } from "react-icons/fa";
import {FiLayers} from 'react-icons/fi';
import { GiClapperboard,GiThreeFriends ,GiCrosshair} from "react-icons/gi";
import {GoBook,GoTag} from 'react-icons/go';
import {IoIosLaptop,IoIosDesktop} from 'react-icons/io';

class PreviewVt3 extends React.Component{
    state={
        isIS:false,
        isBS:false,
    }
    componentDidUpdate(){
        console.log(this.props.projectDetails)
    }
    OnSave = (e)=>{
        this.props.SaveData(e);
    }
    render(){  
        return (
            <Modal style={{backgroundColor:'#C1DEE6',fontFamily:'Calibri'}} onHide={this.props.close} show={this.props.openPreview} size="xl" aria-labelledby="contained-modal-title-vcenter">
              <Modal.Header style={{margin:'0px auto'}} closeButton>
                <Modal.Title>
                    {
                        this.props.projectDetails.ProjectName?
                        this.props.projectDetails.ProjectName:
                        'שם הפרויקט'
                    }
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                    {/* project logo */}
                    <Row style={{justifyContent:'space-between',textAlign:'center',marginTop:'4%'}} className="show-grid">
                        {
                            this.props.projectDetails.ProjectLogo &&
                            (
                                <Col xs={12}>
                                    <Image style={{maxHeight:'300px'}} src={this.props.projectDetails.ProjectLogo} />
                                </Col>
                            )
                        }
                    </Row>
                    {/* project advisors */}
                    <Row className="show-grid"  style={{marginTop:'3%'}}>
                        <Col xs={12}>
                            <Row dir="rtl">
                                <Col sm="1" style={{textAlign:'right'}}>
                                    {
                                        this.props.projectDetails.advisor&&
                                        (
                                            this.props.projectDetails.advisor.length===1?
                                            <p>מנחה:</p>
                                            :
                                            <p>מנחים:</p>
                                        )
                                    }
                                </Col>
                                <Col style={{textAlign:'right'}} sm="3">{
                                    this.props.projectDetails.advisor&&
                                    (
                                    this.props.projectDetails.advisor[0]!=='בחר'&&
                                    (
                                        this.props.projectDetails.advisor.map((a,key)=>
                                            (key===this.props.projectDetails.advisor.length-1)
                                            ?`${a} `:`${a}, `
                                        ) 
                                    )
                                    )
                                }
                                </Col>
                                <Col sm="6"></Col>
                            </Row>
                        </Col>
                    </Row>
                    
                    {/* project course and topic */}
                    {
                        (this.props.projectDetails.ProjectCourse &&this.props.projectDetails.ProjectTopic) &&
                        <Row dir="rtl" style={{marginTop:'1%'}}>
                            <Col style={{textAlign:'right'}} sm="5">קורס: {this.props.projectDetails.ProjectCourse}</Col>
                            <Col style={{textAlign:'right'}} sm="5">נושא: {this.props.projectDetails.ProjectTopic}</Col>
                            <Col sm="2"></Col>
                        </Row>
                    }

                    {/* project full description */}
                    <Row  style={{marginTop:'3%'}} className="show-grid Box">
                                <Col style={{textAlign:'center'}} sm="12">
                                <h3>תיאור הפרויקט<GoBook size={50}/></h3>
                                </Col>
                        <Col xs={12} style={{marginTop:'1%'}}>
                            <Row dir="rtl">
                                <Col sm="2"></Col>
                                <Col sm="8">
                                <p style={{overflowWrap: 'break-word',textAlign:'right'}}>{this.props.projectDetails.PDescription}</p>
                                </Col>
                                <Col sm="2"></Col>
                            </Row>
                        </Col>
                    </Row>
                    
                    {/* project goal */}
                    <Row  style={{marginTop:'3%'}} className="show-grid Box">
                                <Col style={{textAlign:'center'}} sm="12">
                                <h3>מטרת הפרויקט<GoBook size={50}/></h3>
                                </Col>
                        <Col xs={12} style={{marginTop:'1%'}}>
                            <Row dir="rtl">
                                <Col sm="2"></Col>
                                <Col sm="8">
                                <p style={{overflowWrap: 'break-word',textAlign:'right'}}>{this.props.projectDetails.ProjectGoal}</p>
                                </Col>
                                <Col sm="2"></Col>
                            </Row>
                        </Col>
                    </Row>
                    
                    {/* project need */}
                    <Row  style={{marginTop:'3%'}} className="show-grid Box">
                        <Col style={{textAlign:'center'}} sm="12">
                        <h3>הבעיה/צורך<GoBook size={50}/></h3>
                        </Col>
                        <Col xs={12} style={{marginTop:'1%'}}>
                            <Row dir="rtl">
                                <Col sm="2"></Col>
                                <Col sm="8">
                                <p style={{overflowWrap: 'break-word',textAlign:'right'}}>{this.props.projectDetails.ProjectNeed}</p>
                                </Col>
                                <Col sm="2"></Col>
                            </Row>
                        </Col>
                    </Row>
                    
                    {/* project findings */}
                    <Row  style={{marginTop:'3%'}} className="show-grid Box">
                        <Col style={{textAlign:'center'}} sm="12">
                        <h3>הבעיה/צורך<GoBook size={50}/></h3>
                        </Col>
                        <Col xs={12} style={{marginTop:'1%'}}>
                            <Row dir="rtl">
                                <Col sm="2"></Col>
                                <Col sm="8">
                                <p style={{overflowWrap: 'break-word',textAlign:'right'}}>{this.props.projectDetails.projectFindings}</p>
                                </Col>
                                <Col sm="2"></Col>
                            </Row>
                        </Col>
                    </Row>

                    {/* project solution */}
                    <Row  style={{marginTop:'3%'}} className="show-grid Box">
                        <Col style={{textAlign:'center'}} sm="12">
                        <h3>פתרון<GoBook size={50}/></h3>
                        </Col>
                        <Col xs={12} style={{marginTop:'1%'}}>
                            <Row dir="rtl">
                                <Col sm="2"></Col>
                                <Col sm="8">
                                <p style={{overflowWrap: 'break-word',textAlign:'right'}}>{this.props.projectDetails.projectSolution}</p>
                                </Col>
                                <Col sm="2"></Col>
                            </Row>
                        </Col>
                    </Row>
                    
                    {/* project solution */}
                    <Row  style={{marginTop:'3%'}} className="show-grid Box">
                        <Col style={{textAlign:'center'}} sm="12">
                        <h3>מסקנות<GoBook size={50}/></h3>
                        </Col>
                        <Col xs={12} style={{marginTop:'1%'}}>
                            <Row dir="rtl">
                                <Col sm="2"></Col>
                                <Col sm="8">
                                <p style={{overflowWrap: 'break-word',textAlign:'right'}}>{this.props.projectDetails.ProjectConclusion}</p>
                                </Col>
                                <Col sm="2"></Col>
                            </Row>
                        </Col>
                    </Row>
                    

                    {/* students details */}
                    <div style={{marginTop:'4%'}} className="Box">
                        <Row dir="rtl" className="show-grid">
                            <Col style={{textAlign:'center'}} dir="rtl" sm="12">
                                <h3><GiThreeFriends size={50}/>חברי הצוות</h3>
                            </Col>
                            <Col sm="10"></Col>
                        </Row>
                        <Row style={{justifyContent:'space-between',alignContent:'center',marginTop:'2%'}} className="show-grid">
                            {
                                this.props.projectDetails.Students &&
                                this.props.projectDetails.Students.map((student)=>
                                    <Col style={{textAlign:'center'}} xs={12/this.props.projectDetails.Students.length}>
                                        <Row style={{justifyContent:'center'}}>
                                            <a href={`mailto:${student.Email}`} dir="rtl" style={{textAlign:'center',fontSize:'large'}}>{student.Name}</a>
                                        </Row>
                                        <Row style={{justifyContent:'center'}}>
                                            <Image style={{height:130,textAlign:'center'}} roundedCircle fluid src={student.Picture} />
                                        </Row>
                                        
                                    </Col>
                                )
                            }
                        </Row>
                    </div>
                    {/* project video */}
                    {
                        this.props.projectDetails.MovieLink &&
                        <Col className="Box" style={{marginTop:'6%',textAlign:'center'}}>
                            <Col style={{textAlign:'center'}} sm="12">
                                <h3>סרטון הפרויקט<GiClapperboard size={50}/></h3>
                                
                            </Col>
                            <Row style={{marginTop:'2%',textAlign:'center'}} dir="rtl" className="show-grid">
                                <Col sm="2"></Col>
                                <Col sm="8" style={{textAlign:'center'}}>
                                
                                <ReactPlayer controls loop url={this.props.projectDetails.MovieLink} playing />
                                </Col>
                                <Col sm="2"></Col>
                            </Row>
                        </Col>
                    }
                    {/* project PDF */}
                    {
                        this.props.projectDetails.ProjectPDF &&
                        <Row style={{marginTop:'5%',textAlign:'center'}}>
                            <Col sm="4"></Col>
                            <Col style={{textAlign:'center'}} sm="4">
                                <Button dir="rtl" variant="info" href={this.props.projectDetails.ProjectPDF}>
                                    PDF להורדה
                                </Button>
                            </Col>
                            <Col sm="4"></Col>
                        </Row>
                    }
                </Container>
              </Modal.Body>  
              <Modal.Footer style={{justifyContent:'space-between'}}>
                <Col sm='3'></Col>
                <Col sm='3' style={{textAlign:'center'}}>
                    <Button onClick={this.OnSave} variant="success">שמירה</Button>
                </Col>
                <Col sm='3' style={{textAlign:'center'}}>
                    <Button onClick={this.props.close} variant="warning">סגירה</Button>
                </Col>
                <Col sm='3'></Col>
              </Modal.Footer>
            </Modal>
          );
    }
}

export default PreviewVt3;
