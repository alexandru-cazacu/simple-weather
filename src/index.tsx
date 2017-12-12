import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { WeatherApp } from './components/weatherApp.component';

export class Index extends React.Component<any, any> {
    render() {
        return (
            <div>
                <WeatherApp />
            </div>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById("root")
);

