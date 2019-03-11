import React, { Component } from 'react';
import Forecast from './Forecast';
//import image from "./res/img/clouds-37009__340.png"

class WeatherData extends Component {
  render () {
    return (
      <div>
        <div className="card card-body bg-dark text-light">
          <div className="card-body">
            <h5 className="card-title">{ this.props.city }, { this.props.country }</h5>
            <p className="card-text">{this.props.temperature} °C</p>
            <button className="btn btn-light btn-sm" type="button" data-toggle="collapse" data-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1" onClick={this.props.showWeather}>More Details</button>
            <button className="btn btn-light btn-sm mx-3" onClick={() => this.props.saveCityData(this.props.currentData, this.props.stateData)}>Add to Favorites</button>
            <div className="collapse mt-5" id="collapseExample1">
              <div>
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
                <div className="row">
                  {this.props.forecast && this.props.forecast.list && this.props.forecast.list.map(hourly_forecast => {
                    return (
                      <Forecast
                        hourly_forecast={hourly_forecast}
                        city={this.props.city}
                        country={this.props.country}/>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>  
        </div>   
      </div>
    )
  }
}

export default WeatherData;

