
import { executeMoves } from "../playerMovement.js"
import { movementSpeed } from "../stats.js"
import { menuUtility, playerTimers } from "../utilitys.js"

// Movement Speed boost

let countDownSpeedBoostP1
let countDownSpeedBoostP2
let hisSpeedBoostP1 = false
let hisSpeedBoostP2 = false

export function movementSpeedBoost (player) {
    if (!hisSpeedBoostP1 && player == "player_1") {
        hisSpeedBoostP1 = true
        movementSpeed[player] = 4
        executeMoves(movementSpeed.player_1, movementSpeed.player_2)
        countDownSpeedBoostP1 = setInterval(() => {
            if(playerTimers[player].movementSpeedBoost <= 0) {
                movementSpeed[player] = 8
                executeMoves(movementSpeed.player_1, movementSpeed.player_2)
                clearInterval(countDownSpeedBoostP1)
                hisSpeedBoostP1 = false
            }
            if (!menuUtility.inPause)
                playerTimers[player].movementSpeedBoost -= 1
        }, "10")
    }
    else if (!hisSpeedBoostP2 && player == "player_2") {
        hisSpeedBoostP2 = true
        movementSpeed[player] = 4
        executeMoves(movementSpeed.player_1, movementSpeed.player_2)
        countDownSpeedBoostP2 = setInterval(() => {
            if(playerTimers[player].movementSpeedBoost <= 0) {
                movementSpeed[player] = 8
                executeMoves(movementSpeed.player_1, movementSpeed.player_2)
                clearInterval(countDownSpeedBoostP2)
                hisSpeedBoostP2 = false
            }
            if (!menuUtility.inPause)
                playerTimers[player].movementSpeedBoost -= 1
        }, "10")
    }
}