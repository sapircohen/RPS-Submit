import React from 'react';
import {Col,Row} from 'react-bootstrap'
import makeAnimated from 'react-select/lib/animated';
//import Badge from 'react-bootstrap/Badge';
import Select from 'react-select';

export default class Techs extends React.Component{
    // state={
    //     chosenTechs:[]
    // }
    // TechsChosen (value){
    //     //insert all techs to an array
    //     this.setState({
    //         chosenTechs:value.map((val)=>{
    //             return val.value;
    //         })
    //     },()=>{
    //         this.props.getTechs(this.state.chosenTechs);
    //     })
    // }
    render(){
    return(
        <div dir="rtl" style={{padding:15,borderRadius:20,marginTop:30,border:'solid 1px',marginBottom:20,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
            <Row>
                <Col sm="4" style={{fontSize:20}}>
                    <h4>
                        בחרו טכנולוגיות
                    </h4>
                </Col> 
                <Col sm="8">
                <Select
                onChange={this.props.TechsChosen}
                closeMenuOnSelect={false}
                components={makeAnimated()}
                isMulti
                options={this.props.techs}
                className="basic-multi-select"
                classNamePrefix="select"
                />
                </Col>
            </Row>
        </div>
    )
    }
}