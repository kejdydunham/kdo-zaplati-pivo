import {RootState} from "../types";

let storage: Storage | undefined;
const wnd: any = window;

const initStorage = () => {
    if (typeof Storage !== 'undefined') {
        storage = wnd.localStorage;
    } else {
        console.warn('No local storage available');
    }
};

if (wnd.document.readyState !== 'loading') {
    initStorage();
} else {
    wnd.addEventListener('DOMContentLoaded', () => {
        initStorage();
    });
}

export const getStorage = (): Storage | undefined => storage;

const appState = "appState";
export const preserveStateToStorage = (state: RootState) => {
    storage?.setItem(appState, JSON.stringify(state))
}

export const retrieveStateFromStorage = (): RootState | null => {
    const stateString = storage?.getItem(appState);
    if (stateString) {
        return JSON.parse(stateString);
    }
    return null;
}
