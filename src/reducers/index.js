import {combineReducers} from 'redux';

var mainReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SYMBOL':
            return Object.assign({}, state, {
                symbol: action.symbol
            });
        case 'DATE':
            return Object.assign({}, state, {
                date: action.date
            });
        case 'ERROR_MESSAGE':
            return Object.assign({}, state, {
                errorMessage: action.errorMessage
            });
        case 'RATES':
            return Object.assign({}, state, {
                rates: action.rates
            });
        case 'IS_LOADING':
            return Object.assign({}, state, {
                isLoading: action.bool
            });
        case 'CLEAR_STATE':
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
