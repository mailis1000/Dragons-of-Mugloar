require('./config/config')

const express = require('express')
const axios = require('axios')

var {trainDragon, buildDragon, getDragon, getWeather, getZenDragon} = require('./models/dragonModel');

var app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  axios.get('http://www.dragonsofmugloar.com/api/game')
  .then( (response) => {

    var gameID = response.data.gameId
    
    axios({
      method: 'get',
      url: `http://www.dragonsofmugloar.com/weather/api/report/${gameId}`,
      responseType: 'document'
    }).then( (weatherResponse) => {

      var weatherReport = getWeather(weatherResponse.data)
      var dragon = weatherReport.code[0] === 'T E' 
        ? getZenDragon() 
        : getDragon(trainDragon(buildDragon(response)), weatherResponse, weatherReport)
      
      var data = {
        gameId,
        fighters : {
          knight : response.data.knight,
          dragon
        },
        weather : {
          code : weatherReport.code,
          message : weatherReport.message
        }
      }

      axios({
        method: 'put',
        url: `http://www.dragonsofmugloar.com/api/game/${gameId}/solution`,
        data: {dragon}
      }).then( (response) => {
        data.response = response.data
        res.send(data)
      }).catch( error => {
        console.log(error)
      })
    }).catch( error => {
      console.log(error)
    })
  })
  .catch( error => {
    console.log(error)
  })

})

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};