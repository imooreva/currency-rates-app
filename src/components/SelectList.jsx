import React, {Component} from 'react';

class SelectList extends Component {
    constructor(props) {
        super(props);
        this.runFunctions = this.runFunctions.bind(this);
    }
    runFunctions(e) {
        if (this.props.onSelectChange) this.props.onSelectChange(e);
        if (this.props.onSelectCompare) this.props.onSelectCompare(e);
    }
    render() {
        return (
            <select ref="symbol" className="currency-select-list" onChange={this.runFunctions} defaultValue={!this.props.defaultValue ? 'USD' : this.props.defaultValue}>
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
        );
    }
}

export default SelectList;