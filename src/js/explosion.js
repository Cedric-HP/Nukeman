
// Import

import { bombPower, maxBomb } from "./stats.js"
import { explosionHitChecker } from "./damage.js"


// Variable

const idExplosionCycle = {
    player_1: 0,
    player_2: 0
}

// Explosion Id Cycle

const cycleExplosionId = (player) => {
    if (idExplosionCycle[player] < (maxBomb[player] - 1) ) {
        idExplosionCycle[player] ++
    }
    else {
        idExplosionCycle[player] = 0
    }
}

// Create Explosion Function

export function createExplosion (bombExploding, player) {
    let explosion = document.createElement("div")
    explosion.style.width = (parseInt(document.querySelector(bombExploding).style.width) * (4 * bombPower[player])) + "px"
    explosion.style.height = (parseInt(document.querySelector(bombExploding).style.width) * (4 * bombPower[player])) +"px"
    explosion.style.backgroundColor = "orange";
    explosion.style.position = "absolute";
    explosion.style.top = ( (parseInt(document.querySelector(bombExploding).style.top) - (parseInt(explosion.style.width) / 2)) + (parseInt(document.querySelector(bombExploding).style.width) / 2)) + "px"
    explosion.style.left = ( (parseInt(document.querySelector(bombExploding).style.left) - (parseInt(explosion.style.width) / 2)) + (parseInt(document.querySelector(bombExploding).style.width) / 2)) + "px"
    explosion.style.borderRadius = 50 + "%";
    explosion.style.animation = "explsotion 1s 1 both";
    cycleExplosionId(player)
    document.getElementById('playground').appendChild(explosion);
    explosionHitChecker(explosion, player)
    document.querySelector(bombExploding).remove()
    let timer = 100
    const contDown = setInterval(() => {
        if(timer == 0) {
            explosion.remove()
            clearInterval(contDown)
        }
        timer -= 1
    }, "10")
}