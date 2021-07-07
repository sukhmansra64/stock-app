import React, {Component} from "react";
import { stock } from '../Resources/stock';
//this component renders a row which provides a clickable stock row which provides day to day information on the stock
//to be used in the auto suggestion portion of the form
class StockRow extends Component{
    //the constructor function initializes a bunch of variables to provide information to from the API fetch
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
    //callback function which is provided to the API fetching object
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
    //function which provides styling to the html attribute depending on if the dollar change and percent change is positive or negative
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
    //makes the API fetch object and sets new functions to callbacks provided in the props
    //then renders the stock row to be used in the autosuggestion function
    render(){
        let aStock = new stock(this.props.ticker,this.applyData.bind(this));
        let applyInput = this.props.callBack;
        let submitForm = this.props.onClick;
        let handleClick = (button)=>{
            applyInput(this.props.ticker);
            submitForm(button);
        }
        return(
            <li className="list-group-item btn btn-dark" onClick={handleClick}>
                <b>{this.props.name}</b> ({this.props.ticker}) ({this.state.exchange}) ${this.state.price}
                <span className="change" style={this.changeStyle()}>
                    ${`${this.state.dollarChange}`}  ({`${this.state.percentChange}`})%
                </span>
            </li>
        )
    }
}
export default StockRow;