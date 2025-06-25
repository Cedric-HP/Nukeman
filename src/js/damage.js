import { objList, square_1, square_2, playerIdentifier, hisIndestructible, lastHitByList } from "./utilitys.js"
import { bombPower, objHpValue, objHpMaxValue } from "./stats.js"
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

export function explosionHitChecker (explosion, player, objListTested) {
    for (let objHitTested in objListTested) {
        let distance
        if (document.querySelector(objHitTested) == square_1 || document.querySelector(objHitTested) == square_2) {
            distance = hitChecker(
                parseInt(explosion.style.left),
                parseInt(explosion.style.top),
                parseInt(explosion.style.width),
                parseInt(document.querySelector(objHitTested).style.left),
                parseInt(document.querySelector(objHitTested).style.top),
                ( parseInt(document.querySelector(objHitTested).style.width) + 2 ))
            if( (distance - ( ( parseInt(document.querySelector(objHitTested).style.width) + 2 ) / 2) ) <= (parseInt(explosion.style.width) / 2) && !hisInvincible[objListTested[objHitTested]]) {
                objHpValue[objListTested[objHitTested]] -= Math.round( 
                    ( ( (50 * (( parseInt(playerIdentifier[player].style.width) + 2) / 20) ) *
                    bombPower[player]) *
                    percentage((parseInt(explosion.style.width) / 2),
                    (distance - ( ( parseInt(document.querySelector(objHitTested).style.width) + 2 ) / 2) ))) /
                    ( ( parseInt(document.querySelector(objHitTested).style.width) + 2 ) / 20))
                lastHitByList[objListTested[objHitTested]] = player
                if (objHpValue[objListTested[objHitTested]] > 0) {
                    hisInvincible[objListTested[objHitTested]] = true
                    invincibilityTime[objListTested[objHitTested]] += 75
                    incincibility(objListTested[objHitTested])
                }
            }
        }
        else {
            distance = hitChecker(
                parseInt(explosion.style.left),
                parseInt(explosion.style.top),
                parseInt(explosion.style.width),
                parseInt(document.querySelector(objHitTested).style.left),
                parseInt(document.querySelector(objHitTested).style.top),
                parseInt(document.querySelector(objHitTested).style.width)) -
                ( ( parseInt(document.querySelector(objHitTested).style.width) + 2 ) / 2)
            if( (distance - ( parseInt(document.querySelector(objHitTested).style.width) / 2) ) <= (parseInt(explosion.style.width) / 2) && !hisIndestructible[objListTested[objHitTested]]) {
                objHpValue[objListTested[objHitTested]] -= Math.round(
                    ( (50 * (( parseInt(playerIdentifier[player].style.width) + 2) / 20) ) *
                    bombPower[player]) * percentage((parseInt(explosion.style.width) / 2),
                    (distance - ( parseInt(document.querySelector(objHitTested).style.width) / 2) )) )
                lastHitByList[objListTested[objHitTested]] = player
            }
        }
    }
}

// HP Obj Checker

export function hpObjChecker () {
    for (let objHpChecked in objList) {
        if (objHpChecked != "#body_1" && objHpChecked != "#body_2") {
            if ( (objHpValue[objList[objHpChecked]] <= (objHpMaxValue[objList[objHpChecked]] / 1.5)) && (objHpValue[objList[objHpChecked]] > (objHpMaxValue[objList[objHpChecked]] / 4)) ) {
                document.querySelector(objHpChecked).style.backgroundColor = "rgb(130, 130, 130)";
            }
            else if ( (objHpValue[objList[objHpChecked]] <= (objHpMaxValue[objList[objHpChecked]] / 4)) && (objHpValue[objList[objHpChecked]] > 0 ) ) {
                document.querySelector(objHpChecked).style.backgroundColor = "rgb(60, 60, 60)";
            }
            else if (objHpValue[objList[objHpChecked]] <= 0) {
                document.querySelector(objHpChecked).remove()
                delete lastHitByList[objList[objHpChecked]] 
                delete hisIndestructible[objList[objHpChecked]]
                delete objHpValue[objList[objHpChecked]]
                delete objHpMaxValue[objList[objHpChecked]]
                delete objList[objHpChecked]  
            } 
        }
    }
}