export { objHpValue, maxBomb, cooldowntimeset, bombtimeset, movingByP1, movingByP2, bombPower, objHpMaxValue, playerScore}

// Hp Values of Obj (including Players)

const objHpValue = {
    player_1: 100,
    player_2: 100
}

// Hp Max Values of Obj (including Players)

const objHpMaxValue = {
    player_1: 100,
    player_2: 100
}

// Players Movement Speed

const movingByP1 = 1
const movingByP2 = 1

// Max Bomb

const maxBomb = {
    player_1: 2,
    player_2: 2
}

// Bomb set Cooldown

const cooldowntimeset = {
    player_1: 100,
    player_2: 100
}

// Bomb Timer

const bombtimeset = {
    player_1: 200,
    player_2: 200
}

// Bomb Power

const bombPower = {
    player_1: 1,
    player_2: 1
}

// Player Score Stats

const playerScore = {
    player_1: {score: 0, level: 0, kill: 0, roundWin: 0},
    player_2: {score: 0, level: 0, kill: 0, roundWin: 0}
}