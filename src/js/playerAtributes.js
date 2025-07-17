import { hasTakeHit, lastHitByList, playerIdentifier, playerlist } from "./utilitys.js"
import { objHpMaxValue, objHpValue, playerScore, regenerationStats } from "./stats.js"

export {hisRespawning, hisInvincible, invincibilityTime, regenP1, regenP2, hitCoolDownP1, hitCoolDownP2}

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
            if (lastHitByList[player_item] != player_item && lastHitByList[player_item] != "") {
                playerScore[lastHitByList[player_item]].kill ++
                playerScore[lastHitByList[player_item]].score += objHpMaxValue[lastHitByList[player_item]]
            }
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

// Regeneration Trigger

let regenP1
let regenP2
let hitCoolDownP1
let hitCoolDownP2

export function regenerationTrigger () {
    playerlist.forEach( (player) => {
        if (hasTakeHit[player].takeHit) {
            hasTakeHit[player].takeHit = false
            if (player == "player_1") {
                if (!hasTakeHit[player].inCooldown && regenerationStats[player].hisInRegen) {
                    regenerationStats[player].hisInRegen = false
                    clearInterval(regenP1)
                }
                else
                    clearTimeout(hitCoolDownP1)
            }
            else {
                if (!hasTakeHit[player].inCooldown && regenerationStats[player].hisInRegen) {
                    regenerationStats[player].hisInRegen = false
                    clearInterval(regenP2)
                }
                else
                    clearTimeout(hitCoolDownP2)
            }
            hasTakeHit[player].inCooldown = true
            hitCoolDown(player, (regenerationStats[player].passiveRegenCoolDown * 1000))
        }
        else if (!hasTakeHit[player].inCooldown && objHpValue[player] < objHpMaxValue[player] && !regenerationStats[player].hisInRegen) {
            regenerationStats[player].hisInRegen = true
            regeneration(player)
        }
    })
}

const regeneration = (player) => {
    if (player == "player_1") {
        regenP1 = setInterval(()=> {
            if (objHpValue[player] < objHpMaxValue[player]) {
                if ( (objHpValue[player] + regenerationStats[player].regenAmount) <= objHpMaxValue[player] && regenerationStats[player].hisInRegen)
                    objHpValue[player] += regenerationStats[player].regenAmount
                else objHpValue[player] = objHpMaxValue[player]
            }
            else {
                regenerationStats[player].hisInRegen = false
                clearInterval(regenP1)
            }
        }, (regenerationStats[player].regenSpeed * 1000) )
    }
    else {
        regenP2 = setInterval(()=> {
            if (objHpValue[player] < objHpMaxValue[player]) {
                if ( (objHpValue[player] + regenerationStats[player].regenAmount) <= objHpMaxValue[player] && regenerationStats[player].hisInRegen)
                    objHpValue[player] += regenerationStats[player].regenAmount
                else objHpValue[player] = objHpMaxValue[player]
            }
            else {
                regenerationStats[player].hisInRegen = false
                clearInterval(regenP2)
            }
        }, (regenerationStats[player].regenSpeed * 1000) )
    }
}

export function hitCoolDown (player, ammount) {
    if (player ==  "player_1") {
        hitCoolDownP1 = setTimeout( () => {
            hasTakeHit[player].inCooldown = false
            regenerationStats[player].hisInRegen = true
            regeneration(player)
        }, ammount )
    }
    else {
        hitCoolDownP2 = setTimeout( () => {
            hasTakeHit[player].inCooldown = false
            regenerationStats[player].hisInRegen = true
            regeneration(player)
        }, ammount )
    }
}