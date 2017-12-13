import * as React from 'react';

interface NextWeatherProps {
    city: string;
    time: string;
    weather: string;
    temperature: number;
    rain: number;
    humidity: number;
    wind: number;
    icon: string
}

export class NextWeather extends React.Component<NextWeatherProps, any> {
    render() {
        return (
            <div className="next-weather">
                <p className="city">{this.props.city}</p>
                <p className="time">{this.props.time}</p>
                <p className="weather">{this.props.weather}</p>
                <img src={"./images/" + this.props.icon + ".png"} />
                <p className="temperature">{Math.round(this.props.temperature - 273.15)}°C</p>
                <br />
                <p className="rain">Pioggia: {this.props.rain}%</p>
                <p className="humidity">Umidità: {this.props.humidity}%</p>
                <p className="wind">Vento: {this.props.wind}%</p>
            </div>
        );
    }
}