import React, { Component } from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {autocompleteData} from "../Resources/autocompleteStuff";
import StockRow from "./StockRow";

class WackyForm extends Component{
    constructor() {
        super();
        this.state={
            input: '',
            data: [],
            isLoaded:false,
            isTyping: false
        }
        this.autoFinish = new autocompleteData();
    }
    applyData(data){
        this.setState({
            data: data
        })
    }
    componentDidMount() {
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange = (evt)=>{
        if(this.state.input.length<0){
            this.state.isTyping=false;
            this.state.isLoaded=false
        }
        this.setState({input: evt.target.value});
        this.autoFinish.fetchData(this.applyData.bind(this),this.state.input)
        let arr = Object.assign([],this.state.data);
        if(arr[0]){
            if("name" in arr[0]){
                this.setState({isLoaded:true})
            }
        }
        else{this.setState({isLoaded:false})}
        if((this.state.input.length>0)&&(this.state.isLoaded)){
            this.setState({isTyping: true});
        }
        else{
            this.setState({isTyping: false});
        }
    }
    handleClick = (button) =>{
        button.preventDefault();
        alert(this.state.input);
    }

    render() {
        return(
            <div className="container-fluid" >
                <Form>
                    <Row>
                        <Col lg='10'>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label><b>Enter a Stock:</b></Form.Label>
                                <Form.Control type="text" size="lg" placeholder="Enter a Stock" onChange={this.handleChange}/>
                            </Form.Group>
                            <div className="col">
                                {this.state.isTyping&&
                                <div className='card'>
                                        <ul className='list-group list-group-flush'>
                                            {this.state.isTyping&&
                                            ((this.state.data).map((data,key)=>{
                                                return(<StockRow key={key} name={data["name"]} ticker={data["symbol"]}/>)
                                            }))
                                            }
                                        </ul>
                                </div>
                               }
                            </div>
                        </Col>
                        <Col lg='2'>
                            <br/>
                            <Button type="submit" size='lg' className="mt-2" onClick={this.handleClick}>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
export default WackyForm;