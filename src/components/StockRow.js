import React, {Component} from "react";
import { stock } from '../Resources/stock';

const changeStyle = {
    color: '#4caf50',
    fontSize: '0.8rem',
    marginLeft: 5
}

class StockRow extends Component{
    constructor(props) {
        super(props);
        this.state ={
            price: null,
            date: null,
            time: null,
            yesterdayClose: null
        }

    }
    applyData(data){
        this.setState({
            price: data.price,
            date: data.date,
            time: data.time,
            yesterdayClose: data.yesterdayClose
        })
    }
    componentDidMount() {
        let aStock = new stock(this.props.ticker,this.applyData.bind(this));
        aStock.getYesterdayInfo(this.props.ticker,this.applyData.bind(this));
    }

    render(){
        return(
            <li className="list-group-item">
                <b>{this.props.ticker}</b> ${this.state.price}
                <span className="change" style={changeStyle}>
                    +placeholder
                </span>
                <br/>
                <span>Yesterday closing: ${this.state.yesterdayClose}</span>
            </li>
        )
    }
}
export default StockRow;