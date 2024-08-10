import React from 'react';
import './App.css';
import {Provider as Redux} from 'react-redux';
import Header from "../organisms/header/Header";
import Content from "../organisms/content/Content";

interface Props {
    store: any;
}

function App({store}: Props) {
    return (
        <Redux store={store}>
            <div className="app">
                <Header/>
                <Content/>
            </div>
        </Redux>
    );
}

export default App;
