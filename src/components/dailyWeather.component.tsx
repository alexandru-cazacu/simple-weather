import * as React from 'react';
import * as Moment from 'moment';

import { WeatherCard } from './weatherCard.component';

interface DailyWeatherProps {
    weather: any;
}

let currentDay: string = '';

export class DailyWeather extends React.Component<DailyWeatherProps, any> {
    render() {
        const listItems = this.props.weather.map(
            (value: any) => {
                let day = Moment.unix(value.dt).format("ddd");

                if (currentDay == day) {
                    return;
                }
                else {
                    currentDay = day;
                    return < WeatherCard
                        key={value.dt}
                        day={day}
                        temperature={Math.round(value.main.temp - 273.15)}
                        temperatureMin={Math.round(value.main.temp_min - 273.15)}
                        temperatureMax={Math.round(value.main.temp_max - 273.15)}
                        imageName={value.weather[0].icon} />;
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