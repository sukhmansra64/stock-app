import React, {Component} from 'react';
import { aVToken } from '../iexSourceStuff/AlphaVantage';
import Plot from 'react-plotly.js';
import {stock} from '../Resources/stock'
import {Col, Row} from "react-bootstrap";
class StockInfoDisplay extends Component{
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
    applyData(data){
        this.setState({
            stockData: data
        })
    }
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
                            layout={ {width: 720, height: 440, title: `${this.props.ticker} historical performance`} }
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