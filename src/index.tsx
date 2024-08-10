import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {createLogger} from 'redux-logger';
import {RootState} from "./app/types";
import {applyMiddleware, createStore} from "redux";
import {appInitialState, createRootReducer} from "./app/rootReducer";
import storageMiddleware from "./app/storageMiddleware";
import {retrieveStateFromStorage} from "./app/localStorage";

const loadedStateFromStorage = retrieveStateFromStorage();

const initialState: RootState = loadedStateFromStorage || {
    app: appInitialState,
}

const middlewares: any[] = [
    createLogger({
        duration: true,
    }),
    storageMiddleware,
]

const store = createStore<RootState>(
    createRootReducer(),
    initialState,
    applyMiddleware(...middlewares)
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
