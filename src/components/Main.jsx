import React, {Component} from 'react';

import FormMain from './FormMain.jsx';
import About from './About.jsx';
import {Switch, Route} from 'react-router-dom'

export default function Main() {
    return (
        <Switch>
            <Route exact path='/' component={FormMain}/>
            <Route path='/about' component={About}/>
        </Switch>
    );
}
