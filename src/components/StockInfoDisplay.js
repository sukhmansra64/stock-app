import React, {Component} from 'react';

class StockInfoDisplay extends Component{
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: []
        }
    }
    render() {
        return(
            <div className='container'>Place Holder</div>
        )
    }
}
export default StockInfoDisplay;