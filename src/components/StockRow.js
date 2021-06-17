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
            data: {}
        }

    }
    applyData(data){
        this.setState({data:data})
    }
    componentDidMount() {
        new stock(this.props.ticker,this.applyData.bind(this));
    }

    render(){
        return(
            <li className="list-group-item">
                <b>{this.props.ticker}</b> ${this.state.data.price}
                <span className="change" style={changeStyle}>
                    +placeholder
                </span>
            </li>
        )
    }
}
export default StockRow;