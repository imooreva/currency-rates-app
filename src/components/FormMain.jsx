import React, {Component} from 'react';
import {getLatest} from '../api/currency.jsx';
import ResultsMain from './ResultsMain.jsx';
import SelectList from './SelectList.jsx';

import {connect} from 'react-redux';
import * as Actions from '../actions/index.js';
import {store} from '../store/index.js';

class FormMain extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    handleSearch(symbol) {
        let {dispatch} = this.props;
        dispatch(Actions.clearState(true));
        dispatch(Actions.isLoading(true));        
        getLatest(symbol).then((data) => {
            let {dispatch} = this.props;
            dispatch(Actions.getRates(data.rates));
            dispatch(Actions.getDate(data.date));
            dispatch(Actions.isLoading(false));
            dispatch(Actions.changeSymbol(data.base));
        }, (e) => {
            dispatch(Actions.errorMessage(e.response.data.error));
            dispatch(Actions.isLoading(false));
        });
    }
    onFormSubmit(e) {
        e.preventDefault();
        let selected = document.getElementsByClassName('currency-select-list')[0].value;
        this.handleSearch(selected);
    }
    render() {
        let state = store.getState().mainReducer;
        let renderMessage = () => {
            if (state.isLoading) return <h2>Fetching data...</h2>;
            else if (state.rates) return <ResultsMain symbol={state.symbol} rates={state.rates} date={state.date} errorMessage={state.errorMessage}/>;
        };
        return (
            <div>
                <h1>Latest Rates</h1>
                <form onSubmit={this.onFormSubmit} className="pure-form">
                    <div>
                        <SelectList/>
                    </div>
                    <div>
                        <button className="pure-button pure-button-active">Get Latest Rates</button>
                    </div>
                </form>
                {renderMessage()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    symbol: state.mainReducer.symbol,
    rates: state.mainReducer.rates,
    date: state.mainReducer.date,
    errorMessage: state.mainReducer.errorMessage
})

export default connect(mapStateToProps)(FormMain);
