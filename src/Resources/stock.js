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
        //refactor
        return `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${iexData.apiToken}`
    }
    formatStock = (data)=> {
        //refactor this whole thing
        const formattedData = {}
        formattedData.price=((parseFloat(data["Global Quote"]["05. price"])).toFixed(2));
        formattedData.date = (data["Global Quote"]["07. latest trading day"]);
        formattedData.yesterdayClose = (parseFloat(data["Global Quote"]["08. previous close"])).toFixed(2);
        formattedData.dollarChange = (parseFloat(data["Global Quote"]["09. change"])).toFixed(2);
        formattedData.percentChange = (parseFloat(data["Global Quote"]["10. change percent"])).toFixed(2);
        console.log(data);
        return formattedData;
    }

}