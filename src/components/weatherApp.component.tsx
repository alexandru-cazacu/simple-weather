import * as React from "react";
import * as ReactDOM from "react-dom";

import { GOOGLE_PLACES_KEY, GOOGLE_MAPS_KEY, OPEN_WEATHER_KEY } from '../keys';

import * as Moment from 'moment';
import * as Request from 'request';
import { currentId } from 'async_hooks';

import { InputField } from './inputField.component';
import { WeatherCard } from './weatherCard.component';
import { WeatherCardBig } from './weatherCardBig.component';
import { Spinner } from './spinner.component';
import { LineChart } from "./lineChart.component";
import { DailyWeather } from './dailyWeather.component';

let currentDay: string = '';

export class WeatherApp extends React.Component<any, any> {

    // ----------------------------------------------------------------------------------------------------
    constructor(props: any) {
        super(props);
        this.state = { weather: [], city: [], showLoadingSpinner: false };

        this.handleSearch = this.handleSearch.bind(this);

        Moment().format('LLLL');
    }

    componentDidMount() {
        this.handleSearch("Via Cantore");
    }

    // ----------------------------------------------------------------------------------------------------
    handleSearch(searchQuery: string) {
        this.setState({ weather: [], city: [], showLoadingSpinner: true });

        let reqString = 'http://localhost:4000/maps.googleapis.com/maps/api/geocode/json';

        Request(reqString + "?address=" + searchQuery.split(' ').join('+') + "&key=" + GOOGLE_MAPS_KEY, { json: true }, (err: any, res: any, body: any) => {
            if (err) {
                console.log("Search query returned error: ");
                console.log(err);
                return;
            }

            console.log("Found Coordinates: ");
            console.log(body);

            console.log("Lat: " + body.results[0].geometry.location.lat);
            console.log("Lng: " + body.results[0].geometry.location.lng);

            this.getWeather(body.results[0].geometry.location.lat, body.results[0].geometry.location.lng);
        });
    }

    // ----------------------------------------------------------------------------------------------------
    getWeather(lat: number, lng: number) {
        let reqString = 'http://localhost:4000/api.openweathermap.org/data/2.5/forecast';

        Request(reqString + "?lat=" + lat + "&lon=" + lng + "&appid=" + OPEN_WEATHER_KEY, { json: true }, (err: any, res: any, body: any) => {
            if (err) { return console.log(err); }

            console.log("Weather API predistions: ");
            console.log(body);

            this.setState({ weather: body.list, city: body.city, showLoadingSpinner: false });

            console.log("Weather predictions: ");
            console.log(this.state.weather);
        });
    }

    // ----------------------------------------------------------------------------------------------------
    render() {
        return (
            <div className="container">
                <InputField onSearch={this.handleSearch} />

                <div className="wrapper">
                    <Spinner visible={this.state.visible} />
                    {this.state.weather[0] && <WeatherCardBig
                        city={this.state.city.name}
                        time={Moment.unix(this.state.weather[0].dt).format("ddd DD MMMM")}
                        weather={this.state.weather[0].weather[0].main}
                        temperature={this.state.weather[0].main.temp}
                        humidity={this.state.weather[0].main.humidity}
                        clouds={this.state.weather[0].clouds ? this.state.weather[0].clouds.all : 0}
                        wind={this.state.weather[0].wind ? this.state.weather[0].wind.speed : 0}
                        rain={this.state.weather[0].rain ? this.state.weather[0].rain['3h'] : 0}
                        snow={this.state.weather[0].snow ? this.state.weather[0].snow['3h'] : 0}
                        icon={this.state.weather[0].weather[0].icon} />}

                    {this.state.weather[0] && <DailyWeather weather={this.state.weather} />}

                    {this.state.weather[0] && <LineChart labels={this.getLabels()} numbers={this.getNumbers()} />}
                </div>
            </div>
        );
    }

    getLabels() {
        let labels = [];
        for (var i = 0; i < 8; i++) {
            labels.push(Moment.unix(this.state.weather[i].dt).format("HH:mm"));
        }

        return labels;
    }

    getNumbers() {
        let numbers = [];
        for (var i = 0; i < 8; i++) {
            numbers.push(Math.round(this.state.weather[i].main.temp - 273.15));
        }
        return numbers;
    }
}

