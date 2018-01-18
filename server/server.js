require('./config/config')

const express = require('express')
const axios = require('axios')
var parseString = require('xml2js').parseString;

var {trainDragon, buildDragon, getDragon, getZenDragon} = require('./models/dragonModel');

var app = express();
const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  axios.get('http://www.dragonsofmugloar.com/api/game')
  .then( (response) => {

    var gameId = response.data.gameId
    // HVA 7563363
    
    axios({
      method: 'get',
      url: `http://www.dragonsofmugloar.com/weather/api/report/${gameId}`,
      responseType: 'document'
    }).then( (weatherResponse) => {

      parseString(weatherResponse.data, (err, result) => weatherReport = result.report)
      
      var dragon = weatherReport.code[0] === 'T E' 
        ? getZenDragon() 
        : getDragon(trainDragon(buildDragon(response)), weatherReport)
      
      var data = {
        gameId,
        fighters : {
          knight : response.data.knight,
          dragon
        },
        weather : {
          code : weatherReport.code[0],
          message : weatherReport.message[0]
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