import * as types from '../constants/index.js';

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

export var errorMessage = errorMessage => {
    return {
        type: types.ERROR_MESSAGE,
        errorMessage
    }
};

export var clearState = bool => {
    return {
        type: types.CLEAR_STATE,
        bool
    }
};
