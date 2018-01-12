const _ = require('lodash');
var parseString = require('xml2js').parseString;

function trainDragon(dragon) {
  fighter = {}
  _.mapKeys(dragon, (value, key) => {
      key === 'attack' && (fighter['scaleThickness'] = value)
      key === 'armor' && (fighter['clawSharpness'] = value)
      key === 'agility' && (fighter['wingStrength'] = value)
      key === 'endurance' && (fighter['fireBreath'] = value)
  });
  return fighter
}

function buildDragon(response) {
  var knight = _.pickBy(response.data.knight, _.isNumber)
  var dragon = {}

  var smallest = _.chain(knight).values().sort().first().value();
  var largest = _.chain(knight).values().sort().last().value();
  var largestDone = false
  var smallestDone = false

  Object.entries(knight).forEach(([key, value]) => {
    dragon = _.update(knight, key, (stat) => {
      if (value === smallest && !smallestDone) {
        smallestDone = true
        return stat
      } else if (value === largest && !largestDone) {
        largestDone = true
        return stat + 2
      } else {
        return stat - 1
      }
    })
  })
  return dragon
}

function getDragon(trainedDragon, response, weather) {
  
  var weatherCode = weather.code[0]
  if (weatherCode !== 'SRO') {
    var dragon = trainedDragon
    if (weatherCode === 'HVA') {
      dragon.clawSharpness = dragon.clawSharpness + dragon.fireBreath
      dragon.fireBreath = 0

      if (dragon.clawSharpness > 10) {
        dragon.wingStrength = dragon.wingStrength + dragon.clawSharpness - 10
        dragon.clawSharpness = 10
      } else {
        var difference = 10 - dragon.clawSharpness
        dragon.wingStrength = dragon.wingStrength - difference
        dragon.clawSharpness = 10
      }
    }
    // if (weatherCode === 'T E') {
    //   console.log('true')
    //   Object.entries(dragon).forEach(([key, value]) => {
    //     dragon = _.update(dragon, key, (stat) => {
    //       return 5
    //     })
    //   })
    // }
    return dragon
  } 
}

function getZenDragon() {
  var dragon = {
      scaleThickness: 5,
      clawSharpness: 5,
      wingStrength: 5,
      fireBreath: 5
  }
  return dragon
}

function getWeather(xml) {
  var report = {}
  parseString(xml, (err, result) => {
    report = result.report
  })
  return report
}

module.exports = {
  trainDragon,
  buildDragon,
  getDragon,
  getZenDragon,
  getWeather
}