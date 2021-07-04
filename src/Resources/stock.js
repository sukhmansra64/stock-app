import {iexData} from "../iexSourceStuff/SourceData";

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
        if(data["latestPrice"]){formattedData.price=(data["latestPrice"]).toFixed(2);}
        formattedData.date = (data["latestTime"]);
        formattedData.yesterdayClose = (data["previousClose"]);
        if(data["change"]){formattedData.dollarChange = (data["change"]).toFixed(2);}
        if(data["changePercent"]){formattedData.percentChange = (data["changePercent"]).toFixed(2);}
        formattedData.exchange = (data["primaryExchange"])
        if(data["close"]){formattedData.close=(data["close"]).toFixed(2);}
        if(data["open"]){formattedData.open=(data["open"]).toFixed(2);}
        if(data["high"]){formattedData.high=(data["high"]).toFixed(2);}
        if(data["low"]){formattedData.low=(data["low"]).toFixed(2);}
        formattedData.time = this.time(data.latestUpdate);
        return formattedData;
    }
    time(time){
        let date = new Date(time * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    }
}