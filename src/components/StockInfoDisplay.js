import React, {Component} from 'react';
import { aVToken } from '../iexSourceStuff/AlphaVantage';
import Plot from 'react-plotly.js';

class StockInfoDisplay extends Component{
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: []
        }
        this.fetchStock(this.props.ticker);
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
            <div className='container'>
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
                    layout={ {width: 720, height: 440, title: `${this.props.ticker} performance`} }
                />
            </div>
        )
    }
}
export default StockInfoDisplay;