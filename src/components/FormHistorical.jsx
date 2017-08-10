import React, {Component} from 'react';
import {getHistorical} from '.././api/currency.jsx';
import ResultsMain from './ResultsMain.jsx';
import SelectList from './SelectList.jsx';

class FormHistorical extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.onAltChange = this.onAltChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.state = {
            date: undefined,
            errorMessage: undefined,
            isLoading: false,
            rates: undefined,
            symbol: 'USD'
        };
    }
//    componentDidMount() {
//        let symbol = this.props.symbol;
//        if (symbol && symbol.length > 0) {
//            this.handleSearch(symbol);
//            //window.location.hash = `#/?latest=${symbol}`;
//        }
//    }
//    componentWillReceiveProps(newProps) {
//        let symbol = newProps.symbol;
//        if (symbol && symbol.length > 0) {
//            this.handleSearch(symbol);
//            //window.location.hash = `#/?latest=${symbol}`;
//        }
//    }
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
        let symbol = (this.refs.other.value.length > 2) ? this.refs.other.value : this.state.symbol,
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
    onSelectChange(e) {
        this.setState({
            symbol : e.target.value
        });
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
                        <SelectList onSelectChange={this.onSelectChange}/>
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
