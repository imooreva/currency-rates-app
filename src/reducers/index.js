import {combineReducers} from 'redux';
import * as types from '../constants/index.js';

var mainReducer = (state = {}, action) => {
    switch (action.type) {
        case types.SYMBOL:
            return Object.assign({}, state, {
                symbol: action.symbol
            });
        case types.COMPARE_SYMBOL:
            return Object.assign({}, state, {
                compareSymbol: action.compareSymbol
            });
        case types.DATE:
            return Object.assign({}, state, {
                date: action.date
            });
        case types.ERROR_MESSAGE:
            return Object.assign({}, state, {
                errorMessage: action.errorMessage
            });
        case types.RATES:
            return Object.assign({}, state, {
                rates: action.rates
            });
        case types.IS_LOADING:
            return Object.assign({}, state, {
                isLoading: action.bool
            });
        case types.CLEAR_STATE:
            if (action.bool) return state = {};
            else return state;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    mainReducer
});

export default rootReducer;
