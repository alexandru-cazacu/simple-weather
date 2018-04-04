import * as React from 'react';

interface WeatherCardBigProps {
    city: string;
    time: string;
    weather: string;
    temperature: number;

    humidity: number;

    clouds: number;
    wind: number;
    rain: number;
    snow: number;

    icon: string;
}

export class WeatherCardBig extends React.Component<WeatherCardBigProps, any> {

    /**
     * Life Cycle method that is called after a component state or props change.
     */
    // ----------------------------------------------------------------------------------------------------
    render() {
        return (
            <div className="next-weather">
                <p className="city">{this.props.city}</p>
                <p className="time">{this.props.time}</p>
                <img src={"./images/" + this.props.icon + ".png"} />
                <p className="temperature">{Math.round(this.props.temperature - 273.15)}°C</p>
                <p className="weather">{this.props.weather}</p>
                <br />
                <p className="tag">Humidity: {this.props.humidity}%</p>
                <p className="tag">Clouds: {this.props.clouds}%</p>
                <p className="tag">Wind: {this.props.wind} Km/h</p>
                <p className="tag">Rain: {this.props.rain} mm</p>
                <p className="tag">Snow: {this.props.snow} mm</p>
            </div>
        );
    }
}