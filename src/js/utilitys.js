import { executeMoves } from "./playerMovement.js"
import { movementSpeed } from "./stats.js"

export {
    playerIdentifier,
    bombCount,
    bombList,
    square_1,
    square_2,
    playerlist,
    objList,
    lastHitByList,
    hisIndestructible,
    positionBlackList,
    playground,
    objCount,
    hasTakeHit,
    generationUtilitises,
    powerUpObjList,
    playerTimers,
    hisInvincible,
    hisRespawning,
    menuUtility,
    restartButton,
    generateButton,
    pauseButton,
    playgroundCover,
    pauseLogo
}

// Menu Utilitise

const menuUtility = {
    inPause: true
}

// Create Players and HTML import

const playground = document.querySelector("#playground")
const playgroundCover = document.querySelector("#playground-cover")

const square_1 = document.createElement("div")
square_1.id = "body_1"
square_1.style.opacity = "0"
document.querySelector("#playground").appendChild(square_1)

const square_2 = document.createElement("div")
square_2.id = "body_2"
square_2.style.opacity = "0"
document.querySelector("#playground").appendChild(square_2)

const generateButton = document.querySelector("#generate_button")
const restartButton = document.querySelector("#restart_button")
const pauseButton = document.querySelector("#pause_button")
pauseButton.textContent = "Pause"
const pauseLogo = document.querySelector("#pause-logo")
pauseLogo.style.opacity = "0"
pauseLogo.disabled = true

// Loader

window.addEventListener("load", () => {
    playground.width = 900 + "px"
    playground.height = 800 + "px"
    square_1.style.position = "absolute";
    square_1.style.left = 20 + "px";
    square_1.style.top = 20 + "px";
    square_1.style.height = 18 + "px";
    square_1.style.width = 18 + "px";
    square_1.style.opacity = "1"
    square_1.style.animation = "appearance 0.2s 1"
    square_2.style.position = "absolute";
    square_2.style.height = 18 + "px";
    square_2.style.width = 18 + "px";
    square_2.style.left = ((parseInt(playground.width) - 20 ) - parseInt(square_2.style.width)) + "px";
    square_2.style.top = ((parseInt(playground.height) - 20 ) - parseInt(square_2.style.width)) + "px";
    square_2.style.opacity = "1"
    square_2.style.animation = "appearance 0.2s 1"
    playgroundCover.style.animation = "opacityOut 0.2s 1 both"
    generateButton.disabled = false
    restartButton.disabled = false
    pauseButton.disabled = false
    menuUtility.inPause = false
    executeMoves(movementSpeed.player_1, movementSpeed.player_2)
    setTimeout(()=>{
        pauseLogo.style.opacity = "1"
    },200)
})

// Player Identifier

const playerIdentifier = {
    player_1: square_1,
    player_2: square_2
}

// His Invincible Variable

const hisInvincible = {
    player_1: false,
    player_2: false
}

// His Respawning Variable

const hisRespawning = {
    player_1: false,
    player_2: false
}

// Player List

const playerlist = ["player_1", "player_2"]

//  Object Identifier

const objList = {
    "#body_1": "player_1",
    "#body_2": "player_2"
}

// Bomb Id List

const bombList = {}

// PowerUp Object List

const powerUpObjList = {}

// Last Hit By List

const lastHitByList = {
    player_1: "",
    player_2: ""
}

// Player Timers

const playerTimers = {
    player_1: {
        invincibility: 0,
        movementSpeedBoost: 0,
        sizeShift: 0
    },
    player_2: {
        invincibility: 0,
        movementSpeedBoost: 0,
        sizeShift: 0
    }
}

//Generation Utilitise

const generationUtilitises = {
    isGenerating: false,
    timeLeft: false,
    hisGenIntervalPowerUp: false,
    executed: 0,
    finish: 0,
    count1: 0,
    count2: 0,
    count3: 0
}

// His Indestructible (for blocks)

const hisIndestructible = {}

// Has take Hit

const hasTakeHit = {
    player_1: {takeHit: false, inCooldown: false},
    player_2: {takeHit: false, inCooldown: false}
}

// Bomb Count

const bombCount = {
    player_1: 0,
    player_2: 0
}

// Object Count

const objCount = {
    objSpecial: 2,
    block: {count: 0, max: 120},
    powerUp: {count: 0, max: 30}
}

// Position Black Listed
/**
 * Value Order:
 * - X Coordinate
 * - Y Coordinate
 * - Width
 * - Height
 */
const positionBlackList = {
    spawnPlayer1 : [0, 0, 150, 150],
    spawnPlayer2 : [750, 750, 150, 150],
    center : [300, 300, 300, 300]
}

export function positionBlackListUpdater () {
    positionBlackList.spawnPlayer2[0] = parseInt(parseInt(playground.width) - 150)
    positionBlackList.spawnPlayer2[1] = parseInt(parseInt(playground.height) - 150)
    positionBlackList.center[0] = Math.round( ( parseInt(playground.width) - 300) /2)
    positionBlackList.center[1] = Math.round( ( parseInt(playground.height) - 300) /2)
}