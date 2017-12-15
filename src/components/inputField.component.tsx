import * as React from 'react';
import { GOOGLE_PLACES_KEY, GOOGLE_MAPS_KEY, OPEN_WEATHER_KEY } from '../keys';

import * as Moment from 'moment';
import * as Request from 'request';
import { currentId } from 'async_hooks';
import { SearchLocation } from './searchlocation.component';

let timeout: any = null;

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
        clearTimeout(timeout);

        this.setState({ currentInputValue: event.target.value, suggestions: [] });
        console.log("Search query changed to: " + event.target.value);

        // Make a new timeout set to go off in 500ms
        timeout = setTimeout(() => {
            let reqString = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

            // event.target.value

            Request(reqString + "?input=" + this.state.currentInputValue + "&type=geocode&key=" + GOOGLE_PLACES_KEY, { json: true }, (err: any, res: any, body: any) => {
                if (err) { return console.log(err); }

                this.setState({ suggestions: body.predictions });
            })
        }, 500);
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
                        <li key={value.id} onClick={(e) => this.handleSearch(value.description)}>{value.description}</li>
                    )}
                </ul>
            </div>
        );
    }
}