import * as React from "react";

interface WeatherCardProps {
    day: string;
    temperature: number;
    temperatureMax: number;
    temperatureMin: number;
    imageName: string;
}

export class WeatherCard extends React.Component<WeatherCardProps, any> {

    /**
     * Life Cycle method that is called after a component state or props change.
     */
    // ----------------------------------------------------------------------------------------------------
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