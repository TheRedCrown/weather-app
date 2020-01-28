const request = require('request')

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoidGhlcmVkY3Jvd24iLCJhIjoiY2s1cWs0eWdtMDMydjNqbXFwcnQxNWxuMSJ9.Ns3MoeVSR_a4girv0plCqg'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("Turn on your internet!", undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find your location', undefined)
        } else {
            const coords = body.features[0].center
            callback(undefined, {
                latitude: coords[1],
                longitude: coords[0],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geocode