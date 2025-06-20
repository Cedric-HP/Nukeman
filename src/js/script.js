import { hitBoxchecker } from "./hit_Box.js"

let square_1 = document.querySelector("#block_1")
let square_2 = document.querySelector("#block_2")
let display_cooldown_1 = document.querySelector("#cooldown_player_1")
let display_cooldown_2 = document.querySelector("#cooldown_player_2")
let display_array = document.querySelector("#array_display")
let display_Hp_Value_Player_1 = document.querySelector("#hpValuePlayer1")
let display_Hp_Value_Player_2 = document.querySelector("#hpValuePlayer2")
let display_Hp_Barre_Player_1 = document.querySelector("#hpPlayer1")
let display_Hp_Barre_Player_2 = document.querySelector("#hpPlayer2")
const movingByP1 = 2
const movingByP2 = 2
const playerIdentifier = {
    player_1: square_1,
    player_2: square_2
}
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
const bombPower = {
    player_1: 1,
    player_2: 1
}
const objHpValue = {
    player_1: 100,
    player_2: 100
}
const hisRespawning = {
    player_1: false,
    player_2: false
}
const hisInvincible = {
    player_1: false,
    player_2: false
}
const invincibilityTime = {
    player_1: 0,
    player_2: 0
}
const objIdentifier = {
    
}
const directionList = ["UP", "DOWN", "LEFT", "RIGHT"]
const playerlist = ["player_1", "player_2"]
const objList = ["#block_1", "#block_2"]
const bombList = []
const explosionList = []
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


// Loader
window.addEventListener("load", () => {
    square_1.style.position = "absolute";
    square_1.style.left = 0 + "px";
    square_1.style.top = 0 + "px";
    square_1.style.width = 18 + "px";
    square_2.style.position = "absolute";
    square_2.style.width = 38 + "px";
    square_2.style.left = (900 - parseInt(square_2.style.width)) + "px";
    square_2.style.top = (900 - parseInt(square_2.style.width)) + "px";
})

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
            if (obj == square_1 || obj == square_2) {
                if(document.querySelector(objTested) == square_1 || document.querySelector(objTested) == square_2) {
                    return hitBoxchecker(direction, parseInt(obj.style.left), parseInt(obj.style.top), parseInt(obj.style.width)+2, parseInt(document.querySelector(objTested).style.left), parseInt(document.querySelector(objTested).style.top), parseInt(document.querySelector(objTested).style.width)+2 )
                }
                else {
                    return hitBoxchecker(direction, parseInt(obj.style.left), parseInt(obj.style.top), parseInt(obj.style.width)+2, parseInt(document.querySelector(objTested).style.left), parseInt(document.querySelector(objTested).style.top), parseInt(document.querySelector(objTested).style.width) )
                }
            }
            else {
                if(document.querySelector(objTested) == square_1 || document.querySelector(objTested) == square_2) {
                    return hitBoxchecker(direction, parseInt(obj.style.left), parseInt(obj.style.top), parseInt(obj.style.width), parseInt(document.querySelector(objTested).style.left), parseInt(document.querySelector(objTested).style.top), parseInt(document.querySelector(objTested).style.width)+2 )
                }
                else {
                    return hitBoxchecker(direction, parseInt(obj.style.left), parseInt(obj.style.top), parseInt(obj.style.width), parseInt(document.querySelector(objTested).style.left), parseInt(document.querySelector(objTested).style.top), parseInt(document.querySelector(objTested).style.width) )
                }
            }
            
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
                    checked = hitBoxchecker(direction, parseInt(obj.style.left), parseInt(obj.style.top), parseInt(obj.style.width), parseInt(document.querySelector(objTested).style.left), parseInt(document.querySelector(objTested).style.top), parseInt(document.querySelector(objTested).style.width) )
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
        bombe.style.width = square.style.width
        bombe.style.height = square.style.width
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
const createExplosion = (bombExploding) => {
    let playerOrigine = ""
    if (String(bombExploding.id) == (1)) {
        playerOrigine = "player_1"
    }
    else {
        playerOrigine = "player_2"
    }
    let explosion = document.createElement("div")
    explosion.style.width = (parseInt(bombExploding.style.width) * (2 * bombPower[playerOrigine])) + "px"
    explosion.style.height = (parseInt(bombExploding.style.width) * (2 * bombPower[playerOrigine])) +"px"
}
const moveplayer_1 = (keyInput) => {
    if (objHpValue.player_1 > 0) {
        switch (keyInput) {
            case 38: // Flèche du haut
                if (parseInt(square_1.style.top) != 0 && objColliderChecker(square_1, "UP")) {
                    square_1.style.top = parseInt(square_1.style.top) - movingByP1 + "px";
                }
                break;
            case 40: // Flèche du bas
                if (parseInt(square_1.style.top) != (900 - parseInt(square_1.style.width)) && objColliderChecker(square_1, "DOWN")) {
                    square_1.style.top = parseInt(square_1.style.top) + movingByP1 + "px";
                }
                break;
            case 37: // Flèche de Gauche
                if (parseInt(square_1.style.left) != 0 && objColliderChecker(square_1, "LEFT")) {
                    square_1.style.left = parseInt(square_1.style.left) - movingByP1 + "px";
                }
                break;
            case 39: // Flèche de droite
                if (parseInt(square_1.style.left) != (900 - parseInt(square_1.style.width)) && objColliderChecker(square_1, "RIGHT")) {
                    square_1.style.left = parseInt(square_1.style.left) + movingByP1 + "px";
                }
                break;
            
            
            case 96: // NUMPAD_0
                    createBombe(square_1)
                break;
        }
    }
}
const moveplayer_2 = (keyInput) => {
    if (objHpValue.player_2 > 0) {
        switch(keyInput) {
            case 90: // Z
                if (parseInt(square_2.style.top) != 0 && objColliderChecker(square_2, "UP")) {
                    square_2.style.top = parseInt(square_2.style.top) - movingByP2 + "px";
                }
                break;
            case 83: // S
                if (parseInt(square_2.style.top) != (900 - parseInt(square_2.style.width)) && objColliderChecker(square_2, "DOWN")) {
                    square_2.style.top = parseInt(square_2.style.top) + movingByP2 + "px";
                }
                break;
            case 81: // Q
                if (parseInt(square_2.style.left) != 0 && objColliderChecker(square_2, "LEFT")) {
                    square_2.style.left = parseInt(square_2.style.left) - movingByP2 + "px";
                }
                break;
            case 68: // D
                if (parseInt(square_2.style.left) != (900 - parseInt(square_2.style.width)) && objColliderChecker(square_2, "RIGHT")) {
                    square_2.style.left = parseInt(square_2.style.left) + movingByP2 + "px";
                }
                break;
            case 32: // SPACE
                createBombe(square_2)
                if (!hisInvincible.player_2){
                    objHpValue.player_2 --
                }
                break;

        }
    }
}

const incincibility = (player_inv) => {
    playerIdentifier[player_inv].style.borderColor = "yellow"
    const contDown = setInterval(() => {
        invincibilityTime[player_inv] -= 1
        if(invincibilityTime[player_inv] <= 0) {
            if (player_inv == "player_1") {
                playerIdentifier[player_inv].style.borderColor = "blue"
            }
            else {
                playerIdentifier[player_inv].style.borderColor = "red"
            }
            hisInvincible[player_inv] = false
            clearInterval(contDown)
        }
    }, "10")
}

const respawn = (player_resp) => {
    let timer = 100
    if (player_resp == "player_1" ){
        playerIdentifier[player_resp].style.backgroundColor = "darkblue"
        playerIdentifier[player_resp].style.borderColor = "darkblue"
    }
    else {
        playerIdentifier[player_resp].style.backgroundColor = "darkred"
        playerIdentifier[player_resp].style.borderColor = "darkred"
    }
    const contDown = setInterval(() => {
        if(timer == 0) {
            if (player_resp == "player_1" ){
                playerIdentifier[player_resp].style.backgroundColor = "blue"
                playerIdentifier[player_resp].style.top = 0 + "px"
                playerIdentifier[player_resp].style.left = 0 + "px"
            }
            else {
                playerIdentifier[player_resp].style.backgroundColor = "red"
                playerIdentifier[player_resp].style.top = (900 - parseInt(playerIdentifier[player_resp].style.width)) + "px"
                playerIdentifier[player_resp].style.left = (900 - parseInt(playerIdentifier[player_resp].style.width)) + "px"
            }
            hisInvincible[player_resp] = true
            invincibilityTime[player_resp] = 200
            incincibility(player_resp)
            objHpValue[player_resp] = 100
            hisRespawning[player_resp] = false
            clearInterval(contDown)
        }
        timer -= 1
    }, "10")
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

const executeMovesPlayer1 = () => {
    for(let Key in controller) {
        if(controller[Key].pressed)
            moveplayer_1(controller[Key].name)
    }
}
const executeMovesPlayer2 = () => {
    for(let Key in controller) {
        if(controller[Key].pressed)
            moveplayer_2(controller[Key].name)
    }
}

const executeDisplay = () => {
    let array = ""
    for (let item of bombList) {
        array += String(item) + " "
    }
    display_array.textContent = array
}
const executeDisplayHpBarre = () => {
    display_Hp_Value_Player_1.textContent = objHpValue.player_1 + "HP"
    display_Hp_Value_Player_2.textContent = objHpValue.player_2 + "HP"
    display_Hp_Barre_Player_1.style.width = objHpValue.player_1 + "%"
    display_Hp_Barre_Player_2.style.width = objHpValue.player_2 + "%"
    if (objHpValue.player_1 > 75) {
        display_Hp_Barre_Player_1.style.backgroundColor = "green"
    }
    else if (objHpValue.player_1 > 50 && objHpValue.player_1 <=75) {
        display_Hp_Barre_Player_1.style.backgroundColor = "yellow"
    }
    else if (objHpValue.player_1 > 25 && objHpValue.player_1 <=50) {
        display_Hp_Barre_Player_1.style.backgroundColor = "orange"
    }
    else if ( objHpValue.player_1 <=25) {
        display_Hp_Barre_Player_1.style.backgroundColor = "red"
    }

    if (objHpValue.player_2 > 75) {
        display_Hp_Barre_Player_2.style.backgroundColor = "green"
    }
    else if (objHpValue.player_2 > 50 && objHpValue.player_2 <=75) {
        display_Hp_Barre_Player_2.style.backgroundColor = "yellow"
    }
    else if (objHpValue.player_2 > 25 && objHpValue.player_2 <=50) {
        display_Hp_Barre_Player_2.style.backgroundColor = "orange"
    }
    else if ( objHpValue.player_2 <=25) {
        display_Hp_Barre_Player_2.style.backgroundColor = "red"
    }
}

const respawnTrigger = () => {
    for (let player_item of playerlist) {
        if (objHpValue[player_item] <= 0 && !hisRespawning[player_item]) {
            respawn(player_item)
            hisRespawning[player_item] = true
        }
    }
}

const animate = () => {
    respawnTrigger()
    executeDisplayHpBarre()
    executeMovesPlayer1()
    executeMovesPlayer2()
    executeDisplay()
    window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)