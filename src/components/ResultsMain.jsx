import React, {Component} from 'react';
import {connect} from 'react-redux';

function ResultsMain(props) {
    if (typeof props.errorMessage === 'string') {
        return (
            <div className="text-center">
                {props.errorMessage}
            </div>
        );
    };

    let tableHeader, i = 0, arr = [];

    if (props.date) tableHeader = `${props.symbol} rates ${props.date}:`;
    else tableHeader = `Rates for ${props.data.symbol}:`;
    
    while (i < Object.values(props.rates).length) {
        arr.push(Object.keys(props.rates)[i] + ":" + Number(Object.values(props.rates)[i]).toFixed(3))
        i++
    };
    arr.sort();
    
    return (
        <div className="results">
            <table className="pure-table pure-table-bordered" role="grid">
                <thead>
                    <tr><td colSpan="2" className="table-header">{tableHeader}</td></tr>
                    <tr>
                        <th scope="column">Currency</th>
                        <th scope="column">Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {arr.map((name,index) => <tr key={index}><td>{name.split(":")[0]}</td><td>{name.split(":")[1]}</td></tr> )}
                </tbody>
            </table>
        </div>
    );
}

export default connect()(ResultsMain);
