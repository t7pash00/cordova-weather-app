import React, { Component } from 'react'

class Forecast extends Component {
    render () {
        return (
			<div className="col-md-3 mt-2">
				<div className="card card-body bg-light text-dark">
					<div className="">
						{	
							this.props.city && this.props.country && <p className="forecast__key"> Location: 

								<span className="forecast__value"> { this.props.city }, { this.props.country }</span>
							</p> 
						}
						{ 	
							this.props.hourly_forecast.main.temp && <p className="forecast__key"> Temperature: 
								<span className="forecast__value"> { this.props.hourly_forecast.main.temp } °C</span>
							</p> 
						}
						{ 	
							this.props.hourly_forecast.dt_txt && <p className="forecast__key"> Timestamp: 
								<span className="forecast__value"> { this.props.hourly_forecast.dt_txt } </span>
							</p> 
						}
						
						{ 
							this.props.error && <p className="forecast__error">{ this.props.error }</p>  
						}
					</div>
				</div>
			</div>
		)
	}
}

export default Forecast;
/*
const styles = {
    forecast_info: {
        width: "15rem",
        margin: "1rem",
        display: "inline-block"
    }
} 
*/