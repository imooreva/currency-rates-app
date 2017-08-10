import React, {Component} from 'react';

import FormMain from './FormMain.jsx';
import FormHistorical from './FormHistorical.jsx'
import Converter from './Converter.jsx';
import About from './About.jsx';
import {Switch, Route} from 'react-router-dom'

export default function Main() {
    return (
        <Switch>
            <Route exact path='/' component={FormMain}/>
            <Route path='/historical' component={FormHistorical}/>
            <Route path='/convert' component={Converter}/>
            <Route path='/about' component={About}/>
        </Switch>
    );
}
