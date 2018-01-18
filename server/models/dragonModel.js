const _ = require('lodash');

function trainDragon(dragon) {
  let fighter = {
    scaleThickness: 'attack',
    clawSharpness: 'armor',
    wingStrength: 'agility',
    fireBreath: 'endurance'
  }
  Object.entries(fighter).forEach(([key, value]) => (fighter[key] = dragon[value]));
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

function getDragon(trainedDragon, weather) {
  
  var weatherCode = weather.code[0]
  if (weatherCode !== 'SRO') {
    var dragon = trainedDragon
    if (weatherCode === 'HVA') {
      dragon.clawSharpness = dragon.clawSharpness + dragon.fireBreath
      dragon.fireBreath = 0

      dragon.clawSharpness > 10
        ? dragon.wingStrength = dragon.wingStrength + dragon.clawSharpness - 10
        : dragon.wingStrength = dragon.wingStrength - (10 - dragon.clawSharpness)
      dragon.clawSharpness = 10
    }
    return dragon
  } 
}

function getZenDragon() {
  return {
    scaleThickness: 5,
    clawSharpness: 5,
    wingStrength: 5,
    fireBreath: 5
  }
}

module.exports = {
  trainDragon,
  buildDragon,
  getDragon,
  getZenDragon
}