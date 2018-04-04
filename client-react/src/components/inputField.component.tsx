import * as React from 'react';
import { GOOGLE_PLACES_KEY } from '../keys';

import * as Request from 'request';

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

    /**
     * Performs an HTTP Request to Google Places API and retrieves a json containing autocomplete suggestions for the current input query.
     * That operation is performed only if the user stops typing for 0.5 seconds.
     * param event
     */
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

                res = res;

                this.setState({ suggestions: body.predictions });
            })
        }, 500);
    }

    /**
     * Callback function that is called every time the user types something in the input field.
     * Sets this.state.currentInputValue to searchQuery.
     * param searchQuery Value in the input field.
     */
    // ----------------------------------------------------------------------------------------------------
    handleSearch(searchQuery: string) {
        this.setState({ currentInputValue: '', suggestions: [] });

        this.props.onSearch(searchQuery);
    }

    /**
     * Life Cycle method that is called after a component state or props change.
     */
    // ----------------------------------------------------------------------------------------------------
    render() {
        return (
            <div className="header">
                <span className="spinning-sun fa fa-sun-o"></span>
                <p className="logo">Simple Weather</p>

                <div className="nav">
                    <span className="fa fa-refresh"></span>
                    <span className="fa fa-star-o"></span>
                    <span className="fa fa-ellipsis-v"></span>
                    <div className="search-field" >
                        <input type="text" placeholder="Cerca..." value={this.state.currentInputValue} onChange={this.handleChange} />
                        <ul>
                            {this.state.suggestions.map((value: any) =>
                                <li key={value.id} onClick={() => this.handleSearch(value.description)}>{value.description}</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}