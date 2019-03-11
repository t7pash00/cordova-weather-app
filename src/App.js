import React, {Component} from 'react';
import Form from './components/Form';
import Header from './components/Header';
import WeatherData from './components/WeatherData';
import localForage from 'localforage';
import lodash from 'lodash';
import WeatherTeaser from './components/WeatherTeaser';

const API_KEY = "17cab33d1ef3f71035ca2eb474f0f823";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            error: undefined,
            moreDetails: false,
            appStart: true,
            savedCities: [],
            currentCityData: [],
            forecast: []
        };

        this.getWeather = this.getWeather.bind(this);
        this.onClickGetWeather = this.onClickGetWeather.bind(this);
        this.saveCity = this.saveCity.bind(this);
        this.initDB();

        localForage.iterate((cityDataFromDb, key, iterationNumber) => {
            let currentCities = lodash.cloneDeep(this.state.savedCities);
            currentCities.push(cityDataFromDb);
            this.setState({savedCities: currentCities});
            this.updateCityWeather(cityDataFromDb);
        }).then(function () {
            console.log('DB initial load has completed');
        }).catch(function (err) {
            console.log(err);
        });
    }

    onClickGetWeather(e) {
        console.log("onClickGetWeather, e", e);
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        this.getWeather(city, country);
        this.setState({appStart: false});
    }

    async getWeather(/*e*/city, country) {
        // if (e) {
        //     e.preventDefault && e.preventDefault();
        this.setState({moreDetails: false});
        // this.setState({appStart: false});


        // const city = e.target.elements.city.value;
        // const country = e.target.elements.country.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();
        this.setState({currentCityData: data});
        console.log("GETWEATHER DATA, ", data);
        console.log("getWeather, currentcitydata", this.state.currentCityData);

        const forecast_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`);
        console.log("getWeather, forecast call ", forecast_call);
        const forecast_data = await forecast_call.json();
        console.log("GETwEATHER, forecast data", forecast_data);
        this.setState({forecast: forecast_data});

        //   this.saveCity({
        //     city,
        //     data
        // });

        if (city && country) {
            console.log("getWeather, data.sys", data.sys);
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: "",
                // currentCityData: data
            });

        } else {

            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please enter the values.",
                // currentCityData: []
            });
        }
        console.log("getWeather, state", this.state);
        // }
    }

    initDB() {
        // console.log("initDB, state", this.state);
        localForage.config({
            driver: localForage.INDEXEDDB, // Force WebSQL; same as using setDriver()
            name: 'WeatherDetail',
            version: 1.0,
            storeName: 'dataStorage', // Should be alphanumeric, with underscores.
            description: 'some description'
        });
        console.log("Database init complete");
    }

    saveCity(cityAndWeatherData, stateData) {
        console.log("saveCity, cityandwether data", cityAndWeatherData);
        let savedCities = [];
        console.log("saveCity, state", this.state);
        console.log("saveCity, stateData", stateData);
        // console.log("saveCity, setStateData", setStateData);
        // const oldCity = this.state.savedCities.find(city => city.data.id === cityAndWeatherData.data.id);
        const oldCity = stateData.savedCities.find(city => city.data.id === cityAndWeatherData.id);

        if (!oldCity) {
            savedCities = lodash.cloneDeep(stateData.savedCities);
            const newCity = {
                city: cityAndWeatherData.name,
                country: cityAndWeatherData.sys.country,
                data: cityAndWeatherData
            };
            // savedCities.unshift(cityAndWeatherData);
            savedCities.unshift(newCity);
            console.log("SAVE CITY saveCities", savedCities);
            // localForage.setItem(cityAndWeatherData.data.id, cityAndWeatherData).then(function () {
            //     console.log("item added to database")
            // }).catch(function (err) {
            //     // we got an error
            //     console.log("db error");
            // });
            localForage.setItem(newCity.data.id, newCity).then(function () {
                console.log(newCity.city, " added to database")
            }).catch(function (err) {
                // we got an error
                console.log("db error");
            });
            this.setState({savedCities: savedCities});
            console.log("saveCity done");
        } else {
            console.log("saveCity, old city found");
        }

    }

    updateCityWeather(cityAndWeatherData) {
        console.log("########updateCityWeather, cityandweatherdata", cityAndWeatherData);
        // this.getWeather(cityAndWeatherData.data.id).then(updatedWeatherData => {
        this.getWeather(cityAndWeatherData.city, cityAndWeatherData.data.sys.country).then(updatedWeatherData => {
            console.log("####updateCityWeather, after getWeather");
            let savedCities = [];
            let stateIndex = this.state.savedCities.findIndex(
                element => element.city.id === cityAndWeatherData.city.id
            );

            if (stateIndex != undefined) {
                /* clone the current elements, state should be immutable */
                savedCities = lodash.cloneDeep(this.state.savedCities);
                savedCities[stateIndex].data = updatedWeatherData;
                console.log("####updateCityWeather, savedCities", savedCities);
                /* Update data in the database */
                localForage.setItem(cityAndWeatherData.city.id.toString(), cityAndWeatherData).then(function () {
                    console.log(`${cityAndWeatherData.city.name} item update to database`);
                }).catch(function (err) {
                    console.log("db update error");
                });
                /* Update the state with the update data */
                this.setState({savedCities});
            }
        })
    }


    render() {
        const moreDetails = () => {
            this.setState({moreDetails: true});
        };

        const showWeather = () => {
            console.log("render, showWeather, state", this.state);
            if (!this.state.appStart && this.state.city) {
                if (!this.state.moreDetails) {
                    return <WeatherData
                        temperature={this.state.temperature}
                        city={this.state.city}
                        country={this.state.country}
                        showWeather={moreDetails}
                        currentData={this.state.currentCityData}
                        saveCityData={this.saveCity}
                        stateData={this.state}
                    />
                } else {
                    return <WeatherData
                        temperature={this.state.temperature}
                        humidity={this.state.humidity}
                        city={this.state.city}
                        country={this.state.country}
                        description={this.state.description}
                        error={this.state.error}
                        forecast={this.state.forecast}
                    />
                }
            }
        };

        return (
            <div>
                <div>
                    <Header />
                </div>
                <div className="header" style={{padding: '40px'}}>
                    <div>
                        <Form getWeather={this.onClickGetWeather} />
                    </div>
                    <div>
                        {showWeather()}
                    </div>
                    <button className="btn btn-dark mt-3" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Your Saved Cities
                    </button>
                    <div className="collapse mt-3" id="collapseExample">
                        <div className="row">
                            {
                            this.state.savedCities.map(city => {
                                console.log("render, city", city);
                                return <WeatherTeaser key={city.data.id} data={city} update={this.updateCityWeather}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


export default App;

const styles = {}