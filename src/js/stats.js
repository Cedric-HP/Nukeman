export { 
    objHpValue,
    maxBomb,
    coolDownTimeSet,
    bombTimeSet,
    movingByP1,
    movingByP2,
    bombPower,
    objHpMaxValue,
    playerScore,
    levelCap,
    regenerationStats,
    movementSpeed,
    powerUpList
}

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

// Player Regeneration Stats

const regenerationStats = {
    player_1: {regenAmount: 1, passiveRegenCoolDown: 10, hisInRegen: false, regenSpeed: 1},
    player_2: {regenAmount: 1, passiveRegenCoolDown: 10, hisInRegen: false, regenSpeed: 1}
}

// Players Movement Speed

const movingByP1 = 1
const movingByP2 = 1

const movementSpeed = {
    player_1: 8,
    player_2: 8
}

// Max Bomb

const maxBomb = {
    player_1: 1,
    player_2: 1
}

// Bomb set Cooldown

const coolDownTimeSet = {
    player_1: 200,
    player_2: 200
}

// Bomb Timer

const bombTimeSet = {
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
    player_1: {score: 0, level: 1, kill: 0, roundWin: 0, multiplier: 1},
    player_2: {score: 0, level: 1, kill: 0, roundWin: 0, multiplier: 1}
}

// Level Cap Stat
//    |Level Cap|  BombPower  | Bomb Spawn  | Exp     | Max Bomb   | Bomb Timer | Max Hp   | Regeneration |
//    |         |             | CoolDown    | Multipl | Count      |            |          | Speed        |
const levelCap = {
    1:{ cap: 750, bombpower: 1, cooldown: 10, multi: 0, bombcount: 0, bombset: 0, maxHp: 10, regenspeed: 0},
    2:{ cap: 1250, bombpower: 1, cooldown: 10, multi: 0, bombcount: 0, bombset: 0, maxHp: 10, regenspeed: 0},
    3:{ cap: 2000, bombpower: 1, cooldown: 10, multi: 0, bombcount: 0, bombset: 0, maxHp: 10, regenspeed: 0},
    4:{ cap: 3000, bombpower: 1, cooldown: 10, multi: 0, bombcount: 0, bombset: 10, maxHp: 10, regenspeed: 0},
    5:{ cap: 5000, bombpower: 1, cooldown: 10, multi: 0, bombcount: 1, bombset: 10, maxHp: 10, regenspeed: 0.1},
    6:{ cap: 7500, bombpower: 1, cooldown: 10, multi: 0, bombcount: 0, bombset: 20, maxHp: 10, regenspeed: 0.1},
    7:{ cap: 10000, bombpower: 1, cooldown: 10, multi: 0.1, bombcount: 0, bombset: 20, maxHp: 10, regenspeed: 0.1},
    8:{ cap: 15000, bombpower: 1, cooldown: 10, multi: 0.15, bombcount: 0, bombset: 20, maxHp: 10, regenspeed: 0.1},
    9:{ cap: 25000, bombpower: 1, cooldown: 20, multi: 0, bombcount:  1, bombset: 20, maxHp: 20, regenspeed: 0.1},
    10:{ cap: 0 }
}

// PowerUp List

const powerUpList = {
    normal: [
        { name: "movement_speed", color: "green"},
        { name: "heal", color: "deeppink"},
        { name: "sizeShift", color: "maroon"}
    ],
    powerfull: [
        { name: "invincibility", color: "yellow"}
        // { name: "nukePower", color: "greenyellow"}
        // { name: "xp", color: "greenyellow"}
    ]
}