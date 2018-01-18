const expect = require('expect')

var {trainDragon, buildDragon, getDragon, getZenDragon} = require('./../models/dragonModel')

const apiResponse = { 
  data: { 
    gameId: 3984130,
    knight: { 
      name: 'Sir. Lloyd Buchanan of Yukon',
      attack: 0,
      armor: 8,
      agility: 7,
      endurance: 5 
    } 
  } 
}

const knight = {
  attack: 4,
  armor: 0,
  agility: 8,
  endurance: 8
}

const trainedDragon = {
  scaleThickness: 2,
  clawSharpness: 10,
  wingStrength: 8,
  fireBreath: 0
}

const weather = {
  code: "HVA",
  message: " If your sign is Aquarius, you’re in for a treat today, at first the water is going to fall on the ground and then it will also stick around for a while. Leaving the house raftless will result in mandatory swim class. The King announces that 10 most impressive swimmers will be representing the Kingdom in the International Olympic Games. Practice is every Tuesday and Thursday or whenever there’s a flood"
}

describe('build dragon', () => {
  it('should change knights stats dragons stats', () => {
    expect(buildDragon(apiResponse)).toEqual({
      attack: 0,
      armor: 10,
      agility: 6,
      endurance: 4
    })
  })
})

describe('train dragon', () => {
  it('should change knights status names to dragons status names', () => {
    expect(trainDragon(knight)).toEqual({
      scaleThickness: 4,
      clawSharpness: 0,
      wingStrength: 8,
      fireBreath: 8
    })
  })
})

describe('get dragon', () => {
  it('should change dragon stats suitable for flood', () => {
    expect(getDragon(trainedDragon, weather)).toEqual({
      scaleThickness: 2,
      clawSharpness: 10,
      wingStrength: 8,
      fireBreath: 0
    })
  })
})