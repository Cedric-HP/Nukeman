
import { objHpMaxValue, objHpValue, playerScore } from "../stats.js"
import { hisInvincible, hisRespawning, lastHitByList, menuUtility, playerIdentifier, playerTimers, playerlist, playground } from "../utilitys.js"
import { invincibility } from "./invincibility.js"

//Respawn Function

export function respawn (player_resp) {
    let timer = 100
    playerIdentifier[player_resp].style.animation = "appearance 0.9s 1 reverse both"
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
            playerIdentifier[player_resp].style.transform = "transform: scale(1,1)"
            hisInvincible[player_resp] = true
            playerTimers[player_resp].sizeShift = 0
            playerTimers[player_resp].invincibility = 200
            playerTimers[player_resp].movementSpeedBoost = 0
            invincibility(player_resp)
            objHpValue[player_resp] = objHpMaxValue[player_resp]
            hisRespawning[player_resp] = false
            clearInterval(contDown)
        }
        else {
            objHpValue[player_resp] = 0
        }
        if (!menuUtility.inPause)
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