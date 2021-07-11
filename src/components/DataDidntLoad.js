import React, {Component} from "react";
//renders a component which explains that the data entered is in the wrong format and to try again
class DataDidntLoad extends Component{
    render() {
        return(
            <div className='container'>
                <br/>
                <div className='btn btn-dark' onClick={this.props.callback}>
                    Back
                </div>
                <br/>
                <br/>
                <h1>Oops...</h1>
                <p>It seems that you've entered a stock in the wrong format, enter a ticker directly and submit it, or use the autosuggestion in the input to help you.</p>
            </div>
        )
    }
}

export default DataDidntLoad;