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
            exchange: null
        }

    }
    applyData(data){
        this.setState({
            price: data.price,
            date: data.date,
            yesterdayClose: data.yesterdayClose,
            dollarChange: data.dollarChange,
            percentChange: data.percentChange,
            exchange: data.exchange
        })
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
        let aStock = new stock(this.props.ticker,this.applyData.bind(this));
        return(
            <li className="list-group-item btn btn-primary" onClick={()=>{this.props.callBack(this.props.ticker)}}>
                <b>{this.props.name}</b> ({this.props.ticker}) ({this.state.exchange}) ${this.state.price}
                <span className="change" style={this.changeStyle()}>
                    ${`${this.state.dollarChange}`}  ({`${this.state.percentChange}`})%
                </span>
            </li>
        )
    }
}
export default StockRow;