import {iexData} from "../iexSourceStuff/SourceData";
//object used to search through stocks and return the fitting matches using IEXcloud
//provided with a callback function and the input to set the appropriate matches and compare the input
export class autocompleteData{
    //function which takes the input and provides it to the API, then the API returns the matches and it is provided to the callback
    fetchData(callback,keywords) {
        const fetchFunction = async (callBack)=>{
            const response = await fetch(this.stockUrl(keywords));
            const data = await response.json();
            await callBack(await data);
        }
        fetchFunction(callback);
    }
    //holds the url of the API and takes in the input
    stockUrl=(keywords)=>{
        return `https://cloud.iexapis.com/stable/search/${keywords}?token=${iexData.apiToken}`
    }
    //not used
    filter(array, key, value){
        let i, j, filtered = [], item;

        for(i =  0, j = array.length; i<j; i++){
            item = array[i];
            if(typeof item[key] !== "undefined" && (item[key]).toLowerCase().includes(value)){
                filtered.push(item);
            }
        }

        return filtered;
    }
}