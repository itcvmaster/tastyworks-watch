// @ts-nocheck
let timer = undefined;

export const debounce = (callback, ms) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
        callback();
    }, ms);
}

// Replace part of (country name === inputValue) with strong tags
export const makeMatchBold = (str, keyword) => {
	let matched = str.substring(0, keyword.length);
	let makeBold = `<strong>${matched}</strong>`;
	let boldedMatch = str.replace(matched, makeBold);

	return boldedMatch;
}

// Replace < and > all characters between
export const removeBold = (str) => {
	return str ? str.replace(/<(.)*?>/g, "") : "";
}	

// Calc & Return a function to apply scale
export const calcScale = (domain, range) => {
	[min, max] = domain;
	[start, end] = range;

	let scale = 0;
	if (max !== min) {
		scale = (end - start) / (max - min);
	}

	return (value) => value * scale;
}