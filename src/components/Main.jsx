import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'

import FormMain from './FormMain.jsx';
import FormHistorical from './FormHistorical.jsx';
import Converter from './Converter.jsx';
import About from './About.jsx';

import {store} from '../store/index.js';
import {Provider} from 'react-redux';
import * as Actions from '../actions/index.js';

export default function Main() {
    return (
        <Provider store={store}>
            <Switch>
                <Route exact path='/' component={FormMain}/>
                <Route path='/historical' component={FormHistorical}/>
                <Route path='/convert' component={Converter}/>
                <Route path='/about' component={About}/>
            </Switch>
        </Provider>
    );
};
