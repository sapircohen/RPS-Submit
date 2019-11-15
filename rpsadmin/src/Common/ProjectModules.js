import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import SmallHeaderForm from './SmallHeaderForm';
import Form from 'react-bootstrap/Form';
import { FaPlusCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default class ProjectModules extends React.Component{
    state = {
        modules: [{ModuleName:"", ModuleDescription:""}],
    }
    componentDidMount(){
        window.setTimeout(()=>{
            //console.log(this.props)
            if(this.props.initalProjectModule&&this.props.initalProjectModule.length!==0){
                this.setState({
                    modules:this.props.initalProjectModule,
                },()=>{
                    this.props.setProjectModules(this.state.modules);
                })
            }
            else this.props.setProjectModules(this.state.modules);
        },3000)
    }
    addModule = ()=>{
        this.setState((prevState) => ({
            modules: [...prevState.modules, {ModuleName:"", ModuleDescription:""}],
        }),()=>{
            this.props.setProjectModules(this.state.modules);
        });
    }
    removeModule= (index)=>{
        let array = [...this.state.modules];
    
        console.log(this.state.modules)
        if (index !== -1) {
            array.splice(index, 1);
            console.log(array);
            this.setState({modules: array},()=>{
                this.props.setProjectModules(this.state.modules);
            });
        }
    }
    changeModuleDesc = (index,e)=>{
        this.state.modules[index].ModuleDescription =e.target.value;
        this.forceUpdate();
        this.props.setProjectModules(this.state.modules);
    }
    changeModuleName = (index,e)=>{
        this.state.modules[index].ModuleName = e.target.value;
        this.forceUpdate();
        this.props.setProjectModules(this.state.modules);
    }
    render(){
        const {modules} = this.state;
        return(
            <div dir="rtl" style={{border:'solid 1px',padding:20,borderRadius:5,marginTop:30,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                <SmallHeaderForm title={this.props.title?this.props.title:"מודולי הפרויקט"}/>
                <Row dir="rtl" style={{marginTop:'2%'}}>
                    <Col sm="4">
                        <Button onClick={this.addModule} variant="success">
                            <FaPlusCircle/>
                            מודול חדש
                        </Button>
                    </Col>
                    <Col sm="4"></Col>
                    <Col sm="4"></Col>
                </Row>
                {
                    modules.map((val, idx)=> {
                        return (
                        <div  key={idx}>
                            <SmallHeaderForm title={`#מודול ${idx+1}`}/>
                            <Form.Group dir="rtl" style={{marginTop:'2%'}} as={Row} id="goalName">
                                <Form.Label column sm="2">שם המודול</Form.Label>
                                <Col sm="2">
                                    <Form.Control value={modules[idx].ModuleName} onChange={(e)=>this.changeModuleName(idx,e)} dir="rtl" type="text"/>
                                </Col>

                                <Form.Label column sm="2">תיאור המודול</Form.Label>
                                <Col sm="5">
                                    <Form.Control value={modules[idx].ModuleDescription} onChange={(e)=>this.changeModuleDesc(idx,e)} dir="rtl" as="textarea" rows="5"/>
                                </Col>
                                <Col sm="1">
                                    <Button onClick={()=>this.removeModule(idx)} style={{backgroundColor:'#fff',borderColor:'#fff',color:'red'}}>
                                        <IoIosCloseCircleOutline color="red" size={40}/>
                                    </Button>
                                </Col>
                            </Form.Group>
                           
                        </div>
                        )
                    })
                }
            </div>
        )
    }
}