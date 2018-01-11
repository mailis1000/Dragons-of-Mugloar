require('./config/config')

const express = require('express')
const axios = require('axios')

var {trainDragon, buildDragon} = require('./models/dragonModel');

var app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  axios.get('http://www.dragonsofmugloar.com/api/game')
  .then( (response) => {

    var dragon = trainDragon(buildDragon(response))
    
    var fighters = {
      knight : response.data.knight,
      dragon
    }

    axios({
      method: 'put',
      url: `http://www.dragonsofmugloar.com/api/game/${response.data.gameId}/solution`,
      data: {dragon}
    }).then( (response) => {
      var data = {
        fighters,
        response : response.data
      }
      res.send(data)
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