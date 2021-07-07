import React, {Component} from 'react';
import { aVToken } from '../iexSourceStuff/AlphaVantage';
import Plot from 'react-plotly.js';
import {stock} from '../Resources/stock'
import {Col, Row} from "react-bootstrap";
//this class component renders information which has been received from API fetches
//the component then renders a graph from Plotly.js
class StockInfoDisplay extends Component{
    //the constructor function defines arrays which hold the x and y values for the graph and data for the stock
    //also receives data from API fetches and assigns them to the arrays using callbacks
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            stockData: []
        }
        this.fetchStock(this.props.ticker);
        let aStock = new stock(this.props.ticker,this.applyData.bind(this));
    }
    //callback which takes data from the API fetch and assigns data to the state
    applyData(data){
        this.setState({
            stockData: data
        })
    }
    //this function provides style to an html component depending on whether the dollar and percent change went up or down
    changeStyle(){
        if(this.state.stockData.dollarChange>0){
            return{color: '#4caf50',
                fontSize: '0.8rem',
                marginLeft: 5}
        }
        if(this.state.stockData.percentChange<0){
            return{color: '#e53935',
                fontSize: '0.8rem',
                marginLeft: 5}
        }
        else{
            return{
                fontSize: '0.8rem',
                marginLeft: 5}
        }
    }
    //API fetch for receiving data for the graph and then sets it to the arrays in state
    async fetchStock(ticker){
        const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${aVToken.apiToken}`
        const response = await fetch(URL);
        const data = await response.json();
        let pushStockX = [];
        let pushStockY = [];
        for (let key in data['Time Series (Daily)']){
            pushStockX.push(key);
            pushStockY.push(data['Time Series (Daily)'][key]['1. open'])
        }
        this.setState({
            stockChartXValues: pushStockX,
            stockChartYValues: pushStockY
        })
    }
    //renders the graph using Plotly and the stock data in a css grid form using bootstrap
    render() {
        return(
            <div className='container container-fluid'>
                <div className='btn btn-dark' onClick={this.props.callback}>
                    Back
                </div>
                <Row>
                    <Col>
                        <Plot
                            data={[
                                {
                                    x: this.state.stockChartXValues,
                                    y: this.state.stockChartYValues,
                                    type: 'scatter',
                                    mode: 'lines',
                                    marker: {color: 'black'},
                                }
                            ]}
                            layout={ {width: 720, height: 440, title: `${this.props.ticker.toUpperCase()} historical performance`} }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg='4'><b>Current Price: </b>${this.state.stockData.price}</Col>
                    <Col lg='4'><b>Today's Open: </b>${this.state.stockData.open}</Col>
                    <Col lg='4'><b>Today's Close: </b>${this.state.stockData.close}</Col>
                </Row>
                <br/>
                <Row>
                    <Col lg='4'><b>Today's High: </b>${this.state.stockData.high}</Col>
                    <Col lg='4'><b>Today's Low: </b>${this.state.stockData.low}</Col>
                    <Col lg='4'><u>Data as of {this.state.stockData.time}</u></Col>
                </Row>
                <br/>
                <Row>
                    <Col lg='4'><b>Yesterday's close: </b>${this.state.stockData.yesterdayClose}</Col>
                    <Col lg='4'><b>Dollar change (since yesterday): </b><span style={this.changeStyle()}>${this.state.stockData.dollarChange}</span></Col>
                    <Col lg='4'><b>Percent change (since yesterday): </b><span style={this.changeStyle()}>${this.state.stockData.percentChange}%</span></Col>
                </Row>
            </div>
        )
    }
}
export default StockInfoDisplay;