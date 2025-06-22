
// Export

export {playerIdentifier, bombCount, bombList, square_1, square_2, playerlist, objList, explosionList, objName }

// Players HTML import

let square_1 = document.querySelector("#block_1")
let square_2 = document.querySelector("#block_2")

// Loader

window.addEventListener("load", () => {
    square_1.style.position = "absolute";
    square_1.style.left = 0 + "px";
    square_1.style.top = 0 + "px";
    square_1.style.height = 18 + "px";
    square_1.style.width = 18 + "px";
    square_2.style.position = "absolute";
    square_2.style.height = 18 + "px";
    square_2.style.width = 18 + "px";
    square_2.style.left = (900 - parseInt(square_2.style.width)) + "px";
    square_2.style.top = (900 - parseInt(square_2.style.width)) + "px";
})

// Player Identifier

const playerIdentifier = {
    player_1: square_1,
    player_2: square_2
}

// Player List

const playerlist = ["player_1", "player_2"]

//  Object Identifier

const objList = ["#block_1", "#block_2"]

// Bomb Id List

const bombList = []

// Explosion List

const explosionList = []

// Object Name

const objName = {
    "#block_1": "player_1",
    "#block_2": "player_2"
}

// Bomb Count

const bombCount = {
    player_1: 0,
    player_2: 0
}
