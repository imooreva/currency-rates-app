import React, {Component} from 'react';
import {getHistorical} from '.././api/currency.jsx';
import ResultsMain from './ResultsMain.jsx';

class FormHistorical extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.onAltChange = this.onAltChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            date: undefined,
            errorMessage: undefined,
            isLoading: false,
            rates: undefined,
            symbol: 'USD'
        };
    }
    componentDidMount() {
        let symbol = this.props.symbol;
        if (symbol && symbol.length > 0) {
            this.handleSearch(symbol);
            //window.location.hash = `#/?latest=${symbol}`;
        }
    }
    componentWillReceiveProps(newProps) {
        let symbol = newProps.symbol;
        if (symbol && symbol.length > 0) {
            this.handleSearch(symbol);
            //window.location.hash = `#/?latest=${symbol}`;
        }
    }
    handleSearch(symbol, date) {
        this.setState({
            date: undefined,
            errorMessage: undefined,
            isLoading: true,
            rates: undefined,
            symbol            
        });
        getHistorical(symbol, date).then((data) => {
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
    onFormSubmit(e) {
        e.preventDefault();
        let symbol = (this.refs.other.value.length > 2) ? this.refs.other.value : this.refs.symbol.value.toUpperCase(),
            date = this.refs.date.value;
        if (symbol.length > 0 && date.length > 0) {
            //this.refs.symbol.value = '';
            this.handleSearch(symbol, date);
        };
    }
    onAltChange(e) {
        e.preventDefault();
        this.refs.other.value = this.refs.other.value.toUpperCase();
        if (this.refs.other.value.length > 2) {
            document.getElementsByClassName('currency-selectbox')[0].disabled = true;
            document.getElementsByClassName('currency-selectbox')[0].style.opacity = 0.4;
        }
        else {
            document.getElementsByClassName('currency-selectbox')[0].disabled = false;
            document.getElementsByClassName('currency-selectbox')[0].style.opacity = null;
        }
    }
    render() {
        let {date, errorMessage, isLoading, rates, symbol} = this.state;
        let renderMessage = () => {
            if (isLoading) {
                return <h2>Fetching data...</h2>;
            } else if (symbol && rates) {
                return <ResultsMain symbol={symbol} rates={rates} date={date} dataerrorMessage={errorMessage}/>;
            }
        };
        let todaysDate = new Date().toISOString().slice(0,10);
        return (
            <div>
                <h1>Historical Rates</h1>
                <form onSubmit={this.onFormSubmit} className="pure-form">
                    <div>
                        <select ref="symbol" className="currency-selectbox">
                            <option value="USD">USD - U.S. Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British Pound</option>
                            <option value="AUD">AUD - Australian Dollar</option>                            
                            <option value="BGN">BGN - Bulgarian Lev</option>
                            <option value="BRL">BRL - Brazilian Real</option>
                            <option value="CAD">CAD - Canadian Dollar</option>
                            <option value="CHF">CHF - Swiss Franc</option>
                            <option value="CNY">CNY - Chinese Yen</option>
                            <option value="CZK">CZK - Czech Koruna</option>
                            <option value="DKK">DKK - Danish Krone</option>
                            <option value="HKD">HKD - Hong Kong Dollar</option>
                            <option value="HRK">HRK - Croatian Kuna</option>
                            <option value="HUF">HUF - Hungarian Forint</option>
                            <option value="IDR">IDR - Indonesian Rupiah</option>
                            <option value="ILS">ILS - Israeli New Shekel</option>
                            <option value="INR">INR - Indian Rupee</option>
                            <option value="JPY">JPY - Japanese Yen</option>
                            <option value="KRW">KRW - South Korean Won</option>
                            <option value="MXN">MXN - Mexican Peso</option>
                            <option value="MYR">MYR - Malaysian Ringgit</option>
                            <option value="NOK">NOK - Norwegian Kronor</option>
                            <option value="NZD">NZD - New Zealand Dollar</option>
                            <option value="PHP">PHP - Philippine Peso</option>
                            <option value="PLN">PLN - Polish Zloty</option>
                            <option value="RON">RON - Romanian Leu</option>
                            <option value="RUB">RUB - Russian Ruble</option>
                            <option value="SEK">SEK - Swedish Kronor</option>
                            <option value="SGD">SGD - Singapore Dollar</option>
                            <option value="THB">THB - Thai Baht</option>
                            <option value="TRY">TRY - Turkish Lira</option>
                            <option value="ZAR">ZAR - South African Rand</option>
                        </select>
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

export default FormHistorical;
