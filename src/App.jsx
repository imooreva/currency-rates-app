import React, {Component} from 'react';

import {getLatest} from './api/currency.js';
import FormMain from './components/FormMain.jsx';
import FormHistorical from './components/FormHistorical.jsx';
import About from './components/About.jsx';
import Main from './components/Main.jsx';
import Nav from './components/Nav.jsx';
import ResultsMain from './components/ResultsMain.jsx';

export default function App() {
    return (
        <div className="app-container">
            <Nav/>
            <Main/>
        </div>
    );
};
