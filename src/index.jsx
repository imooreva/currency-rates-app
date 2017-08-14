// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component
import React, {Component} from 'react';
import {render} from 'react-dom';
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom';

render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('react-root'));
