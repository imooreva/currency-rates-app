import React, {Component} from 'react';
import {getLatest} from '.././api/currency.jsx';
import SelectList from './SelectList.jsx';

class Converter extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.convertRate = this.convertRate.bind(this);
        this.onSelectCompare = this.onSelectCompare.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.state = {
            compare: 'EUR',
            date: undefined,
            errorMessage: undefined,
            isLoading: false,
            rates: undefined,
            symbol: 'USD'
        };
    }
    handleSearch(symbol) {
        this.setState({
            date: undefined,
            errorMessage: undefined,
            isLoading: true,
            rates: undefined,
            symbol            
        });
        getLatest(symbol).then((data) => {
            this.setState({
                date: data.date,
                isLoading: false,
                rates: data.rates,
                symbol: data.base
            });
        }, (e) => {
            this.setState({
                errorMessage: e.response.data.error,
                isLoading: false,
                symbol: undefined
            });
        });
    }
    convertRate(e) {
        let compare = this.state.compare;
        if (e.target.value.length > 0) return this.refs.output.value = e.target.value * this.state.rates[compare];
        else if (e.target.value.length === 0) return this.refs.output.value = 0;
    }
    onFormSubmit(e) {
        e.preventDefault();
        this.handleSearch(this.state.symbol);
    }
    onSelectChange(e) {
        this.setState({
            symbol: e.target.value
        })
    }
    onSelectCompare(e) {
        let compare = e.target.value
        this.setState({
            compare
        });
        this.refs.output.value = this.refs.input.value * this.state.rates[compare];
    }
    render() {
        let {date, errorMessage, isLoading, rates, symbol} = this.state;
        let renderMessage = () => {
            if (isLoading) {
                return 'Fetching data...';
            } else if (symbol && rates) {
                return `Data loaded for ${symbol} as of ${date}`;
            }
        };
        return (
            <div>
                <h1>Rate to Rate</h1>
                <form onSubmit={this.onFormSubmit} className="pure-form">
                    <div>
                        <input type="text" className="pure-input converter-input" ref="input" onChange={this.convertRate}/>
                        <SelectList onSelectChange={this.onSelectChange}/>
                    </div>
                    <h2>=</h2>
                    <div>
                        <input type="text" className="pure-input converter-input" ref="output"/>
                        <SelectList onSelectCompare={this.onSelectCompare} defaultValue={'EUR'}/>
                        <button className="pure-button pure-button-active">Get Latest Rates</button>
                    </div>
                </form>
                <p>{renderMessage()}</p>
            </div>
        )
    }
}

export default Converter;