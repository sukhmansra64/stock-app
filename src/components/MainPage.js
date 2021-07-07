import React, { Component } from 'react';
import StockInfoDisplay from "./StockInfoDisplay";
import WackyForm from "./WackyForm";
//component class which presents conditions to render either the form or the information display
//uses callbacks to change the boolean value and receive the ticker
class MainPage extends Component{
    //constructor function which defines the boolean and ticker in the state and binds the callbacks to this class
    constructor(props) {
        super(props);
        this.state={
            renderForm: true,
            renderInfo: false,
            ticker: 'IBM'
        }
        this.backButton=this.backButton.bind(this);
        this.afterInput=this.afterInput.bind(this);
    }
    //callback function which is provided to the back button, sets the boolean to render the form, and stop rendering the info display
    backButton(){
        this.setState({
            renderForm: true,
            renderInfo: false
        })
    }
    //callback function which is provided to the form and auto suggestions, sets the boolean to render the information and sets the ticker to the entered ticker
    afterInput(ticker){
        this.setState({
            ticker: ticker,
            renderForm: false,
            renderInfo: true
        })
    }
    //conditionally renders the form or info display
    render() {
        return(
            <div className='container container-fluid'>
                {this.state.renderForm && <br/>}
                {this.state.renderForm && <WackyForm callback={this.afterInput}/>}
                {this.state.renderInfo && <StockInfoDisplay ticker={this.state.ticker} callback={this.backButton}/>}
            </div>
        )
    }
}
export default MainPage;