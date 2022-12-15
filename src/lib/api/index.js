// @ts-nocheck
export const SYMBOL_ENDPOINT = "https://vast.tastyworks.com/symbols/search";
export const QUOTE_ENDPOINT = "https://vast.tastyworks.com/symbols/search";

export const fetchSymbols = async (searchKey) => {
    if (searchKey.trim() === "") return undefined;

    const response = await fetch(SYMBOL_ENDPOINT + searchKey);
    const result= await response.json();

    return result;
}