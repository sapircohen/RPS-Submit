import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import ImagesCarousel from '../Common/Carousel';
import VideoPlayer from '../Common/VideoPlayer';
import PreviewParagraph from '../Common/PreviewParagraph';
import RichTextPreviewParagraph from '../Common/RichTextPreviewP';
 
//CSS:
import '../css/previewStyle.css';
//ICONS:
import { FaCameraRetro } from "react-icons/fa";
import {FiFlag,FiPaperclip,FiEdit2,FiAward,FiYoutube} from 'react-icons/fi';
import { GiThreeFriends ,GiCrosshair} from "react-icons/gi";
import {GoBook} from 'react-icons/go';

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
            <Modal style={{backgroundColor:'transparent',fontFamily:'Calibri'}} onHide={this.props.close} show={this.props.openPreview} size="xl" aria-labelledby="contained-modal-title-vcenter">
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
                                        this.props.projectDetails.Advisor&&
                                        (
                                            this.props.projectDetails.Advisor.length===1?
                                            <p>מנחה:</p>
                                            :
                                            <p>מנחים:</p>
                                        )
                                    }
                                </Col>
                                <Col style={{textAlign:'right'}} sm="3">{
                                    this.props.projectDetails.Advisor&&
                                    (
                                    this.props.projectDetails.Advisor[0]!=='בחר'&&
                                    (
                                        this.props.projectDetails.Advisor.map((a,key)=>
                                            (key===this.props.projectDetails.Advisor.length-1)
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
                        (this.props.projectDetails.ProjectCourse && this.props.projectDetails.ProjectTopic) &&
                        <Row dir="rtl" style={{marginTop:'1%'}}>
                            <Col style={{textAlign:'right'}} sm="5">קורס: {this.props.projectDetails.ProjectCourse}</Col>
                            <Col style={{textAlign:'right'}} sm="5">נושא: {this.props.projectDetails.ProjectTopic}</Col>
                            <Col sm="2"></Col>
                        </Row>
                    }

                    {/* project full description */}
                    <RichTextPreviewParagraph Paragraph={this.props.projectDetails.PDescription} Title="תיאור הפרויקט" Icon={GoBook} />                    
                    {/* project goal */}
                    {
                    this.props.projectDetails.ProjectGoal &&
                    <RichTextPreviewParagraph Paragraph={this.props.projectDetails.ProjectGoal} Title="מטרת הפרויקט" Icon={GiCrosshair} />
                    }
                    
                    {/* project need */}
                    {
                    this.props.projectDetails.ProjectNeed &&
                    <RichTextPreviewParagraph Paragraph={this.props.projectDetails.ProjectNeed} Title="הבעיה/צורך" Icon={FiFlag} />
                    }
                    
                    {/* project findings */}
                    {
                    this.props.projectDetails.projectFindings &&
                    <RichTextPreviewParagraph Paragraph={this.props.projectDetails.projectFindings} Title="ממצאים" Icon={FiEdit2} />
                    }
                    {/* project solution */}
                    {
                    this.props.projectDetails.projectSolution &&
                    <RichTextPreviewParagraph Paragraph={this.props.projectDetails.projectSolution} Title="פתרון" Icon={FiAward} />
                    }
                    {/* project Conclusion */}
                    {
                    this.props.projectDetails.ProjectConclusion &&
                    <RichTextPreviewParagraph Paragraph={this.props.projectDetails.ProjectConclusion} Title="מסקנות" Icon={GoBook} />
                    }
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
                                this.props.projectDetails.Students.map((student,key)=>
                                    <Col key={key} style={{textAlign:'center'}} xs={12/this.props.projectDetails.Students.length}>
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
                                <h3>סרטון הפרויקט<FiYoutube size={50}/></h3>
                            </Col>
                            <Row style={{marginTop:'2%',textAlign:'center'}} dir="rtl" className="show-grid">
                                <Col sm="2"></Col>
                                <Col sm="8" style={{textAlign:'center'}}>
                                    <VideoPlayer MovieLink={this.props.projectDetails.MovieLink} />
                                </Col>
                                <Col sm="2"></Col>
                            </Row>
                        </Col>
                    }
                    {/* project screenshots */}
                    {
                        (this.props.projectDetails.ScreenShots &&this.props.projectDetails.ScreenShots.length!==0)&&
                        (<Col className="Box"  style={{marginTop:'4%',textAlign:'center'}}>
                            <Col style={{textAlign:'center',fontFamily:'Calibri'}} sm="12">
                                <h3>תמונות מסך <FaCameraRetro size={50}/></h3>
                            </Col>
                            <Row style={{marginTop:'4%',textAlign:'center'}} dir="rtl" className="show-grid">
                                <Col style={{textAlign:'right'}} sm="2"></Col>
                                <Col sm="8" style={{textAlign:'center'}}>
                                    <ImagesCarousel screenshotsNames={this.props.projectDetails.ScreenShotsNames} images={this.props.projectDetails.ScreenShots}/>
                                </Col>
                                <Col style={{textAlign:'right'}} sm="2"></Col>
                            </Row>
                        </Col>)
                    }
                    {/* project PDF */}
                    {
                        this.props.projectDetails.ProjectPDF &&
                        <Row style={{marginTop:'5%',textAlign:'center'}}>
                            <Col sm="4"></Col>
                            <Col style={{textAlign:'center'}} sm="4">
                                <Button onClick={()=>window.open(this.props.projectDetails.ProjectPDF,"_blank")} dir="rtl" variant="info">
                                    <FiPaperclip/>  PDF/WORD להורדה
                                </Button>
                            </Col>
                            <Col sm="4"></Col>
                        </Row>
                    }
                </Container>
              </Modal.Body>  
              <Modal.Footer style={{justifyContent:'space-between'}}>
                <Col sm='3'></Col>
                {/* <Col sm='3' style={{textAlign:'center'}}>
                    <Button onClick={this.OnSave} variant="success">שמירה</Button>
                </Col> */}
                <Col sm='6' style={{textAlign:'center'}}>
                    <Button onClick={this.props.close} variant="warning">סגירה</Button>
                </Col>
                <Col sm='3'></Col>
              </Modal.Footer>
            </Modal>
          );
    }
}

export default PreviewVt3;
