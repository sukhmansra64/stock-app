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
                {this.state.renderInfo && <br/>}
                {this.state.renderForm && <WackyForm callback={this.afterInput}/>}
                {this.state.renderInfo && <StockInfoDisplay ticker={this.state.ticker} callback={this.backButton}/>}
                {this.state.renderForm&& <footer style={{position:'absolute', bottom:'0', width:'100%',height:'100px', paddingTop:'40px'}}>
                    <span>Made by Sukhman Sra</span>
                    <br/>
                    <span><a className='link-dark' href='https://www.linkedin.com/in/sukhsra/' target="_blank" rel="noopener noreferrer">LinkedIn</a></span>
                    <br/>
                    <span><a className='link-dark' href='https://github.com/sukhmansra64' target="_blank" rel="noopener noreferrer">GitHub</a></span>
                </footer>}
                {this.state.renderInfo && <footer>
                    <br/>
                    <div className='container'>
                        <span>Made by Sukhman Sra</span>
                        <br/>
                        <span><a className='link-dark' href='https://www.linkedin.com/in/sukhsra/' target="_blank" rel="noopener noreferrer">LinkedIn</a></span>
                        <br/>
                        <span><a className='link-dark' href='https://github.com/sukhmansra64' target="_blank" rel="noopener noreferrer">GitHub</a></span>
                    </div>
                   </footer>}
            </div>
        )
    }
}
export default MainPage;