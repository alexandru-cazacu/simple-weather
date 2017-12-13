import * as React from "react";
import * as ReactDOM from "react-dom";

import { GOOGLE_PLACES_KEY, GOOGLE_MAPS_KEY, OPEN_WEATHER_KEY } from '../keys';

import * as Moment from 'moment';
import * as Request from 'request';
import { currentId } from 'async_hooks';

import { InputField } from './inputField.component';
import { WeatherCard } from './weatherCard.component';
import { NextWeather } from './nextWeather.component';

export class WeatherApp extends React.Component<any, any> {

    // ----------------------------------------------------------------------------------------------------
    constructor(props: any) {
        super(props);
        this.state = { weather: [], city: [] };

        this.handleSearch = this.handleSearch.bind(this);

        Moment().locale("it")
        Moment().format('LLLL');
    }

    // ----------------------------------------------------------------------------------------------------
    handleSearch(searchQuery: string) {
        let reqString = 'https://maps.googleapis.com/maps/api/geocode/json';

        Request(reqString + "?address=" + searchQuery.split(' ').join('+') + "&key=" + GOOGLE_MAPS_KEY, { json: true }, (err: any, res: any, body: any) => {
            if (err) { return console.log(err); }

            console.log("Found Coordinates: ");
            console.log(body);

            console.log("Lat: " + body.results[0].geometry.location.lat);
            console.log("Lng: " + body.results[0].geometry.location.lng);

            this.getWeather(body.results[0].geometry.location.lat, body.results[0].geometry.location.lng);
        });
    }

    // ----------------------------------------------------------------------------------------------------
    getWeather(lat: number, lng: number) {
        let reqString = 'http://api.openweathermap.org/data/2.5/forecast';

        Request(reqString + "?lat=" + lat + "&lon=" + lng + "&appid=" + OPEN_WEATHER_KEY, { json: true }, (err: any, res: any, body: any) => {
            if (err) { return console.log(err); }

            console.log("Weather API predistions: ");
            console.log(body);

            this.setState({ weather: body.list, city: body.city });

            let tempWeather = [];

            console.log("Weather predictions: ");
            console.log(this.state.weather);
        });
    }

    // ----------------------------------------------------------------------------------------------------
    render() {
        return (
            <div>
                <div className="header">
                    <div className="nav">
                        <InputField onSearch={this.handleSearch} />
                    </div>
                </div>

                {this.state.weather[0] && <NextWeather
                    city={this.state.city.name}
                    time={Moment.unix(this.state.weather[0].dt).format("ddd DD MMMM")}
                    weather={this.state.weather[0].weather[0].main}
                    temperature={this.state.weather[0].main.temp}
                    rain={this.state.weather[0].rain['3h']}
                    humidity={this.state.weather[0].main.humidity}
                    wind={this.state.weather[0].wind.speed}
                    icon={this.state.weather[0].weather[0].icon} />}

                <div className="wrapper">
                    {this.state.weather.map(
                        (value: any) => {
                            let day = Moment.unix(value.dt).format("dd");
                            return <WeatherCard
                                key={value.dt}
                                day={day}
                                temperature={Math.round(value.main.temp - 273.15)}
                                temperatureMin={Math.round(value.main.temp_min - 273.15)}
                                temperatureMax={Math.round(value.main.temp_max - 273.15)}
                                imageName={value.weather[0].icon} />;
                        }
                    )}
                </div>
            </div >
        );
    }
}

