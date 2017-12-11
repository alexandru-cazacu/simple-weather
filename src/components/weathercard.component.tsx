import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

interface WeatherCardProps {
    day: string,
    temperature: number,
    weather: string
}

export class WeatherCard extends React.Component<any, any> {
    render() {
        return (
            <div className="weather-card">
                <p className="day">Dom</p>
                <img src="" />
                <p className="temperature-max">10°</p>
                <p className="temperature-min">3°</p>
            </div>
        );
    }
}