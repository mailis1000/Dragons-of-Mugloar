const _ = require('lodash');

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

module.exports = {
  trainDragon,
  buildDragon
}