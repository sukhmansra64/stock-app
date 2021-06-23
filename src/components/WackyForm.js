import React, { Component } from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {autocompleteData} from "../Resources/autocompleteStuff";

class WackyForm extends Component{
    constructor() {
        super();
        this.state={
            input: '',
            data: null,
            autocomplete: null,
        }
        this.autoFinish = new autocompleteData(this.applyData.bind(this));
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
        this.setState({input: evt.target.value});
        this.setState({autocompete: this.autoFinish.filter(this.state.data,"name",this.state.input.toLowerCase())})
        console.log(this.state.autocompete);
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