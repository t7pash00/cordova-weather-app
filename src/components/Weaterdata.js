import React, { Component } from 'react'
//import image from "./res/img/clouds-37009__340.png"

class Weaterdata extends Component {
    render () {
        return (
            <div className="card" style= {{width: '10rem', height: '10rem', border: '3px solid green' }}>
            <div className="card-body">
              <h5 className="card-title">{ this.props.city }, { this.props.country }</h5>
              <p className="card-text">{this.props.temperature} °C</p>
              <button onClick={this.props.showWeather}>More Details</button>
              <button onClick={() => this.props.saveCityData(this.props.currentData)}>Add to Favorites</button>
            </div>  
          </div>
               
        
    )
}
}

export default Weaterdata;

