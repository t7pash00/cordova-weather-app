import React, { Component } from 'react';
import Example from './components/Example';
import Form from './components/Form';
import Header from './components/Header';
import Weather from './components/Weather';
import Weaterdata from './components/Weaterdata';

const API_KEY = "17cab33d1ef3f71035ca2eb474f0f823";

class App extends Component {
  constructor(props){
      super(props);
    this.getWeather = this.getWeather.bind(this);
 
  
  this.state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    moreDetails: false,
    appStart: true
  }
}
  
  async getWeather (e) {
    e.preventDefault();
    this.setState({moreDetails: false});
    this.setState({appStart: false});
    
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (city && country) {
      
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values."
      });
    }
  }
  

  render() {
    const moreDetails = () => {
      this.setState({moreDetails: true});
    }

   const showWeather = () => {
     if (!this.state.appStart){
      if (!this.state.moreDetails) {
    
        return  <Weaterdata 
        temperature={this.state.temperature} 
        city={this.state.city}
        showWeather={moreDetails}
        />
      } else {
        return <Weather 
        temperature={this.state.temperature}
        humidity={this.state.humidity}
        city={this.state.city}
        country={this.state.country}
        description={this.state.description}
        error={this.state.error}
        />
      }
    }
    }

    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Header/>
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}
                    />
                   {showWeather()}
                    
            
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}


export default App;