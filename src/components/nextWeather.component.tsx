import * as React from 'react';

interface NextWeatherProps {
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

export class NextWeather extends React.Component<NextWeatherProps, any> {
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
                <p className="tag">Rain: {this.props.rain}%</p>
                <p className="tag">Snow: {this.props.snow}%</p>
            </div>
        );
    }
}