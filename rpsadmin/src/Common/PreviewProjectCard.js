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

class PreviewCard extends React.Component{
    state={
        isIS:false,
        isBS:false,
    }
    // componentDidUpdate(){
    //     console.log(this.props.projectDetails.Students)
    // }
    render(){
        
        return (
            <Modal style={{backgroundColor:'#B9C0C9',fontFamily:'Calibri'}} onHide={this.props.close} show={this.props.openPreview} size="xl" aria-labelledby="contained-modal-title-vcenter">
              <Modal.Header style={{margin:'0px auto'}}>
                <Modal.Title >
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
                    <Row style={{justifyContent:'space-between',textAlign:'center'}} className="show-grid">
                        {
                            this.props.projectDetails.ProjectLogo &&
                            (
                                <Col xs={12}>
                                    <Image height='100%' src={this.props.projectDetails.ProjectLogo} />
                                </Col>
                            )
                        }
                    </Row>

                    {/* project advisors */}
                    <Row className="show-grid" style={{marginTop:'1%'}}>
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

                    {/* project full description */}
                    <Row className="show-grid">
                        <Col xs={12}>
                            <Row dir="rtl">
                                <Col style={{textAlign:'right'}} sm="2">
                                    תיאור הפרויקט:
                                </Col>
                                <Col sm="8">
                                <p style={{overflowWrap: 'break-word',textAlign:'right'}}>{this.props.projectDetails.PDescription}</p>
                                </Col>
                                <Col sm="2"></Col>
                            </Row>
                        </Col>
                    </Row>
                    
                    {/* project goals (for IS project) */}
                    {
                        this.props.projectDetails.Goals &&
                        <Row style={{overflowWrap: 'break-word',marginTop:'3%',textAlign:'center'}} dir="rtl" className="show-grid">
                            <Col style={{textAlign:'right'}} sm="12">
                                <p>מטרות המערכת</p>
                            </Col>
                            {
                                this.props.projectDetails.Goals.map((goal,key)=>
                                    <Col dir="rtl" sm="12" style={{textAlign:'center'}}>
                                        <Row style={{marginTop:'1%'}}>
                                            <Col sm="2">
                                                {`מטרה ${key+1}:`}
                                            </Col>
                                            <Col style={{textAlign:'right'}} sm="5">
                                                תיאור המטרה:{goal.GoalDescription}
                                            </Col>
                                            <Col style={{textAlign:'right'}} sm="5">
                                                סטטוס המטרה: {goal.GoalStatus}
                                            </Col>
                                        </Row>
                                    </Col>
                                    
                                )
                            }
                            <Col style={{textAlign:'right'}} sm="2"></Col>
                        </Row>
                    }

                    {/* students details */}
                    <Row style={{marginTop:'2%'}} dir="rtl" className="show-grid">
                        <Col style={{textAlign:'right'}} dir="rtl" sm="2">
                            חברי הצוות:
                        </Col>
                        <Col sm="10"></Col>
                    </Row>
                    <Row style={{justifyContent:'space-between',alignContent:'center'}} className="show-grid">
                        {
                            this.props.projectDetails.Students &&
                            this.props.projectDetails.Students.map((student)=>
                                <Col style={{textAlign:'center'}} xs={12/this.props.projectDetails.Students.length}>
                                    <Row style={{justifyContent:'center'}}>
                                        <a href={`mailto:${student.Email}`} dir="rtl" style={{textAlign:'center'}}>{student.Name}</a>
                                    </Row>
                                    <Row style={{justifyContent:'center'}}>
                                        <Image style={{height:130,textAlign:'center'}} roundedCircle fluid src={student.Picture} />
                                    </Row>
                                    
                                </Col>
                            )
                        }
                    </Row>

                    {/* project video */}
                    {
                        this.props.projectDetails.MovieLink &&
                        <Row style={{marginTop:'3%',textAlign:'center'}} dir="rtl" className="show-grid">
                            <Col style={{textAlign:'right'}} sm="2">
                                <p>סרטון הפרויקט:</p>
                            </Col>
                            <Col sm="8" style={{textAlign:'center'}}>
                            
                             <ReactPlayer controls loop url={this.props.projectDetails.MovieLink} playing />
                            </Col>
                            <Col sm="2"></Col>
                        </Row>
                    }

                    {/* project modules (for IS project) */}
                    {
                        this.props.projectDetails.Module &&
                        <Row style={{overflowWrap: 'break-word',marginTop:'3%',textAlign:'center'}} dir="rtl" className="show-grid">
                            <Col style={{textAlign:'right'}} sm="12">
                                <p>מודולי המערכת</p>
                            </Col>
                            {
                                this.props.projectDetails.Module.map((module,key)=>
                                    <Col dir="rtl" sm="12" style={{textAlign:'center'}}>
                                        <Row style={{marginTop:'1%'}}>
                                            <Col sm="2">
                                                {`${key+1}.`}
                                            </Col>
                                            <Col style={{textAlign:'right'}} sm="3">
                                                {module.ModuleName}:
                                            </Col>
                                            <Col style={{textAlign:'right'}} sm="7">
                                                {module.ModuleDescription}
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
                        <Row style={{marginTop:'3%',textAlign:'center'}} dir="rtl" className="show-grid">
                            <Col style={{textAlign:'right'}} sm="2">
                                <p>תמונות מסך:</p>
                            </Col>
                            <Col sm="8" style={{textAlign:'center'}}>
                                <ImagesCarousel screenshotsNames={this.props.projectDetails.ScreenShotsNames} images={this.props.projectDetails.ScreenShots}/>
                            </Col>
                            <Col style={{textAlign:'right'}} sm="2"></Col>
                        </Row>
                    }
                    {/* project techs (for IS project)   */}
                    {
                        this.props.projectDetails.Technologies &&
                        <Row style={{marginTop:'3%',textAlign:'center'}} dir="rtl" className="show-grid">
                            <Col style={{textAlign:'right'}} sm="2">
                                <p>טכנולוגיות:</p>
                            </Col>
                            <Col sm="10" style={{textAlign:'center'}}>
                                {
                                    this.props.projectDetails.Technologies.map((tech)=>
                                        <Badge size={20} marginWidth={2} style={{backgroundColor:randomColor(),fontSize:20,marginLeft:5}}>{tech}</Badge>
                                    )
                                }
                            </Col>
                        </Row>
                    }



                </Container>
              </Modal.Body>
              <Modal.Footer style={{justifyContent:'space-between'}}>
                <Col sm='3'></Col>
                <Col sm='3' style={{textAlign:'center'}}>
                    <Button onClick={this.props.close} variant="success">שמירה</Button>
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

export default PreviewCard;