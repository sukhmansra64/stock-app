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
        console.log(data);
        const formattedData = {}
        formattedData.price=data.latestPrice;
        formattedData.date = data.latestTime;
        formattedData.time = this.time(data.latestUpdate);
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