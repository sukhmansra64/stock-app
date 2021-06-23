import {iexData} from "../iexSourceStuff/iexSourceData";

export class autocompleteData{
    constructor(callback) {
        const fetchFunction = async (callBack)=>{
            const response = await fetch(this.stockUrl());
            const data = await response.json();
            await callBack(await data);
        }
        fetchFunction(callback);
    }
    stockUrl=()=>{
        return `https://cloud.iexapis.com/stable/ref-data/symbols?token=${iexData.apiToken}`
    }
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