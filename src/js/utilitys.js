export {playerIdentifier, bombCount, bombList, square_1, square_2, playerlist, objList, lastHitByList, hisIndestructible, positionBlackList, playground, objSpecial }

// Players HTML import

let square_1 = document.querySelector("#body_1")
let square_2 = document.querySelector("#body_2")
let playground = document.querySelector("#playground")

// Loader

window.addEventListener("load", () => {
    playground.width = 900 + "px"
    playground.height = 800 + "px"
    square_1.style.position = "absolute";
    square_1.style.left = 20 + "px";
    square_1.style.top = 20 + "px";
    square_1.style.height = 18 + "px";
    square_1.style.width = 18 + "px";
    square_2.style.position = "absolute";
    square_2.style.height = 18 + "px";
    square_2.style.width = 18 + "px";
    square_2.style.left = ((parseInt(playground.width) - 20 ) - parseInt(square_2.style.width)) + "px";
    square_2.style.top = ((parseInt(playground.height) - 20 ) - parseInt(square_2.style.width)) + "px";
})

// Player Identifier

const playerIdentifier = {
    player_1: square_1,
    player_2: square_2
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

// Last Hit By List

const lastHitByList = {
    player_1: "",
    player_2: ""
}

// His Indestructible (for blocks)

const hisIndestructible = {}

// Bomb Count

const bombCount = {
    player_1: 0,
    player_2: 0
}

// Object Special

let objSpecial = 2

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