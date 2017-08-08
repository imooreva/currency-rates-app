import React, {Component} from 'react';

import {getLatest} from './api/currency.jsx';
import FormMain from './components/FormMain.jsx';
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
}

