import React, {Component} from "react";

class StockRow extends Component{
    render(){
        return(
            <tr>
                <td>{this.props.ticker}</td>
                <td>placeholder</td>
                <td>placeholder</td>
                <td>placeholder</td>
            </tr>
        )
    }
}
export default StockRow;