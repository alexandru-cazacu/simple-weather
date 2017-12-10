import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

interface WeatherCardProps {
    day: string,
    temperature: number,
    weather: string
}

export class WeatherCard extends React.Component<WeatherCardProps, any> {
    render() {
        return (
            <div>
                <h3>{this.props.weather}</h3>
                <h3>{this.props.temperature}</h3>
                <h3>{this.props.day}</h3>
            </div>
        );
    }
}