// @ts-nocheck
import { PUBLIC_IEX_API_KEY } from '$env/static/public';

export const SYMBOL_ENDPOINT = "https://vast.tastyworks.com/symbols/search/";
export const IEX_ENDPOINT = "https://cloud.iexapis.com/v1/stock/";
export const QUOTE_ENDPOINT = "https://cloud.iexapis.com/v1/stock/market/batch";
export const fetchSymbols = async (searchKey) => {
    if (searchKey.trim() === "") return undefined;

    try {
        const response = await fetch(SYMBOL_ENDPOINT + searchKey);
        const result = await response.json();

        return result;

    } catch (e) {
        console.log("[Error - fetchSymbols]:", e);
    }

    return undefined;
}

export const fetchQuotes = async (symbols) => {
    if (!symbols || symbols.length === 0) return [];

    try {
        const token = "&token=" + PUBLIC_IEX_API_KEY;
        const types = "&types=quote";
        const symbolKey = symbols.reduce((prev, cur, index) => (index === 0 ? prev + cur : prev + "," + cur), "symbols=");
        const endpoint = QUOTE_ENDPOINT + "?" + symbolKey + types + token;
        const response = await fetch(endpoint);
        const result = await response.json();

        // Return transformed data, but not recommended to do this here.
        return symbols.map(symbol => {
            const quote = result[symbol];
            if (!quote) {
                return { 
                    symbol, 
                    desc: "-", 
                    bid_price: "-", 
                    ask_price: "-", 
                    last_price: "-"
                }
            }

            return {
                symbol: symbol,
                desc: result[symbol].quote.companyName,
                bid_price: result[symbol].quote.iexBidPrice,
                ask_price: result[symbol].quote.iexAskPrice,
                last_price: result[symbol].quote.latestPrice,
            }
        });

    } catch (e) {
        console.log("[Error - fetchQuotes]:", e);
    }

    return [];
}

export const fetchChart = async (symbol) => {

    try {
        const endpoint = `${IEX_ENDPOINT}${symbol}/chart/1m?token=${PUBLIC_IEX_API_KEY}`;
        const response = await fetch(endpoint);
        const result = await response.json();

        // Return transformed data, but not recommended to do this here.
        return result.map(quote => (
            {
                x: new Date(quote.date).getTime(),
                y: quote.close,
            }
        ));

    } catch (e) {
        console.log("[Error - fetchQuotes]:", e);
    }

    return [];
}