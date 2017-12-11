import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { InputField } from './components/inputField.component';
import { WeatherCard } from './components/weathercard.component';

export class Index extends React.Component<any, any> {
    render() {
        return (
            <div>
                <InputField />
                <WeatherCard />
                <WeatherCard />
                <WeatherCard />
                <WeatherCard />
                <WeatherCard />
            </div>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById("root")
);

