import React, {Component} from 'react';

import {getLatest} from './api/currency.jsx';
import FormMain from './components/FormMain.jsx';
import ResultsMain from './components/ResultsMain.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
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
  render() {
      let {date, errorMessage, isLoading, rates, symbol} = this.state;
      let renderMessage = () => {
          if (isLoading) {
              return <h2>Fetching data...</h2>;
          } else if (symbol && rates) {
              return <ResultsMain symbol={symbol} rates={rates} date={date} dataerrorMessage={errorMessage}/>;
          }
      };
    return (
        <div className="app-container">
            <h1>Latest Rates</h1>
            <FormMain onSearch={this.handleSearch}/>
            {renderMessage()}
        </div>
    );
  }
}

export default App;
