import React, { PureComponent } from 'react';
//import styles from './WeatherTeaser.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
let moment = require('moment');

export default class WeatherTeaser extends PureComponent {
    render() {

        const date = moment.unix(this.props.data.data.dt).format('MMMM D, YYYY');

        const time = moment.unix(this.props.data.data.dt).format('HH:mm:ss');

        return this.props.data == null ? null :
        (
            <div onClick={() => { this.props.update(this.props.data) }} className="col-md-3 mt-2">
                <div className="card card-body bg-light">
                    <div className="card-title text-capitalize" style={{fontSize: '18px'}}>
                        {this.props.data.city}, {this.props.data.country}
                    </div>
                    <div>{this.props.data.data.main.temp} &#8451;</div>
                    <div>{date}</div>
                    <div>{time}</div>
                </div>
            </div>
        );
    }
}