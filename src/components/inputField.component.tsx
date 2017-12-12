import * as React from 'react';
import { GOOGLE_PLACES_KEY, GOOGLE_MAPS_KEY, OPEN_WEATHER_KEY } from '../keys';

import * as Moment from 'moment';
import * as Request from 'request';
import { currentId } from 'async_hooks';
import { SearchLocation } from './searchlocation.component';

interface InputFieldProps {
    onSearch(searchQuery: string): any;
}

export class InputField extends React.Component<InputFieldProps, any> {

    // ----------------------------------------------------------------------------------------------------
    constructor(props: any) {
        super(props);
        this.state = { currentInputValue: '', suggestions: [] };

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    // ----------------------------------------------------------------------------------------------------
    handleChange(event: any) {
        this.setState({ currentInputValue: event.target.value });
        console.log("Search query changed to: " + event.target.value);

        let reqString = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

        Request(reqString + "?input=" + event.target.value + "&type=geocode&key=" + GOOGLE_PLACES_KEY, { json: true }, (err: any, res: any, body: any) => {
            if (err) { return console.log(err); }

            console.log("Segguestions: ");
            console.log(body);

            let tempSuggestion = [];

            for (let i = 0; i < body.predictions.length; i++) {
                tempSuggestion.push(body.predictions[i].description);
            }

            this.setState({ suggestions: tempSuggestion });
        });
    }

    // ----------------------------------------------------------------------------------------------------
    handleSearch(searchQuery: string) {
        this.setState({ currentInputValue: '', suggestions: [] });

        console.log("Search query sent to Maps: " + searchQuery);
        this.props.onSearch(searchQuery);
    }

    // ----------------------------------------------------------------------------------------------------
    render() {
        return (
            <div className="search-field" >
                <input type="text" placeholder="Cerca..." value={this.state.currentInputValue} onChange={this.handleChange} />
                <ul>
                    {this.state.suggestions.map((value: any) =>
                        <li key={value} onClick={(e) => this.handleSearch(value)}>{value}</li>
                    )}
                </ul>
            </div>
        );
    }
}