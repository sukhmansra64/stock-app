import React, { Component } from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {autocompleteData} from "../Resources/autocompleteStuff";
import StockRow from "./StockRow";
//class component which renders a form and auto suggestions to allow you to find information on a stock you'd like to learn about
//the auto suggestions provide basic day to day change on the stock and when clicked, they render the display component
class WackyForm extends Component{
    //defines booleans to confirm if the user is typing, an input, and an array for the data received from an API fetch
    //the function then creates the autocomplete object and binds the callbacks to this component
    constructor(props) {
        super(props);
        this.state={
            input: '',
            data: [],
            isLoaded:false,
            isTyping: false
        }
        this.autoFinish = new autocompleteData();
        this.handleChange=this.handleChange.bind(this);
        this.applyInput=this.applyInput.bind(this);
        this.handleList=this.handleList.bind(this);
    }
    //this function is a callback used by the API fetch to set the data to the state
    applyData(data){
        this.setState({
            data: data
        })
    }
    //this function takes the callback entered into the props and makes a new function
    applyInput(ticker){
        this.props.callback(ticker);
    }
    //this function changes the boolean values of the state to determine if the user is typing or not
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
    //this function takes the callback provided through the props and returns the input value when clicked
    handleClick = (button) =>{
        button.preventDefault();
        this.props.callback(this.state.input);
    }
    //this function prevents the page from refreshing when a auto suggestion is clicked
    handleList=(button)=>{
        button.preventDefault();
    }
    //renders the form and conditionally renders the autosuggestions
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
                                        <ul style={{height: 200, overflow: 'auto'}} className='list-group list-group-flush'>
                                            {this.state.isTyping&&
                                            ((this.state.data).map((data,key)=>{
                                                return(<StockRow key={key} name={data["name"]} ticker={data["symbol"]} callBack={this.applyInput} onClick={this.handleList}/>)
                                            }))
                                            }
                                        </ul>
                                </div>
                               }
                            </div>
                        </Col>
                        <Col lg='2'>
                            <br/>
                            <Button type="submit" size='lg' className="mt-2 btn-dark" onClick={this.handleClick}>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
export default WackyForm;