import React from 'react';
import {Modal,Button,Container,Row,Col,Card,Accordion} from 'react-bootstrap';
import VideoPlayer from '../Common/VideoPlayer';
import LinkButton from '../Common/LinkToWeb';
import RichTextPreviewParagraph from '../Common/RichTextPreviewP';
import PreviewParagraph from '../Common/PreviewParagraph';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Swiper from 'react-id-swiper';
import Iframe from 'react-iframe'

// import 'react-id-swiper/lib/styles/css/swiper.css';
//CSS:
import '../css/previewStyle.css';
//ICONS:
import { FaGoogle,FaAppleAlt,FaCameraRetro,FaBuffer } from "react-icons/fa";
import {FiPaperclip,FiFlag,FiEdit2,FiAward,FiStar} from 'react-icons/fi';
import {GiCrosshair} from "react-icons/gi";
import {GoBook,GoTag,GoMarkGithub} from 'react-icons/go';
import {MdOndemandVideo,MdExtension} from 'react-icons/md';
import {IoIosLaptop,IoIosDesktop,IoIosRocket,IoIosContacts,IoMdSkipForward} from 'react-icons/io';
import { Divider } from '@material-ui/core';
import { Card as Cardse, Icon } from 'semantic-ui-react';


import '../css/previewStyle.css';
const params = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
    pagination: {
      el: '.swiper-pagination'
}}
export default class ModalExample1 extends React.Component{
    componentDidMount(){
        console.log(this.props.projectDetails)
    }
    render(){  
        return (
            <Modal style={{backgroundColor:'transparent',fontFamily:'Calibri'}} onHide={this.props.close} show={this.props.openPreview} size="xl" aria-labelledby="contained-modal-title-vcenter">
              <Modal.Header  style={{margin:'0px auto'}} closeButton>
                <Modal.Title style={{textAlign:'right',fontFamily:'Rubik, sans-serif'}}>
                    {
                        this.props.projectDetails.ProjectName?this.props.projectDetails.ProjectName:'שם הפרויקט'
                    }
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                    {/* students details */}
                    <div style={{marginTop:'2%'}} className="Box">
                        <Row style={{justifyContent:'space-between',alignContent:'center',marginTop:'2%'}} className="show-grid">
                            {
                                this.props.projectDetails.Students &&
                                this.props.projectDetails.Students.map((student,key)=>
                                    <Col key={key} style={{textAlign:'center',padding:'2% 3% 2% 3%'}}  sm={12/this.props.projectDetails.Students.length}>
                                        <Cardse key={key} className="CardStudent">
                                            <img
                                                src={student.Picture?student.Picture:'https://img.freepik.com/free-vector/happy-hand-drawn-students-jumping_23-2147915089.jpg?size=338&ext=jpg'}
                                                alt="student"
                                                className="StudentPic2"
                                            />
                                            <Cardse.Content>
                                            <Cardse.Header style={{fontFamily:'Rubik, sans-serif',fontSize:'100%'}}>{student.Name}</Cardse.Header>
                                            </Cardse.Content>
                                            <Cardse.Content extra>
                                            <a href={`mailto:${student.Email}`}>
                                                <Icon name='mail' />
                                                {student.Email}
                                            </a>
                                            </Cardse.Content>
                                        </Cardse>
                                    </Col>
                                )
                            }
                        </Row>
                    </div>
                    <Divider style={{margin:'0px auto',marginTop:'6px',width:'80%',color:'#444'}}/>
                    {/* project logo and advisors */}
                    <Row style={{justifyContent:'space-between',textAlign:'center',marginTop:'4%'}} className="show-grid">
                        <Col>
                            { this.props.projectDetails.ProjectLogo ?
                                <Col>
                                    <img alt='project logo' className="ProjectLogo" style={{maxWidth:'200px',maxHeight:'300px',height:'auto',width:'auto'}} src={this.props.projectDetails.ProjectLogo} />
                                </Col>
                                :
                                <Col >
                                    <img alt='project logo' className="ProjectLogo" style={{maxWidth:'200px',maxHeight:'300px',height:'auto',width:'auto'}} src={'https://images.pexels.com/photos/1089842/pexels-photo-1089842.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'} />
                                </Col>
                            }
                        </Col>
                        <Col>
                            <Row dir="rtl">
                                {this.props.projectDetails.Advisor&&
                                <Col>
                                    <Card border="dark">
                                        <Card.Header>מנחים</Card.Header>
                                        <Card.Body>
                                        <Card.Text>     
                                            {Array.isArray(this.props.projectDetails.Advisor)?
                                                (
                                                    this.props.projectDetails.Advisor.map((a,key)=>
                                                        (key===this.props.projectDetails.Advisor.length-1)
                                                        ?<span key={key}>{a}</span>:<span key={key}>{a},</span>
                                                    ) 
                                                )
                                                :
                                                (
                                                    this.props.projectDetails.Advisor
                                                )
                                            }
                                        </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>}
                                {this.props.projectDetails.CustomerName&&
                                <Col>
                                    <Card border="dark">
                                        <Card.Header>לקוח</Card.Header>
                                        <Card.Body>
                                        <Card.Text>
                                            {this.props.projectDetails.CustomerName}
                                        </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>}
                            </Row>
                            {/* project course and topic */}
                            {
                                (this.props.projectDetails.ProjectCourse && this.props.projectDetails.ProjectTopic) &&
                                <Row dir="rtl" style={{marginTop:'1%'}}>
                                    <Col>
                                        <Card border="dark">
                                            <Card.Header>קורס</Card.Header>
                                            <Card.Body>
                                            <Card.Text>
                                                {this.props.projectDetails.ProjectCourse}
                                            </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card border="dark">
                                            <Card.Header>נושא</Card.Header>
                                            <Card.Body>
                                            <Card.Text>
                                                {this.props.projectDetails.ProjectTopic}
                                            </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            }
                            {/* project Stalkholders and users (IS PROJECT)*/}
                            {
                                (this.props.projectDetails.CStackholders) && (this.props.projectDetails.CustCustomers) &&
                                <Row dir="rtl" style={{marginTop:'1%'}}>
                                    <Col>
                                        <Card border="dark">
                                            <Card.Header>בעלי עניין</Card.Header>
                                            <Card.Body>
                                            <Card.Text>
                                                {this.props.projectDetails.CStackholders}
                                            </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card border="dark">
                                            <Card.Header>משתמשי המערכת</Card.Header>
                                            <Card.Body>
                                            <Card.Text>
                                                {this.props.projectDetails.CustCustomers}
                                            </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            }
                        </Col>
                    </Row>
                    <Divider style={{margin:'0px auto',marginTop:'6px',width:'80%',color:'#444'}}/>

                    {/* project video */}
                    {
                    this.props.projectDetails.MovieLink &&
                    <Col className="Box" style={{marginTop:'2%',textAlign:'center'}}>
                        <Row style={{textAlign:'center'}} dir="rtl" className="show-grid">
                            {this.props.projectDetails.MovieLink &&
                            <Col style={{padding:'50px'}}>
                                <h4><MdOndemandVideo size={20}/> סרטון הפרויקט</h4>
                                <VideoPlayer MovieLink={this.props.projectDetails.MovieLink} />
                            </Col>}
                        {    this.props.projectDetails.functionalityMovie &&
                            <Col style={{padding:'50px'}}>
                                <h4><MdExtension size={20}/> סרטון שימושיות</h4>
                                <VideoPlayer MovieLink={this.props.projectDetails.functionalityMovie} />
                            </Col>}
                        </Row>
                        <Divider style={{margin:'0px auto',marginTop:'6px',width:'80%',color:'#444'}}/>
                    </Col>
                    }
                    {/* project summery */}
                    {
                    this.props.projectDetails.ProjectSummery &&
                    <RichTextPreviewParagraph Paragraph={this.props.projectDetails.ProjectSummery} Title="תקציר הפרויקט" Icon={IoMdSkipForward} />
                    }
                    {(this.props.projectDetails.Challenges||this.props.projectDetails.Comments||this.props.projectDetails.PDescription)&&
                    <Col className="Box" style={{marginTop:'2%',textAlign:'center'}}>
                        <Row style={{textAlign:'center'}} dir="rtl" className="show-grid">
                            {this.props.projectDetails.PDescription&&
                            <Col xs="12" sm={this.props.projectDetails.Challenges?"6":"12"}>
                                <RichTextPreviewParagraph Paragraph={this.props.projectDetails.PDescription} Title="תיאור הפרויקט" Icon={GoBook} />
                            </Col>}
                            {(this.props.projectDetails.Challenges||this.props.projectDetails.Comments)&&
                            <Col xs="12" sm={this.props.projectDetails.PDescription?"6":"12"}>
                                <Col>
                                    <Row style={{textAlign:'center'}} dir="rtl" className="show-grid">
                                        {this.props.projectDetails.Challenges&&
                                        <Col dir="rtl" >
                                            <RichTextPreviewParagraph Paragraph={this.props.projectDetails.Challenges} Title="אתגרי הפרויקט" Icon={IoIosRocket} />
                                        </Col>}
                                        {this.props.projectDetails.Comments &&
                                        <Col dir="rtl" >
                                            <RichTextPreviewParagraph Paragraph={this.props.projectDetails.Comments} Title="הערות" Icon={IoIosContacts} />
                                        </Col>}
                                    </Row>
                                </Col>
                            </Col>}
                        </Row>
                        <Divider style={{margin:'0px auto',marginTop:'6px',width:'80%',color:'#444'}}/>
                    </Col>
                    }
                    {(this.props.projectDetails.projectFindings||this.props.projectDetails.ProjectGoal ||this.props.projectDetails.ProjectNeed)&&
                    <Col className="Box" style={{marginTop:'2%',textAlign:'center'}}>
                        <Row style={{textAlign:'center'}} dir="rtl" className="show-grid">
                            <Col>
                                <Row style={{textAlign:'center'}} dir="rtl" className="show-grid">
                                    {this.props.projectDetails.ProjectGoal &&
                                    <Col dir="rtl" >
                                        <RichTextPreviewParagraph Paragraph={this.props.projectDetails.ProjectGoal} Title="מטרת הפרויקט" Icon={GiCrosshair} />
                                    </Col>}
                                    {this.props.projectDetails.ProjectNeed &&
                                    <Col dir="rtl" >
                                        <RichTextPreviewParagraph Paragraph={this.props.projectDetails.ProjectNeed} Title="הבעיה/צורך" Icon={FiFlag} />
                                    </Col>}
                                </Row>
                            </Col>
                            <Col>
                                <Row style={{textAlign:'center'}} dir="rtl" className="show-grid">
                                    {this.props.projectDetails.projectFindings &&
                                    <Col dir="rtl" >
                                        <RichTextPreviewParagraph Paragraph={this.props.projectDetails.projectFindings} Title="ממצאים" Icon={FiEdit2} />
                                    </Col>}
                                    {this.props.projectDetails.ProjectConclusion &&
                                    <Col dir="rtl" >
                                        <RichTextPreviewParagraph Paragraph={this.props.projectDetails.ProjectConclusion} Title="מסקנות" Icon={GoBook} />}                            
                                    </Col>}
                                </Row>
                            </Col>
                            <Col>
                                {this.props.projectDetails.projectSolution &&
                                <RichTextPreviewParagraph Paragraph={this.props.projectDetails.projectSolution} Title="פתרון" Icon={FiAward} />}
                            </Col>
                        </Row>
                    </Col>}
                    {/* project industrial partner */}
                    {
                    this.props.projectDetails.PartnerDescription &&
                    <PreviewParagraph Paragraph={this.props.projectDetails.PartnerDescription} Title="שותף תעשייתי" Icon={IoIosContacts} />
                    }
                    
                    {/* project goals + modules (for IS project) */}
                    {
                        (this.props.projectDetails.Goals || this.props.projectDetails.Module)&&
                        <Col className="Box" style={{marginTop:'2%',textAlign:'center'}}>
                            <Row>
                                {this.props.projectDetails.Goals &&
                                <Col xs="12" sm={this.props.projectDetails.Module?"6":"12"}>
                                    <Row style={{marginTop:'5%',textAlign:'center'}}>
                                        <Col></Col>
                                        <Col style={{textAlign:'center'}}>
                                            <h4>מטרות המערכת<GiCrosshair size={20}/></h4>
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                    <Row style={{marginTop:'2%'}}>
                                        <Col>
                                            <Accordion dir="rtl" defaultActiveKey="0">
                                                    {
                                                        this.props.projectDetails.Goals.map((goal,key)=>
                                                        <Card style={{textAlign:'right'}} dir="rtl" key={key}>
                                                            <Accordion.Toggle as={Card.Header} eventKey={key===0?"0":key}>
                                                               <FiStar/> {goal.GoalDescription}
                                                            </Accordion.Toggle>
                                                            <Accordion.Collapse eventKey={key===0?"0":key}>
                                                            <Card.Body>
                                                                {/* <u>תיאור המטרה: </u>{goal.GoalDescription}
                                                                <br/> */}
                                                                <u>סטטוס המטרה: </u>{goal.GoalStatus}
                                                            </Card.Body>
                                                            </Accordion.Collapse>
                                                        </Card>
                                                        )
                                                    }
                                            </Accordion>
                                        </Col>
                                    </Row>
                                </Col>}
                                {this.props.projectDetails.Module &&
                                <Col xs="12" sm={this.props.projectDetails.Goals?"6":"12"}>
                                    <Row style={{marginTop:'5%',textAlign:'center'}}>
                                        <Col></Col>
                                        <Col style={{textAlign:'center'}}>
                                            <h4>מודולי המערכת<FaBuffer size={20}/></h4>
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                    <Row style={{marginTop:'2%'}}>
                                        <Col>
                                            <Accordion dir="rtl" defaultActiveKey="0">
                                                    {
                                                        this.props.projectDetails.Module.map((module,key)=>
                                                        <Card style={{textAlign:'right'}} dir="rtl" key={key}>
                                                            <Accordion.Toggle as={Card.Header} eventKey={key===0?"0":module.ModuleName}>
                                                            <FiStar/> {module.ModuleName}
                                                            </Accordion.Toggle>
                                                            <Accordion.Collapse eventKey={key===0?"0":module.ModuleName}>
                                                            <Card.Body>{module.ModuleDescription}</Card.Body>
                                                            </Accordion.Collapse>
                                                        </Card>
                                                        )
                                                    }
                                            </Accordion>
                                        </Col>
                                    </Row>
                                </Col>
                                }
                            </Row>
                        </Col>
                    }
                    
                    
                    {this.props.projectDetails.ProjectPDF &&
                    <Row>
                        {/* <Divider style={{margin:'0px auto',marginTop:'10px',marginBottom:'10px',width:'80%',color:'#444'}}/> */}
                        <Col xs="0" sm="0" md="1"></Col>
                        <Col className="Frame" xs="0" sm="0" md="10" style={{textAlign:'center'}}>
                            <Iframe url={this.props.projectDetails.ProjectPDF}
                            
                            display="initial"
                            width='80%'
                            height='100%'
                            position="relative"/>
                        </Col>
                        <Col xs="0" sm="0" md="1"></Col>
                    </Row>}
                    {/* project system PDF */}
                    <Row style={{marginTop:'5%',textAlign:'center'}}>
                        {
                        this.props.projectDetails.SystemDescriptionPDF &&
                        <Col style={{textAlign:'center'}}>
                            <Button onClick={()=>window.open(this.props.projectDetails.SystemDescriptionPDF,"_blank")} formTarget="blank" dir="rtl" variant="info">
                                <FiPaperclip/>  תיאור מערכת / תכנון הנדסי
                            </Button>
                        </Col>
                        }
                        {
                        this.props.projectDetails.ProjectPDF &&
                        <Col style={{textAlign:'center'}}>
                            <Button onClick={()=>window.open(this.props.projectDetails.ProjectPDF,"_blank")} formTarget="blank" dir="rtl" variant="info">
                                <FiPaperclip/> {this.props.projectDetails.templateSubmit==='st5' ? 'ספר הפרויקט':'קובץ להורדה'}
                            </Button>
                        </Col>
                        }
                    </Row>
                    
                    {/* project screenshots (for IS project) */}
                    {
                        (this.props.projectDetails.ScreenShots &&this.props.projectDetails.ScreenShots!==[])&&
                        <Col className="Box"  style={{marginTop:'4%',textAlign:'center'}}>
                            <Col style={{textAlign:'center',fontFamily:'Calibri'}} sm="12">
                                <h3>תמונות מסך <FaCameraRetro size={20}/></h3>
                            </Col>
                            <Row style={{marginTop:'4%',textAlign:'center'}} dir="rtl" className="show-grid">
                                <Col style={{textAlign:'right'}} sm="2"></Col>
                                <Col sm="8" style={{textAlign:'center',height:'auto'}}>
                                    {/* <ImageGallery showPlayButton={true}  slideDuration={1000} items={this.state.gallery}/> */}
                                    <Swiper {...params}>
                                        {this.props.projectDetails.ScreenShots.map((image,key)=>
                                            <div key={key} className="swiper-slide">
                                                <img
                                                    style={{height:'auto',maxHeight: '500px'}}
                                                    className="swiper-slide"
                                                    src={image}
                                                    alt="screen shot preview"
                                                />
                                            </div>
                                        )}
                                    </Swiper>

                                </Col>
                                <Col style={{textAlign:'right'}} sm="2"></Col>
                            </Row>
                        </Col>
                    }
                    {/* project techs (for IS project)   */}
                    {
                        this.props.projectDetails.Technologies &&
                        <Row style={{marginTop:'4%',textAlign:'center'}} dir="rtl" className="show-grid">
                            {/* <Col style={{textAlign:'right'}} sm="2">
                            <p style={{fontSize:'20px'}}><IoIosLaptop size={20}/>טכנולוגיות:</p>
                            </Col> */}
                            <Col style={{textAlign:'right'}}>
                                {
                                    this.props.projectDetails.Technologies.map((tech,key)=>
                                    <Chip
                                    variant="outlined"
                                    key={key}
                                    style={{marginRight:'10px'}}
                                    avatar={<Avatar style={{color:'black',backgroundColor:'aquamarine'}} alt="computer icon"><IoIosLaptop size={20}/></Avatar>}
                                    label={tech.label?tech.label:tech}
                                  />)
                                }
                            </Col>
                        </Row>
                    }
                    {/* project hashtags*/}
                    {
                        this.props.projectDetails.HashTags &&
                        <Row style={{marginTop:'4%',textAlign:'center'}} dir="rtl" className="show-grid">
                            {/* <Col style={{textAlign:'right',fontSize:'30'}} sm="2">
                                <p style={{fontSize:'20px'}}><GoTag size={40}/>האשטגים:</p>
                            </Col> */}
                            <Col style={{textAlign:'right'}}>
                                {
                                    this.props.projectDetails.HashTags.map((tag,key)=>
                                    <Chip
                                    variant="outlined"
                                    key={key}
                                    style={{marginRight:'10px'}}
                                    avatar={<Avatar style={{color:'black',backgroundColor:'lightskyblue'}} alt="computer icon"><GoTag size={20}/></Avatar>}
                                    label={tag.value?tag.value:tag}
                                  />                                    )
                                }
                            </Col>
                        </Row>
                    }
                    {/* project links (for IS project) */}
                    <Row dir="rtl" style={{justifyContent:'space-between',marginTop:'4%'}}>
                        {
                            this.props.projectDetails.AppStore&&
                            <LinkButton color='outline-secondary' href={this.props.projectDetails.AppStore} Icon={FaAppleAlt} Title={`  Appstore`} />
                        }
                        {
                            this.props.projectDetails.ProjectSite&&
                            <LinkButton color='outline-info' href={this.props.projectDetails.ProjectSite} Icon={IoIosDesktop} Title={`  לאתר הפרויקט`} />
                        }
                        {
                            this.props.projectDetails.Github&&
                            <LinkButton color='outline-dark' href={this.props.projectDetails.Github} Icon={GoMarkGithub} Title={`  Github`} />
                        }
                        {
                            this.props.projectDetails.GooglePlay&&
                            <LinkButton color='outline-success' href={this.props.projectDetails.GooglePlay} Icon={FaGoogle} Title={`  GooglePlay`} />
                        }
                        </Row>
                </Container>
              </Modal.Body>  
              <Modal.Footer style={{justifyContent:'space-between'}}>
                <Col sm='3'></Col>
                <Col sm='6' style={{textAlign:'center'}}>
                    <Button onClick={this.props.close} variant="warning">סגירה</Button>
                </Col>
                <Col sm='3'></Col>
              </Modal.Footer>
            </Modal>
          );
    }
}

