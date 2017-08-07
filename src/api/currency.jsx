import axios from 'axios';
const baseURL = 'http://api.fixer.io';

module.exports = {
    getLatest(symbol) {
        let reqURL = `${baseURL}/latest?base=${symbol}`;
        return axios.get(reqURL).then((res) => {
            if (res.data.error) {
                //return new Error(res.data.error);
                return res.data.error;
            } else {
                //console.log(res);
                return res.data;
            }
        });
    },
//    getLatestMulti(symb, symbs) {
//        var symbol = symb;
//        var symbols = symbs;
//        var reqURL = `${baseURL}/latest?symbols=${symbols}&base=${symbol}`;
//        return axios.get(reqURL).then((res) => {
//            if (res.data.error) {
//                //return new Error(res.data.error);
//                return res.data.error
//            } else {
//                return res.data.rates;
//            }
//        });
//    },
    getHistorical(symbol, day) {
        let reqURL = `${baseURL}/${day}?base=${symbol}`;
        return axios.get(reqURL).then((res) => {
            if (res.data.error) {
                //return new Error(res.data.error);
                return res.data.error;
            } else {
                return res.data.rates;
            }
        });
    },
    handleSelectBox(i) {
        return i.state.defaultCurrency;
    }    
}
