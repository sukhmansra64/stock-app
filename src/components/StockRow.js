import React, {Component} from "react";
import { stock } from '../Resources/stock';



class StockRow extends Component{
    constructor(props) {
        super(props);
        this.state ={
            price: null,
            date: null,
            time: null,
            yesterdayClose: null,
            dollarChange: null,
            percentChange: null,
        }

    }
    applyData(data){
        this.setState({
            price: data.price,
            date: data.date,
            time: data.time,
            yesterdayClose: data.yesterdayClose,
            dollarChange: data.dollarChange,
            percentChange: data.percentChange
        })
    }
    componentDidMount() {
        let aStock = new stock(this.props.ticker,this.applyData.bind(this));
        aStock.getYesterdayInfo(this.props.ticker,this.applyData.bind(this));
    }
    changeStyle(){
        if(this.state.dollarChange>0){
            return{color: '#4caf50',
                fontSize: '0.8rem',
                marginLeft: 5}
        }
        if(this.state.percentChange<0){
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

    render(){
        return(
            <li className="list-group-item">
                <b>{this.props.ticker}</b> ${this.state.price}
                <span className="change" style={this.changeStyle()}>
                    ${`${this.state.dollarChange}`}  ({`${this.state.percentChange}`})%
                </span>
            </li>
        )
    }
}
export default StockRow;