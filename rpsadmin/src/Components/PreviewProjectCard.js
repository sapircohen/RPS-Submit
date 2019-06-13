import React from 'react';
import {Modal,Button,Container,Row,Col,Image,Badge} from 'react-bootstrap';
import VideoPlayer from '../Common/VideoPlayer';
import ImagesCarousel from '../Common/Carousel';
import randomColor from 'randomcolor'
import LinkButton from '../Common/LinkToWeb';
import PreviewParagraph from '../Common/PreviewParagraph';
import RichTextPreviewParagraph from '../Common/RichTextPreviewP';
//CSS:
import '../css/previewStyle.css';
//ICONS:
import { FaGoogle,FaAppleAlt,FaCameraRetro } from "react-icons/fa";
import {FiLayers,FiPaperclip} from 'react-icons/fi';
import { GiClapperboard,GiThreeFriends ,GiCrosshair} from "react-icons/gi";
import {GoBook,GoTag,GoMarkGithub} from 'react-icons/go';
import {IoIosLaptop,IoIosDesktop} from 'react-icons/io';

export default class PreviewCard extends React.Component{
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
                        this.props.projectDetails.ProjectName?this.props.projectDetails.ProjectName:'שם הפרויקט'
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
                    {/* project Stalkholders and users (IS PROJECT)*/}
                    {
                        (this.props.projectDetails.CStackholders && this.props.projectDetails.CustCustomers) &&
                        <Row dir="rtl" style={{marginTop:'1%'}}>
                            <Col style={{textAlign:'right'}} sm="5">בעלי עניין: {this.props.projectDetails.CStackholders}</Col>
                            <Col style={{textAlign:'right'}} sm="5">משתמשי המערכת: {this.props.projectDetails.CustCustomers}</Col>
                            <Col sm="3"></Col>
                        </Row>
                    }
                    {/* project Customer Name (IS PROJECT)*/}
                    {
                        (this.props.projectDetails.CustomerName) &&
                        <Row dir="rtl" style={{marginTop:'1%'}}>
                            <Col sm="3"></Col>
                            <Col style={{textAlign:'center',fontSize:'24px'}} sm="6">לקוח: {this.props.projectDetails.CustomerName}</Col>
                            <Col sm="3"></Col>
                        </Row>
                    }
                    {/* project Customer logo (IS PROJECT)*/}
                    {
                        this.props.projectDetails.CustomerLogo &&
                        (
                        <Row style={{justifyContent:'space-between',textAlign:'center',marginTop:'4%'}} className="show-grid">
                            <Col xs={12}>
                                <Image style={{maxHeight:'300px'}} src={this.props.projectDetails.CustomerLogo} />
                            </Col>
                        </Row>
                        )
                    }
                    {/* project full description */}
                    <RichTextPreviewParagraph Paragraph={this.props.projectDetails.PDescription} Title="תיאור הפרויקט" Icon={GoBook} />
                    
                    {/* project goals (for IS project) */}
                    {
                        this.props.projectDetails.Goals &&
                        <Row style={{overflowWrap: 'break-word',marginTop:'3%',textAlign:'center'}} dir="rtl" className="show-grid Box">
                            <Col style={{textAlign:'center'}} sm="12">
                                <h3><GiCrosshair size={50}/>מטרות המערכת</h3>
                            </Col>
                            {
                                this.props.projectDetails.Goals.map((goal,key)=>
                                    <Col dir="rtl" sm="12" style={{textAlign:'center'}}>
                                        <Row style={{marginTop:'1%'}}>
                                            <Col sm="1"></Col>
                                            <Col style={{textAlign:'right'}} sm="5">
                                                תיאור המטרה:{goal.GoalDescription}
                                            </Col>
                                            <Col style={{textAlign:'right'}} sm="5">
                                                סטטוס המטרה: {goal.GoalStatus}
                                            </Col>
                                            <Col sm="1"></Col>
                                        </Row>
                                    </Col>
                                    
                                )
                            }
                            <Col style={{textAlign:'right'}} sm="2"></Col>
                        </Row>
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
                                <h3>סרטון הפרויקט<GiClapperboard size={45}/></h3>
                            </Col>
                            <Row style={{marginTop:'2%',textAlign:'center'}} dir="rtl" className="show-grid">
                                <Col sm="2"></Col>
                                <Col sm="8" style={{padding:'50px'}}>
                                    <VideoPlayer MovieLink={this.props.projectDetails.MovieLink} />
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
                                <Button onClick={()=>window.open(this.props.projectDetails.ProjectPDF,"_blank")} formTarget="blank" dir="rtl" variant="info">
                                    <FiPaperclip/>  PDF להורדה
                                </Button>
                            </Col>
                            <Col sm="4"></Col>
                        </Row>
                    }
                    {/* project modules (for IS project) */}
                    {
                        this.props.projectDetails.Module &&
                        <Row style={{overflowWrap: 'break-word',marginTop:'5%',textAlign:'center'}} dir="rtl" className="show-grid Box">
                            <Col style={{textAlign:'center'}} sm="12">
                                <h3><FiLayers size={50}/> מודולי המערכת </h3>
                            </Col>
                            {
                                this.props.projectDetails.Module.map((module,key)=>
                                    <Col dir="rtl" sm="12" style={{textAlign:'center'}}>
                                        <Row style={{marginTop:'2%'}}>
                                            <Col sm="2">
                                            </Col>
                                            <Col style={{textAlign:'right'}} sm="2">
                                                {module.ModuleName}:
                                            </Col>
                                            <Col style={{textAlign:'right'}} sm="6">
                                                {module.ModuleDescription}
                                            </Col>
                                            <Col sm="2">
                                            </Col>
                                        </Row>
                                    </Col>
                                    
                                )
                            }
                            <Col style={{textAlign:'right'}} sm="2"></Col>
                        </Row>
                    }
                    {/* project screenshots (for IS project) */}
                    {
                        this.props.projectDetails.ScreenShots &&
                        <Col className="Box"  style={{marginTop:'4%',textAlign:'center'}}>
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
                        </Col>
                    }
                    {/* project techs (for IS project)   */}
                    {
                        this.props.projectDetails.Technologies &&
                        <Row style={{marginTop:'4%',textAlign:'center'}} dir="rtl" className="show-grid">
                            <Col style={{textAlign:'right'}} sm="2">
                            <p style={{fontSize:'20px'}}><IoIosLaptop size={40}/>טכנולוגיות:</p>
                            </Col>
                            <Col sm="10" style={{textAlign:'right'}}>
                                {
                                    this.props.projectDetails.Technologies.map((tech,key)=>
                                        <Badge size={20} marginWidth={2} style={{backgroundColor:randomColor({
                                            luminosity: 'light',
                                            hue: 'blue'
                                         }),fontSize:20,marginLeft:5}}>{tech}</Badge>
                                    )
                                }
                            </Col>
                        </Row>
                    }
                    {/* project hashtags (for IS project)   */}
                    {
                        this.props.projectDetails.HashTags &&
                        <Row style={{marginTop:'4%',textAlign:'center'}} dir="rtl" className="show-grid">
                            <Col style={{textAlign:'right',fontSize:'30'}} sm="2">
                                <p style={{fontSize:'20px'}}><GoTag size={40}/>האשטגים:</p>
                            </Col>
                            <Col sm="10" style={{textAlign:'right'}}>
                                {
                                    this.props.projectDetails.HashTags.map((tag,key)=>
                                        <Badge size={20} marginWidth={2} style={{backgroundColor:randomColor({
                                            luminosity: 'light',
                                            hue: 'blue'
                                         }),fontSize:20,marginLeft:5}}>{tag}</Badge>
                                    )
                                }
                            </Col>
                        </Row>
                    }
                    {/* project links (for IS project) */}
                    <Row dir="rtl" style={{justifyContent:'space-between',marginTop:'4%'}}>
                        {
                            this.props.projectDetails.AppStore&&
                            <LinkButton href={this.props.projectDetails.AppStore} Icon={FaAppleAlt} Title={`  Appstore`} />
                        }
                        {
                            this.props.projectDetails.ProjectSite&&
                            <LinkButton color='#A9C1C9' href={this.props.projectDetails.ProjectSite} Icon={IoIosDesktop} Title={`  לאתר הפרויקט`} />
                        }
                        {
                            this.props.projectDetails.Github&&
                            <LinkButton color='black' href={this.props.projectDetails.Github} Icon={GoMarkGithub} Title={`  Github`} />
                        }
                        {
                            this.props.projectDetails.GooglePlay&&
                            <LinkButton href={this.props.projectDetails.GooglePlay} Icon={FaGoogle} Title={`  GooglePlay`} />
                        }
                        </Row>
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

