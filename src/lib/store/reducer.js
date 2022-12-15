// @ts-nocheck
import { Actions } from "./actions";

export const defaultUser = {
    first: "",
    last: "",
    watches: {}
};

export const userReducer = (state = defaultUser, action) => {

    const defaultSymbols = ["AAPL", "MSFT", "SPY"];
    const handler = {
        [Actions.CREATE_USER]: () => {
            const watchId = `${Date.now()}`;
            return {
                first: action.payload.first,
                last: action.payload.last,
                watches: {
                    [watchId]: {
                        id: watchId,
                        displayName: `${action.payload.first}'s first list`,
                        symbols: defaultSymbols
                    }
                }
            }
        },

        [Actions.CREATE_WATCH]: () => {
            return {
                ...state,
                watches: {
                    ...state.watches,
                    [action.payload.watchId]: {
                        id: action.payload.watchId,
                        displayName: action.payload.displayName,
                        symbols: defaultSymbols
                    }
                }
            }
        },

        [Actions.DELETE_WATCH]: () => {
            const newWatches = structuredClone(state.watches);
            delete newWatches[action.payload.watchId];

            return {
                ...state,
                watches: newWatches
            }
        },

        [Actions.ADD_SYMBOL]: () => {
            const newWatches = structuredClone(state.watches);
            const watch = newWatches[action.payload.watchId];

            // Error checking
            if (!watch) return state;

            // Check duplicated symbols
            if (watch.symbols.find((symbol) => symbol === action.payload.symbol)) {
                return state;
            }

            // Add a new symbol
            watch.symbols.push(action.payload.symbol);
            return {
                ...state,
                watches: newWatches
            }
        },

        [Actions.DELETE_SYMBOL]: () => {
            const newWatches = structuredClone(state.watches);
            const watch = newWatches[action.payload.watchId];

            // Error checking
            if (!watch || !watch.symbols) return state;

            // Delete a symbol
            watch.symbols = watch.symbols.filter(symbol => symbol !== action.payload.symbol);
            return {
                ...state,
                watches: newWatches
            }
        },

    };

    if (!handler[action.type]) {
        return state;
    }

    return handler[action.type]();
}