const request = require('request')

const forecast = (a, b, callback) => {
    const url = 'https://api.darksky.net/forecast/739a799218a83290413b387988f5d6d6/' + a + ',' + b + '?units=si&lang=ru'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Turn on your internet!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Please try search again.', undefined)
        } else {
            const currently = body.currently
            const tmp = currently.temperature
            const chanceRain = currently.precipProbability

            callback(undefined, body.daily.data[0].summary + " Сейчас " + tmp + '℃, шанс осадков составляет ' + chanceRain + "%. Скорость ветра - "+ body.daily.data[0].windSpeed + 'м/с.')
        }
    });
}

module.exports = forecast