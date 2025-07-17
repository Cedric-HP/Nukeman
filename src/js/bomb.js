
// Import

import { objColliderChecker } from "./hit_Box.js"
import { bombCount, bombList, hisIndestructible, square_1 } from "./utilitys.js"
import { coolDownTimeSet, maxBomb, bombTimeSet, objHpValue } from "./stats.js"
import { createExplosion } from "./explosion.js"

// Import Display HTML

let display_cooldown_1 = document.querySelector("#cooldown_player_1")
let display_cooldown_2 = document.querySelector("#cooldown_player_2")

// Variables

const idBombCycle = {
    player_1: 0,
    player_2: 0
}

const bombCoolDown = {
    player_1: true,
    player_2: true
}

const cycleBombId = (player) => {
    if (idBombCycle[player] < (maxBomb[player] - 1) ) {
        idBombCycle[player] ++
    }
    else {
        idBombCycle[player] = 0
    }
}
export function createBombe (square) {
    let player = ""
    if (square == square_1) {
        player = "player_1"
    }
    else {
        player = "player_2"
    }
    if (bombCount[player] < maxBomb[player] && bombCoolDown[player] && objColliderChecker(square, "ALL", bombList)) {
        let bombe = document.createElement("div")
        bombe.style.width = ( parseInt(square.style.width) + 2) + "px"
        bombe.style.height = ( parseInt(square.style.width) + 2) + "px"
        bombe.style.backgroundColor = "black";
        bombe.id = "bombe_" + String(player) + "_" + String(idBombCycle[player]);
        bombe.style.position = "absolute";
        bombe.style.top = square.style.top 
        bombe.style.left = square.style.left
        bombe.style.borderRadius = 50 + "%";
        bombe.style.animation = "bombeTimer 0.5s infinite both";
        document.getElementById('playground').appendChild(bombe);
        bombList["#" + String(bombe.id)] = String(bombe.id)
        bombCount[player] += 1
        bombCoolDown[player] = false
        hisIndestructible[String(bombe.id)] = false
        cycleBombId(player)
        bombCoolDownSet(player, coolDownTimeSet[player])
        bombTimer(String("#" + String(bombe.id)), player, bombTimeSet[player])
    }
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
            display.style.color = "green";
            display.textContent = "Ready!";
            bombCoolDown[player] = true
            clearInterval(contDown)
        }
    }, "10")
}

// Bomb Timer Function

export function bombTimer (bombId, player, cooldowntime)  {
    let timer = cooldowntime
    const contDownTimer = setInterval(() => {
        let hpvalue = objHpValue[bombList[bombId]]
        timer -= 1
        if (timer == 0 || hpvalue <= 0) {
            createExplosion(bombId, player)
            bombCount[player] -= 1
            delete hisIndestructible[bombList[bombId]]
            delete bombList[bombId]
            clearInterval(contDownTimer)
        }
    }, "10")
}