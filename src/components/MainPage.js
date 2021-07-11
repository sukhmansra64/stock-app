import React, { Component } from 'react';
import StockInfoDisplay from "./StockInfoDisplay";
import WackyForm from "./WackyForm";
import DataDidntLoad from './DataDidntLoad';
//component class which presents conditions to render either the form or the information display
//uses callbacks to change the boolean value and receive the ticker
class MainPage extends Component{
    //constructor function which defines the boolean and ticker in the state and binds the callbacks to this class
    constructor(props) {
        super(props);
        this.state={
            renderForm: true,
            renderInfo: false,
            ticker: '',
            dataDidntLoad: false
        }
        this.backButton=this.backButton.bind(this);
        this.afterInput=this.afterInput.bind(this);
        this.noData=this.noData.bind(this);
    }
    //callback function which is provided to the back button, sets the boolean to render the form, and stop rendering the info display or error message
    backButton(){
        this.setState({
            renderForm: true,
            renderInfo: false,
            dataDidntLoad: false
        })
    }
    //callback function provided to the form, boolean value changes depending on whether the data has loaded or not
    noData(){
        this.setState({
            renderForm: false,
            renderInfo: false,
            dataDidntLoad: true,
        })
    }

    //callback function which is provided to the form and auto suggestions, sets the boolean to render the information and sets the ticker to the entered ticker
    afterInput(ticker){
        if(ticker.length>0){
            this.setState({
                ticker: ticker,
                renderForm: false,
                renderInfo: true,
                DataDidntLoad: false
            })
        }
        else{
            this.noData();
        }
    }
    //conditionally renders the form, info display, or error message
    render() {
        return(
            <div className='container container-fluid'>
                {this.state.dataDidntLoad && <br/>}
                {this.state.renderForm && <br/>}
                {this.state.renderInfo && <br/>}
                {this.state.renderForm && <WackyForm callback={this.afterInput}/>}
                {this.state.renderInfo && <StockInfoDisplay ticker={this.state.ticker} callback={this.backButton}/>}
                {this.state.dataDidntLoad && <DataDidntLoad callback={this.backButton}/>}
                {((this.state.renderForm)||(this.state.dataDidntLoad))&& <footer style={{position:'absolute', bottom:'0', width:'100%',height:'100px', paddingTop:'40px'}}>
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