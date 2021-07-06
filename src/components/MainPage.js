import React, { Component } from 'react';
import StockInfoDisplay from "./StockInfoDisplay";
import WackyForm from "./WackyForm";

class MainPage extends Component{
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
    backButton(){
        this.setState({
            renderForm: true,
            renderInfo: false
        })
    }
    afterInput(ticker){
        this.setState({
            ticker: ticker,
            renderForm: false,
            renderInfo: true
        })
    }
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