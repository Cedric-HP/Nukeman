import { objHpMaxValue, objHpValue, regenerationStats } from "../stats.js"
import { hasTakeHit, menuUtility, playerlist } from "../utilitys.js"



export {regenP1, regenP2, hitCoolDownP1, hitCoolDownP2 }

// Regeneration Trigger

let regenP1
let regenP2
let hitCoolDownP1
let hitCoolDownP2

export function regenerationTrigger () {
    if (!menuUtility.inPause) {
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
}

// Regeneration

const regeneration = (player) => {
    if (player == "player_1") {
        regenP1 = setInterval(()=> {
            if (objHpValue[player] < objHpMaxValue[player] && !menuUtility.inPause) {
                if ( (objHpValue[player] + regenerationStats[player].regenAmount) <= objHpMaxValue[player] && regenerationStats[player].hisInRegen)
                    objHpValue[player] += regenerationStats[player].regenAmount
                else objHpValue[player] = objHpMaxValue[player]
            }
            else if ( objHpValue[player] == objHpMaxValue[player] ) {
                regenerationStats[player].hisInRegen = false
                clearInterval(regenP1)
            }
        }, (regenerationStats[player].regenSpeed * 1000) )
    }
    else {
        regenP2 = setInterval(()=> {
            if (objHpValue[player] < objHpMaxValue[player]  && !menuUtility.inPause) {
                if ( (objHpValue[player] + regenerationStats[player].regenAmount) <= objHpMaxValue[player] && regenerationStats[player].hisInRegen)
                    objHpValue[player] += regenerationStats[player].regenAmount
                else objHpValue[player] = objHpMaxValue[player]
            }
            else if ( objHpValue[player] == objHpMaxValue[player] ) {
                regenerationStats[player].hisInRegen = false
                clearInterval(regenP2)
            }
        }, (regenerationStats[player].regenSpeed * 1000) )
    }
}

// Hit Cooldown

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