import React, {Component} from 'react';
import {getHistorical} from '.././api/currency.jsx';
import ResultsMain from './ResultsMain.jsx';
import SelectList from './SelectList.jsx';

import {connect} from 'react-redux';
import * as Actions from '../actions/index.js';
import {store} from '../store/index.js';

class FormHistorical extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.onAltChange = this.onAltChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    handleSearch(symbol, date) {
        let {dispatch} = this.props;
        dispatch(Actions.clearState(true));
        dispatch(Actions.isLoading(true));        
        getHistorical(symbol, date).then((data) => {
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
        let symbol = (this.refs.other.value.length > 2) ? this.refs.other.value : document.getElementsByClassName('currency-select-list')[0].value,
            date = this.refs.date.value;
        if (symbol.length > 0 && date.length > 0) {
            this.handleSearch(symbol, date);
        };
    }
    onAltChange(e) {
        e.preventDefault();
        this.refs.other.value = this.refs.other.value.toUpperCase();
        if (this.refs.other.value.length > 2) {
            document.getElementsByClassName('currency-select-list')[0].disabled = true;
            document.getElementsByClassName('currency-select-list')[0].style.opacity = 0.7;
        }
        else {
            document.getElementsByClassName('currency-select-list')[0].disabled = false;
            document.getElementsByClassName('currency-select-list')[0].style.opacity = null;
        }
    }
    render() {
        let state = store.getState().mainReducer;
        let renderMessage = () => {
            if (state.isLoading) return <h2>Fetching data...</h2>;
            else if (state.rates) return <ResultsMain symbol={state.symbol} rates={state.rates} date={state.date} errorMessage={state.errorMessage}/>;
        };
        let todaysDate = new Date().toISOString().slice(0,10);
        return (
            <div>
                <h1>Historical Rates</h1>
                <form onSubmit={this.onFormSubmit} className="pure-form">
                    <div>
                        <SelectList defaultValue={state.symbol}/>
                    </div>
                    <div><input type="date" ref="date" min="1999-01-01" max={todaysDate}/></div>
                    <div><p>Enter another currency:</p><input type="text" ref="other" onChange={this.onAltChange}/></div>                    
                    <div><button className="pure-button pure-button-active">Get Historical Rates</button></div>
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

export default connect(mapStateToProps)(FormHistorical);
