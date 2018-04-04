import * as React from "react";
import * as ReactDOM from "react-dom";

import { WeatherApp } from './components/weatherApp.component';

export class Index extends React.Component<any, any> {

    /**
     * Life Cycle method that is called after a component state or props change.
     */
    // ----------------------------------------------------------------------------------------------------
    render() {
        return (
            <WeatherApp />
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById("root")
);

