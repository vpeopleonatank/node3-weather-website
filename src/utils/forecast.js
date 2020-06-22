const request = require('request')

const forecast = (lat, long, callback) => {

  const url = 'http://api.weatherstack.com/current?access_key=44c525a0db2cff565bf82fa842cc7a31&query=' + lat + ',' + long + '&units=f';

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (body.error === 0) {
      callback('Unable to find location. Try another search', undefined)
    } else {
      callback(undefined, {
        weather_description: body.current.weather_descriptions[0],
        temperature: body.current.temperature
      })
    }
  })
}

module.exports = forecast