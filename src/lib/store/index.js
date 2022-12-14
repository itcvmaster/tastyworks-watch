// @ts-nocheck
import { writable } from "svelte/store";
import { browser } from '$app/environment';

import { userReducer } from "./reducer";

// Function to create a store with reducer
export const createStore = (reducer, initialState) => {
    const { subscribe, update } = writable(initialState);
    const dispatch = (action) => update((state) => reducer(state, action));

    return { subscribe, dispatch };
};

// Load stored user data from local storage & Create a store
let persistedUser = (browser && localStorage.getItem('user')) || '{}';
export const userStore = createStore(userReducer, JSON.parse(persistedUser));

// Update local storage automatically upon store changes.
if (browser) {
    userStore.subscribe(user => {
        localStorage.user = JSON.stringify(user);
    });
}