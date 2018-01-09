require('./config/config');

const express = require('express');
const axios = require('axios');

var app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  axios.get('http://www.dragonsofmugloar.com/api/game')
  .then( (response) => {

    axios({
      method: 'put',
      url: `http://www.dragonsofmugloar.com/api/game/${response.data.gameId}/solution`,
      data: {
        dragon: {
          scaleThickness: 2,
          clawSharpness: 6,
          wingStrength: 3,
          fireBreath: 9
        }
      }
    }).then( (response) => {
      res.send(response.data)
    }).catch( error => {
      console.log(error)
    });

  })
  .catch( error => {
    console.log(error)
  });

});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};