import * as types from '../constants/index.js';

export var changeName = (name) => {
    return {
        type: types.CHANGE_NAME,
        name
    }
};

export var testAction = (i) => {
    return {
        type: types.TEST_ACTION,
        i
    }
};

export var changeSymbol = symbol => {
    return {
        type: types.SYMBOL,
        symbol
    }
};

export var compareSymbol = compareSymbol => {
    return {
        type: types.COMPARE_SYMBOL,
        compareSymbol
    }
};

export var getDate = date => {
    return {
        type: types.DATE,
        date
    }
};

export var getRates = rates => {
    return {
        type: types.RATES,
        rates
    }
};

export var isLoading = bool => {
    return {
        type: types.IS_LOADING,
        bool
    }
};

export var errorMessage = err => {
    return {
        type: types.ERROR_MESSAGE,
        err
    }
};

export var clearState = bool => {
    return {
        type: types.CLEAR_STATE,
        bool
    }
};
