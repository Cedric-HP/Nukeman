import { hitBoxchecker } from "./hit_Box.js"
let square_1 = document.querySelector("#block_1")
let square_2 = document.querySelector("#block_2")
let display_cooldown_1 = document.querySelector("#cooldown_player_1")
let display_cooldown_2 = document.querySelector("#cooldown_player_2")
let display_array = document.querySelector("#array_display")
const movingByP1 = 2
const movingByP2 = 2
const cooldowntimeset = {
    player_1: 50,
    player_2: 50
}
const bombtimeset = {
    player_1: 200,
    player_2: 200
}
const bombcooldown = {
    player_1: true,
    player_2: true
}
const maxBomb = {
    player_1: 3,
    player_2: 3
}
const bombcount = {
    player_1: 0,
    player_2: 0
}
const idBombCycle = {
    player_1: 0,
    player_2: 0
}
const directionList = ["UP", "DOWN", "LEFT", "RIGHT"]

// Loader
window.addEventListener("load", () => {
    square_1.style.position = "absolute";
    square_1.style.left = 0 + "px";
    square_1.style.top = 0 + "px";
    square_2.style.position = "absolute";
    square_2.style.left = 880 + "px";
    square_2.style.top = 880 + "px";
})
const objList = ["#block_1", "#block_2"]
const bombList = []
const controller = {
    38: {pressed: false, name: 38},
    40: {pressed: false, name: 40},
    37: {pressed: false, name: 37},
    39: {pressed: false, name: 39},
    90: {pressed: false, name: 90},
    83: {pressed: false, name: 83},
    81: {pressed: false, name: 81},
    68: {pressed: false, name: 68},
    32: {pressed: false, name: 32},
    96: {pressed: false, name: 96}
}
const cycleBombId = (player) => {
    if (idBombCycle[player] < (maxBomb[player] - 1) ) {
        idBombCycle[player] ++
    }
    else {
        idBombCycle[player] = 0
    }
}
const objColliderChecker = (obj, direction) => {
    for (let objTested of objList) {
        if (obj != document.querySelector(objTested)) {
            return hitBoxchecker(direction, parseInt(obj.style.left), parseInt(obj.style.top), parseInt(document.querySelector(objTested).style.left), parseInt(document.querySelector(objTested).style.top) )
        }
    }

}
const bombColliderChecker = (obj) => {
    const bomblisted = bombList
    let checked = true
    if (bomblisted != []) {
        for (let direction of directionList) {
            for (let objTested of bomblisted) {
                if (obj != document.querySelector(objTested)) {
                    checked = hitBoxchecker(direction, parseInt(obj.style.left), parseInt(obj.style.top), parseInt(document.querySelector(objTested).style.left), parseInt(document.querySelector(objTested).style.top) )
                }
                if (!checked) {
                    return false
                }
            }
        }
    }
    return true
}
const bombCoolDownSet = (player, cooldowntime) => {
    let timer = cooldowntime
    let display
    if (player == "player_1") {
        display = display_cooldown_1
    }
    else {
        display = display_cooldown_2
    }
    display.style.color = "red";
    const contDown = setInterval(() => {
        timer -= 1
        if(timer > 0) {
            display.textContent = timer
        }
        else {
            display.style.color = "blue";
            display.textContent = "Ready!";
            bombcooldown[player] = true
            clearInterval(contDown)
        }
    }, "10")
}

const bombTimer = (bombId, player, cooldowntime) => {
    let timer = cooldowntime
    const contDownTimer = setInterval(() => {
        timer -= 20
        if (timer > 0) {
            if ((timer/20) % 2 == 0) {
                document.querySelector(bombId).style.backgroundColor = "red";
            }
            else {
                document.querySelector(bombId).style.backgroundColor = "black";
            }
        }
        else if (timer == 0) {
            document.querySelector(bombId).remove()
            bombcount[player] -= 1
            for (let i = 0; i < bombList.length; i++) {
                if (bombList[i] == bombId ) {
                    bombList.splice(i, i+1)
                }
            }
            clearInterval(contDownTimer)
        }
    }, "200")
}

const createBombe = (square) => {
    let player = ""
    if (square == square_1) {
        player = "player_1"
    }
    else {
        player = "player_2"
    }
    if (bombcount[player] < maxBomb[player] && bombcooldown[player] && bombColliderChecker(square)) {
        let bombe = document.createElement("div")
        bombe.style.width = 20 + "px";
        bombe.style.height = 20 + "px";
        bombe.style.backgroundColor = "black";
        bombe.id = "bombe_" + String(player) + "_" + String(idBombCycle[player]);
        bombe.style.position = "absolute";
        bombe.style.top = square.style.top
        bombe.style.left = square.style.left
        bombe.style.borderRadius = 50 + "%";
        document.getElementById('playground').appendChild(bombe);
        bombList.push("#" + String(bombe.id))
        bombcount[player] += 1
        bombcooldown[player] = false
        cycleBombId(player)
        bombCoolDownSet(player, cooldowntimeset[player])
        bombTimer(String("#" + String(bombe.id)), player, bombtimeset[player])
    }
}

const moveplayer = (keyInput) => {

        switch (keyInput) {
            case 38: // Flèche du haut
                if (parseInt(square_1.style.top) != 0 && objColliderChecker(square_1, "UP")) {
                    square_1.style.top = parseInt(square_1.style.top) - movingByP1 + "px";
                }
                break;
            case 40: // Flèche du bas
                if (parseInt(square_1.style.top) != 880 && objColliderChecker(square_1, "DOWN")) {
                    square_1.style.top = parseInt(square_1.style.top) + movingByP1 + "px";
                }
                break;
            case 37: // Flèche de Gauche
                if (parseInt(square_1.style.left) != 0 && objColliderChecker(square_1, "LEFT")) {
                    square_1.style.left = parseInt(square_1.style.left) - movingByP1 + "px";
                }
                break;
            case 39: // Flèche de droite
                if (parseInt(square_1.style.left) != 880 && objColliderChecker(square_1, "RIGHT")) {
                    square_1.style.left = parseInt(square_1.style.left) + movingByP1 + "px";
                }
                break;
            case 90: // Z
                if (parseInt(square_2.style.top) != 0 && objColliderChecker(square_2, "UP")) {
                    square_2.style.top = parseInt(square_2.style.top) - movingByP2 + "px";
                }
                break;
            case 83: // S
                if (parseInt(square_2.style.top) != 880 && objColliderChecker(square_2, "DOWN")) {
                    square_2.style.top = parseInt(square_2.style.top) + movingByP2 + "px";
                }
                break;
            case 81: // Q
                if (parseInt(square_2.style.left) != 0 && objColliderChecker(square_2, "LEFT")) {
                    square_2.style.left = parseInt(square_2.style.left) - movingByP2 + "px";
                }
                break;
            case 68: // D
                if (parseInt(square_2.style.left) != 880 && objColliderChecker(square_2, "RIGHT")) {
                    square_2.style.left = parseInt(square_2.style.left) + movingByP2 + "px";
                }
                break;
            case 32: // SPACE
                    createBombe(square_2)
                break;
            case 96: // NUMPAD_0
                    createBombe(square_1)
                break;
        }
}

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

const executeMoves = () => {
    for(let Key in controller) {
        if(controller[Key].pressed)
            moveplayer(controller[Key].name)
    }
}
const executeDisplay = () => {
    let array = ""
    for (let item of bombList) {
        array += String(item) + " "
    }
    display_array.textContent = array
}
const animate = () => {
    executeMoves()
    executeDisplay()
    window.requestAnimationFrame(animate)
}
window.requestAnimationFrame(animate)