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
        return formattedData;
    }

}