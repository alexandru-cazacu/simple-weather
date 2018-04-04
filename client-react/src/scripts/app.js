// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete, globalResults;

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
              /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        { types: ['geocode'] });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    if (place.geometry != null) {
        getWeather(place.geometry.location.lat(), place.geometry.location.lng());
    }
    else {
        console.log("Invalid location.");
    }
}

function getWeather(lat, lng) {
    const request = require('request');
    const moment = require('moment');

    request("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&APPID=29cabd959646720b099eb2c2fa6b0518", { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        globalResults = body;

        var resultLines = body.cnt;

        if (body != null) {
            for (var i = 0; i < resultLines; i++) {
                var dateString = moment.unix(body.list[i].dt).format("DD/MM/YYYY hh:mm A");

                console.log(dateString);
                console.log(body.list[i].weather[0].main);
            }
        }
    });
}

function getGlobalResults() {
    return globalResults;
}
