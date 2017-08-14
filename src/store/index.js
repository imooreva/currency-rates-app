import {createStore, compose} from 'redux';
import rootReducer from '../reducers/index.js';

export var store = createStore(rootReducer, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

var x = store.subscribe(()=> {
    var state = store.getState();
});
