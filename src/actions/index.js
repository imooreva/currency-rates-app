export var changeName = (name) => {
    return {
        type: 'CHANGE_NAME',
        name
    }
};

export var testAction = (i) => {
    return {
        type: 'TEST_ACTION',
        i
    }
};

export var changeSymbol = symbol => {
    return {
        type: 'SYMBOL',
        symbol
    }
};

export var getDate = date => {
    return {
        type: 'DATE',
        date
    }
};

export var getRates = rates => {
    return {
        type: 'RATES',
        rates
    }
};

export var isLoading = bool => {
    return {
        type: 'IS_LOADING',
        bool
    }
};

export var errorMessage = err => {
    return {
        type: 'ERROR_MESSAGE',
        err
    }
};

export var clearState = bool => {
    return {
        type: 'CLEAR_STATE',
        bool
    }
};
