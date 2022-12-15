// @ts-nocheck
import { PUBLIC_IEX_API_KEY } from '$env/static/public';	

export const SYMBOL_ENDPOINT = "https://vast.tastyworks.com/symbols/search/";
export const QUOTE_ENDPOINT = "https://cloud.iexapis.com/v1/stock/market/batch";

export const fetchSymbols = async (searchKey) => {
    if (searchKey.trim() === "") return undefined;

    const response = await fetch(SYMBOL_ENDPOINT + searchKey);
    const result= await response.json();

    return result;
}

export const fetchQuotes = async (symbols) => {
    if (!symbols || symbols.length === 0) return [];

    const token = "&token=" + PUBLIC_IEX_API_KEY;
    const types = "&types=quote";
    const symbolKey = symbols.reduce((prev, cur, index) => (index === 0 ? prev + cur : prev + "," + cur), "symbols=");
    const response = await fetch(QUOTE_ENDPOINT + "?" + symbolKey + types + token);
    const result= await response.json();

    console.log(result);
    return result;
}

fetchQuotes(["aapl","fb","spy"]);

export const fetchChart = async (symbol) => {
    return [];
}