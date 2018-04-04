import * as React from 'react';
import * as Moment from 'moment';

import { WeatherCard } from './weatherCard.component';

interface DailyWeatherProps {
    weather: any;
}

let currentDay: string = '';
let worstForecastedWeather: string = '01d';
let daysCount: number = 0;

export class DailyWeather extends React.Component<DailyWeatherProps, any> {

    /**
     * Life Cycle method that is called after a component state or props change.
     */
    // ----------------------------------------------------------------------------------------------------
    render() {
        currentDay = '';
        worstForecastedWeather = '01d';
        daysCount = 0;

        const listItems = this.props.weather.map(
            (value: any) => {
                let day = Moment.unix(value.dt).format("ddd");

                // Forecast still part of current day.
                if (currentDay == day) {
                    let currForecast: string = value.weather[0].icon;
                    if (currForecast > worstForecastedWeather) {
                        worstForecastedWeather = currForecast;
                    }
                }
                // Forecast for next day.
                else {
                    currentDay = day;
                    worstForecastedWeather = value.weather[0].icon;
                    daysCount++;
                    if (daysCount <= 5) {
                        return < WeatherCard
                            key={value.dt}
                            day={day}
                            temperature={Math.round(value.main.temp - 273.15)}
                            temperatureMin={Math.round(value.main.temp_min - 273.15)}
                            temperatureMax={Math.round(value.main.temp_max - 273.15)}
                            imageName={worstForecastedWeather.replace("n", "d")} />;
                    }
                }
            }
        );

        if (this.props.weather != undefined) {
            return (
                <div className="section">
                    <h1 className="section-title">Daily</h1>
                    <ul>{listItems}</ul>
                </div>
            );
        }
        else {
            return null;
        }

    }
}