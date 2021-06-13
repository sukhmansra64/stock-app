import React, {Component} from "react";
import { iexData } from '/Users/sukhmansra/Documents/GitHub/stock-app/src/iexSourceStuff/iexSourceData.js';
const time = (time)=>{
    let date=new Date((time));
    let hours = date.getHours();
    let minutes = "0"+date.getMinutes();
    let seconds = "0"+date.getSeconds();
    let formattedTime = hours+':'+minutes.substr(-2)+':'+seconds.substr(-2);
    return(formattedTime);
}
class StockRow extends Component{
    constructor(props) {
        super(props);
        this.state ={
            data: {}
        }

    }
    componentDidMount() {
        const url = `https://cloud.iexapis.com/stable/stock/${this.props.ticker}/quote?token=${iexData.apiToken}`;
        const apiCall = async (url)=>{
            try{
                let response = await fetch(url);
                let data = await response.json();
                this.setState({
                    data: data
                })
            }
            catch (err){
                console.log(err);
                return err;
            }

        }
        apiCall(url);

    }

    render(){
        return(
            <tr>
                <td>{this.props.ticker}</td>
                <td>{this.state.data.latestPrice}</td>
                <td>{this.state.data.latestTime}</td>
                <td>{time(this.state.data.latestUpdate)}</td>
            </tr>
        )
    }
}
export default StockRow;