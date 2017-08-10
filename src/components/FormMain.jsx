import React, {Component} from 'react';
import {getLatest} from '.././api/currency.jsx';
import ResultsMain from './ResultsMain.jsx';
import SelectList from './SelectList.jsx';

class FormMain extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
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
    onFormSubmit(e) {
        e.preventDefault();
        this.handleSearch(this.state.symbol);
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
                return <ResultsMain symbol={symbol} rates={rates} date={date} errorMessage={errorMessage}/>;
            }
        };
        return (
            <div>
                <h1>Latest Rates</h1>
                <form onSubmit={this.onFormSubmit} className="pure-form">
                    <div>
                        <SelectList onSelectChange={this.onSelectChange}/>
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

export default FormMain;
