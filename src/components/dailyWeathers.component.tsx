import * as React from 'react';
import * as Moment from 'moment';

import { WeatherCard } from './weatherCard.component';

interface DailyWeathersProps {
    weather: any;
}

let currentDayName: string = '';
let currentDayWeatherCount: number = 0;
let currentDayWeatherValue: number = 0;

export class DailyWeathers extends React.Component<DailyWeathersProps, any> {

    // ----------------------------------------------------------------------------------------------------
    getDailyWeather(weather: any, day: string) {

        console.log("Daily weather called");

        let currentDayName: string = '';
        let currentDayWeatherCount: number = 0;
        let currentDayWeatherValue: number = 0;

        if (this.state.weather != undefined) {
            currentDayName = Moment.unix(this.state.weather[0].dt).format("ddd");

            for (var i = 0; i < this.state.weather.length; i++) {
                if (Moment.unix(this.state.weather[i].dt).format("ddd") == currentDayName) {
                    currentDayWeatherCount++;
                    currentDayWeatherValue += (Number)(this.state.weather[i].weather[0].icon.substring(0, this.state.weather[i].weather[0].icon.length - 1));
                }
                else {
                    break;
                }
            }

            Math.round(currentDayWeatherValue /= currentDayWeatherCount);

            let iconValue = this.pad((String)(Math.round(currentDayWeatherValue /= currentDayWeatherCount))) + "d";
            console.log(iconValue);

            return <WeatherCard
                key={weather.dt}
                day={day}
                temperature={Math.round(weather.main.temp - 273.15)}
                temperatureMin={Math.round(weather.main.temp_min - 273.15)}
                temperatureMax={Math.round(weather.main.temp_max - 273.15)}
                imageName={iconValue} />;
        }
    }

    // ----------------------------------------------------------------------------------------------------
    pad(n: string) {
        if (n.length == 1) {
            return '0' + n;
        }
        return n;
    }

    // ----------------------------------------------------------------------------------------------------
    render() {
        return (
            this.props.weather.map(
                (value: any) => {
                    let day = Moment.unix(value.dt).format("ddd");

                    // Weather is part of current day forecast
                    if (day == currentDayName) {
                        // TODO
                    }
                    // Weather is part of a new forecast
                    else {
                        currentDayName = day;
                        currentDayWeatherCount++;

                        let weatherValue = value.weather[0].icon;

                        weatherValue = weatherValue.substring(0, weatherValue.length - 1);

                        console.log(weatherValue);
                        weatherValue = (Number)(weatherValue);
                        console.log(weatherValue);

                        

                        for (var i = 0; i < this.state.weather.length; i++) {
                            if (Moment.unix(this.state.weather[i].dt).format("ddd") == currentDayName) {
                                currentDayWeatherCount++;
                                currentDayWeatherValue += (Number)(this.state.weather[i].weather[0].icon.substring(0, this.state.weather[i].weather[0].icon.length - 1));
                            }
                            else {
                                break;
                            }
                        }
                    }

                    return <WeatherCard
                        key={value.dt}
                        day={day}
                        temperature={Math.round(value.main.temp - 273.15)}
                        temperatureMin={Math.round(value.main.temp_min - 273.15)}
                        temperatureMax={Math.round(value.main.temp_max - 273.15)}
                        imageName={value.weather[0].icon} />;
                }
            )
        );
    }
}