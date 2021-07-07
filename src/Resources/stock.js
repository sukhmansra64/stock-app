import {iexData} from "../iexSourceStuff/SourceData";
//an object which uses API fetches to provide information
//uses the ticker to find the stock and the callback to set the data to the component's state
export class stock{
    //constructor function takes the ticker and callback and sets the information received through the API call to the callback function
    constructor(ticker, callBack){
        const fetchFunction = async (ticker, callBack)=>{
            const response = await fetch(this.stockUrl(ticker));
            const data = await response.json();
            await callBack(await this.formatStock(data));
        }
        fetchFunction(ticker,callBack);
    }
    //holds the URL and provides the ticker for the API fetch
    stockUrl = (ticker)=>{
        return `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${iexData.apiToken}`
    }
    //formats the data received by the API call and checks if the data is received properly
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
    //formats the time in a readable manner
    time(time){
        let date = new Date(time * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    }
}