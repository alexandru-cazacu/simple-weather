import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

interface WeatherCardProps {
    day: string,
    temperature: number,
    temperatureMax: number,
    temperatureMin: number
    imageName: string
}

export class WeatherCard extends React.Component<WeatherCardProps, any> {
    render() {
        return (
            <div className="weather-card">
                <p className="day">{this.props.day}</p>
                <img src={"./images/" + this.props.imageName + ".png"} />

                <p className="temperature-max">{this.props.temperatureMax}°</p>
                <p className="temperature">{this.props.temperature}°</p>
                <p className="temperature-min">{this.props.temperatureMin}°</p>
            </div>
        );
    }
}