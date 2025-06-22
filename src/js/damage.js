
// Import

import { objList, square_1, square_2, objName, playerIdentifier } from "./utilitys.js"
import { bombPower, objHpValue } from "./stats.js"
import { hisInvincible, incincibility, invincibilityTime } from "./respawn.js"

// Hit Range Checker

const hitChecker = (xObj_1, yObj_1, sizeObj1, xObj_2, yObj_2, sizeObj2) => {
    return Math.round( Math.sqrt( Math.pow( Math.abs( (xObj_1 + (sizeObj1 / 2) ) - ( xObj_2 + (sizeObj2 / 2) ) ), 2) + Math.pow( Math.abs( ( yObj_1 + ( sizeObj1 / 2 ) ) - ( yObj_2 + ( sizeObj2 / 2 ) ) ), 2) ) )
}

// Percent Function

const percentage = (target, range) => {
    if (range <= 0) {
        return 1
    }
    else if (range == target) {
        return 0
    }
    else {
        let perc = target - range
        return perc = ( perc / ( target / 100 ) ) / 100
    }
}

// Hit Function 

export function explosionHitChecker (explosion, player) {
    let objListed = objList
    for (let objHitTested of objListed) {
        let distance
        if (document.querySelector(objHitTested) == square_1 || document.querySelector(objHitTested) == square_2) {
            distance = hitChecker( parseInt(explosion.style.left), parseInt(explosion.style.top), parseInt(explosion.style.width), parseInt(document.querySelector(objHitTested).style.left), parseInt(document.querySelector(objHitTested).style.top), ( parseInt(document.querySelector(objHitTested).style.width) + 2 ))
            if( (distance - ( ( parseInt(document.querySelector(objHitTested).style.width) + 2 ) / 2) ) <= (parseInt(explosion.style.width) / 2) && !hisInvincible[objName[objHitTested]]) {
                objHpValue[objName[objHitTested]] -= Math.round( ( ( (50 * (( parseInt(playerIdentifier[player].style.width) + 2) / 20) ) * bombPower[player]) * percentage((parseInt(explosion.style.width) / 2), (distance - ( ( parseInt(document.querySelector(objHitTested).style.width) + 2 ) / 2) ))) / ( ( parseInt(document.querySelector(objHitTested).style.width) + 2 ) / 20))
                if (objHpValue[objName[objHitTested]] > 0) {
                    hisInvincible[objName[objHitTested]] = true
                    invincibilityTime[objName[objHitTested]] += 75
                    incincibility(objName[objHitTested])
                }
            }
        }
        else {
            distance = hitChecker( parseInt(explosion.style.left), parseInt(explosion.style.top), parseInt(explosion.style.width), parseInt(document.querySelector(objHitTested).style.left), parseInt(document.querySelector(objHitTested).style.top), parseInt(document.querySelector(objHitTested).style.width)) - ( ( parseInt(document.querySelector(objHitTested).style.width) + 2 ) / 2)
            if( (distance - ( parseInt(document.querySelector(objHitTested).style.width) / 2) ) <= (parseInt(explosion.style.width) / 2) ) {
                objHpValue[objName[objHitTested]] -= Math.round( ( (50 * (( parseInt(playerIdentifier[player].style.width) + 2) / 20) ) * bombPower[player]) * percentage((parseInt(explosion.style.width) / 2), (distance - ( parseInt(document.querySelector(objHitTested).style.width) / 2) )) )
            }
        }
    }
}