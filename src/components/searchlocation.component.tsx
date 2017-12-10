import * as React from 'react';
import { GOOGLE_PLACES_KEY, GOOGLE_MAPS_KEY, OPEN_WEATHER_KEY } from '../keys';

import * as Moment from 'moment';
import * as Request from 'request';
import { currentId } from 'async_hooks';

let prevTime: any = new Date();

export class SearchLocation extends React.Component<any, any> {

    // ----------------------------------------------------------------------------------------------------
    constructor(props: any) {
        super(props);
        this.state = { city: '', suggestions: [], lat: 0, lng: 0, weather: [], temperature: 0, nextWeather: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    // ----------------------------------------------------------------------------------------------------
    handleChange(event: any) {
        this.setState({ city: event.target.value });
        console.log("Search query changed to: " + event.target.value);

        let currTime: any = new Date();

        let seconds = (currTime.getTime() - prevTime.getTime()) / 1000;

        console.log(seconds);

        if (seconds >= 0.5) {
            let reqString = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

            Request(reqString + "?input=" + event.target.value + "&type=geocode&key=" + GOOGLE_PLACES_KEY, { json: true }, (err: any, res: any, body: any) => {
                if (err) { return console.log(err); }
                console.log(body);

                let tempSuggestion = [];

                for (let i = 0; i < body.predictions.length; i++) {
                    tempSuggestion.push(<li onMouseDown={this.handleSearch} key={i}>{body.predictions[i].description}</li>);
                }

                this.setState({ suggestions: tempSuggestion });
            });

            prevTime = currTime;
        }
    }

    // ----------------------------------------------------------------------------------------------------
    handleSearch(event: any) {
        this.setState({ city: event.target.innerHTML, suggestions: [] });

        let reqString = 'https://maps.googleapis.com/maps/api/geocode/json';

        Request(reqString + "?address=" + this.state.city.split(' ').join('+') + "&key=" + GOOGLE_MAPS_KEY, { json: true }, (err: any, res: any, body: any) => {
            if (err) { return console.log(err); }
            console.log(body);

            this.setState({ lat: body.results[0].geometry.location.lat });
            this.setState({ lng: body.results[0].geometry.location.lng });

            this.getWeatherPredictions();
        });
    }

    // ----------------------------------------------------------------------------------------------------
    getWeatherPredictions() {
        let reqString = 'http://api.openweathermap.org/data/2.5/forecast';

        Request(reqString + "?lat=" + this.state.lat + "&lon=" + this.state.lng + "&appid=" + OPEN_WEATHER_KEY, { json: true }, (err: any, res: any, body: any) => {
            if (err) { return console.log(err); }
            console.log(body);


            this.setState({nextWeather: body.list[0].weather[0].main});
            this.setState({temperature: body.list[0].main.temp - 273.15});

            let tempWeather = [];

            for (let i = 0; i < body.cnt; i++) {
                tempWeather.push(<h1>{Moment.unix(body.list[i].dt).format("dd DD/MM/YYYY hh:mm:ss A")}</h1>)

                tempWeather.push(<li key={i}>{body.list[i].weather[0].main}</li>);
                tempWeather.push(<li key={i + 100}>{body.list[i].weather[0].icon}</li>);
                tempWeather.push(<li key={i + 1000}>{body.list[i].main.temp - 273.15}</li>);
                tempWeather.push(<br />);
            }

            this.setState({ weather: tempWeather });
        });
    }

    // ----------------------------------------------------------------------------------------------------
    render() {
        return (
            <div className="container">
                <div className="header">
                    <div className="logo">
                        <span className="fa fa-sun-o"></span>
                        <h3>Simple Weather</h3>
                    </div>

                    <div className="nav">
                        <span className="fa fa-refresh"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-ellipsis-h"></span>
                        <div className="search-field">
                            <input type="text" placeholder="Cerca..." value={this.state.city} onChange={this.handleChange} />
                            <ul>
                                {this.state.suggestions}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="next-prediction">
                    <h3 className="city">{this.state.city}</h3>
                    <h1 className="temperature">{this.state.temperature}°C</h1>
                    <p className="weather">{this.state.nextWeather}</p>
                </div>
                <div>
                    <ul>
                        {this.state.weather}
                    </ul>
                </div>
            </div>
        );
    }
}