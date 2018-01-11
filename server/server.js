require('./config/config');

const express = require('express');
const axios = require('axios');
const _ = require('lodash');

var app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  axios.get('http://www.dragonsofmugloar.com/api/game')
  .then( (response) => {
    var knight = _.pickBy(response.data.knight, _.isNumber)
    var dragon = {}

    var smallest = _.chain(knight).values().sort().first().value();
    var largest = _.chain(knight).values().sort().last().value();
    var largestDone = false
    var smallestDone = false

    console.log('New -----------------')

    Object.entries(knight).forEach(([key, value]) => {
      dragon = _.update(knight, key, function(n) { 
        
        console.log('Smallest: ', smallestDone)
        console.log('Largest: ', largestDone)
        if (value === smallest && !smallestDone) {
          smallestDone = true
          return n
        } else if (value === largest && !largestDone) {
          largestDone = true
          return n + 2
        } else {
          return n - 1
        }
      });
    });
     
    var readyDragon = _.mapKeys(dragon, function(value, key) {
      if (key == 'attack') {
        return 'scaleThickness'
      } else if (key == 'armor') {
        return 'clawSharpness'
      } else if (key == 'agility') {
        return 'wingStrength'
      } else if (key == 'endurance') {
        return 'fireBreath'
      }
    });
    var all = {
      knightdata: response.data.knight,
      readyDragon,
      largest,
      smallest
    }
    axios({
      method: 'put',
      url: `http://www.dragonsofmugloar.com/api/game/${response.data.gameId}/solution`,
      data: {dragon: readyDragon}
    }).then( (response) => {
      var test = {
        all,
        response : response.data
      }
      res.send(test)
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