
// Import

import { menuUtility, objList, square_1, square_2 } from "./utilitys.js";
import { createBombe } from "./bomb.js";
import { objColliderChecker } from "./hit_Box.js";
import { objHpValue, movingByP1, movingByP2 } from "./stats.js";

// Keys Controller

const controller = {
    38: {pressed: false, name: 38}, // Up Arrow | Flèche du haut
    40: {pressed: false, name: 40}, // Down Arrow | Flèche du bas
    37: {pressed: false, name: 37}, // Left Arrow | Flèche de Gauche
    39: {pressed: false, name: 39}, // Right Arrow | Flèche de droite
    90: {pressed: false, name: 90}, // Z
    83: {pressed: false, name: 83}, // S
    81: {pressed: false, name: 81}, // Q
    68: {pressed: false, name: 68}, // D
    32: {pressed: false, name: 32}, // SPACE
    96: {pressed: false, name: 96}  // NumPad 0
}

// Player 1 Movement Function

const moveplayer_1 = (keyInput) => {
    if (objHpValue.player_1 > 0) {
        switch (keyInput) {
            case 38: // Up Arrow | Flèche du haut
                if (parseInt(square_1.style.top) != 0 && objColliderChecker(square_1, "UP", objList)) {
                    square_1.style.top = parseInt(square_1.style.top) - movingByP1 + "px";
                }
                break;
            case 40: // Down Arrow | Flèche du bas
                if (parseInt(square_1.style.top) != (parseInt(playground.height) - parseInt(square_1.style.width)) && objColliderChecker(square_1, "DOWN", objList)) {
                    square_1.style.top = parseInt(square_1.style.top) + movingByP1 + "px";
                }
                break;
            case 37: // Left Arrow | Flèche de Gauche
                if (parseInt(square_1.style.left) != 0 && objColliderChecker(square_1, "LEFT", objList)) {
                    square_1.style.left = parseInt(square_1.style.left) - movingByP1 + "px";
                }
                break;
            case 39: // Right Arrow | Flèche de droite
                if (parseInt(square_1.style.left) != (parseInt(playground.width) - parseInt(square_1.style.width)) && objColliderChecker(square_1, "RIGHT", objList)) {
                    square_1.style.left = parseInt(square_1.style.left) + movingByP1 + "px";
                }
                break;
            
            
            case 96: // NUMPAD_0
                    createBombe(square_1)
                break;
        }
    }
}

// Player 2 Movement Function

const moveplayer_2 = (keyInput) => {
    if (objHpValue.player_2 > 0) {
        switch(keyInput) {
            case 90: // Z
                if (parseInt(square_2.style.top) != 0 && objColliderChecker(square_2, "UP", objList)) {
                    square_2.style.top = parseInt(square_2.style.top) - movingByP2 + "px";
                }
                break;
            case 83: // S
                if (parseInt(square_2.style.top) != (parseInt(playground.height) - parseInt(square_2.style.width)) && objColliderChecker(square_2, "DOWN", objList)) {
                    square_2.style.top = parseInt(square_2.style.top) + movingByP2 + "px";
                }
                break;
            case 81: // Q
                if (parseInt(square_2.style.left) != 0 && objColliderChecker(square_2, "LEFT", objList)) {
                    square_2.style.left = parseInt(square_2.style.left) - movingByP2 + "px";
                }
                break;
            case 68: // D
                if (parseInt(square_2.style.left) != (parseInt(playground.width) - parseInt(square_2.style.width)) && objColliderChecker(square_2, "RIGHT", objList)) {
                    square_2.style.left = parseInt(square_2.style.left) + movingByP2 + "px";
                }
                break;
            case 32: // SPACE
                createBombe(square_2)
                break;

        }
    }
}

// Key Updater

document.addEventListener("keydown", (e) => {
    if (controller[e.keyCode]) {
        controller[e.keyCode].pressed = true
    }
})
document.addEventListener("keyup", (e) => {
    if (controller[e.keyCode]) {
        controller[e.keyCode].pressed = false
    }
})

// Frame Movement Function

const frameMovesPlayer1 = () => {
    for(let Key in controller) {
        if(controller[Key].pressed)
            moveplayer_1(controller[Key].name)
    }
}
const frameMovesPlayer2 = () => {
    for(let Key in controller) {
        if(controller[Key].pressed)
            moveplayer_2(controller[Key].name)
    }
}

let movePlayer1
let movePlayer2 
let moveP1Check = false
let moveP2Check = false

// Movement Execution

export function executeMoves (speedP1, speedP2) {
    if (moveP1Check)
        clearInterval(movePlayer1)
    if (moveP2Check)
        clearInterval(movePlayer2)
    movePlayer1 = setInterval(()=> {
        if (!menuUtility.inPause)
            frameMovesPlayer1()
    }, speedP1)
    movePlayer2 = setInterval(()=> {
        if (!menuUtility.inPause)
            frameMovesPlayer2()
    }, speedP2)
    moveP1Check = true
    moveP2Check = true
}

// Stop Movement

export function stopMoves () {
    if (moveP1Check) {
        clearInterval(movePlayer1)
        moveP1Check = false
    }
    if (moveP2Check) {
        clearInterval(movePlayer2)
        moveP2Check = false
    }
}