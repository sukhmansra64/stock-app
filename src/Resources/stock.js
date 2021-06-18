import {iexData} from "../iexSourceStuff/iexSourceData";

export class stock{
    constructor(ticker, callBack){
        const fetchFunction = async (ticker, callBack)=>{
            const response = await fetch(this.stockUrl(ticker));
            const data = await response.json();
            await callBack(await this.formatStock(data, await this.getYesterdayInfo(ticker)));
        }
        fetchFunction(ticker,callBack);
    }
    stockUrl = (ticker)=>{
        return `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${iexData.apiToken}`
    }
    formatStock = (data, yesterData)=> {
        const formattedData = {}
        formattedData.price=data.latestPrice;
        formattedData.date = data.latestTime;
        formattedData.time = this.time(data.latestUpdate);
        formattedData.yesterdayClose = yesterData.close;
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
    getYesterdayInfo = (ticker)=>{

        const fetchFunction = async (ticker)=>{
            const response = await fetch(this.yesterdayUrl(ticker));
            const data = await response.json();
            return  await data;
        }
        return fetchFunction(ticker);
    }
    yesterdayUrl = (ticker)=>{
        return `https://cloud.iexapis.com/stable/stock/${ticker}/previous?chartLast=1&token=${iexData.apiToken}`
    }

}