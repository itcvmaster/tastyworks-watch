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
            return {
                first: action.payload.first,
                last: action.payload.last,
                watches: {
                    [`${action.payload.first}'s first list`]: defaultSymbols
                }
            }
        },

        [Actions.CREATE_WATCH]: () => {
            return {
                ...state,
                watches: {
                    ...state.watches,
                    [action.payload.watchId]: defaultSymbols
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
            if (watch.find((symbol) => sym === action.payload.symbol)) {
                return state;
            }

            // Add a new symbol
            watch.push(action.payload.symbol);
            return {
                ...state,
                watches: newWatches
            }
        },

        [Actions.DELETE_SYMBOL]: () => {
            const newWatches = structuredClone(state.watches);
            const watch = newWatches[action.payload.watchId];

            // Error checking
            if (!watch) return state;

            // Delete a symbol
            delete watch[action.payload.symbol];
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