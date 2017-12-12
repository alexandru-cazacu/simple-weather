import * as React from "react";
import * as ReactDOM from "react-dom";

import { GOOGLE_PLACES_KEY, GOOGLE_MAPS_KEY, OPEN_WEATHER_KEY } from '../keys';

import * as Moment from 'moment';
import * as Request from 'request';
import { currentId } from 'async_hooks';

import { InputField } from './inputField.component';
import { WeatherCard } from './weathercard.component';

export class WeatherApp extends React.Component<any, any> {

    // ----------------------------------------------------------------------------------------------------
    constructor(props: any) {
        super(props);
        this.state = { weather: [] };

        this.handleSearch = this.handleSearch.bind(this);
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

    getWeather(lat: number, lng: number) {
        let reqString = 'http://api.openweathermap.org/data/2.5/forecast';

        Request(reqString + "?lat=" + lat + "&lon=" + lng + "&appid=" + OPEN_WEATHER_KEY, { json: true }, (err: any, res: any, body: any) => {
            if (err) { return console.log(err); }

            console.log("Weather API predistions: ");
            console.log(body);

            this.setState({ weather: body });

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
                <div className="wrapper">
                    <WeatherCard day='Dom' temperature={10} temperatureMin={20} temperatureMax={20} />
                    <WeatherCard day='Lun' temperature={10} temperatureMin={20} temperatureMax={20} />
                    <WeatherCard day='Mar' temperature={10} temperatureMin={20} temperatureMax={20} />
                    <WeatherCard day='Mer' temperature={10} temperatureMin={20} temperatureMax={20} />
                    <WeatherCard day='Gio' temperature={10} temperatureMin={20} temperatureMax={20} />
                    <WeatherCard day='Ven' temperature={10} temperatureMin={20} temperatureMax={20} />
                    <WeatherCard day='Sab' temperature={10} temperatureMin={20} temperatureMax={20} />
                    <canvas id="myChart"></canvas>
                </div>
            </div >
        );
    }
}

