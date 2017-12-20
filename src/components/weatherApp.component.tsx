import * as React from "react";

import { GOOGLE_MAPS_KEY, OPEN_WEATHER_KEY } from '../keys';

import * as Moment from 'moment';
import * as Request from 'request';

import { InputField } from './inputField.component';
import { WeatherCardBig } from './weatherCardBig.component';
import { Spinner } from './spinner.component';
import { LineChart } from "./lineChart.component";
import { DailyWeather } from './dailyWeather.component';

export class WeatherApp extends React.Component<any, any> {

    // ----------------------------------------------------------------------------------------------------
    constructor(props: any) {
        super(props);
        this.state = { weather: [], city: [], showLoadingSpinner: false };

        this.handleSearch = this.handleSearch.bind(this);

        Moment().format('LLLL');
    }

    /**
     * Life Cycle method that is called after a component is rendered in the DOM.
     */
    // ----------------------------------------------------------------------------------------------------
    componentDidMount() {
        this.handleSearch("Via Cantore");
    }

    /**
     * Performs an HTTP request to Google Maps API. Retrieves the coordinates of seachQuery, then calls {@link #getWeather(number, number) getWeather}.
     * @param searchQuery Name of the location to search for.
     */
    // ----------------------------------------------------------------------------------------------------
    private handleSearch(searchQuery: string) {
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
            console.log(res);

            console.log("Lat: " + body.results[0].geometry.location.lat);
            console.log("Lng: " + body.results[0].geometry.location.lng);

            this.getWeather(body.results[0].geometry.location.lat, body.results[0].geometry.location.lng);
        });
    }

    /**
     * Performs an HTTP request to OpenWeather API. Retrieves the forecast and sets this.state.weather equals to the resulting json.
     * @param lat Latitude of the location.
     * @param lng Longitute of the location.
     */
    // ----------------------------------------------------------------------------------------------------
    getWeather(lat: number, lng: number) {
        let reqString = 'http://localhost:4000/api.openweathermap.org/data/2.5/forecast';

        Request(reqString + "?lat=" + lat + "&lon=" + lng + "&appid=" + OPEN_WEATHER_KEY, { json: true }, (err: any, res: any, body: any) => {
            if (err) { return console.log(err); }

            console.log("Weather API predistions: ");
            console.log(body);
            console.log(res);

            this.setState({ weather: body.list, city: body.city });
            this.setState({ visible: false });

            console.log("Weather predictions: ");
            console.log(this.state.weather);
        });
    }

    /**
     * Life Cycle method that is called after a component state or props change.
     */
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

                    {this.state.weather[0] && <LineChart hourLabels={this.getHourLabels()} numbers={this.getTemperatures()} rain={this.getWind()} />}
                </div>
            </div>
        );
    }

    /**
     * Loops throught the current weather forecast and builds an array of 8 values containing the next available hours.
     * Available hours are: 01:00 04:00 07:00 10:00 13:00 16:00 19:00 22:00.
     * @returns Array containing labels for the next 8 available hours.
     */
    // ----------------------------------------------------------------------------------------------------
    getHourLabels(): string[] {
        let labels: string[] = [];
        for (var i = 0; i < 8; i++) {
            labels.push(Moment.unix(this.state.weather[i].dt).format("HH:mm"));
        }

        return labels;
    }

    /**
     * Loops throught the current weather forecast and builds an array of 8 values containing the temperatures for the next available hours.
     * Available hours are: 01:00 04:00 07:00 10:00 13:00 16:00 19:00 22:00.
     * @returns Array containing temperature values for the next 8 available hours.
     */
    // ----------------------------------------------------------------------------------------------------
    getTemperatures(): number[] {
        let numbers: number[] = [];
        for (var i = 0; i < 8; i++) {
            numbers.push(Math.round(this.state.weather[i].main.temp - 273.15));
        }

        return numbers;
    }

    getRain(): number[] {
        let numbers: number[] = [];
        for (var i = 0; i < 8; i++) {
            if (this.state.weather[0].hasOwnProperty("rain")) {
                if (this.state.weather[i].rain.hasOwnProperty("3h")) {
                    numbers.push(this.state.weather[i].rain["3h"]);
                }
                else {
                    numbers.push(0);
                }
            }
            else {
                numbers.push(0);
            }
        }
        return numbers;
    }

    getWind(): number[] {
        let numbers: number[] = [];
        for (var i = 0; i < 8; i++) {
            if (this.state.weather[0].hasOwnProperty("wind")) {
                if (this.state.weather[i].wind.hasOwnProperty("speed")) {
                    numbers.push(this.state.weather[i].wind.speed);
                }
                else {
                    numbers.push(0);
                }
            }
            else {
                numbers.push(0);
            }
        }
        console.log(numbers);
        return numbers;
    }
}

