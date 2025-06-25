import { lastHitByList, playerIdentifier, playerlist } from "./utilitys.js"
import { objHpMaxValue, objHpValue } from "./stats.js"

export {hisRespawning, hisInvincible, invincibilityTime}

// His Respawning Variable

const hisRespawning = {
    player_1: false,
    player_2: false
}

// His Invincible Variable

const hisInvincible = {
    player_1: false,
    player_2: false
}

// Invincible Time Stackable

const invincibilityTime = {
    player_1: 0,
    player_2: 0
}

//Respawn Function

export function respawn (player_resp) {
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
                playerIdentifier[player_resp].style.top = 20 + "px"
                playerIdentifier[player_resp].style.left = 20 + "px"
            }
            else {
                playerIdentifier[player_resp].style.backgroundColor = "red"
                playerIdentifier[player_resp].style.top = ((parseInt(playground.height) - 20 ) - parseInt(playerIdentifier[player_resp].style.width)) + "px"
                playerIdentifier[player_resp].style.left = ((parseInt(playground.width) - 20 )- parseInt(playerIdentifier[player_resp].style.width)) + "px"
            }
            hisInvincible[player_resp] = true
            invincibilityTime[player_resp] = 200
            incincibility(player_resp)
            objHpValue[player_resp] = objHpMaxValue[player_resp]
            hisRespawning[player_resp] = false
            clearInterval(contDown)
        }
        else {
            objHpValue[player_resp] = 0
        }
        timer -= 1
    }, "10")
}

// Respawn Trigger

export function respawnTrigger () {
    for (let player_item of playerlist) {
        if (objHpValue[player_item] <= 0 && !hisRespawning[player_item]) {
            lastHitByList[player_item] = ""
            objHpValue[player_item] = 0
            respawn(player_item)
            hisRespawning[player_item] = true

        }
    }
}

// Invincibility Function

export function incincibility (player_inv) {
    playerIdentifier[player_inv].style.borderColor = "black"
    const contDown = setInterval(() => {
        if (Math.round(invincibilityTime[player_inv] / 10) % 2 == 0) {
            playerIdentifier[player_inv].style.borderColor = "yellow"
        }
        else {
            playerIdentifier[player_inv].style.borderColor = "black"
        }
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
        invincibilityTime[player_inv] -= 1
    }, "10")
}