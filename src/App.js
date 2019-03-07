import React, { Component } from 'react';
import Example from './components/Example';
import Form from './components/Form';
import Header from './components/Header';
import Weather from './components/Weather';
import Weaterdata from './components/Weaterdata';
import localForage from 'localforage';
import lodash from 'lodash';
import WeatherTeaser from './components/WeatherTeaser';

const API_KEY = "17cab33d1ef3f71035ca2eb474f0f823";

class App extends Component {
  constructor(props) {
    super(props);
    this.getWeather = this.getWeather.bind(this);
    this.initDB();


    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined,
      moreDetails: false,
      appStart: true,
      savedCities:[]
    }
    localForage.iterate((cityDataFromDb, key, iterationNumber) => {
      let currentCities = lodash.cloneDeep(this.state.savedCities);
      currentCities.push(cityDataFromDb);
      this.setState({ savedCities: currentCities });
      this.updateCityWeather(cityDataFromDb);
    }).then(function () {
      console.log('DB initial load has completed');
    }).catch(function (err) {
      console.log(err);
    });
  }

  async getWeather(e) {
    if (e) {
    e.preventDefault();
    this.setState({ moreDetails: false });
    this.setState({ appStart: false });

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    console.log("GETwETHER DATA, ", data);
      this.saveCity({
          city,
          data                
      });

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
}
  initDB() {
    localForage.config({
      driver: localForage.INDEXEDDB, // Force WebSQL; same as using setDriver()
      name: 'WeatherForsee',
      version: 1.0,
      storeName: 'dataStorage', // Should be alphanumeric, with underscores.
      description: 'some description'
    });
    console.log("Database init complete");
  }

  saveCity(cityAndWeatherData)
    {
      console.log("saveCity, cityandwether data", cityAndWeatherData);
        let savedCities = [];
        const oldCity = this.state.savedCities.find(city => city.data.id === cityAndWeatherData.data.id);
        
        if (!oldCity) {
            
            savedCities = lodash.cloneDeep(this.state.savedCities);            
            savedCities.unshift(cityAndWeatherData);
            console.log("SAVE CITY saveCities", savedCities);
            localForage.setItem(cityAndWeatherData.data.id, cityAndWeatherData).then(function () {
                console.log("item added to database")
              }).catch(function (err) {
                // we got an error
                console.log("db error");
              });
            this.setState({ savedCities });
            console.log("saveCity doen");
        }  
        
    }

    updateCityWeather(cityAndWeatherData)
    {        
        this.getWeather(cityAndWeatherData.data.id).then(updatedWeatherData => {            
            let savedCities = [];
            let stateIndex = this.state.savedCities.findIndex(
                element => element.city.id === cityAndWeatherData.city.id
            );

            if (stateIndex != undefined) {
                /* clone the current elements, state should be immutable */
                savedCities = lodash.cloneDeep(this.state.savedCities);
                savedCities[stateIndex].data = updatedWeatherData;
                console.log("update, savedCities", savedCities);
                /* Update data in the database */
                localForage.setItem(cityAndWeatherData.city.id.toString(), cityAndWeatherData).then(function () {
                    console.log(`${cityAndWeatherData.city.name} item update to database`);
                }).catch(function (err) {                    
                    console.log("db update error");
                });
                /* Update the state with the update data */
                this.setState({ savedCities });
            }                       
        })
    }




  render() {
    const moreDetails = () => {
      this.setState({ moreDetails: true });
    }

    const showWeather = () => {
      if (!this.state.appStart) {
        if (!this.state.moreDetails) {

          return <Weaterdata
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
                  <Header />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}
                  />
                  {showWeather()}
                  <div>
                    {
                        this.state.savedCities.map(city => {
                          console.log("render, city", city);
                          return <WeatherTeaser key={city.data.id} data={city} update={this.updateCityWeather}/>
                    })}  
                </div> 

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