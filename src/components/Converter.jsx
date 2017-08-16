import React, {Component} from 'react';
import {getLatest} from '.././api/currency.jsx';
import SelectList from './SelectList.jsx';

import {connect} from 'react-redux';
import * as Actions from '../actions/index.js';
import {store} from '../store/index.js';

class FormConvert extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.convertRate = this.convertRate.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }
    handleSearch(symbol) {
        let {dispatch} = this.props;
        dispatch(Actions.clearState(true));
        dispatch(Actions.isLoading(true));        
        getLatest(symbol).then((data) => {
            dispatch(Actions.getRates(data.rates));
            dispatch(Actions.getDate(data.date));
            dispatch(Actions.isLoading(false));
            dispatch(Actions.changeSymbol(data.base));
        }, (e) => {
            dispatch(Actions.errorMessage(e.response.data.error));
            dispatch(Actions.isLoading(false));
        });
    }
    convertRate(e) {
        this.refs.input.value = this.refs.input.value.replace(/[^0-9.]/g,'');
        let compare = document.getElementsByClassName('currency-select-list')[1].value;
        if (e.target.value.length > 0) return this.refs.output.value = e.target.value * store.getState().mainReducer.rates[compare].toFixed(4);
        else if (e.target.value.length === 0) return this.refs.output.value = 0;
    }
    onFormSubmit(e) {
        e.preventDefault();
        let selected = document.getElementsByClassName('currency-select-list')[0].value;
        this.handleSearch(selected);
    }
    onSelectChange(e) {
        let {dispatch} = this.props;
        dispatch(Actions.compareSymbol(e.target.value));
        this.refs.output.value = this.refs.input.value * store.getState().mainReducer.rates[e.target.value];
    }
    render() {
        let state = store.getState().mainReducer;
        let renderMessage = () => {
            if (state.isLoading) {
                return 'Fetching data...';
            } else if (state.symbol && state.rates) {
                return `${state.symbol} currency data from ${state.date} loaded`;
            }
        };
        return (
            <div>
                <h1>Convert Rates</h1>
                <form onSubmit={this.onFormSubmit} className="pure-form">
                    <div>
                        <input type="text" className="pure-input converter-input" ref="input" onChange={this.convertRate}/>
                        <SelectList defaultValue={state.symbol}/>
                    </div>
                    <h2>=</h2>
                    <div>
                        <input type="number" className="pure-input converter-input" ref="output" defaultValue="0"/>
                        <SelectList onSelectChange={this.onSelectChange} defaultValue={state.compareSymbol}/>
                        <button className="pure-button pure-button-active">Get Latest Rates</button>
                    </div>
                </form>
                <p>{renderMessage()}</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    symbol: state.mainReducer.symbol,
    rates: state.mainReducer.rates,
    date: state.mainReducer.date,
    errorMessage: state.mainReducer.errorMessage,
    compareSymbol: state.mainReducer.compareSymbol
})

export default connect(mapStateToProps)(FormConvert);