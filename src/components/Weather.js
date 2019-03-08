import React, { Component } from 'react';
import Forecast from './Forecast';
class Weather extends Component {
    render () {
        return (
	<div className="weather__info">
	 {	
	 	this.props.city && this.props.country && <p className="weather__key"> Location: 
	 		<span className="weather__value"> { this.props.city }, { this.props.country }</span>
	 	</p> 
	 }
	 { 	
	 	this.props.temperature && <p className="weather__key"> Temperature: 
	 		<span className="weather__value"> { this.props.temperature } °C</span>
	 	</p> 
	 }
	 { 	
	 	this.props.humidity && <p className="weather__key"> Humidity: 
	 		<span className="weather__value"> { this.props.humidity } </span>
	 	</p> 
	 }
	 { 	
	 	this.props.description && <p className="weather__key"> Conditions: 
	 		<span className="weather__value"> { this.props.description } </span>
	 </p> 
	 }
	 { 
	 	this.props.error && <p className="weather__error">{ this.props.error }</p>  
	 }
	 {this.props.forecast && this.props.forecast.list && this.props.forecast.list.map(hourly_forecast => {
		 return (
		 <Forecast
		  hourly_forecast={hourly_forecast}
		  city={this.props.city}
		  country={this.props.country}/>
		 )
	 })}
	</div>
)
	}
}

export default Weather;