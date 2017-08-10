import React from 'react';
import {Link} from 'react-router-dom'

export default function Nav() {
    return (
        <div className="pure-menu pure-menu-horizontal">
            <ul className="pure-menu-list">
                <li className="pure-menu-item"><Link className="pure-menu-link" to='/'>Latest Rates</Link></li>
                <li className="pure-menu-item"><Link className="pure-menu-link" to='/historical'>Rate History</Link></li>
                <li className="pure-menu-item"><Link className="pure-menu-link" to='/convert'>Convert</Link></li>
                <li className="pure-menu-item"><Link className="pure-menu-link" to='/about'>About</Link></li>
            </ul>
        </div>
    );
}
