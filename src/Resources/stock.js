import {iexData} from "../iexSourceStuff/iexSourceData";

export class stock{
    constructor(ticker, callBack){
        const fetchFunction = async (ticker, callBack)=>{
            const response = await fetch(this.stockUrl(ticker));
            const data = await response.json();
            await callBack(await this.formatStock(data));
        }
        fetchFunction(ticker,callBack);
    }
    stockUrl = (ticker)=>{
        return `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${iexData.apiToken}`
    }
    formatStock = (data)=> {
        const formattedData = {}
        formattedData.price=(data.latestPrice).toFixed(2);
        formattedData.date = (data.latestTime);
        formattedData.time = this.time(data.latestUpdate);
        formattedData.yesterdayClose = (data.previousClose).toFixed(2);
        formattedData.dollarChange = (data.change).toFixed(2);
        formattedData.percentChange = ((data.changePercent)*100).toFixed(2);
        return formattedData;
    }
    time = (time)=>{
        let date=new Date((time));
        let hours = date.getHours();
        let minutes = "0"+date.getMinutes();
        let seconds = "0"+date.getSeconds();
        let formattedTime = hours+':'+minutes.substr(-2)+':'+seconds.substr(-2);
        return(formattedTime);
    }
}