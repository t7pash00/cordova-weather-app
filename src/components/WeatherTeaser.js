import React, { PureComponent } from 'react';
//import styles from './WeatherTeaser.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
let moment = require('moment');

export default class WeatherTeaser extends PureComponent {
    render() {

        const time = moment.unix(this.props.data.data.dt).format('D.M.YYYY HH:mm:ss');

        return this.props.data == null ? null :
            (
                <div onClick={() => { this.props.update(this.props.data) }}>
                    <div >
                        <div>{this.props.data.city}, {this.props.data.city.country}</div>
                        <div>{this.props.data.data.main.temp} &#8451;</div>
                        <div>{time}</div>
                    </div>                    
                </div>
            );
    }
}