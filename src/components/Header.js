import React, { Component } from 'react';
import 'bootstrap';

class Header extends Component {
    render () {
        return (
            <div className="container-fluid bg-light">
                <div className="p-4">
                    <h1>Weather Finder</h1>
                    <h4 className="subhead">Find out temperature, conditions and more.....</h4>
                </div>
            </div>
        )
    }
}

export default Header;