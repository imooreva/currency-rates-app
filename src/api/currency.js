import axios from 'axios';
const baseURL = 'http://api.fixer.io';

module.exports = {
    getLatest(symbol) {
        let reqURL = `${baseURL}/latest?base=${symbol}`;
        return axios.get(reqURL).then((res) => {
            return res.data;
        }).catch((e)=> {
            return Promise.reject(e.response);
        });
    },
    getHistorical(symbol, day) {
        let reqURL = `${baseURL}/${day}?base=${symbol}`;
        return axios.get(reqURL).then((res) => {
            return res.data;
        }).catch((e)=> {
            return Promise.reject(e.response);
        });
    }
}
