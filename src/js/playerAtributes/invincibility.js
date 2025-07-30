

// Invincibility Function

import { playerIdentifier, playerTimers, hisInvincible, menuUtility } from "../utilitys.js"

let countDownInvincibilityP1
let countDownInvincibilityP2
let hisInvincibilityP1 = false
let hisInvincibilityP2 = false

export function invincibility (player_inv) {
    if (!hisInvincibilityP1 && player_inv == "player_1") {
        hisInvincibilityP1 = true
        playerIdentifier[player_inv].style.animation = "invincibilityAura 0.2s infinite both"
        countDownInvincibilityP1 = setInterval(() => {
            if(playerTimers[player_inv].invincibility <= 0) {
                playerIdentifier[player_inv].style.animation = ""
                playerIdentifier[player_inv].style.borderColor = "blue"
                hisInvincible[player_inv] = false
                clearInterval(countDownInvincibilityP1)
                hisInvincibilityP1 = false
            }
            if (!menuUtility.inPause)
                playerTimers[player_inv].invincibility -= 1
        }, "10")
    }
    else if (!hisInvincibilityP2 && player_inv == "player_2") {
        hisInvincibilityP2 = true
        playerIdentifier[player_inv].style.animation = "invincibilityAura 0.2s infinite both"
        countDownInvincibilityP2 = setInterval(() => {
            if(playerTimers[player_inv].invincibility <= 0) {
                playerIdentifier[player_inv].style.animation = ""
                playerIdentifier[player_inv].style.borderColor = "red"
                hisInvincible[player_inv] = false
                clearInterval(countDownInvincibilityP2)
                hisInvincibilityP2 = false
            }
            if (!menuUtility.inPause)
                playerTimers[player_inv].invincibility -= 1
        }, "10")
    }
}