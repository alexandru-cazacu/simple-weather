import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { SearchLocation } from './components/searchlocation.component';
import { WeatherCard } from './components/weathercard.component';

export class Index extends React.Component<any, any> {
    render() {
        return (
            <div>
                <SearchLocation />
            </div>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById("root")
);

