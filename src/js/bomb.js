
// Import

import { bombColliderChecker } from "./hit_Box.js"
import { bombCount, bombList, square_1 } from "./utilitys.js"
import { cooldowntimeset, maxBomb, bombtimeset } from "./stats.js"
import { createExplosion } from "./explosion.js"

// Import Display HTML

let display_cooldown_1 = document.querySelector("#cooldown_player_1")
let display_cooldown_2 = document.querySelector("#cooldown_player_2")

// Variables

const idBombCycle = {
    player_1: 0,
    player_2: 0
}

const bombcooldown = {
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
    if (bombCount[player] < maxBomb[player] && bombcooldown[player] && bombColliderChecker(square)) {
        let bombe = document.createElement("div")
        bombe.style.width = ( parseInt(square.style.width) + 2) + "px"
        bombe.style.height = ( parseInt(square.style.width) + 2) + "px"
        bombe.style.backgroundColor = "black";
        bombe.id = "bombe_" + String(player) + "_" + String(idBombCycle[player]);
        bombe.style.position = "absolute";
        bombe.style.top = square.style.top 
        bombe.style.left = square.style.left
        bombe.style.borderRadius = 50 + "%";
        document.getElementById('playground').appendChild(bombe);
        bombList.push("#" + String(bombe.id))
        bombCount[player] += 1
        bombcooldown[player] = false
        cycleBombId(player)
        bombCoolDownSet(player, cooldowntimeset[player])
        bombTimer(String("#" + String(bombe.id)), player, bombtimeset[player])
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
            display.style.color = "blue";
            display.textContent = "Ready!";
            bombcooldown[player] = true
            clearInterval(contDown)
        }
    }, "10")
}

// Bomb Timer Function

export function bombTimer (bombId, player, cooldowntime)  {
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
            createExplosion(bombId, player)
            bombCount[player] -= 1
            for (let i = 0; i < bombList.length; i++) {
                if (bombList[i] == bombId ) {
                    bombList.splice(i, i+1)
                }
            }
            clearInterval(contDownTimer)
        }
    }, "200")
}
